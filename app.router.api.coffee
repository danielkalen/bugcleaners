SETTINGS = require('./settings.json')
express = require('express')
app = express()
router = express.Router()
db = require('monkii')(SETTINGS.app.db.url, {'username':SETTINGS.app.db.user, 'password':SETTINGS.app.db.pwd})

### ==========================================================================
	 API for Databse CRUD
	========================================================================== ###
router.post '/:action/:postType', (req, res)->
	params = req.body
	action = req.params.action
	postType = req.params.postType
	ajaxResponse = 
		success: false
		message: 'Not Authorized.'
	authenticated = req.isAuthenticated()

	if !authenticated
		res.json ajaxResponse
		res.end()

	if !action
		res.send 'No Action Specified!'
		res.end()

	if !postType
		res.send 'No Post Type Specified!'
		res.end()






	handleDatabaseResponse = (err, result)->
		if err
			console.log err, result
			res.json
				success: false
				message: 'An Error Occured'
				details: err
		else
			res.json
				success: true
				message: 'Success!'
				result: result
		res.end()








	if action == 'get'
		query = params or {}
		db.get(postType).find query, (err, result)->
			if err
				res.json
					success: false
					message: 'An Error Occured'
					details: err
				console.log(err, result)
			
			else res.json result



	if action == 'insert'
		data = formatData(params)
		db.get(postType).insert data, handleDatabaseResponse
	



	if action == 'update'
		query = params.query or {}
		updateQuery = if params.updateQuery then formatData(params.updateQuery) else '$set': formatData(params.data)
		db.get(postType).update query, updateQuery, handleDatabaseResponse
	




	if action == 'updatemulti'
		if not params or params.queries?.constructor isnt Array
			res.json({success:false, message:'Bad Params', params:params})
			res.end()
			return

		executeCommands = (commands)->
			command = commands.shift()
			query = command.query or {}
			updateQuery = formatData(command.updateQuery)
			db.get(postType).update query, updateQuery, (err, result)->
				if err then return handleDatabaseResponse(err, result)
				if commands.length
					executeCommands(commands)
				else
					handleDatabaseResponse(err, result)

		executeCommands params.queries
		
	




	if action == 'delete'
		query = params.query or params
		if !query
			res.json
				success: false
				message: 'No query specified. Cannot delete everything.'
			res.end()
		db.get(postType).remove query, handleDatabaseResponse


























# ==== Helper Functions =================================================================================
formatData = (data)->
	convertStringsToBooleans data

convertStringsToBooleans = (fields)->
	if fields is null then return null

	if fields.constructor is Object
		for field of fields
			fields[field] = convertStringsToBooleans(fields[field])

	if fields.constructor is Array
		fields.forEach (value, index)->
			fields[index] = convertStringsToBooleans(fields[index])

	if fields.constructor is String
		fields = true if fields is 'true'
		fields = false if fields is 'false'
		fields = null if fields is 'null'

	return fields









module.exports = router
