# ==== Init forms =================================================================================
$$('form').each ()-> 
	$form = $(this)

	if $form.hasClass('form_boxed')
		new Form $form, {'dontDisableFields':true}
	else
		new Form $form

	if $form.hasClass('livechat-login-form')
		$form.data('Form').disable()
