if isPageManagement
	PAGES = 
		'list': $('.manage-content')
		'template': $(fieldTemplates.page)
		'varTemplate': $(fieldTemplates.variation)
		'items': []

		addExisting: ($el)->
			newItem = new PageItem($el.attr('id'), $el.data('slug'), $el.find('.manage-content-list-title-text').html(), !$el.hasClass('disabled'), $el.data('rotation'), $el)
			@items.push(newItem)		
			return newItem
		


		add: (sidebarItem, clone)->
			$newItem = if clone then $(clone[0].cloneNode(true)) else $(@template[0].cloneNode(true))
			newItem = new PageItem('', sidebarItem.slug, sidebarItem.label, true, false, $newItem, sidebarItem)
			@items.push(newItem)
			
			newItem.el
				.data('show', true)
				.data('new', true)
				.data('slug', newItem.slug)
				.attr('id', '')
				.addClass(newItem.slug)
				.find('.manage-content-list-item')
					.data('closed', true)
					.end()
				.appendTo(PAGES.list)

			newItem.show()
			return newItem
		


		remove: (slug)->
			itemInArray = @items.filter (item)-> item.slug is slug
			indexOfItem = @items.indexOf itemInArray
			if indexOfItem isnt -1
				@items.splice(indexOfItem, 1)
				return true
			else
				return false




	PageItem = (id, slug, name, enabled, rotation, el, sidebar)->
		initForm(el)
		@id = id
		@slug = slug
		@name = name
		@enabled = !!enabled
		@rotation = rotation
		@form = el.data('Form')
		@el = el
		@elTitle = el.find('.manage-content-list-title-text').first()
		@variations = el.find('.manage-content-list-item')
		@sidebar = sidebar || SIDEBAR.items.filter((item)=> item.slug is @slug)[0]
		@toggle = el.find('.rotation')
		@button = el.find('.manage-content-list-add')
		@fieldName = el.find('.page_data[name="name"]')
		@fieldSlug = el.find('.page_data[name="slug"]')
		@fieldVar = el.find('.currentVariation')
		@currentVariation = @fieldVar.val() || 0
		@variations = []

		@collectVariations()

		@el.data('item', @)
		@sidebar.assocItem = @

		SimplyBind.setOption('invokeOnBind', false)
		SimplyBind('name').of(@).to('value').of(@fieldName).bothWays()
		SimplyBind('value').of(@fieldName)
			.to('textContent').of(@elTitle)
			.and('label').of(@sidebar)
			.and (newValue)=> DB.page.update {'id':@id, 'name':'name', 'value':newValue}
		
		
		slugTransform = (val)-> val.toLowerCase().replace /\s/g, '-'
		SimplyBind('slug').of(@)
			.to('slug').of(@sidebar).bothWays()
			.and('value').of(@fieldSlug).bothWays()
			.withTransform slugTransform
		
		SimplyBind('value').of(@fieldSlug).to('class.slug').of(@el).withTransform slugTransform
		SimplyBind('value').of(@fieldSlug).to (newValue)=> DB.page.update {'id':@id, 'name':'slug', 'value':slugTransform(newValue)}
		
		
		SimplyBind('value').of(@fieldVar)
			.to('currentVariation').of(@)
			.and (newValue)=> DB.page.update {'id':@id, 'name':'currentVariation', 'value':newValue-1}


		SimplyBind('rotation').of(@).to('class.state').of(@toggle)

		SimplyBind.setOption('invokeOnBind', true)

		return @



	PageItem::show = ()->
		@el.addClass('show').siblings().removeClass('show')

	PageItem::hide = ()->
		@el.removeClass('show')
	
	PageItem::disable = ()->
		@enabled = !@enabled
		DB.page.update 
			'id': @el.attr('id')
			'name': 'enabled'
			'value': @enabled
			'cb':(res)=> @el.toggleClass('disabled') if res.success
		
	
	PageItem::clone = ()->
		cloneLabel = @sidebar.label+' (Copy)'
		cloneSlug = @sidebar.slug+'-copy'
		cloneSidebar = SIDEBAR.add(cloneLabel, cloneSlug, @sidebar.el)
		clonedItem = PAGES.add(cloneSidebar, @el)
		clonedItem.show()
		clonedItem.save(true)


	PageItem::fetchValues = ()->
		variationsData = @el.data('Form').fetchValues()
		variationsData.forEach (variation, index)=>
			variationsData[index].enabled = @variations[index].enabled

		removeEmptyFileFields = (obj)->
			return obj
			# if obj.constructor is Array
			# 	obj.forEach (subObj, index)->
			# 		obj[index] = removeEmptyFileFields(subObj)
			
			# if obj.constructor is Object
			# 	Object.keys(obj).forEach (key)->
			# 		if key is 'image'
			# 			if not obj[key]
			# 				delete obj[key]
			# 		else
			# 			if obj[key]?.constructor is Object or obj[key]?.constructor is Array
			# 				obj[key] = removeEmptyFileFields(obj[key])

			# return obj

		variationsData = removeEmptyFileFields(variationsData)
		return variationsData




	PageItem::save = (firstTime)->
		data =
			'name': @name
			'slug': @slug
			'enabled': @enabled
			'rotation': !!@rotation
			'currentVariation': @currentVariation - 1
			'variations': @fetchValues()

		if firstTime
			DB.page.insert
				'data': data
				'cb': (res)=>
					if res.success 
						console.log('Page created/added successfuly.')
						$.post '/api/get/pages', {slug: @slug}, (res)=>
							@id = res[0]._id
							@el.attr('id', res[0]._id)
		else
			DB.page.update 
				'id':@id
				'data':data




	PageItem::remove = ()->
		isLastPage = !@sidebar.el.siblings().length

		return alert('You cannot delete the last page in the database.') if isLastPage

		if confirm('Are you sure you want to delete this page?')
			PAGES.remove(@slug)
			SIDEBAR.remove(@slug)
			if @id
				DB.page.remove
					'id':@id
					'cb':(res)=>
						if res.success
							@el
								.removeClass('show')
								.prev()
									.addClass('show')
									.end()
								.remove()


	PageItem::collectVariations = ()->
		variations = @el.find('.step')
		variations.each (i,el)=>
			@variations.push(new Variation($(el), @))
		
		@fieldVar.prop 'max', @variations.length

	PageItem::addVariation = (varToClone)->
		$newItem = if varToClone then $(varToClone.el[0].cloneNode(true)) else $(fieldTemplates.variation)
		shouldBeClosed = if varToClone then false else true
		closedClass = if shouldBeClosed then 'closed' else ''
		
		$newItem # Reset All Fields
			.addClass(closedClass)
			.data('closed', shouldBeClosed)
			.data('new', true)
			.data('variation', @variations.length)

		if varToClone
			$newItem.children('h6').children().eq(0).html('Variation {{index}}')
			$newItem.children('h6').children().eq(1).html(' {{notes}}')

		@button.before $newItem		
		@variations.push(new Variation($newItem, @, true))		

		@fieldVar.prop 'max', @variations.length+1
		@form.AddStep($newItem)

		# @el.children('.step').not('.closed').children('.toggle_open').trigger('click')



	PageItem::removeVariation = (variation)->
		return unless variation
		variation.el.remove()
		@variations.splice(@variations.indexOf(variation), 1)

		@variations.forEach (variation, index)-> # Fix indexes
			variation.index = index

		@fieldVar.prop 'max', @variations.length+1
		
		@form.RemoveStep(variation.index)







	$('.manage-content').find('.manage-content-list').each ()-> PAGES.addExisting $(@)
