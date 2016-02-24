###*
# Submits the value of the notes textbox everytime a 'change' event is triggered.
# A change event is triggered mostly when the textfield is blurred.
###

$(document).on 'change', '.tbody-item-notes', ()->
	$field = $(this)
	notes = $field.val()
	leadID = $field.parents('tr').data('id')
	dataToSubmit = 
		'query': '_id': leadID
		'data': 'notes': notes
	$.post '/api/update/leads', dataToSubmit
	return
