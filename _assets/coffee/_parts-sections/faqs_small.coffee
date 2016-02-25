if $('.faqs_small').length
	do ($=jQuery)->
		
		setFaqHeight = ()->
			$$('.faqs_small-list-item').each ()->
				$this = $(this)
				contentHeight = $this.find('.faqs_small-list-item-content').height() + 50
				$this.css 'height', contentHeight

		$window.on 'resize', util.debounce(setFaqHeight, 250)
		
		
		setTimeout ()->
			$$('.faqs_small-list-item').each ()->
				$this = $(this)
				$this.css('height', $this.height()).addClass 'closed'
				$this.data 'closed', true
		, 50


	
		$$('.faqs_small-list-item').on 'click', ()->
			$this = $(this)
			closed = $this.data('closed')

			if closed
				$this.removeClass('closed').siblings().addClass('closed').removeClass('show').data 'closed', true
				setTimeout ()->
					$this.addClass 'show'
				, 100

			else $this.addClass('closed').removeClass 'show'

			$this.data 'closed', !closed
