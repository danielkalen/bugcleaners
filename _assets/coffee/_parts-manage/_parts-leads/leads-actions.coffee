###*
# In each campaign table there are actions available for each listed item
# such as delete, mark as spam, etc. This script contains
# the logic for each action and its reactions.
###

$$(document).on 'click', '.lead-action', (event, submitToDatabase = true) ->
	$actionButton = $(this)
	action = $actionButton.data('action')
	leadID = $actionButton.data('id')
	$leadStatus = $actionButton.parents('tr').find('.tbody-item-status')
	prevStatus = $leadStatus.data('status_old') or 'pending'
	currentStatus = $leadStatus.data('status')
	newStatus = action.match(/_(.+)$/)
	newStatus = if newStatus then newStatus[1] else ''
	tooltipText = if newStatus == 'complete' then 'Mark as Incomplete/Invalid' else 'Mark as Not Spam'
	statusText = if newStatus == 'complete' then 'Complete/Valid' else 'Spam'
	tooltipTextNegative = if newStatus == 'complete' then 'Mark as Complete/Valid' else 'Mark as Spam'
	statusTextNegative = 'Pending'


	###*
	# Action responsible for deleting a lead from the database.
	###
	if action == 'delete'
		if submitToDatabase
			$.post '/api/delete/leads', '_id': leadID
		$actionButton.parents('tr').fadeOut 450, ->
			`var data`
			$(this).remove()
			return





	###*
	# Mark/Unmark as complete.
	###
	if /^mark/.test(action)
		if submitToDatabase
			data = 
				'query': '_id': leadID
				'data':
					'status': newStatus
					'status_old': currentStatus
			$.post '/api/update/leads', data
	
		$actionButton
			.attr("class", "tbody-item-actions-item lead-action un#{newStatus}")
			.data("action", "unmark_#{newStatus}")
			.find(".tbody-item-actions-item-text")
				.html tooltipText
		
		$leadStatus
			.attr("class", "tbody-item-status #{newStatus}")
			.data("status", newStatus)
			.data("status_old", currentStatus)
			.find(".tbody-item-status-text")
				.html statusText



	
	if /^unmark/.test(action)
		if submitToDatabase
			data = 
				'query': '_id': leadID
				'data':
					'status': prevStatus
					'status_old': currentStatus
			$.post '/api/update/leads', data
		
		$actionButton
			.attr("class", "tbody-item-actions-item lead-action #{newStatus}")
			.data("action", "mark_#{newStatus}")
			.find(".tbody-item-actions-item-text")
				.html tooltipTextNegative
		
		$leadStatus
			.attr("class", "tbody-item-status #{prevStatus}")
			.data("status", prevStatus)
			.data("status_old", currentStatus)
			.find(".tbody-item-status-text")
				.html statusTextNegative
