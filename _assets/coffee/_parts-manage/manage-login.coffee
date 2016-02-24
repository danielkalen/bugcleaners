# ==== Login button acts as submit =================================================================================
initForm $$('.manage_login-form')

$$('.manage_login-form').off()
$$('.manage_login-form-button').on 'click', ->
	$$('.manage_login-form').submit()
	return
