# ==== Touch animation attachment =================================================================================
$$(document).on 'touchstart', (event)->
	$this = $(event.target)
	$this.addClass 'animate-tap'

	setTimeout ()->
		$this.removeClass 'animate-tap'
	, 350
