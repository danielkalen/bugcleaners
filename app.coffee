SETTINGS = require('./settings.json')
SETTINGSDB = require('./settings-db.json')
logger = require('./app.logger')
express = require('express')
session = require('express-session')
passport = require('passport')
passportStrategy = require('passport-local').Strategy
compress = require('compression')
bodyParser = require('body-parser')
markdown = require('jstransformer')(require('jstransformer-markdown'))
router = require('./app.router')
routerapi = require('./app.router.api')
routerpurge = require('./app.router.purge')
routerstatic = require('./app.router.static')
app = express()
db = require('monkii')("mongodb://#{SETTINGSDB.mongo.user}:#{SETTINGSDB.mongo.pwd}@localhost:27017/bugcleaners")
Pages = db.get('pages')
Posts = db.get('posts')
Users = db.get('users')
inProduction = if __dirname.includes('Projects') then false else true
port = if inProduction then 7889 else 7889
availPageTypes = Object.keys SETTINGS.fieldSchemas.page.pageData.type.values

### ==========================================================================
	 Management page auth
	========================================================================== ###

passport.use new passportStrategy (email, password, done)->
	Users.findOne {'email': email}, (err, user)->
		if err
			console.log(err)
			return done(err)
		if !user
			return done(null, false)
		if user.password isnt password
			return done(null, false)
		
		done(null, user)
		logger.write 'access', "Login Success by #{email}"


passport.serializeUser (user, done)-> done(null, user._id)

passport.deserializeUser (userID, done)->
	Users.findOne { _id: userID }, (err, user)->
		if err then return done(err)
		done(null, user)

### ==========================================================================
	 Middleware
	========================================================================== ###

app.use compress() # Use Gzip
app.use express.static('public', maxAge: 2592000000) # Allow static files reqs.
app.use bodyParser.json({limit:'500mb'}) # Enable JSON req parsing
app.use bodyParser.urlencoded({extended:true, limit:'500mb'})
app.use '(/manage|/ajax|/api)', session {secret:SETTINGS.app.slug, resave:false, saveUninitialized:true}
app.use '(/manage|/ajax|/api)', passport.initialize()
app.use '(/manage|/ajax|/api)', passport.session()
app.set 'views', './_views' # Set main views folder.
app.set 'view engine', 'jade' # Set templating engine to jade.
if inProduction # Production conditional code.
	console.log 'In production'
	app.set 'view cache', true # Enable cache for templating engine.
else
	# require('express-debug')(app);

app.use '/assets', routerstatic
app.use '/', router
app.use '/api', routerapi
app.use '/purge', routerpurge




















# ==== DB Pages && 404 page =================================================================================
app.use (req, res, next)->
	slug = req.url.slice(1)
	slug = 'home' if slug is ''
	ipAddress = req.headers['cf-connecting-ip'] or req.headers['x-forwarded-for'] or req.connection.remoteAddress

	Pages.findOne {'slug':slug}, (err, page)->
		if not page or not page.type or not availPageTypes.includes page.type
			logger.write('access', "[404] /#{slug} accessed by #{ipAddress}")
			return res.status(404).render '404', {app:SETTINGS.app, markdown:markdown}
		# return next()
		renderPage = (pageType, faqs, faq_categories, pests, services, exitIntent)->
			currentPage = req.hostname + req.originalUrl
			res.render pageType,
				'page': page.variations[page.currentVariation]
				'production': inProduction
				'currentVariation': page.currentVariation
				'currentPageSlug': page.slug
				'currentPage': currentPage
				'bodyClass': page.slug
				'app': SETTINGS.app
				'markdown': markdown
				'faqs': faqs
				'faq_categories': faq_categories
				'pests': pests
				'services': services
				'exitIntent': exitIntent
			logger.write('access', "/#{slug} accessed by #{ipAddress}")

		pageIncludes = (page, slug)->
			includesSlug = false
			page.blocks?.forEach (block)->
				includesSlug = true if block.slug is slug			
			return includesSlug


		pageVariation = page.variations[page.currentVariation]
		if (!pageVariation and page.currentVariation > 0) or not pageVariation.enabled
			pageVariation = page.variations[0]

		if pageVariation and pageVariation.enabled
			if pageIncludes(pageVariation, 'faqs') then includeFaqs = true
			if pageIncludes(pageVariation, 'pests') then includePests = true
			if pageIncludes(pageVariation, 'services') then includeServices = true
			if pageVariation.exit_intent then includeExitIntent = true

			getFaqs = ()->
				new Promise (resolve)->
					if not includeFaqs then resolve()
					else Posts.find {type:'faq'}, (err, faqs)-> resolve(faqs)

			getFaqCats = ()->
				new Promise (resolve)->
					if not includeFaqs then resolve()
					else Posts.find {type:'faq_category'}, (err, faq_categories)-> resolve(faq_categories)

			getPests = ()->
				new Promise (resolve)->
					if not includePests then resolve()
					else Posts.find {type:'pest'}, (err, pests)-> resolve(pests)

			getServices = ()->
				new Promise (resolve)->
					if not includeServices then resolve()
					else Posts.find {type:'service'}, (err, services)-> resolve(services)

			getExitIntent = ()->
				new Promise (resolve)->
					if not includeExitIntent then resolve()
					else Posts.findOne {type:'exit_intent', name:pageVariation.exit_intent}, (err, exitIntent)-> resolve(exitIntent)
			
			getFaqs().then (faqs)->
				getFaqCats().then (faq_categories)->
					getPests().then (pests)->
						getServices().then (services)->
							getExitIntent().then (exitIntent)->
								pageType = if page.type is 'standard' then 'page' else page.type
								renderPage(pageType, faqs, faq_categories, pests, services, exitIntent)


			if page.rotation
				infiniteLoop = false
				getNextVariration = (current)->
					next = current + 1
					if next > page.variations.length - 1
						next = 0
						infiniteLoop = true
					
					if not page.variations[next]?.enabled and not infiniteLoop
						next = getNextVariration(next)

					return next
				
				nextVariation = getNextVariration(page.currentVariation)

				Pages.update { slug: page.slug }, '$set': 'currentVariation': nextVariation
		

		else res.status(404).render '404'
		# next()



### ==========================================================================
	 Init Server
	========================================================================== ###

server = app.listen port, ()->
	host = server.address().address
	port = server.address().port
	console.log(SETTINGS.app.name + " Server running on http://#{host}:#{port}")

.on 'error', (message)->
	console.log message






## ==========================================================================
## Array.includes Polyfill
## ========================================================================== 
if not Array::includes
	Array::includes = (subject)-> @indexOf(subject) isnt -1

