do ($=jQuery)->
	if $$('#exitIntent').length
		type = $$('#exitIntent').data('type')


		window.exitIntent = new ExitIntent $$('#exitIntent'), "exit-intent-#{type}",
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

		



		exitIntent.el.on 'form_filled', util.debounce(()->
			$activeStep = exitIntent.form.step.current
			hasButton = $activeStep.find('.next, .button, .submit').length != 0
			
			return if !$activeStep.hasClass('step_filled')
			
			setTimeout ()->
				exitIntent.form.Next() unless hasButton
			, 150

		, 120)








		$form = exitIntent.el.find('form')
		
		$form.on 'submitted', ()->
			currentVariation = $form.children('input[name="currentVariation"]').val()
			ga?('send', 'event', 'Form', 'submitted', 'variation', currentVariation)
			ga?('send', 'event', 'Form', 'submitted', 'form-type', 'Exit Intent (Tool)')