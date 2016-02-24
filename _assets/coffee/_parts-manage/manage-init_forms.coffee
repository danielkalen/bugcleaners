# ==== Init forms =================================================================================
initForm = ($forms)->
	$forms.each ()->
		$form = $(this)
		# $form.find('.input').off 'change keyup focus blur' # Reset
		return if $form.parent().parent().hasClass 'fieldTemplates'
		new Form $form, 
			uniqueSteps:true
			dontDisableFields:true
			submitOnEnter:false


$('.manage-content-list').first()
	.addClass('show')
	.siblings()
		.removeClass('show')

