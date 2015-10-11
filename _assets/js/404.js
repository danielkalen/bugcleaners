(function($){
	var windowHeight = window.innerHeight,
		pageHeight = document.getElementById('page').offsetHeight,
		headerHeight = $('header')[0].offsetHeight,
		ctaHeight = $('.inline_cta')[0].offsetHeight,
		footerHeight = $('footer')[0].offsetHeight,
		allHeight = headerHeight + ctaHeight + footerHeight;

	if (pageHeight < windowHeight) {
		$$('.error_404').css('min-height', windowHeight - allHeight);
	}
})(jQuery);