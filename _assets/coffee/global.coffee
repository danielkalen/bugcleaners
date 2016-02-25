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



# @import '_parts-global/header.coffee'
# @import '_parts-global/animate-tap.coffee'
# @import '_parts-global/ensure-min_height.coffee'
