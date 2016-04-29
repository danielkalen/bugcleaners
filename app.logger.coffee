SETTINGS = require('./settings.json')
SETTINGSDB = require('./settings-db.json')
fs = require('fs-extra')

logger = new ()->
	logStreams = 
		'access': fs.createWriteStream('./logs/access.log', {'flags':'a'})
		'error': fs.createWriteStream('./logs/error.log', {'flags':'a'})
		'api': fs.createWriteStream('./logs/api.log', {'flags':'a'})


	@write = (logName, data)->
		if logStreams[logName]?
			data = "[#{(new Date()).toUTCString()}] " + data
			
			logStreams[logName].write data+'\n', 'utf8'

	return @




module.exports = logger
