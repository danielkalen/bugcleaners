applicableLeads = []
# ==== Table Checkbox Selection =================================================================================
$$(document).on 'click', 'tbody .leads-table-checkbox', ()-> # Single row checkbox
	$checkbox = $(this)
	leadID = $checkbox.data('id')
	becameChecked = $checkbox.prop('checked')
	index = undefined
	if becameChecked
		applicableLeads.push leadID
	else
		index = applicableLeads.indexOf(leadID)
		applicableLeads.splice index, 1



$$(document).on 'click', 'thead .leads-table-checkbox', ()-> # Bulk select checkbox
	$checkbox = $(this)
	becameChecked = $checkbox.prop('checked')
	applicableLeads = []
	
	if becameChecked
		tableItems = $('.leads-table-checkbox', 'tbody').each ()->
			`var $checkbox`
			$checkbox = $(this)
			leadID = $checkbox.data('id')
			applicableLeads.push leadID
			$checkbox.prop 'checked', true

	else
		tableItems = $('.leads-table-checkbox', 'tbody').each ()->
			$(this).prop 'checked', false




# ==== Bulk Actions =================================================================================
$$('.leads-bulk-button').on 'click', ()-> # Apply button events
	action = $$('#bulk-action').val()
	apiAction = 'lead_' + action.replace('unmark', 'mark')
	if action and applicableLeads.length
		bulkData = 
			'bulk': true
			'action': apiAction
			'items': applicableLeads

		switch action
			when 'mark_complete' then bulkData.complete = true
			when 'unmark_complete' then bulkData.complete = false
			when 'mark_spam' then bulkData.spam = true
			when 'unmark_spam' then bulkData.spam = false

		
		applicableLeads.forEach (leadID)->
			$leadRow = $('tr[data-id="'+leadID+'"]');
			
			if action.includes('delete')
				$leadRow.find('.lead-action.delete').trigger 'click'
			
			
			else if action.includes('spam')
				if action.includes('unmark')
					$leadRow.find('.lead-action.unspam').trigger 'click'
				else
					$leadRow.find('.lead-action.spam').trigger 'click'
			
			
			else if action.includes('complete')
				if action.includes('unmark')
					$leadRow.find('.lead-action.incomplete').trigger 'click'
				else
					$leadRow.find('.lead-action.complete').trigger 'click'


