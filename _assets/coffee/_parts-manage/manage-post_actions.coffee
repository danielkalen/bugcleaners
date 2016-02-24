if isPostManagement
	### ==========================================================================
		 Add Post
		========================================================================== ###
	$$('.manage-content').on 'click', '.manage-content-list-add.add', ()->
		postType = $(this).parents('form').first().data('item')
		postType.addPost()
		

	### ==========================================================================
		 Clone post
		========================================================================== ###
	$$('.manage-content').on 'click', '.manage-content-list-item-content-button.clone', ()->
		post = $(this).parents('.manage-content-list-item').first().data('item')
		post.clone()


	### ==========================================================================
		 Disable post
		========================================================================== ###
	$$('.manage-content').on 'click', '.post_action.disable', ()->
		post = $(this).parents('.manage-content-list-item').first().data('item')
		post.disable()



	### ==========================================================================
		 Delete post
		========================================================================== ###
	$$('.manage-content').on 'click', '.manage-content-list-item-content-button.delete', ()->
		post = $(this).parents('.manage-content-list-item').first().data('item')
		post.delete()



	### ==========================================================================
		 Save post
		========================================================================== ###
	$$('.manage-content').on 'click', '.manage-content-list .save', ()->
		post = $(this).parents('.manage-content-list-item').first().data('item')
		post.save()


