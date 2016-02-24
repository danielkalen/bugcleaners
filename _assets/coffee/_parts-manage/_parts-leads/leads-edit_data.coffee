###*
# The logic required to allow the admin to change the info
# for a quote submission on the fly. This attaches event
# listeners on the 'edit' element next to each field and
# pushes the changes via ajax to the database.
###

$(document).on 'click', '.lead-edit', ->
	$editButton = $(this)
	$currentNode = $editButton.prev()
	origValue = $currentNode.text().replace(util.regEx.whiteSpace, '')
	newNode = '<input type="text" class="tbody-item-lead_details-item-value lead-value input_field" value="' + origValue + '" />'
	$currentNode.replaceWith newNode
	$editButton.prev().focus().select()
	return
$(document).on 'blur', '.lead-value.input_field', ->
	$inputNode = $(this)
	leadID = $inputNode.parents('tr').data('id')
	fieldName = $inputNode.parent().data('field_name')
	fieldValue = $inputNode.val()
	newNode = '<div class="tbody-item-lead_details-item-value lead-value"> ' + fieldValue + '</div>'

	submitValueChange = (fieldName, fieldValue) ->
		dataToSubmit = 
			'query': '_id': leadID
			'data': {}
		dataToSubmit.data[fieldName] = fieldValue
		$.post '/api/update/leads', dataToSubmit
		return

	$inputNode.replaceWith newNode
	if fieldName == 'Full_Name'
		values = fieldValue.split(' ')
		firstname = values[0]
		lastname = values[1]
		submitValueChange 'First_Name', firstname
		submitValueChange 'Last_Name', lastname
	else
		submitValueChange fieldName, fieldValue
	return
$('form').not('.manage_login-form').on 'submit', (event) ->
	event.preventDefault()
	$(document.activeElement).blur()
	return
