fieldTemplates = {}

$('#fieldTemplates').children().each ()->
	$template = jQuery(this)
	name = $template.data('name')
	template = $template.html()
	fieldTemplates[name] = template
