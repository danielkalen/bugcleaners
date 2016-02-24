### ==========================================================================
	 Item opening mechanism
	========================================================================== ###
$$('.manage-content').find('.toggle_open').each ()->
	$item = $(@).parents('.step').first()

	if !$item.hasClass('start_opened')
		$item.addClass('closed').data 'closed', true
	else
		$item.addClass('show').data 'closed', false


$$('.manage-content').on 'click', '.toggle_open', ()->
	$toggle = jQuery(@).parent()
	$item = $(@).parents('.step').first()
	$content = $toggle.children('.toggled_content')
	closed = $toggle.data('closed')

	formInstance = $item.parents('form').first().data('Form')
	formInstance.setCurrentStepTo $item


	if closed
		$toggle.removeClass('closed').addClass('show').data 'closed', true
	else
		$toggle.addClass('closed').removeClass 'show'
	
	$content.slideToggle 300
	$toggle.data 'closed', !closed
	
	setTimeout ()->
		setMinMax true
	, 700


$$('.manage-content').on 'mouseup touchend', '.repeater-toggle, .group-toggle', ()->
	setTimeout ()->
		setMinMax true
	, 700