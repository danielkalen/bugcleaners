###*
# This attaches an event listener to the question mark next to each
# entry's IP address and upon hovering fetches data from ipinfo.io and
# formats+inserts+shows the data in a tooltip.
###

$$(document).on 'mouseover', '.tbody-item-ip_details', ->
	$this = $(this)
	$parent = $this.parent()
	address = $this.data('ip')
	loaded = $this.data('loaded')
	if !loaded
		$.get 'http://ipinfo.io/' + address, ((response) ->
			output = ''
			output += '<div class="tbody-item-ip_details-text-body-row">' + 'Country: <strong>' + response.country + '</strong>' + '</div>'
			output += '<div class="tbody-item-ip_details-text-body-row">' + 'City: <strong>' + response.city + ', ' + response.region + '</strong>' + '</div>'
			output += '<div class="tbody-item-ip_details-text-body-row">' + 'Zip Code: <strong>' + response.postal + '</strong>' + '</div>'
			output += '<div class="tbody-item-ip_details-text-body-row">' + 'Location: <strong>' + response.loc + '</strong>' + '</div>'
			output += '<div class="tbody-item-ip_details-text-body-row">' + 'Hostname: <strong>' + response.hostname + '</strong>' + '</div>'
			output += '<div class="tbody-item-ip_details-text-body-row">' + 'Organization: <strong>' + response.org + '</strong>' + '</div>'
			$this.addClass('ready').find('.tbody-item-ip_details-text-body').html output
			return
		), 'JSON'
		$this.data 'loaded', !loaded
	return
