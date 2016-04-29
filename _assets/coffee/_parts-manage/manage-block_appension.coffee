### ==========================================================================
   Block Dynamic Appension
   ========================================================================== ###
appendDynamicBlocks = (selectField, blockValues)->
	$selectField = $(selectField)
	selectedBlock = $selectField.val()
	fieldValues = null

	if selectedBlock
		$fieldset = $selectField.parents('.fieldset').first()
		$repeaterItem = $fieldset.parent().parent()
		repeaterInstance = $fieldset.parents('.fieldset').first().data('Field')
		formInstance = repeaterInstance.form
		blockValues = blockValues or repeaterInstance.comments

		dynamicBlockMarkup = $("#block-#{selectedBlock}").html()
		$dynamicBlock = $("<div class='dynamic_block' data-block='#{selectedBlock}'>#{dynamicBlockMarkup}</div>");
		$backupBlock = $("<div class='dynamic_block_backup'></div>");

		if dynamicBlockMarkup
			$dynamicBlock.insertAfter($fieldset)
			$extraFields = $dynamicBlock.children('.dynamic_block').children('.fieldset')
			$dynamicBlock.children('.fieldset').add($extraFields).each ()->
				repeaterInstance.addChildField $(@)
				fieldInstance = $(@).data('Field')

				if blockValues
					fieldValues = blockValues[$repeaterItem.index()]
					if fieldInstance.type.includes('repeater') and fieldValues[fieldInstance.name].constructor isnt Array
						fieldValues[fieldInstance.name] = util.convertObjectToArray(fieldValues[fieldInstance.name]);
					# console.log(fieldInstance.type, fieldValues[fieldInstance.name])
					fieldInstance.setValue(fieldValues[fieldInstance.name])

			$dynamicBlock.find('[name="blocks---slug[]"]').not('.disabled_forever').each ()-> appendDynamicBlocks @, fieldValues.blocks

		$backupBlock.insertAfter($dynamicBlock)


# $('.manage-content').find('[name="blocks---slug[]"]').not('.disabled_forever').each ()-> appendDynamicBlocks @













$(document).on 'change', '[name="blocks---slug[]"]', ()->
	$selectField = $(@)
	$fieldset = $selectField.parents('.fieldset').first()
	selectedBlock = $selectField.val()
	repeaterInstance = $fieldset.parents('.fieldset').first().data('Field')
	formInstance = repeaterInstance.form
	dynamicBlockMarkup = $("#block-#{selectedBlock}").html()
	$currentDynamicBlock = $fieldset.next()
	$dynamicBlock = $("<div class='dynamic_block' data-block='#{selectedBlock}'>#{dynamicBlockMarkup}</div>");
	$backupBlock = $fieldset.siblings('.dynamic_block_backup')
	if $backupBlock.length is 0
		$backupBlock = $("<div class='dynamic_block_backup'></div>");

		if $currentDynamicBlock.length
			$backupBlock.insertAfter($currentDynamicBlock)
		else
			$backupBlock.insertAfter($fieldset)


	if $currentDynamicBlock.length
		$currentDynamicBlock
			.children('.fieldset')
				.each ()->
					repeaterInstance.removeChildField $(@)
				.end()
			.appendTo($backupBlock)

	if $backupBlock.children().length
		$existingBlockInBackup = $backupBlock.children().filter ()-> $(@).data('block') is selectedBlock
		if $existingBlockInBackup.length
			$dynamicBlock = $existingBlockInBackup

	if dynamicBlockMarkup
		$dynamicBlock.insertAfter($fieldset)
		$dynamicBlock.children('.fieldset').each ()->
			repeaterInstance.addChildField $(@)



