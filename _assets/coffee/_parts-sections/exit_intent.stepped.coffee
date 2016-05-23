do ($=jQuery)->
	if $$('#exitIntent').length
		type = $$('#exitIntent').data('type')

		window.exitIntent = new ExitIntent $$('#exitIntent'), "exit-intent-#{type}"

		


		$form = exitIntent.el.find('form')
		
		$form.on 'submitted', ()->
			currentVariation = $form.children('input[name="currentVariation"]').val()
			ga?('send', 'event', 'Form', 'submitted', 'variation', currentVariation)
			ga?('send', 'event', 'Form', 'submitted', 'form-type', 'Exit Intent (Tool)')