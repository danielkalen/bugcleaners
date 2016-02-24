(function($){

	// ==== Censored image conditional show =================================================================================
	$('.pest_image, .pest_others-item-image').on('click', function(){
		var $this = $(this),
			clicked = $this.data('clicked');

		!clicked ? $this.addClass('removeblur') :
				   $this.removeClass('removeblur');

		$this.data('clicked', !clicked);
	});


	// ==== List clearfix append =================================================================================
	$('.pest_info-list-item:nth-child(2n)').each(function(){
		$(this).after('<div class="clearfix"></div>');		
	});	

})(jQuery);