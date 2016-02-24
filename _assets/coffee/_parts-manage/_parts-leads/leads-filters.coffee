###*
# The logic and initialization of the table filters.
###

$$(document).ready ->
	$$('.campaign-table-filters').find('.input').each ->
		# Input events
		$this = jQuery(this)
		Form::attachEvents $this, 'change blur keypress'
		return
	$$('.campaign-table-filters-button').on 'click', ->
		# Apply button events
		$$('.campaign-table-filters').submit()
		return
	$$('.campaign-table-filters-item-input').on 'keypress', (e) ->
		if e.keyCode == 13
			$$('.campaign-table-filters').submit()
		return
	# Set the value of the <select> field for the Status Filter if it was set with PHP.
	if $$('select.campaign-table-filters-item-input').length
		$$('select.campaign-table-filters-item-input').each ->
			$this = jQuery(this)
			fitlerValue = $this[0].attributes.value.value
			if fitlerValue
				$this.val(fitlerValue).trigger 'change'
			return
	return
