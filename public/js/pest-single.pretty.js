// Generated by CoffeeScript 1.10.0
(function() {
  (function($) {
    $('.pest_image, .pest_others-item-image').on('click', function() {
      var $this, clicked;
      $this = $(this);
      clicked = $this.data('clicked');
      if (!clicked) {
        $this.addClass('removeblur');
      } else {
        $this.removeClass('removeblur');
      }
      $this.data('clicked', !clicked);
    });
    $('.pest_info-list-item:nth-child(2n)').each(function() {
      $(this).after('<div class="clearfix"></div>');
    });
  })(jQuery);

}).call(this);