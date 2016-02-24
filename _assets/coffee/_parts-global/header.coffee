do ()-> # Mobile nav display logic
	$mobileNav = $$('.header-mobile_nav')
	$mobileNavItems = $$('.header-mobile_nav-list-item')
	$mobileNavTrigger = $$('.header-mobile_nav-trigger')
	HEADERHEIGHT = 98
	SAFETYMARGIN = 20
	
 
	setMobileNavHeight = ()->
		$mobileNav[0].style.height = ((window.innerHeight - HEADERHEIGHT) + SAFETYMARGIN)+'px'

	revealItems = ()->
		iteration = 1
		$mobileNavItems.each ()->
			setTimeout ()=>
				$(@).addClass('reveal')
			, 150 * iteration++



	$mobileNavTrigger.on 'click', ()->
		open = $mobileNavTrigger.data('open')

		if open
			$mobileNav[0].style = ''
			$mobileNavTrigger.add($mobileNav).removeClass('active rotate')
			setTimeout ()->
				$mobileNavItems.removeClass('reveal')
			, 350
		else
			setMobileNavHeight()
			$mobileNavTrigger.add($mobileNav).addClass('active')
			revealItems()
			setTimeout ()->
				$mobileNavTrigger.addClass('rotate')
			, 250

		$mobileNavTrigger.data 'open', !open




	$$(window).on 'resize', ()->
		if $mobileNav.hasClass('active')
			setMobileNavHeight()
		








do ()-> # Get Quote button click
	$$('.header-nav-item.button, .hero-button').on 'click', (event)->
		if $$('.cta_with_faqs').length
			event.preventDefault()
			$$('html, body').animate { scrollTop: $$('.cta_with_faqs').offset().top + 60 }, 500
