if $('.faqs_small').length
  do ->

    setFaqHeight = ->
      $$('.faqs_small-list-item').each ->
        $this = jQuery(this)
        contentHeight = $this.find('.faqs_small-list-item-content').height() + 50
        $this.css 'height', contentHeight
        return
      return

    $window.on 'resize', util.debounce(setFaqHeight, 250)
    setTimeout (->
      $$('.faqs_small-list-item').each ->
        $this = jQuery(this)
        $this.css('height', $this.height()).addClass 'closed'
        $this.data 'closed', true
        return
      return
    ), 50
    $$('.faqs_small-list-item').on 'click', ->
      $this = jQuery(this)
      closed = $this.data('closed')
      if closed
        $this.removeClass('closed').siblings().addClass('closed').removeClass('show').data 'closed', true
        setTimeout (->
          $this.addClass 'show'
          return
        ), 100
      else
        $this.addClass('closed').removeClass 'show'
      $this.data 'closed', !closed
      return
    return
