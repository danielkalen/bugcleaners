do ($=jQuery)->
	$('.form_boxed').each ()->
		$form = $(@)
	
		if $form.hasClass('standard')
			new Form $form, {'dontDisableFields':true}
		else
			new Form $form
