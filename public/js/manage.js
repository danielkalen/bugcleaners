(function($){
	// ==== Ensure min page height =================================================================================
	var windowHeight = window.innerHeight,
		pageHeight = document.getElementById('page').offsetHeight,
		headerHeight = $('header')[0].offsetHeight,
		footerHeight = $('footer')[0].offsetHeight,
		allHeight = headerHeight + footerHeight;

	if (pageHeight < windowHeight) {
		$$('.page_innerwrap').css('min-height', windowHeight - allHeight);
	}


	// ==== Login button acts as submit =================================================================================
	$$('.manage_login-form-button').on('click', function(){
		$$('.manage_login-form').submit();
	});



	/* ==========================================================================
	   Item opening mechanism
	   ========================================================================== */
	$$('.manage-content-list-item').each(function(){
		$(this).addClass('closed')
			 .data('closed', true);
	});	

	$$('.manage-content-list').on('click', '.manage-content-list-item-toggle, .manage-content-list-item-title', function(){
		var $this = jQuery(this).parent(),
			$content = $this.children('.manage-content-list-item-content'),
			closed = $this.data('closed');
		
		if (closed) {
			$this.removeClass('closed')
				 .addClass('show')
				 .data('closed', true);
		} else {
			$this.addClass('closed')
				 .removeClass('show');
		}
		$content.slideToggle(300);

		$this.data('closed', !closed);
		setTimeout(function(){
			setMinMax(true);
		}, 700);
	});



	/* ==========================================================================
	   Item sublists adding/destroying
	   ========================================================================== */
	$$('.manage-content-list').on('click', '.manage-content-list-item .add_item', function(){
		var $this = $(this),
			$sampleItem = $this.prev(),
			$clonedItem = $sampleItem.clone();
		$this
			.before($clonedItem)
			.prev().find('.input').val('');
	});

	$$('.manage-content-list').on('click', '.manage-content-list-item .remove_item', function(){
		var $this = $(this),
			$container = $this.parent(),
			$prev = $container.prev(),
			isNotLast = $prev.hasClass('contained_field');

		function removeField(){
			if (isNotLast) {
				$container.remove();
			} else {
				$this.next().val('');
			}
		}

		if ($this.next().val() !== '') {
			if (confirm('Are you sure you want to delete this?')){
				removeField();
			}
		} else {
			removeField();
		}
	});



	/* ==========================================================================
	   Item content HTML Markup conversion
	   ========================================================================== */
	var toPlain = function(string){
			var output = string;
			output = output.replace(/<h4 class="body_text-title">([^<^>]*)<\/h4>/g, function(entire, text){ // Titles
				return '\n*'+text+'*\n';
			});
			output = output.replace(/<p class="body_text-p">([^<^>]*)<\/p>/g, function(entire, text){ // Paragraphs
				return '\n'+text+'\n';
			});
			output = output.replace(/^\n/, ''); // First linebreak
			output = output.replace(/\n$/, ''); // Last linebreak

			return output;
		},
		toHtml = function(string){
			var output = string;
			output = output.replace(/^/, '\n'); // First linebreak
			output = output.replace(/$/, '\n'); // Last linebreak
			output = output.replace(/\n\*([^\n*]*)\*\n/g, function(entire, text){ // Titles
				return '<h4 class="body_text-title">'+text+'</h4>';
			});
			output = output.replace(/\n([^\n*]*)\n/g, function(entire, text){ // Paragraphs
				return '<p class="body_text-p">'+text+'</p>';
			});

			return output;
		};


	$$('.textarea[name="content"]').each(function(){
		var $this = jQuery(this),
			content = $this.val();
		$this.val( toPlain(content) );
	});	



	/* ==========================================================================
	   Add item button
	   ========================================================================== */
	$$('.manage-content-list').on('click', '.add', function(){
		var $button = $(this),
			itemType = $button.children()[0].textContent.replace('Add ', ''),
			$sampleItem = $button.prev(),
			$clonedItem = $sampleItem.clone();

		// Reset All Fields
		$clonedItem.addClass('closed').data('closed', true).attr('id', '');
		$clonedItem.find('.manage-content-list-item-title').html('New '+itemType);
		$clonedItem.find('.manage-content-list-item-content-field-container').each(function(){
			$(this).find('.contained_field').slice(1).remove();
		});
		$clonedItem.find('.editable').val('');

		$button.before($clonedItem);
	});
	
	


	
	
	
	







	/* ==========================================================================
	   Sidebar - Fixed with scroll
	   ========================================================================== */
	var sidebarMinMax,
		setMinMax = function(afterInitLoad){
			var padding = afterInitLoad ? -60 : -30;
			sidebarMinMax = {	min: $$('.header')[0].offsetHeight + 40,
								max: $$('body')[0].offsetHeight - $$('.footer')[0].offsetHeight - $$('sidebar')[0].offsetHeight + padding };
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
	$$('.manage-sidebar-list-item').first().addClass('active');
	$$('.manage-sidebar-list-item').on('click', function(){
		var $this = $(this),
			name = $this.data('name'),
			$assocList = $$('#'+name);
		
		$this
			.addClass('active')
			.siblings().removeClass('active');
		$assocList
			.addClass('show')
			.siblings().removeClass('show');
	});

	var sectionOffsets = [],
		sectionIDs = [],
		updateSectionOffsets = function(){
			var length = $$('.manage-faqs-list').length,
				index = 0;
			$$('.manage-faqs-list').each(function(){
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





})(jQuery); 