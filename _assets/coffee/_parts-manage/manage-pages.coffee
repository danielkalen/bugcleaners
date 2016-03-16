if isPageManagement
	window.PAGES = 
		'list': $('.manage-content')
		'template': $(fieldTemplates.page)
		'varTemplate': $(fieldTemplates.variation)
		'items': []

		addExisting: ($el)->
			newItem = new PageItem($el.attr('id'), $el.data('slug'), $el.find('.manage-content-list-title-text').html(), $el.data('type'), !$el.hasClass('disabled'), $el.data('rotation'), $el)
			@items.push(newItem)		
			return newItem
		


		add: (sidebarItem, clone)->
			$newItem = if clone then util.cloneSafe(clone, true) else util.cloneSafe(@template, true)
			$newItem[0].className = 'manage-content-list {{slug}} {{visibility}}' if clone
			newItem = new PageItem('', sidebarItem.slug, sidebarItem.label, clone?.data('item')?.type, true, false, $newItem, sidebarItem)
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
			indexOfItem = @items.indexOf itemInArray[0]

			if indexOfItem isnt -1
				@items.splice(indexOfItem, 1)
				return true
			else
				return false




	PageItem = (id, slug, name, type, enabled, rotation, el, sidebar)->
		initForm(el)
		@id = id
		@slug = slug
		@name = name
		@type = type or 'standard'
		@enabled = !!enabled
		@rotation = rotation
		@visible = false
		@firstTime = true
		@form = el.data('Form')
		@el = el
		@elTitle = el.find('.manage-content-list-title-text').first()
		@variations = el.find('.manage-content-list-item')
		@sidebar = sidebar || SIDEBAR.items.filter((item)=> item.slug is @slug)[0]
		@toggle = el.find('.rotation')
		@button = el.find('.manage-content-list-add')
		@fieldName = el.children('.manage-content-list-data').find('.input[name="name"]')
		@fieldSlug = el.children('.manage-content-list-data').find('.input[name="slug"]')
		@fieldType = el.children('.manage-content-list-data').find('.input[name="type"]')
		@fieldVar = el.find('.currentVariation')
		@currentVariation = @fieldVar.val() || 0
		@variations = []

		@collectVariations()

		@form.addField @fieldName.parent()
		@form.addField @fieldSlug.parent()
		@form.addField @fieldType.parent()

		@el.data('item', @)
		@sidebar.assocItem = @

		SimplyBind.setOption('invokeOnBind', false)
		

		SimplyBind('visible').of(@).to('class.visibility').of(@el)
			.transform (visible)-> if visible then 'show' else ''

		SimplyBind('type').of(@).to('value').of(@fieldType).bothWays()
		SimplyBind('value').of(@fieldType)
			.to (newValue)=> DB.page.update {'id':@id, 'name':'type', 'value':newValue} if newValue
		

		SimplyBind('name').of(@).to('value').of(@fieldName).bothWays()
		SimplyBind('value').of(@fieldName)
			.to('textContent').of(@elTitle)
			.and('label').of(@sidebar)
			.and (newValue)=> DB.page.update {'id':@id, 'name':'name', 'value':newValue} if newValue
		

		slugTransform = (val)-> val.toLowerCase().replace /\s/g, '-'
		SimplyBind('slug').of(@)
			.to('slug').of(@sidebar).bothWays()
			.and('value').of(@fieldSlug).bothWays()
			.transformAll slugTransform
			.chainTo (slug)=>
				filteredSlug = enforceUniqueSlug(slug, @firstTime)
				unless slug is filteredSlug
					@slug = filteredSlug
					subnotify {type:'warning', text:"The slug \"#{slug}\" already exists, changed to \"#{filteredSlug}\".", time:3000}
		
		SimplyBind('value').of(@fieldSlug).to('class.slug').of(@el).transform slugTransform
		SimplyBind('value').of(@fieldSlug).to (newValue)=> DB.page.update {'id':@id, 'name':'slug', 'value':slugTransform(newValue)}
		
		
		SimplyBind('value').of(@fieldVar)
			.to('currentVariation').of(@)
			.and (newValue)=> DB.page.update {'id':@id, 'name':'currentVariation', 'value':newValue-1}

		@toggle[0].className = 'manage-content-list-variation_options-toggle rotation {{state}}'
		SimplyBind('rotation').of(@).to('class.state').of(@toggle)


		SimplyBind.setOption('invokeOnBind', true)

		@firstTime = false
		return @



	PageItem::show = ()->
		@visible = true
		@el.siblings().each ()->
			$(@).data().item.hide()
			return

	PageItem::hide = ()->
		@visible = false
	
	PageItem::disable = ()->
		@enabled = !@enabled
		notify({type:'yesno', title:"Disabling #{@name}", text:"Are you sure you want to disable this page? It won't be accessible on the front end."}).then ()=>
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
		setTimeout ()->
			clonedItem.save(true)
		, 150


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
			'type': @type
			'enabled': @enabled
			'rotation': !!@rotation
			'currentVariation': @currentVariation - 1
			'variations': @fetchValues()

		if firstTime
			DB.page.insert
				'data': data
				'cb': (res)=>
					if res.success 
						subnotify {type:'success', text:'Page created/added successfuly.', time:3000}
						$.post '/api/get/pages', {slug: @slug}, (res)=>
							@id = res[0]._id
							@el.attr('id', res[0]._id)
		else
			DB.page.update 
				'id':@id
				'data':data




	PageItem::remove = ()->
		isLastPage = !@sidebar.el.siblings().length

		return notify({type:'ok', title:'Why would you do that?', text:'You cannot delete the last page in the database.'}) if isLastPage

		notify({type:'yesno', title:"Deleting #{@name}", text:'Are you sure you want to delete this page from the database? This cannot be undone.'}).then ()=>
			PAGES.remove(@slug)
			SIDEBAR.remove(@slug)
			if @id
				DB.page.remove
					'id':@id
					'cb':(res)=>
						if res.success
							subnotify {type:'success', text:"Page #{@name} was successfuly deleted.", time:3000}
							@el
								.removeClass('show')
								.siblings()
									.first()
										.each(()-> $(@).data('item').show())
										.end()
									.end()
								.remove()


	PageItem::collectVariations = ()->
		variations = @el.find('.step')
		variations.each (i,el)=>
			@variations.push(new Variation($(el), @))
		
		@fieldVar.prop 'max', @variations.length

	PageItem::addVariation = (varToClone)->
		$newItem = if varToClone then $(util.cloneSafe(varToClone.el, true)) else $(fieldTemplates.variation)
		shouldBeClosed = if varToClone then false else true
		closedClass = if shouldBeClosed then 'closed' else ''
		
		$newItem # Reset All Fields
			.addClass(closedClass)
			.data('closed', shouldBeClosed)
			.data('new', true)
			.data('variation', @variations.length)

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






	enforceUniqueSlug = (newSlug, firstTime)->
		allSlugs = PAGES.items.map (item)-> item.slug
		allowedCount = if firstTime then 0 else 1

		if allSlugs.filter((item)-> item is newSlug).length > allowedCount
			return newSlug+'-copy'
		else
			return newSlug




	$('.manage-content').find('.manage-content-list').each ()-> PAGES.addExisting $(@)
	$('.manage-content-list').first().data('item').show()