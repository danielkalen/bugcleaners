// @codekit-prepend '_plugins/velocity.min.js'

(function($){

	/* ==========================================================================
	   Min Page Height
	   ========================================================================== */
	
		var windowHeight = window.innerHeight,
			pageHeight = document.getElementById('page').offsetHeight,
			headerHeight = $('header')[0].offsetHeight,
			heroHeight = $('.hero')[0].offsetHeight,
			footerHeight = $('footer')[0].offsetHeight,
			allHeight = headerHeight + heroHeight + footerHeight,
			initedAsMobile = false;

		if (pageHeight < windowHeight) {
			$$('.page_innerwrap').css('min-height', windowHeight - allHeight);
		}

		var setMinHeight = function(){
			var currentMin = $$('.page_innerwrap').css('min-height'),
				currentMin = parseInt(currentMin),
				current = $$('.page_innerwrap').height();

			if (current > currentMin) {
				$$('.page_innerwrap').css('min-height', current);
			}
		};







	/* ==========================================================================
	   Tab Functionality
	   ========================================================================== */
		var $contentBox = $$('.contact_content');
			$contentBox.data('inited', false);

		var TabItem = function(element){
			var $this = $(element),
				thisTab = this;
			this.element = $this;
			this.name = element.className.match(/contact_options-list-item (.*)/)[1];
			this.content = $$('.contact_content-item.'+this.name);
			this.contentHeight = util.getHiddenElementHeight( this.content[0], '620px' );



			this.reveal = function(){
				var initiated = $contentBox.data('inited');
				if ( !initiated ) {
					this.content.addClass('active');
				}
				this.contentHeight = util.getHiddenElementHeight( this.content[0], '620px' ); // Update Height Variable

				scrollDownIfNeeded();

				var isMobile = window.innerWidth > 736,
					expandedWidth = window.innerWidth > 660 ? 620 : (window.innerWidth - 40),
					expandedHeight = this.contentHeight;

					if (expandedWidth < 620) initedAsMobile = true;

				if ( !initiated ) {
					$contentBox.velocity('stop')
							   .velocity({width: expandedWidth}, {duration: 650, easing: "easeInOutCirc"})
							   .velocity({height: expandedHeight}, {duration: 650, easing: "easeInOutCirc"})
							   .data('inited', true);
				} else {
					$contentBox.velocity('stop')
							   .velocity({height: 0}, {duration: 450, easing: "easeInOutCirc", complete: function(){
									$contentBox.find('.active').removeClass('active');
									thisTab.content.addClass('active');
					}})
						.velocity({height: expandedHeight}, {duration: 650, easing: "easeInOutCirc"});
				}

				setTimeout(function(){ // Save new page's height as the min-height
					setMinHeight();
				}, 1300);
			};



			this.resize = function(){
				var active = this.content.hasClass('active'),
					expandedHeight, expandedWidth, animatedDimensions;

				this.contentHeight = util.getHiddenElementHeight( this.content[0] );
				
				if (active) {
					expandedHeight = this.contentHeight;
					if (initedAsMobile) {
						expandedWidth = window.innerWidth > 660 ? 620 : (window.innerWidth - 40);
						animatedDimensions = {height: expandedHeight, width: expandedWidth};
						if (expandedWidth >= 620) initedAsMobile = false;
					} else {
						animatedDimensions = {height: expandedHeight};
					}

					$contentBox.velocity('stop')
								.velocity(animatedDimensions, {duration: 650, easing: "easeInOutCirc"});
								
								setTimeout(function(){
									setMinHeight();
								}, 1300);
				}
			};



			// ==== Event Attachment =================================================================================
			$this.on('click', function(){
				var $this = $(this),
					$siblings = $this.siblings();
				
				$this.addClass('selected');
				$siblings.removeClass('selected');
				thisTab.reveal();
			});

			$$(window).on('resize', util.debounce(function(){
				thisTab.resize();
			}, 250));
		};




		// ==== Init tabs =================================================================================
		$$('.contact_options-list-item').each(function(){
			var tab = new TabItem(this);
		});	
		


		function scrollDownIfNeeded(){
			if ( window.pageYOffset > $contentBox.offset().top + 100 ) {
				$("html, body").animate({ scrollTop: ($contentBox.offset().top - 70) }, 350);
			}
		}
		
})(jQuery);