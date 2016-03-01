###*
# The library I authored for use as subnotices/alerts sitewide (frontend/backend)
###

do ($ = jQuery)->
	if $('.subnotices').length is 0
		$('body').prepend('<div class="subnotices"></div>')

	@subnotify = ($type, $text, time) ->
		markup = "<div class=\"subnotice subnotice_#{$type}\">
					<div class=\"subnotice-text\">#{$text}</div>
					<div class=\"subnotice-close\"></div>
				 </div>"
		subnoticeObject = new Subnotice(markup)
		
		if time is undefined then time = 10000 
		subnoticeObject.destroy(time)

		return subnoticeObject

	
	Subnotice = (markup)->
		@el = $(markup)
		@el.data('Subnotice', @)
		@wrapperEl = $('.subnotices')
		@isActive = true
		@append()
		@attachEvents()
		return @


	Subnotice.prototype.append = ()->
		subnoticeObject = @

		@el.appendTo @wrapperEl

		setTimeout ()->
			subnoticeObject.reveal()
		, 200

	
	Subnotice.prototype.reveal = ()->
		@el.addClass('show')
	
	
	Subnotice.prototype.attachEvents = ()->
		subnoticeObject = @
		@el.children('.subnotice-close').on('click', ()->
			subnoticeObject.destroy(0)
		)
	
	Subnotice.prototype.destroy = (time)->
		subnoticeObject = @
		if time isnt false
			el = @el
			setTimeout ()->
				el.removeClass('show')
				
				setTimeout ()->
					el.remove()
					subnoticeObject.isActive = false
				, 1000
			, time

	
	$(window).on 'click', '.subnotice-close', ->
		subnoticeObject = $(this).parent().data('Subnotice')
		subnoticeObject.destroy(0)


	return
