if isPostManagement
	POSTTYPES = 
		'list': $('.manage-content')
		'items': {}

		add: ($el)->
			newItem = new PostType($el.attr('id'), $el.find('.manage-content-list-title-text').html(), $el)
			@items[newItem.type] = newItem
			return newItem




	PostType = (type, name, el, sidebar)->
		initForm(el)
		@type = type
		@name = name
		@form = el.data('Form')
		@visible = false
		@el = el
		@elTitle = el.find('.manage-content-list-title-text').first()
		@button = el.find('.manage-content-list-add')
		@sidebar = sidebar || SIDEBAR.items.filter((item)=> item.slug is @type)[0]
		@posts = []

		SimplyBind('visible').of(@).to('class.visibility').of(@el)
			.transform (visible)-> if visible then 'show' else ''

		@el.data('item', @)
		@sidebar.assocItem = @
		@collectPosts()

		return @



	PostType::show = ()->
		@visible = true
		@el.siblings().each ()->
			$(@).data().item.hide()
			return

	PostType::hide = ()->
		@visible = false

	PostType::fetchValues = ()->
		postsData = @el.data('Form').fetchValues()

		removeEmptyFileFields = (obj)->
			if obj.constructor is Array
				obj.forEach (subObj, index)->
					obj[index] = removeEmptyFileFields(subObj)
			
			if obj.constructor is Object
				Object.keys(obj).forEach (key)->
					if key is 'image'
						if not obj[key]
							delete obj[key]
					else
						if obj[key]?.constructor is Object or obj[key]?.constructor is Array
							obj[key] = removeEmptyFileFields(obj[key])

			return obj

		postsData = removeEmptyFileFields(postsData)
		return postsData


	PostType::collectPosts = ()->
		posts = @el.find('.step')
		posts.each (i,el)=>
			@posts.push(new Post($(el), @))
		


	PostType::addPost = (postToClone)->
		$newItem = if postToClone then $(postToClone.el[0].cloneNode(true)) else $(fieldTemplates["post-#{@type}"])
		
		if postToClone
			$newItem
				.removeClass('closed')
				.data('closed', false)
				.data('new', true)
			postToClone.toggle()
		else
			$newItem
				.addClass('closed')
				.data('closed', true)
				.data('new', true)

		if not postToClone
			$newItem.children('h6').html('New Item')

		@button.before $newItem		

		newItem = new Post($newItem, @, true)
		@posts.push(newItem)
		if postToClone
			newItem.name = "#{postToClone.name} (copy)"
			newItem.slug = "#{postToClone.slug}-copy"
			$newItem.siblings('.show').trigger('click')


		@form.AddStep($newItem)



	PostType::removePost = (post)->
		return unless post
		@form.RemoveStep(post.el.index()-1)
		
		post.el.remove()
		@posts.splice(@posts.indexOf(post), 1)
		























	Post = ($el, postType)->
		@postType = postType
		@id = $el.attr('id')
		@slug = $el.data('slug')
		@single = $el.data('single')
		@name = $el.data('name') or "New #{@single}"
		@new = $el.data('new')
		@enabled = !$el.hasClass('disabled')
		@el = $el
		@elTitle = $el.children('h6')
		@statusField = $el.find('.manage-content-list-item-content-status')
		@fieldSlug = $el.find('.fieldset.slug').first().find('input')

		switch @single
			when 'Pest' then 			@fieldName = $el.find('.fieldset.name').first().find('input')
			when 'Service' then 		@fieldName = $el.find('.fieldset.name').first().find('input')
			when 'FAQ' then 			@fieldName = $el.find('.fieldset.question').first().find('input')
			when 'FAQ Category' then 	@fieldName = $el.find('.fieldset.title').first().find('input')
			when 'Exit Intent' then 	@fieldName = $el.find('.fieldset.name').first().find('input')

		$el.data('item', @)
		
		SimplyBind('name').of(@).to('value').of(@fieldName).bothWays()
		SimplyBind('name').of(@).to('textContent').of(@elTitle)

		if @fieldSlug.length
			SimplyBind('slug').of(@).to('value').of(@fieldSlug).bothWays()

		return @


	Post::toggle = ()-> @elTitle.trigger('click')
	Post::fetchValues = ()-> @postType.fetchValues()[@el.index()-1]
	Post::clone = ()-> @postType.addPost(@)
	
	Post::disable = ()->
		@enabled = !@enabled		
		DB.post.update
			'id': @id
			'data': {enabled: @enabled}
			'cb': (res)=> @el.toggleClass 'disabled' if res.success
	

	
	Post::delete = ()-> 
		if @postType.posts.length > 1
			notify('yesno', "Deleting #{@name}", "Are you sure you want to delete this #{@single} from the database? This cannot be undone.").then ()=>
				@postType.removePost(@)
				if @id
					DB.post.remove
						'id': @id
						'cb': (res)=> subnotify('success', "#{@name} was successfuly removed.") if res.success

		else notify 'ok', 'How will you explain this to your users?', "You must have at least one #{@single} in the database."



	Post::save = ()->
		if not @postType.form.Validate()
			@postType.form.focusOnFirstErrorField()
			@statusField.html 'Some fields have errors...'
			setTimeout ()=>
				@statusField.html ''
			, 3500
		else
			@el.addClass('sending').removeClass 'save_success save_error'
			data = {}
			postData = @fetchValues()
			if @new
				postData.type = @postType.type
				postData.enabled = @enabled
				DB.post.insert
					'data': postData
					'cb': (res)=>
						if res.success
							subnotify('success', "#{@single} \"#{@name}\" was successfuly inserted!")
							if res.result?._id
								@id = res.result._id

							state = if res.success then 'save_success' else 'save_error'
							@statusField.html res.message
							
							@el.removeClass('sending').addClass state
						
							setTimeout ()=>
								@el.removeClass 'save_success save_error'
								@statusField.html ''
							, 3500

				@new = false
			
			else			
				DB.post.update
					'id': @id
					'data': postData
					'cb': (res)=> 
						state = if res.success then 'save_success' else 'save_error'
						
						if res.success
							subnotify('success', "#{@single} \"#{@name}\" was successfuly updated!")
						
						@statusField.html res.message
						
						@el.removeClass('sending').addClass state
					
						setTimeout ()=>
							@el.removeClass 'save_success save_error'
							@statusField.html ''
						, 3500
					





	$('.manage-content').find('.manage-content-list').each ()-> POSTTYPES.add $(@)
	$('.manage-content-list').first().data('item').show()
