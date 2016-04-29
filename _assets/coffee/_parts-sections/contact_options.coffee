do ($=jQuery)->
	if $('.contact_options').length
		## ==========================================================================
		## Tab Functionality
		## ========================================================================== 
		$contentBox = $$('.contact_options-content')
		$contentBox.data 'inited', false

		TabItem = (el)->
			$this = $(el)
			@tab = $(el)
			@name = @tab.data('name')
			@content = $$(".contact_options-content-item.#{@name}")
			@contentHeight = util.getHiddenElementHeight(@content[0], '620px')

			@content.find('form').each ()->
				new Form $(@)

			@reveal = ()->
				initiated = $contentBox.data('inited')
				@content.addClass 'active' if !initiated
				@contentHeight = util.getHiddenElementHeight(@content[0], '620px')
				
				# Update Height Variable
				scrollTo @content

				isMobile = window.innerWidth > 736
				expandedWidth = if window.innerWidth > 660 then 620 else window.innerWidth - 40
				expandedHeight = @contentHeight
				initedAsMobile = true if expandedWidth < 620
				
				if !initiated
					$contentBox
						.velocity('stop')
						.velocity({'width':expandedWidth},
							duration: 650
							easing: 'easeInOutCirc')
						.velocity({'height':expandedHeight},
							duration: 650
							easing: 'easeInOutCirc').data 'inited', true
				
				else
					$contentBox
						.velocity('stop')
						.velocity {'height':0},
							duration: 450
							easing: 'easeInOutCirc'
							complete: ()=>
								$contentBox.find('.active').removeClass 'active'
								@content.addClass 'active'

						.velocity {'height':expandedHeight},
							duration: 650
							easing: 'easeInOutCirc'


			@resize = ()->
				active = @content.hasClass('active')
				@contentHeight = util.getHiddenElementHeight(@content[0])

				if active
					expandedHeight = @contentHeight
					if initedAsMobile
						expandedWidth = if window.innerWidth > 660 then 620 else window.innerWidth - 40
						animatedDimensions =
							'height': expandedHeight
							'width': expandedWidth
						
						initedAsMobile = false if expandedWidth >= 620
					
					else
						animatedDimensions = height: expandedHeight
			
					$contentBox
						.velocity('stop')
						.velocity animatedDimensions,
							duration: 650
							easing: 'easeInOutCirc'




			# ==== Event Attachment =================================================================================
			@tab.on 'click', ()=>
				$this = $(this)
				$siblings = @tab.siblings()
				@tab
					.addClass('selected')
					.siblings()
						.removeClass('selected')
				@reveal()
		

			$$(window).on 'resize', util.debounce ()=>
				@resize()
			, 250






		# ==== ScrollTo Helper Function =================================================================================
		scrollTo = (section)->
			dimensions = section.offset()
			if window.pageYOffset > dimensions.top
				$$('html, body').animate { scrollTop: dimensions.top - 70 }, 300







		# ==== Init tabs =================================================================================
		$$('.contact_options-tabs-item').each ()-> new TabItem(@)

