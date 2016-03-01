# ==== Init forms =================================================================================
$$('form').each ()-> 
	$form = $(this)
	return if $form.data('Field')
	
	if $form.hasClass('form_boxed') and $form.hasClass('standard')
		new Form $form, {'dontDisableFields':true}
	else
		new Form $form

	if $form.hasClass('livechat-login-form')
		$form.data('Form').disable()
