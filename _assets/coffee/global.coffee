# @import '_plugins/jquery.js'
# @import '_plugins/jquery-cache.js'
# @import '_plugins/fastclick.js'
# @import '_plugins/css_browser_selectors.js'
# @import '_parts-global/_helpers.js'
# @import '_parts-global/_polyfills.js'
# @import '_parts-global/fonts_dynamic_loading.js'


domReadyInterval = setInterval ()->
	if document.readyState == 'complete'
		clearInterval domReadyInterval
		document.documentElement.className += ' fonts-loaded'
, 60

$window = $$(window)
isMobileWidth = window.innerWidth <= 736
isMobile = $$('html').hasClass('mobile')



# @import '_parts-global/form-engine.js'
# @import '_parts-global/init_forms.coffee'
# @import '_parts-global/header.coffee'
# @import '_parts-global/animate-tap.coffee'
# @import '_parts-sections/benefit_points.coffee'
# @import '_parts-sections/contact_options.coffee'
# @import '_parts-sections/cta_divider.coffee'
# @import '_parts-sections/cta_form.coffee'
# @import '_parts-sections/faqs.coffee'
# @import '_parts-sections/faqs_small.coffee'
# @import '_parts-sections/pests.coffee'
# @import '_parts-sections/pests_treated.coffee'
# @import '_parts-sections/reviews.coffee'
# @import '_parts-sections/services.coffee'

# @import '_parts-global/ensure-min_height.coffee'
