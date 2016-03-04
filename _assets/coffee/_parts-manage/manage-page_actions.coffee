if isPageManagement
	### ==========================================================================
		 Add Page
		========================================================================== ###
	$$('.manage-sidebar-outerwrap').on 'click', '.add', ()->
		sidebarItem = SIDEBAR.add()
		page = PAGES.add(sidebarItem)
		page.save(true)
		page.show()
		

	### ==========================================================================
		 Disable page
		========================================================================== ###
	$$('.manage-content').on 'click', '.disable_page', ()->
		$page = $(this).parents('form').first()
		$page.data('item').disable()
		


	### ==========================================================================
		 Delete page
		========================================================================== ###
	$$('.manage-content').on 'click', '.delete_page', ()->
		$page = $(this).parents('form').first()
		$page.data('item').remove()




	### ==========================================================================
		 Clone page
		========================================================================== ###
	$$('.manage-content').on 'click', '.clone_page', ()->
		$page = $(this).parents('form').first()
		$page.data('item').clone()





	### ==========================================================================
		 Enable Variation Rotation
		========================================================================== ###
	$('.manage-content').on 'click', '.rotation', ()->
		$toggle = $(this)
		$page = $toggle.parents('form').first()
		page = $page.data('item')
		isOn = page.rotation
		newState = if isOn then '' else 'on'

		DB.page.update
			'id': page.id
			'name': 'rotation'
			'value': !!newState,
			'cb': (res)->
				if not res.success
					if res.message and res.message.toLowerCase().includes('not authorized')
						subnotify 'error', 'It seems like you were logged out. Log back in order to apply these changes.'
					else
						serverMessage = if res?.message then "Here's what the server said: \"#{res.message}\"" else ''
						subnotify('error', "There was an error when trying to save this variation. #{serverMessage}")

		page.rotation = newState





	### ==========================================================================
		 Add variation
		========================================================================== ###
	$$('.manage-content').on 'click', '.manage-content-list-add.add', ()->
		page = $(this).parents('form').first().data('item')
		page.addVariation()