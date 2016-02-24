(($) ->
  # ==== Censored image conditional show =================================================================================
  $('.pest_image, .pest_others-item-image').on 'click', ->
    $this = $(this)
    clicked = $this.data('clicked')
    if !clicked then $this.addClass('removeblur') else $this.removeClass('removeblur')
    $this.data 'clicked', !clicked
    return
  # ==== List clearfix append =================================================================================
  $('.pest_info-list-item:nth-child(2n)').each ->
    $(this).after '<div class="clearfix"></div>'
    return
  return
) jQuery
