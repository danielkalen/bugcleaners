SETTINGS = require('./settings.json')
express = require('express')
sendEmail = require('./app.email.coffee')
uaParser = require('ua-parser-js')
markdown = require('jstransformer')(require('jstransformer-markdown'))
passport = require('passport')
passportStrategy = require('passport-local').Strategy
app = express()
router = express.Router()
db = require('monkii')(SETTINGS.app.db)
Pages = db.get('pages')
Posts = db.get('posts')
Leads = db.get('leads')
Emails = db.get('emails')
Users = db.get('users')
inProduction = if __dirname.includes('Projects') then false else true

### ==========================================================================
	 Router
	========================================================================== ###

# ==== Pest Pages =================================================================================
router.get '/pests/:pest', (req,res)->
	currentPage = req.hostname + req.originalUrl
	slug = req.params.pest
	Posts.findOne {type:'pest', slug:slug}, (err, pest)->
		if err then console.log(err)
		if !pest then res.status(404).render '404'
		
		res.render 'pest-single',
			'pest': pest
			'production': inProduction
			'currentPage': currentPage
			'bodyClass': slug
			'app': SETTINGS.app
			'markdown': markdown














# ==== Service Pages =================================================================================
router.get '/services/:service', (req,res)->
	currentPage = req.hostname + req.originalUrl
	slug = req.params.service
	Posts.findOne {type:'service', slug:slug}, (err, service)->
		if err then console.log(err)
		if !service then res.status(404).render '404', {app:SETTINGS.app, markdown:markdown}
		
		res.render 'service-single',
			'service': service
			'production': inProduction
			'currentPage': currentPage
			'bodyClass': slug
			'app': SETTINGS.app
			'markdown': markdown














# ==== Management Admin Page =================================================================================
router.get '/manage', require('connect-ensure-login').ensureLoggedIn('/manage/login'), (req, res)->
	res.redirect('/manage/pages')


router.route '/manage/login'
	.get (req, res)->
		res.render 'manage',
			'currentPage': 'http://samedayhomeoffer.com/manage/login'
			'bodyClass': 'login'
			'app': SETTINGS.app

	.post passport.authenticate('local', failureRedirect: '/manage/login'), (req, res)->
		res.redirect '/manage'



router.get '/manage/logout', (req, res)->
	req.logout()
	res.redirect '/'




router.get '/manage/pages', require('connect-ensure-login').ensureLoggedIn('/manage/login'), (req, res)->
	currentPage = req.hostname + req.originalUrl
	Pages.find {}, (error, pages)->
		res.render 'manage',
			# 'pages': filterImageFields(pages)
			'pages': pages
			'production': inProduction
			'fieldSchemas': SETTINGS.fieldSchemas
			'currentPage': currentPage
			'bodyClass': 'pages'
			'settings': SETTINGS
			'app': SETTINGS.app




router.get '/manage/posts', require('connect-ensure-login').ensureLoggedIn('/manage/login'), (req, res)->
	currentPage = req.hostname + req.originalUrl
	Posts.find {}, (error, posts)->
		res.render 'manage',
			# 'posts': filterImageFields(posts)
			'posts': posts
			'production': inProduction
			'fieldSchemas': SETTINGS.fieldSchemas
			'currentPage': currentPage
			'bodyClass': 'posts'
			'settings': SETTINGS
			'app': SETTINGS.app


router.get '/manage/leads/:page?', require('connect-ensure-login').ensureLoggedIn('/manage/login'), (req, res)->
	currentPage = req.hostname + req.originalUrl
	page = req.params.page or 1
	skipAmount = (page - 1) * 30
	Leads.find {}, {
		'sort': 'date': -1
		'limit': 30
		'skip': skipAmount
	}, (error, leads)->
		Leads.count {}, (error, leadCount)->
			res.render 'manage',
				'leads': leads
				'leadCount': leadCount
				'production': inProduction
				'currentPageIndex': page
				'currentPage': currentPage
				'bodyClass': 'leads'
				'app': SETTINGS.app
### ========================================================================== ###















filterImageFields = (obj)->
	if obj.constructor is Array
		obj.forEach (subObj, index)->
			obj[index] = filterImageFields(subObj)
	
	if obj.constructor is Object
		Object.keys(obj).forEach (key)->
			if key is 'image'
				if obj[key]
					delete obj[key]
			else
				if obj[key].constructor is Object or obj[key].constructor is Array
					obj[key] = filterImageFields(obj[key])

	return obj


























### ==========================================================================
	 Ajax req handling
	========================================================================== ###

router.post '/ajax', (req, res)->
	params = req.body
	action = params.action
	paramsToSubmit = {}
	paramsToOmit = ['url', 'action', 'referrer']
	
	if !action
		res.send 'No Action Specified!'
		res.end()
	




	if action == 'cta_form'
		ajaxResponse = {}
		messageToSubmit = ''
		ua = uaParser(req.headers['user-agent'])
		currentDate = new Date
		ajaxResponse.success = true
		ajaxResponse.message = 'Your request has been received. A dedicated specialist will contact you shortly to provide you with free pricing information.'
		
		res.json ajaxResponse
		
		for param of params
			if paramsToOmit.includes(param)
				paramsToSubmit[param] = params[param]

		for param of paramsToSubmit
			messageToSubmit += '<p><b>' + param.replace('_', ' ') + ': </b>' + paramsToSubmit[param] + '</p>'
	
		params.status = params.status or 'pending'
		params.date = new Date
		params.ip = req.headers['cf-connecting-ip'] or req.headers['x-forwarded-for'] or req.connection.remoteAddress
		params.user_agent =
			'browser': ua.browser
			'browser_engine': ua.engine
			'device': ua.device
			'os': ua.os
			'cpu': ua.cpu
			'entire_string': ua.ua
		

		if params.status == 'partial'
			if params.Address and params.Zip
				Leads.insert params
				setTimeout (()->
					Leads.find { 'ip': params.ip }, (error, partials)->
						if partials.length
							Leads.findOne {
								'ip': params.ip
								'status': 'partial'
							}, { 'sort': 'created_on': -1 }, (error, lead)->
								if lead and !lead.emailed
									sendEmail SETTINGS.admin.name, SETTINGS.admin.email, "[#{SETTINGS.app.name}] Partial Quote Request", messageToSubmit
									Leads.updateById lead._id, '$set': 'emailed': true

				), 300000 # 5 Mins
		else
			Leads.insert params
			sendEmail SETTINGS.admin.name, SETTINGS.admin.email, "[LEAD] New Quote Request", messageToSubmit
			Leads.remove
				'status': 'partial'
				'ip': params.ip



	if action == 'contact-email'
		ajaxResponse = {}
		ajaxResponse.success = true
		ajaxResponse.message = "Thank you for your submission! Our support team will go over your message and will contact you shortly."
		res.json ajaxResponse
		Emails.insert
			'firstname': params.first_name
			'lastname': params.last_name
			'email': params.email
			'message': params.message
		attachment = false
		if params.attachment
			attachment = params.attachment
		messageToSubmit = "<p><b>Full Name: </b>#{params.first_name} #{params.last_name}</p><p><b>Email Address: </b>#{params.email}</p><p><b>Message: </b>#{params.message}</p>"
		sendEmail SETTINGS.admin.name, SETTINGS.admin.email, "[SUPPORT] Support Request", messageToSubmit, attachment


	if action == 'contact-phone'
		ajaxResponse = {}
		ajaxResponse.success = true
		ajaxResponse.message = "Thank you for your submission! Our support team will contact you shortly."
		res.json ajaxResponse
		attachment = false
		if params.attachment
			attachment = params.attachment
		messageToSubmit = "<p><b>Full Name: </b>#{params.full_name}</p><p><b>Phone Number: </b>#{params.phone}</p>"
		sendEmail SETTINGS.admin.name, SETTINGS.admin.email, "[SUPPORT] Call Back Request", messageToSubmit, attachment




	res.end()
module.exports = router


