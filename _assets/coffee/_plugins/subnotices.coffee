###*
# The library I authored for use as subnotices/alerts sitewide (frontend/backend)
###

do ($ = jQuery)->
	if $('.subnotices').length is 0
		$('body').prepend('<div class="subnotices"></div>')

	@subnotify = ({type='info', text='', time=10000})->
		markup = "<div class='subnotice subnotice_#{type}'>
					<div class='subnotice-text'>#{text}</div>
					<div class='subnotice-close'></div>
				 </div>"
		
		subnoticeObject = new Subnotice(markup)
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
		@el.appendTo @wrapperEl

		setTimeout ()=>
			@reveal()
		, 200

	
	Subnotice.prototype.reveal = ()-> @el.addClass('show')
	
	
	Subnotice.prototype.attachEvents = ()-> @el.children('.subnotice-close').on 'click', ()=> @destroy(0)
	

	Subnotice.prototype.destroy = (time)->
		if time isnt false
			el = @el
			setTimeout ()=>
				@el.removeClass('show')
				
				setTimeout ()=>
					@el.remove()
					@isActive = false
				, 1000
			, time

	
	$(window).on 'click', '.subnotice-close', ()->
		subnoticeObject = $(@).parent().data('Subnotice')
		subnoticeObject.destroy(0)


	return
