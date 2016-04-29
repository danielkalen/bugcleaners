if isSettingsManagement
	dummyForm = do ()-> new Form $('<form></form>')
	
	@SettingsItem = (@el$)->
		data = @el$.data()
		@name = data.name
		@type = data.type
		@changed = false

		if @type is 'toggle'
			@state = data['init-state']

			SimplyBind('state').of(@)
				.to('class.state').of(@el$.children())
			   		.transform (state)-> if state then 'enabled' else ''

			SimplyBind(0).ofEvent('click').of(@el$.children())
				.to('state').of(@)
					.transform ()=> !@state

		else
			@field = new Form.Field @el$, dummyForm

		return @

	
	@SettingsItem::fetchValue = ()->
		if @type is 'toggle'
			return @state
		else
			return @field.fetchValue()












	@Settings = new ()->
		@state = ''
		@stateText = 'Updating...'
		@items = []
		@button$ = $('.manage-content-settings').children('.submit')
		@status$ = $('.manage-content-settings').children('.status')

		@button$.on 'click', ()=>
			@saveToDB @fetchValues()

		SimplyBind('state').of(@)
			   .to('class.state').of(@status$)
	
		SimplyBind('stateText').of(@)
			   .to('textContent').of(@status$.children())


		$('.manage-content-settings-item').each (i,el)=> @items.push new SettingsItem($(el))


		@fetchValues = ()->
			@items.map (item)=> {'name':item.name, 'value':item.fetchValue()}

		@saveToDB = (values)->
			@state = 'loading'
			@stateText = 'Updating...'

			DB.settings.update values, (res)=>
				if res.success
					@state = 'success'
					@stateText = 'Settings saved successfully!'
					setTimeout ()=>
						@state = ''
					, 9000

				else
					@state = 'error'
					@stateText = res.message


		return @