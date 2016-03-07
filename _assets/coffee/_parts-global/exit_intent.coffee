###*
# A function that can be called from the global scope to manually disable
# exit intents if so intended. 
###

window.disableExitIntents = ()-> ExitIntent.disabled = true
isIE = document.all and !window.atob
isIE11 = window.navigator.msPointerEnabled
isMobile = $$('html').hasClass('mobile')

do ($=jQuery)->
	###*
	# The Exit Intent class that's used to instantiate Exit Intent popups.
	# @param {object} $form jQuery object referencing the form that should be inserted into the exit intent.
	# @param {string} name  The unique name for this exit intent (will be used as an ID attr).
	###
	@ExitIntent = ($form, name, formOptions={})->
		@name = name or 'popup_'+Math.floor(Math.random() * 100000)		
		@form = new Form($form, formOptions)
		@popup = new Popup($form, @name)
		@disabled = false
		@el = $form
		@ID = $form.data('id')
		


		###*
		# Opens the popup instance of this exit intent and saves the fact
		# that it was open to localstorage so we can know if a user has
		# already seen this exit intent.
		###
		@open = ()->
			@disabled = true			
			@popup.open()
		
		@close = ()-> @popup.close()







		# ==== Popup Trigger Event attachment =================================================================================
		###*
		# Opens the popup if the user's mouse moves from the inside of the viewport
		# to outside of the viewport's Y axis.
		###
		if !isMobile # No need to attach for mobile devices
			$$(window).on 'mouseleave', (mouseEvent)=>
				@open() unless @disabled or popupOpen or mouseEvent.clientY >= 1



		###*
		# Opens the popup if the user's tries to navigate backwards. We apply a trick
		# to the window.history property using its replaceState() and pushState() methods
		# to register the previous page in the browser's history as the current page. We
		# then listen to the popstate event which triggers when the page navigates away.
		# Since IE doesn't fully support these methods, we disable them completely for IE.
		###
		if !$form.hasClass('exit-subscribe') and !$form.hasClass('exit-pdf')
			unless isIE or isIE11 or isMobile or @disabled
				window.history.replaceState { id: 'exit-init' }, '', ''
				window.history.pushState { id: 'exit-control' }, '', ''
				
				$$(window).on 'popstate', (e)=>
					if !@disabled and 'state' of window.history and window.history.state != null and window.history.state.id != 'exit-control'
						@open()


		




		# ==== Event Triggers =================================================================================
		###*
		# Triggers a 'closed' event on the exit intent's popup instance so that we can
		# attach event listeners for various other purposes such as statistics tracking.
		###
		$('.popup-overlay').on 'click', (e)=>
			$overlay = $(event.currentTarget)
			isExitIntentOverlay = $overlay.hasClass 'belongs_to_exit-intent'
			@popup.el.trigger 'closed' if isExitIntentOverlay

		$form.find('.no').on 'click', ()=>
			@popup.close()
			localStorage.setItem 'submitted', 'true'

		$form.find('.submit').on 'click', ()=> @popup.el.trigger 'submitted'

		$form.find('.step').first().find('.next').on 'click', ()=> @popup.el.trigger('continued')












		# ==== Behavior Logging =================================================================================
		dataToSend = 
			action: 'update_campaign_stat'
			type: 'exit_intent'
			itemID: @ID

		sendToServer = (action)->
			dataToSend.user_action = action
			$.post '/ajax', dataToSend
		


		@popup.el.on 'opened', ()-> sendToServer('opened')

		@popup.el.on 'closed', ()-> sendToServer('clicked_no')
		
		@popup.el.on 'continued', ()-> sendToServer('clicked_yes')

		@popup.el.on 'submitted', ()-> sendToServer('submitted')

			
			
		return @

