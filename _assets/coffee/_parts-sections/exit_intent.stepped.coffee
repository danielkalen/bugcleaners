do ($=jQuery)->
	if $$('#exitIntent').length
		type = $$('#exitIntent').data('type')

		window.exitIntent = new ExitIntent $$('#exitIntent'), "exit-intent-#{type}"