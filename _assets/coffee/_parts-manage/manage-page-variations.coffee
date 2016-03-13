if isPageManagement
	Variation = ($el, page, isNew)->
		@page = page
		@new = !!isNew
		@index = $el.data('variation') or $el.index()-3 or 0
		@enabled = !$el.hasClass('disabled')
		@el = $el
		@elTitle = $el.children('h6').children().eq(0)
		@elNotes = $el.children('h6').children().eq(1)
		@fieldNotes = $el.find('.varNotes').find('input')
		@statusField = $el.find('.manage-content-list-item-content-status')

		@elTitle.html('Variation {{index}}')
		@elNotes.html(' {{notes}}')

		$el.data('item', @)
		SimplyBind('index').of(@)
			.to('textContent.index').of(@elTitle)
			.transform (newValue)-> newValue+1
			.update()

		SimplyBind('value').of(@fieldNotes)
			.to('textContent.notes').of(@elNotes).bothWays()
			.transform (newValue)-> if newValue.toString() then "(#{newValue})" else newValue.toString()
			.update()


		return @


	Variation::fetchValues = ()-> @page.fetchValues()[@index]
	Variation::clone = ()-> 
		@page.addVariation(@)
		@el.children('.toggle_open').first().trigger('click')
		subnotify({type:'info', text:"Variation was successfuly cloned. Don't forget that images aren't cloned over and to save it in order to apply the changes to the database", time:5000})
	
	Variation::disable = ()->
		if @page.el.find('.manage-content-list-item').not('disabled').length > 1 # Make sure there are other non-disabled varirations
			@enabled = !@enabled
			data = {}
			data["variations.#{@index}.enabled"] = @enabled
			
			DB.variation.update
				'id': @page.id
				'data': data
				'cb': (res)=> @el.toggleClass 'disabled' if res.success
		else
			notify {type:'ok', title:"Can't disable variation", text:'You must have at least one variation enabled per page'}
	

	
	Variation::delete = ()-> 
		if @page.variations.length > 1
			notify({type:'yesno', title:"Delete Variation #{@index+1}", text:'Are you sure you want to delete this variation? This cannot be undone.'}).then ()=>
				@page.removeVariation(@)
				DB.variation.remove
					'id': @page.id
					'index': @index
					'cb': (res)=> subnotify({type:'success', text:"Variation ##{@index+1} successfuly removed", time:3000})

		else notify {type:'ok', title:"Can't delete this variation", text:'Each page must have at least one variation that\'s enabled'}



	Variation::save = ()->
		if not @page.form.Validate()
			@page.form.focusOnFirstErrorField()
			@statusField.html 'Some fields have errors...'
			setTimeout ()=>
				@statusField.html ''
			, 3500
		else
			@el.addClass('sending').removeClass 'save_success save_error'
			data = {}
			variationData = @fetchValues()
			if @new
				data.$push = 
					'variations': variationData
			else
				data.$set = {}
				for key, value of variationData
					data.$set["variations.#{@index}.#{key}"] = value
				# setIndividualUpdate = (key, value)=>
				# 	if typeof value is 'object'
				# 		for subKey, subValue of value
				# 			if value.hasOwnProperty(subKey)
				# 				if Array.isArray(subValue)
				# 					setIndividualUpdate(key+'.'+subKey, new Array())
				# 				setIndividualUpdate(key+'.'+subKey, subValue)
				# 	else
				# 		data.$set["variations.#{@index}.#{key}"] = value
				
				# for key, value of variationData
				# 	setIndividualUpdate(key, value)
			

			DB.variation.save
				'id': @page.id
				'data': data
				'cb': (res)=> 
					state = if res.success then 'save_success' else 'save_error'
					@statusField.html res.message

					if res.success
						subnotify({type:'success', text:"Variation #{@index+1} of #{@page.name} was successfuly updated!"})
					else
						serverMessage = if res?.message then "Here's what the server said: \"#{res.message}\"" else ''
						subnotify({type:'error', text:"There was an error when trying to save this variation. #{serverMessage}"})
					
					@el.removeClass('sending').addClass state
				
					setTimeout ()=>
						@el.removeClass 'save_success save_error'
						@statusField.html ''
					, 3500
				
					@new = false if @new
