(function($){

	/* ==========================================================================
	   FAQ opening mechanism
	   ========================================================================== */
	$$('.resources-faqs-list-item').each(function(){
		$(this).addClass('closed')
			 .data('closed', true);
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
		setTimeout(function(){
			setMinMax(true);
		}, 700);
	});






	/* ==========================================================================
	   Sidebar - Fixed with scroll
	   ========================================================================== */
	var sidebarMinMax,
		setMinMax = function(afterInitLoad){
			var padding = afterInitLoad ? -60 : -30;
			sidebarMinMax = {	min: $$('.header')[0].offsetHeight + $$('.hero')[0].offsetHeight + 40,
								max: $$('body')[0].offsetHeight - ($$('.footer')[0].offsetHeight + $$('.inline_cta')[0].offsetHeight) - $$('sidebar')[0].offsetHeight + padding };
		},
		setSidebarPosition = function(){
			if (!isMobileWidth) {
				var pageScroll = window.pageYOffset,
					passedMin = pageScroll >= sidebarMinMax.min,
					passedMax = pageScroll >= sidebarMinMax.max,
					maxWidth = $$('sidebar').parent()[0].offsetWidth - 1;

				if (passedMin && !passedMax) {
					$$('sidebar').addClass('fixed')
								 .css({'max-width': maxWidth, 'top': '10px'});
				} else {
					if (!passedMin) {
						$$('sidebar').removeClass('fixed');
					}
					if (passedMax) {
						var overflowAmount = (window.pageYOffset - (sidebarMinMax.max + 10)) * - 1;
						$$('sidebar').css('top', overflowAmount);
					}
				}
			}
		};
	$window.on('scroll', setSidebarPosition);
	setMinMax();



	/* ==========================================================================
	   Anchor link highlight on scroll
	   ========================================================================== */
	$$('.resources-sidebar-list-item').first().addClass('active');
	$$('.resources-sidebar-list-item').on('click', function(){
		var $this = $(this),
			name = $this.data('name'),
			assocList = $$('#'+name)[0].offsetTop;

		$$('html, body').animate({scrollTop: assocList - 40}, 500);
	});

	var sectionOffsets = [],
		sectionIDs = [],
		updateSectionOffsets = function(){
			var length = $$('.resources-faqs-list').length,
				index = 0;
			$$('.resources-faqs-list').each(function(){
				var $this = jQuery(this),
					id = $this.attr('id'),
					listOffset = $this[0].offsetTop - 40;
				
				// sectionOffsets[ listOffset ] = id;
				index++;
				if (sectionOffsets.length < length) {
					sectionOffsets.push(listOffset);
					sectionIDs.push(id);
				} else {
					sectionOffsets[index] = listOffset;
					sectionIDs[index] = id;
				}
			});	
			sectionOffsets[0] = 0;
		}; 
		updateSectionOffsets();

	$window.on('resize', util.debounce( function(){updateSectionOffsets(); setMinMax();}, 250 ));

	$window.on('scroll', function(){
		var matchedHeight = false,
			index = 0;
		
		while (!matchedHeight && index < sectionIDs.length) {
			if (window.pageYOffset >= sectionOffsets[index]) { // Check if scrolled past this section's offset.
				if (window.pageYOffset < sectionOffsets[index+1]) { // Check if scrolled past the next section's offset.
					matchedHeight = true;
					var matchedID = sectionIDs[index];
					$$('.'+matchedID).addClass('active')
									 .siblings()
									 	.removeClass('active');
				}
			}
			index++;
		}
	});








})(jQuery);










