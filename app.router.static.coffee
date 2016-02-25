SETTINGS = require('./settings.json')
additionalDependencies = require('./staticDependencies.json')
fs = require('fs')
path = require('path')
nodeSass = require('node-sass')
SimplyImport = require('simplyimport')
fireworm = require('fireworm')
coffee = require('jstransformer')(require('jstransformer-coffee-script'))
uglify = require('uglify-js')
express = require('express')
app = express()
router = express.Router()
redis = require('redis').createClient()
db = require('monkii')(SETTINGS.app.db.url, {'username':SETTINGS.app.db.user, 'password':SETTINGS.app.db.pwd})
Pages = db.get('pages')
regEx =
	ext: /.+\.(sass|scss|js|coffee)$/i
	import: /@import\s*(.+)/ig

### ==========================================================================
	 API for Databse CRUD
	========================================================================== ###
router.all /\/([^\/]+)\/([^\/]+)/, (req, res)->
	contentType = req.params[0]
	pageSlug = req.params[1]
	mimeType = if contentType is 'css' or contentType is 'sass' then 'text/css' else 'application/javascript'
	output = ''
	dependencies = {}

	processBlocks = (blocks)->
		return new Promise (resolve)->
			computedBlocks = 0

			done = ()-> resolve() if computedBlocks is blocks.length

			blocks.forEach (block)->
				slug = block.slug

				if slug is 'wrapper_block'
					processBlocks(block.blocks).then ()-> done(++computedBlocks)
				else
					fetchStatic('_parts-sections/'+slug, contentType).then (result)->
						output += result
						captureDependencies(slug, contentType, dependencies).then (result)->
							dependencies = result
							done(++computedBlocks)


	combineAllData = ()->
		return new Promise (resolve)->
			depOutput = ''
			for i, dep of dependencies
				depOutput += dep

			resolve(depOutput+output)



	sendResponse = (data='')->
		res.set('Content-Type', mimeType)
		res.set('Cache-Control', 'public, max-age=2592000')
		res.send data
		res.end()



	Pages.findOne {'slug':pageSlug}, (err, page)->
		if err
			console.log(err)
			sendResponse()
		else
			# redis.get pageSlug+'_'+contentType, (err, data)->
			# 	console.log(err) if err
			# 	if data then return sendResponse(data)
			# 	else
			pageBlocks = page.variations?[page.currentVariation]?.blocks
			
			unless pageBlocks then return sendResponse()
			
			processBlocks(pageBlocks).then ()->
				combineAllData().then (result)->
					# redis.set pageSlug+'_'+contentType, result, (err)-> console.log(err) if err
					sendResponse(result)


























# ==== Helper Functions =================================================================================
captureDependencies = (blockSlug, contentType, dependencies)->
	return new Promise (resolve)->
		blockDeps = additionalDependencies[contentType][blockSlug]
		index = 0
		
		if !blockDeps? then resolve(dependencies)
		else
			computeNextDep = ()->
				dep = blockDeps[index]

				if !dependencies[dep]?
					fetchFile(dep, contentType).then (result)->
						dependencies[dep] = result
						index++

						if index is blockDeps.length
							resolve(dependencies)
						else
							computeNextDep()
			computeNextDep()



fetchFile = (filePath, contentType)->
	return new Promise (resolve)->
		dirType = if contentType is 'css' then 'sass' else 'coffee'
		isCoffeeFile = filePath.includes('.coffee')

		redis.get filePath+'-'+contentType, (err, data)->
			if err then console.log(err); resolve('')
			else
				if data? then resolve(data)
				else
					fs.readFile "_assets/#{dirType}/#{filePath}", 'utf8', (err, fileContent)->
						console.log(err) if err
						compileStatic(filePath, contentType, isCoffeeFile, fileContent).then (data)->
							resolve(data)
	


fetchStatic = (blockSlug, contentType)->
	return new Promise (resolve)->
		dirType = if contentType is 'css' then 'sass' else 'coffee'
		blockSlug = blockSlug+'.'+dirType if not regEx.ext.test(blockSlug)
		
		redis.get blockSlug+'-'+contentType, (err, data)->
			if err then console.log(err); resolve('')
			else
				if data? then resolve(data)
				else
					compileStatic(blockSlug, contentType).then (result)->
						resolve(result)
			

compileStatic = (blockSlug, contentType, isCoffeeFile, fileContent)->
	return new Promise (resolve)->
		unless fileContent
			dirType = if contentType is 'css' then 'sass' else 'coffee'
			fileContent = fs.readFileSync "_assets/#{dirType}/#{blockSlug}", 'utf8'
			isCoffeeFile = true

		if contentType is 'css'
			masterDependencies = fs.readFileSync('_assets/sass/_parts-global/_vars.sass', 'utf8')+'\n\n'
			masterDependencies += fs.readFileSync('_assets/sass/_parts-global/_elements.sass', 'utf8')
			fileContent = masterDependencies+'\n\n'+fileContent
		
		compileData(fileContent, contentType, isCoffeeFile).then (result)->
			redis.set blockSlug+'-'+contentType, result, (err)-> console.log(err) if err
			resolve(result)


compileData = (data, contentType, isCoffeeFile)->
	return new Promise (resolve)->
		if contentType is 'css'
			nodeSass.render 
				'data': data
				'indentedSyntax': true
				'outputStyle': 'compressed'
				'includePaths': ['_assets/sass/_parts-sections', '_assets/sass/_parts-global']
				(err, result)->
					console.log(err) if err
					resolve(result?.css.toString())
		
		else if contentType is 'js'
			imported = SimplyImport(data)
			if isCoffeeFile
				compiled = coffee.render(imported, {bare:true}).body
			else compiled = imported
			minified = uglify.minify(compiled, {fromString:true}).code

			resolve(minified)




















# ==== Watch for static file changes and save to cache =================================================================================
importedFiles = {}
addToImportedHistory = (importer, importerContent)->
	return new Promise (resolve)->
		extName = path.extname(importer)
		dirPath = path.dirname(importer)

		importerContent.replace regEx.import, (entire, match)->
			match = match.replace /'/g, '' # Removes quotes if present
			hasExt = regEx.ext.test(match)
			match += extName if not hasExt
			imported = path.normalize(dirPath+'/'+match)
			
			if importedFiles[imported]?
				importedFiles[imported].push(importer) unless importedFiles[imported].includes(importer)
			else
				importedFiles[imported] = [importer]

		resolve()



do ()->
	fwSASS = fireworm '_assets/sass'
	fwSASS.add('_assets/sass/_parts-sections/*')
	for i,dep of additionalDependencies.css
		fwSASS.add("_assets/sass/#{dep}")
	
	fwCOFFEE = fireworm '_assets/coffee'
	fwCOFFEE.add('_assets/coffee/_parts-sections/*')
	for i,dep of additionalDependencies.js
		dep.forEach (inDep)->
			fwCOFFEE.add("_assets/coffee/#{inDep}")


	processFile = (filePath, contentType, preProcessorType)->
		fs.stat filePath, (err, stats)->
			return console.log(err) if err
		
			if stats.isFile()
				fileBase = path.basename(filePath)
				fileName = filePath.replace("_assets/#{preProcessorType}/", '')
				isCoffeeFile = /\.coffee$/i.test fileBase
				
				if importedFiles[filePath]?
					importedFiles[filePath].forEach processFile
				else
					if filePath.includes('global/') or filePath.includes('plugins/')
						fs.readFile filePath, 'utf8', (err, fileContent)->
							console.log(err) if err

							addToImportedHistory(filePath, fileContent).then ()->
								compileStatic(fileName, contentType, isCoffeeFile, fileContent)
					
					else if filePath.includes('sections/')
						compileStatic(fileName, contentType, isCoffeeFile)

	processSASS = (filePath)-> processFile(filePath, 'css', 'sass')
	processCOFFEE = (filePath)-> processFile(filePath, 'js', 'coffee')
	


	fwSASS.on 'add', processSASS
	fwSASS.on 'change', processSASS
	
	fwCOFFEE.on 'add', processCOFFEE
	fwCOFFEE.on 'change', processCOFFEE





























module.exports = router
