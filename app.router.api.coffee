SETTINGS = require('./settings.json')
SETTINGSDB = require('./settings-db.json')
logger = require('./app.logger.coffee')
express = require('express')
app = express()
router = express.Router()
db = require('monkii')("mongodb://#{SETTINGSDB.mongo.user}:#{SETTINGSDB.mongo.pwd}@localhost:27017/bugcleaners")

### ==========================================================================
	 API for Databse CRUD
	========================================================================== ###
router.post '/:action/:postType', (req, res)->
	params = req.body
	action = req.params.action
	postType = req.params.postType
	ipAddress = req.headers['cf-connecting-ip'] or req.headers['x-forwarded-for'] or req.connection.remoteAddress
	ajaxResponse = 
		success: false
		message: 'Not Authorized.'
	authenticated = req.isAuthenticated()

	if !authenticated
		res.json ajaxResponse
		logger.write('api', "Unauthenticated attempt to submit an api request from #{ipAddress}: #{JSON.stringify(req.params)}")
		return res.end()

	if !action
		res.send 'No Action Specified!'
		return res.end()

	if !postType
		res.send 'No Post Type Specified!'
		return res.end()






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







	logger.write 'api', "#{action.toUpperCase()} request: Called by #{ipAddress}, #{JSON.stringify(params)}"

	if action == 'get'
		query = params or {}
		if query.date
			if typeof query.date is 'string'
				query.date = new Date(parseFloat(query.date))

			else if typeof query.date is 'object'
				for key,dateString of query.date
					query.date[key] = new Date(parseFloat(dateString))

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
