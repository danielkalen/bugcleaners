if isPageManagement
	### ==========================================================================
		 Clone variation
		========================================================================== ###
	$$('.manage-content').on 'click', '.manage-content-list-item-content-button.clone', ()->
		variation = $(this).parents('.manage-content-list-item').first().data('item')
		variation.clone()


	### ==========================================================================
		 Disable variation
		========================================================================== ###
	$$('.manage-content').on 'click', '.variation_action.disable', ()->
		variation = $(this).parents('.manage-content-list-item').first().data('item')
		variation.disable()



	### ==========================================================================
		 Delete variation
		========================================================================== ###
	$$('.manage-content').on 'click', '.manage-content-list-item-content-button.delete', ()->
		variation = $(this).parents('.manage-content-list-item').first().data('item')
		variation.delete()



	### ==========================================================================
		 Save variation
		========================================================================== ###
	$$('.manage-content').on 'click', '.manage-content-list .save', ()->
		variation = $(this).parents('.manage-content-list-item').first().data('item')
		variation.save()


