do ($=jQuery)->
	if $('.faqs').length
		### ==========================================================================
			 FAQ opening mechanism
			========================================================================== ###
		s = 
			'list': '.faqs-content-list'
			'listItem': '.faqs-content-list-item'
			'sidebarItem': '.faqs-sidebar-list-item'

		$$(s.listItem).each ()-> $(@).addClass('closed').data 'closed', true

		$$(s.listItem).on 'click', ()->
			$listItem = $(@)
			$answer = $listItem.children("#{s.listItem}-answer")
			closed = $listItem.data('closed')
			if closed
				$listItem.removeClass('closed').addClass('show').data 'closed', true
				$answer.slideDown 300

			else
				$listItem.addClass('closed').removeClass 'show'
				$answer.slideUp 300


			$listItem.data 'closed', !closed

			setTimeout ()->
				setMinMax true
			, 700

		### ==========================================================================
			 Sidebar - Fixed with scroll
			========================================================================== ###

		sidebarMinMax = undefined

		setMinMax = (afterInitLoad)->
			padding = if afterInitLoad then -60 else -30
			sidebarMinMax =
				min: $$('.header')[0].offsetHeight + $$('.hero')[0].offsetHeight + 40
				max: $$('body')[0].offsetHeight - ($$('.footer')[0].offsetHeight + $$('.cta_divider')[0].offsetHeight) - ($$('.sidebar')[0].offsetHeight) + padding
			return

		setSidebarPosition = ()->
			if !isMobileWidth
				pageScroll = window.pageYOffset
				passedMin = pageScroll >= sidebarMinMax.min
				passedMax = pageScroll >= sidebarMinMax.max
				maxWidth = $$('.sidebar').parent()[0].offsetWidth - 1
				if passedMin and !passedMax
					$$('.sidebar').addClass('fixed').css
						'max-width': maxWidth
						'top': '10px'
				else
					if !passedMin
						$$('.sidebar').removeClass 'fixed'
					if passedMax
						overflowAmount = (window.pageYOffset - (sidebarMinMax.max + 10)) * -1
						$$('.sidebar').css 'top', overflowAmount
			return

		$window.on 'scroll', setSidebarPosition
		setMinMax()

		## ==========================================================================
		## Anchor link highlight on scroll
		## ========================================================================== 
		$$(s.sidebarItem).first().addClass 'active'
		$$(s.sidebarItem).on 'click', ()->
			name = $(@).data('name')
			assocListTop = $$('#'+name).offset().top
			$$('html, body').animate { scrollTop: assocListTop - 40 }, 500
	

		sectionOffsets = []
		sectionIDs = []
		updateSectionOffsets = ()->
			length = $$(s.list).length
			index = 0
			$$(s.list).each ()->
				$this = jQuery(this)
				id = $this.attr('id')
				listOffset = $this[0].offsetTop - 40
				# sectionOffsets[ listOffset ] = id;
				index++
				if sectionOffsets.length < length
					sectionOffsets.push listOffset
					sectionIDs.push id
				else
					sectionOffsets[index] = listOffset
					sectionIDs[index] = id

			sectionOffsets[0] = 0


		updateSectionOffsets()
		
		$window.on 'resize', util.debounce ()->
			updateSectionOffsets()
			setMinMax()
		, 250

		$window.on 'scroll', ()->
			matchedHeight = false
			index = 0
			while !matchedHeight and index < sectionIDs.length
				if window.pageYOffset >= sectionOffsets[index] # Check if scrolled past this section's offset.
				
					if window.pageYOffset < sectionOffsets[index + 1] # Check if scrolled past the next section's offset.
						matchedHeight = true
						matchedID = sectionIDs[index]
						$$(".#{matchedID}").addClass('active').siblings().removeClass 'active'
				index++

