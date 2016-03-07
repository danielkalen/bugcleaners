do ()-> # Mobile nav display logic
	$mobileNav = $$('.header-mobile_nav')
	$mobileNavItems = $$('.header-mobile_nav-list-item')
	$mobileNavTrigger = $$('.header-mobile_nav-trigger')
	HEADERHEIGHT = 98
	SAFETYMARGIN = 20
	
 
	setMobileNavHeight = ()->
		$mobileNav[0].style.height = ((window.innerHeight - HEADERHEIGHT) + SAFETYMARGIN)+'px'

	lockPage = ()->
		if window.pageYOffset > 0
			$$('html, body').animate({scrollTop: 0}, 250)
		$$('body')[0].style.overflow = 'hidden'
	
	unlockPage = ()-> 
		$$('body')[0].style.overflow = ''

	revealItems = ()->
		iteration = 1
		$mobileNavItems.each ()->
			setTimeout ()=>
				$(@).addClass('reveal')
			, 150 * iteration++



	$mobileNavTrigger.on 'click', ()->
		open = $mobileNavTrigger.data('open')

		if open
			unlockPage()
			$mobileNav[0].style.height = ''
			$mobileNavTrigger.add($mobileNav).removeClass('active rotate')
			setTimeout ()->
				$mobileNavItems.removeClass('reveal')
			, 350
		else
			lockPage()
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
