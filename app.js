var express = require('express'),
	sendEmail = require('./email.js'),

	compress = require('compression'),
	bodyParser = require('body-parser'),
	app = express(),

	db = require('monk')('localhost:27017/bugcleaners'),
	Pages = db.get('pages'),
	Pests = db.get('pests'),
	Reviews = db.get('reviews'),
	Faqs = db.get('faqs'),
	FaqCategories = db.get('faq_categories'),
	Submissions = db.get('submissions'),
	inProduction = false;


app.use(compress());						// Use Gzip
app.use(bodyParser.json());					// Enable JSON request parsing
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public')); 			// Allow static files requests.
app.set('views', './views'); 				// Set main views folder.
app.set('view engine', 'jade');				// Set templating engine to jade.
if (inProduction) {
	app.set('view cache', true);			// Enable cache for templating engine.
} else {
	// require('express-debug')(app);
}




/* ==========================================================================
   Router
   ========================================================================== */
	app.use('(/|/get-quote|/landing|/about)', function(request, response, next){
		Reviews.find({}, function(error, data){
			request.reviewsDB = data;
			next();
		});
	});

	// ==== Main Page =================================================================================
	app.get('/', function(request, response){
		response.render('index', {
			'reviews': request.reviewsDB
		});
	});

	// ==== Landing Page (for internal reference) =================================================================================
	app.get('/get-quote', function(request, response){
		var currentpage = request.hostname + request.originalUrl;
		response.render('get-quote', {
			'hero_title': 'Keep Your House &amp; Business <span class="hero-title-highlight">Pest-Free</span>, The Way They Should Be.',
			'reviews': request.reviewsDB,
			'currentpage': currentpage
		});
	});

	// ==== Landing Page (Optimized for adwords) =================================================================================
	app.get('/landing', function(request, response){
		var currentpage = request.hostname + request.originalUrl;
		response.render('landing', {
			'hero_title': 'Keep Your House &amp; Business <span class="hero-title-highlight">Pest-Free</span>, The Way They Should Be.',
			'reviews': request.reviewsDB,
			'currentpage': currentpage
		});
	});

	// ==== About =================================================================================
	app.get('/about', function(request, response){
		var currentpage = request.hostname + request.originalUrl;
		response.render('about', {
			'hero_title': '<span class="hero-title-highlight">About</span> BugCleaners',
			'hero_subtitle': 'Discover and get to know BugCleaners and the team behind it.',
			'pagetitle': 'About Us',
			'reviews': request.reviewsDB,
			'currentpage': currentpage
		});
	});

	// ==== Contact =================================================================================
	app.get('/contact', function(request, response){
		var currentpage = request.hostname + request.originalUrl;
		response.render('contact', {
			'hero_title': '<span class="hero-title-highlight">Contact</span> BugCleaners',
			'hero_subtitle': '24/7 emergency call support &amp; same/next-day extermination services.',
			'pagetitle': 'Contact Us',
			'currentpage': currentpage
		});
	});

	// ==== Resources =================================================================================
	app.get('(/resources|/faqs)', function(request, response){
		var currentpage = request.hostname + request.originalUrl;
		Faqs.find({}, function(error, faqs){
			FaqCategories.find({}, function(error, faqcategories){
				response.render('resources', {
					'hero_title': '<span class="hero-title-highlight">FAQs</span> &amp; Resources',
					'hero_subtitle': 'Get answers to the most common questions about pest control/extermination.',
					'pagetitle': 'FAQs & Resources',
					'faqs': faqs,
					'faqcategories': faqcategories,
					'currentpage': currentpage
				});
			});
		});
	});


	// ==== All DB pages =================================================================================
	var routePlainPage = function($slug) {
		
		app.get('/'+$slug, function(request, response){
			var currentpage = request.hostname + request.originalUrl;
			
			Pages.findOne({'slug': $slug}, function(error, page){
				response.render('plain', {
					'hero_title': page.hero_title,
					'hero_subtitle': page.hero_subtitle,
					'content': page.content,
					'pagetitle': page.hero_title,
					'currentpage': currentpage
				});
			});
		});
	};
	routePlainPage('terms');
	routePlainPage('privacy');








	// ==== Services Page =================================================================================
	app.get('/services', function(request, response){
		var currentpage = request.hostname + request.originalUrl;

		response.render('services', {
			'hero_title': 'Our <span class="hero-title-highlight">Pest</span> Services',
			'hero_subtitle': 'Whether you see silverfish or roaches in the kitchen, bed bugs in the bedroom or mice or rats in your restaurant, factory or other facility, pest control is a must! We first identify the problem and then utilize the most effective eradication methods available to ensure your complete satisfaction.',
			'pagetitle': 'Services',
			'currentpage': currentpage,
			'isMainServicesPage': true
		});
	});

	// ==== Services (Individual) Page =================================================================================
	app.get('/services/:service', function(request, response){
		var isResidential = request.params.service === 'residential',
			isCommercial = request.params.service === 'commercial',
			currentpage = request.hostname + request.originalUrl;
	
		if (isResidential) {
			Reviews.findOne({'name': 'Tyler Evans'}, function(error, review){
				response.render('services', {
					'hero_title': '<span class="hero-title-highlight">Residential</span> Services',
					'hero_subtitle': 'Safe, Reliable, Discrete, and Family/Pet-Friendly Services for Any Home!',
					'body_class': 'residential',
					'pagetitle': 'Residential Services',
					'review': review,
					'currentpage': currentpage
				});
			});
		}

		if (isCommercial) {
			Reviews.findOne({'name': 'Alice Howard'}, function(error, review){
				response.render('services', {
					'hero_title': '<span class="hero-title-highlight">Commercial</span> Services',
					'hero_subtitle': 'Licensed & Insured Commercial Pest Services for All Facility Types in a Clean, Easy, and Professional Manner.',
					'body_class': 'commercial',
					'pagetitle': 'Commercial Services',
					'review': review,
					'currentpage': currentpage
				});
			});
		}
	});








	// ==== Pests Page =================================================================================
	app.get('/pests', function(request, response){
		var currentpage = request.hostname + request.originalUrl;

		Pests.find({}, function(error, pests){			
			response.render('pests', {
				'hero_title': '<span class="hero-title-highlight">Pest</span> Knowledge Base',
				'hero_subtitle': 'No matter what type of infestation your home or business may have, BugCleaners offers the very best in pest control services!',
				'pagetitle': 'Pests',
				'pests': pests,
				'currentpage': currentpage
			});
		});
	});

	// ==== Pest (Single) Page =================================================================================
	app.get('/pests/:pest', function(request, response){
		var isOthersPage = request.params.pest === 'others' || request.params.pest === 'mosquitoes',
			currentpage = request.hostname + request.originalUrl;
		
		if (!isOthersPage) {
			Pests.findOne({'slug': request.params.pest}, function(error, pestData){
				if (pestData) {
					response.render('pests-single', {
						'hero_title': '<span class="hero-title-highlight">'+pestData.name+'</span> - Pest Knowledge Base',
						'hero_subtitle': pestData.subtitle,
						'body_class': pestData.slug,
						'pagetitle': pestData.name,
						'intro': pestData.intro,
						'facts': pestData.facts,
						'signs': pestData.signs,
						'prevention': pestData.prevention,
						'extra': pestData.extra,
						'currentpage': currentpage
					});
				} else {
					response.status(404).render('404');
				}
			});

		} else { // If is 'others' page
			Pests.findOne({'slug': 'others'}, function(error, pestData){
				response.render('pests-single', {
					'hero_title': '<span class="hero-title-highlight">Other Pests</span> - Pest Knowledge Base',
					'hero_subtitle': 'While bed bugs, termites, cockroaches, rodents and ants are the more common infestation culprits, there are a variety of other animals that can infest your home or business.',
					'body_class': 'pests_other',
					'pagetitle': 'Other Pests',
					'others': pestData.data,
					'prevention': pestData.prevention,
					'signs': pestData.signs,
					'currentpage': currentpage
				});
			});
		}

	});


/* ========================================================================== */

































/* ==========================================================================
   Ajax requerst handling
   ========================================================================== */

app.post('/ajax', function(request, response){
	// response.send(request);
	var params = request.body,
		action = params.action;
	
	if (!action) {response.send('No Action Specified!'); response.end();}

	if (action === 'cta_form') {
		var ajaxResponse = {};
		ajaxResponse.success = true;
		ajaxResponse.message = 'Thank you for your request! Our team is working on your quote request and will contact you with a quote shortly.';
		response.json(ajaxResponse);
		
		Submissions.insert({
			'firstname': params.firstname,
			'lastname': params.lastname,
			'email': params.email,
			'phone': params.phone,
			'pest_type': params.pest_type,
			'time_of_problem': params.time_of_problem,
			'job_type': params.home_or_business,
			'problem_description': params.problem_description
		});
		sendEmail('Daniel', 'd@danielkalen.com', '[BugCleaners] New Quote Request', 'Test Email');
	}
});





































// 404 Handling
app.use(function(req, res, next) {
  res.status(404).render('404');
});




server = app.listen(7889, function(){
	var host = server.address().address,
		port = server.address().port;
	console.log('BugCleaners Server running on http://%s:%s', host, port);
});
server.on('error', function(message){console.log(message);}); // Log errors