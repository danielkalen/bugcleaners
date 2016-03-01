do ($ = jQuery)->
	if $('.notices').length is 0
		$('body').prepend('<div class="notices"></div>')
	
	@notify = (type = 'ok', title = '', message = '', buttonText = '', altAction = '')->
		return new Notice(type, title, message, buttonText, altAction)

	Notice = (type, title, message, buttonText, altAction)->
		@type = type
		@isActive = true

		if @type is 'ok' then extraActionsClass='' else if @type is 'yesno' then extraActionsClass=' notice-actions_yesno'
		@el = $("<div class='notice'>
					<div class='notice-title'>#{title}</div>
					<div class='notice-message'>#{message}</div>
					<div class='notice-actions#{extraActionsClass}'>#{NoticeActions[type]}</div>
					<div class='notice-altAction'>#{altAction}</div>
				</div>")

		@el.data('Notice', @)
		@append()
		return @prompt()


	Notice.prototype.append = ()->
		@el.appendTo($('.notices').last())
	
	Notice.prototype.remove = ()->
		@el.remove()
		@isActive = false
	
	Notice.prototype.reveal = ()->
		setTimeout ()->
			$('.notices').last().addClass('reveal')
		, 0
	
	Notice.prototype.dismiss = ()->		
		$('.notices').last().removeClass('reveal')
		setTimeout ()=>
			@remove()
		, 400

	Notice.prototype.prompt = ()->		
		new Promise (resolve, reject)=>
			@reveal()

			if @type is 'ok'
				$(@el).on 'click', '.button_ok', ()=>
					@dismiss()
					resolve(@)
			
			else if @type is 'yesno'
				$(@el).on 'click', '.button_yes', ()=>
					@dismiss()
					resolve(@)
				$(@el).on 'click', '.button_no', ()=>
					@dismiss()
					reject(@)


	NoticeActions = 
		'ok':  "<div class='notice-actions-item button_ok'>
					<div class='notice-actions-item-text'>Ok</div>
				</div>",
		
		'yesno':  "<div class='notice-actions-item button_no'>
						<div class='notice-actions-item-text'>No</div>
				   </div>
				   <div class='notice-actions-item button_yes'>
						<div class='notice-actions-item-text'>Yes</div>
				   </div>"
