do ($=jQuery)->
	
	formOptions = 
		validateOnTyping: true
		preserveValuesAfterRefresh: false
	
		customTransition: ($sectionToReveal, formInstance)->
			formInstance.enableFields $sectionToReveal
			formInstance.disableFields $sectionToReveal.siblings('.step')
			$sectionToReveal.addClass('show').siblings('.show').removeClass('show').addClass 'hide'
	
			setTimeout ()->
				$sectionToReveal.find('input[type="text"], input[type="email"], input[type="tel"]').first().focus()
			, 275
	

		callbackOnPrepare: (formInstance)->
			formInstance.form.find('.step').each ()->
				$step = jQuery(this)
				$step.addClass('show').removeClass 'show hide'

			formInstance.form.find('.step').first().addClass 'show'




	applyAutoProceedLogicForToolForms = (form, formInstance)->
		form.on 'form_filled', util.debounce(()->
			$activeStep = formInstance.step.current
			hasButton = $activeStep.find('.next, .button, .submit').length != 0
			
			return if !$activeStep.hasClass('step_filled')
			
			setTimeout ()->
				formInstance.Next() unless hasButton
			, 150

		, 120)






	if $('.form_tool-form').length
		$('.form_tool-form').each ()->
			new Form $(@), formOptions
			formInstance = $(@).data('Form')
			getQuoteBlock = formInstance.form
			
			applyAutoProceedLogicForToolForms getQuoteBlock, formInstance
