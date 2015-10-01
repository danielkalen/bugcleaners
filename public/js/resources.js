(function($){
	// var setFaqHeight = function(){
	// 	$$('.resources-faqs-list-item').each(function(){
	// 		var $this = jQuery(this),
	// 			contentHeight = $this.find('.resources-faqs-list-item-content').height() + 50;
			
	// 		$this.css('height', contentHeight);
	// 	});	
	// };

	// $window.on('resize', util.debounce(setFaqHeight, 250));

	$$('.resources-faqs-list-item').each(function(){
		var $this = jQuery(this);
		$this
					// .css('height', $this.height())
					.addClass('closed');

		$this.data('closed', true);
	});	

	$$('.resources-faqs-list-item').on('click', function(){
		var $this = jQuery(this),
			$answer = $this.children('.resources-faqs-list-item-answer'),
			closed = $this.data('closed');
		
		if (closed) {
			$this.removeClass('closed')
				 .addClass('show')
				 .data('closed', true);
		} else {
			$this.addClass('closed')
				 .removeClass('show');
		}
		$answer.slideToggle(300);

		$this.data('closed', !closed);
	});










	$$('.resources-sidebar-list-item').first().addClass('active');
})(jQuery);