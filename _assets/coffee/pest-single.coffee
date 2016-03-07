# @import 'global.coffee'
# @import '_parts-global/analytics.js'
do ($=jQuery)->
	# ==== Censored image conditional show =================================================================================
	$('.pest_image, .pest_others-item-image').on 'click', ()->
		$this = $(this)
		clicked = $this.data('clicked')
		if !clicked then $this.addClass('removeblur') else $this.removeClass('removeblur')
		$this.data 'clicked', !clicked


