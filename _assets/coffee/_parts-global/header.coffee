do ()-> # Mobile nav display logic
	$mobileNav = $$('.mobile-nav')
	$mobileNavClose = $$('.mobile-nav-close')
	$mobileNavOverlay = $$('.mobile-nav-overlay')
	


	$mobileNav.on 'click', ()->
		clicked = $mobileNav.data('clicked')
		task = if not clicked then 'add' else 'remove'

		$mobileNavOverlay["#{task}Class"] 'show'
		$mobileNav.data 'clicked', !clicked
 


	$mobileNavClose.on 'click', (event)->
		event.stopPropagation()
		clicked = $mobileNav.data('clicked')
		
		$mobileNavOverlay.removeClass 'show'
		$mobileNav.data 'clicked', !clicked






do ()-> # Get Quote button click
	$$('.header-nav-item.button, .hero-button').on 'click', (event)->
		if $$('.cta_with_faqs').length
			event.preventDefault()
			$$('html, body').animate { scrollTop: $$('.cta_with_faqs').offset().top + 60 }, 500
