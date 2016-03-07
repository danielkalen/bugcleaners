# ==== Ensure min page height =================================================================================
do ($=jQuery)->
	ensureFullHeight = ()->
		windowHeight = window.innerHeight
		pageHeight = document.getElementById('page').offsetHeight
		$header = $$('header')
		$footer = $$('footer')
		$hero = $$('.hero')
		$ctaDivider = $$('.cta_divider')
		headerHeight = if $header.length then $header[0].offsetHeight else 0
		footerHeight = if $footer.length then $footer[0].offsetHeight else 0
		heroHeight = if $hero.length then $hero[0].offsetHeight else 0
		ctaDividerHeight = if $ctaDivider.length then $ctaDivider[0].offsetHeight else 0
		
		combinedHeight = headerHeight + footerHeight + heroHeight + ctaDividerHeight

		
		# if pageHeight < windowHeight
		$$('.page_innerwrap, .page').css 'min-height', windowHeight - combinedHeight


	$$(document).ready ensureFullHeight
	$$(window).on 'resize', util.debounce ensureFullHeight,200