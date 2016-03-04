SETTINGS = require('./settings.json')
SETTINGSDB = require('./settings-db.json')
express = require('express')
app = express()
router = express.Router()
redis = require('redis').createClient({'auth_pass':SETTINGSDB.redis.pwd})
inProduction = if __dirname.includes('Projects') then false else true

### ==========================================================================
	 API for Databse CRUD
	========================================================================== ###
router.all /\/([^\/]+)(?:\/([^\/]+))?/, (req, res)->
	contentType = req.params[0]
	keyToPurge = req.params[1] || ''
	purgeCount = 0

	res.end() if contentType isnt 'css' and contentType isnt 'js'
	redis.keys "#{keyToPurge}*#{contentType}", (err, keys)->
		keys.forEach (key)->
			redis.del(key)
			console.log("Purged: #{key}")
			purgeCount++
		
		res.json({'success':true, 'count':purgeCount})


module.exports = router
