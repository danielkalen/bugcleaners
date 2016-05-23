do ($=jQuery)->
	$('.form_boxed').each ()->
		$form = $(@)
		isNotStepped = $form.hasClass('standard')
	
		if isNotStepped
			new Form $form, {'dontDisableFields':true, 'singleStep':true}
		else
			new Form $form


		$form.on 'submitted', ()->
			currentVariation = $form.children('input[name="currentVariation"]').val()
			ga?('send', 'event', 'Form', 'submitted', 'variation', currentVariation)
			ga?('send', 'event', 'Form', 'submitted', 'form-type', 'Boxed '+(if isNotStepped then 'all-in-one' else 'stepped'))