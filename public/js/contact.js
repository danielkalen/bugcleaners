(function($){
	var windowHeight = window.innerHeight,
		pageHeight = document.getElementById('page').offsetHeight,
		headerHeight = $('header')[0].offsetHeight,
		heroHeight = $('.hero')[0].offsetHeight,
		footerHeight = $('footer')[0].offsetHeight,
		allHeight = headerHeight + heroHeight + footerHeight;

	if (pageHeight < windowHeight) {
		$$('.contact_options').css('min-height', windowHeight - allHeight);
	}

	$$('.contact_options-list-item').on('click', function(){
		var $this = $(this),
			$siblings = $this.siblings();
		
		$this.addClass('selected');
		$siblings.removeClass('selected');
	});
})(jQuery);