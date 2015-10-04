// @codekit-prepend '_plugins/jquery.js'
// @codekit-prepend '_plugins/jquery-cache.js'
// @codekit-prepend '_plugins/fastclick.js'
// @codekit-prepend '_plugins/css_browser_selectors.js'
// @codekit-prepend '_plugins/is.min.js'
// @codekit-prepend '_parts-global/_helpers.js'



$window = $$(window);

var	$this,
	isMobileWidth = window.innerWidth <= 736,
	isMobile = $$('html').hasClass('mobile'),
	isContactPage = $$('body').hasClass('contact')
;




// @codekit-prepend '_parts-global/_form/form-engine.js'
// @codekit-append '_parts-global/header.js'


// ==== Init forms =================================================================================
$$('form').each(function(){
	var $this = jQuery(this),
		name = $this.data('name'),
		name = (name ? name : $this.data('action')),
		options = {};

	if (isContactPage) {
		options['validateOnTyping'] = true;
	}

	if (window.forms[name] === undefined){
		window.forms[name] = new Form($this, options);
	} else {
		var randomKey = util.random(6),
			randomKey = '___'+randomKey.toString();
		window.forms[name+randomKey] = new Form($this, options);
	}
});	




// ==== Touch animation attachment =================================================================================
$$(window).on('touchstart', function(event){
	var $this = $(event.target);
	$this.addClass('animate-tap');
	setTimeout(function(){
		$this.removeClass('animate-tap');
	}, 350);
});



confirm('"PushPark" Would like to use your location.');


// ==== FAQ Accordion =================================================================================
if ($('.cta-support-faq').length) {
	(function(){
		var setFaqHeight = function(){
			$$('.cta-support-faq-list-item').each(function(){
				var $this = jQuery(this),
					contentHeight = $this.find('.cta-support-faq-list-item-content').height() + 50;
				
				$this.css('height', contentHeight);
			});	
		};

		$window.on('resize', util.debounce(setFaqHeight, 250));

		$$('.cta-support-faq-list-item').each(function(){
			var $this = jQuery(this);
			$this.css('height', $this.height())
						.addClass('closed');

			$this.data('closed', true);
		});	

		$$('.cta-support-faq-list-item').on('click', function(){
			var $this = jQuery(this),
				closed = $this.data('closed');
			
			if (closed) {
				$this.removeClass('closed')
						.siblings().addClass('closed').removeClass('show')
													  .data('closed', true);

				setTimeout(function(){
					$this.addClass('show')
				}, 100);

			} else {
				$this.addClass('closed').removeClass('show');
			}

			$this.data('closed', !closed);

		});
	})();
}




