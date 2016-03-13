do ($ = jQuery)->
	if $('.notices').length is 0
		$('body').prepend('<div class="notices"></div>')
	
	@notify = ({template, type='ok', title='', text='', buttonText='', altAction=''})->
		if template and noticeTemplates?[template]?
			template = noticeTemplates[template]

		new Notice({template, type, title, text, buttonText, altAction})


	Notice = ({template, @type, title, text, buttonText, altAction})->
		if @type is 'yes_no' then @type = 'yesno'
		@isActive = true
		@parentWrapper = $('.notices').last()
		
		extraActionsClass = if @type is 'yesno' then ' notice-actions_yesno' else ''

		if template
			@el = $(template)
		else
			@el = $("<div class='notice'>
						<div class='notice-title'>#{title}</div>
						<div class='notice-message'>#{text}</div>
						<div class='notice-actions#{extraActionsClass}'>#{noticeActionTemplates[@type]}</div>
						<div class='notice-altAction'>#{altAction}</div>
					</div>")

		@el.data 'Notice', @
		@append()
		return @prompt()


	Notice.prototype.append = ()-> @el.appendTo(@parentWrapper)
	
	Notice.prototype.remove = ()->
		@el.remove()
		@isActive = false
	
	Notice.prototype.reveal = ()->
		setTimeout ()=>
			@parentWrapper.addClass('reveal')
		, 0
	
	Notice.prototype.dismiss = ()->		
		@parentWrapper.removeClass('reveal')
		setTimeout ()=>
			@remove()
		, 400

	Notice.prototype.prompt = ()->		
		new Promise (resolve, reject)=>
			@reveal()

			if @type is 'ok'
				@el.on 'click', '.button_ok', ()=>
					@dismiss()
					resolve(@)
			
		
			else if @type is 'yesno'
				@el.on 'click', '.button_yes', ()=>
					@dismiss()
					resolve(@)
			
				@el.on 'click', '.button_no', ()=>
					@dismiss()
					reject(@)





	noticeActionTemplates = 
		'ok':  "<div class='notice-actions-item button_ok'>
					<div class='notice-actions-item-text'>Ok</div>
				</div>",
		
		'yesno':  "<div class='notice-actions-item button_no'>
						<div class='notice-actions-item-text'>No</div>
				   </div>
				   <div class='notice-actions-item button_yes'>
						<div class='notice-actions-item-text'>Yes</div>
				   </div>"
