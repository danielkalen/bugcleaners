// Generated by CoffeeScript 1.10.0
(function() {
  var Variation;

  if (isPageManagement) {
    Variation = function($el, page, isNew) {
      this.page = page;
      this["new"] = !!isNew;
      this.index = $el.data('variation');
      this.enabled = !$el.hasClass('disabled');
      this.el = $el;
      this.elTitle = $el.children('h6').children().eq(0);
      this.elNotes = $el.children('h6').children().eq(1);
      this.fieldNotes = $el.find('.varNotes').find('input');
      this.statusField = $el.find('.manage-content-list-item-content-status');
      $el.data('item', this);
      SimplyBind('index').of(this).to('textContent.index').of(this.elTitle);
      SimplyBind('value').of(this.fieldNotes).to('textContent.notes').of(this.elNotes).bothWays().withTransform(function(newValue) {
        if (newValue) {
          return "(" + newValue + ")";
        } else {
          return newValue;
        }
      });
      return this;
    };
    Variation.prototype.fetchValues = function() {
      return this.page.fetchValues()[this.index];
    };
    Variation.prototype.clone = function() {
      return this.page.addVariation(this.el);
    };
    Variation.prototype.disable = function() {
      var data;
      this.enabled = !this.enabled;
      data = {};
      data["variations." + this.index + ".enabled"] = this.enabled;
      return DB.variation.update({
        'id': this.page.id,
        'data': data,
        'cb': (function(_this) {
          return function(res) {
            if (res.success) {
              return _this.el.toggleClass('disabled');
            }
          };
        })(this)
      });
    };
    Variation.prototype["delete"] = function() {
      if (this.page.variations.length > 1) {
        if (confirm('Are you sure you want to delete this?')) {
          this.page.removeVariation(this);
          return DB.variation.remove({
            'id': this.page.id,
            'index': this.index,
            'cb': function(res) {
              return console.log("Variation #" + this.index + " successfuly removed");
            }
          });
        }
      } else {
        return alert('You must have at least one variation per page.');
      }
    };
    Variation.prototype.save = function() {
      var data, key, value, variationData;
      if (!this.page.form.Validate()) {
        this.page.form.focusOnFirstErrorField();
        this.statusField.html('Some fields have errors...');
        return setTimeout((function(_this) {
          return function() {
            return _this.statusField.html('');
          };
        })(this), 3500);
      } else {
        this.el.addClass('sending').removeClass('save_success save_error');
        data = {};
        variationData = this.fetchValues();
        if (this["new"]) {
          data.$push = {
            'variations': variationData
          };
        } else {
          data.$set = {};
          for (key in variationData) {
            value = variationData[key];
            data.$set["variations." + this.index + "." + key] = value;
          }
        }
        return DB.variation.save({
          'id': this.page.id,
          'data': data,
          'cb': (function(_this) {
            return function(res) {
              var state;
              state = res.success ? 'save_success' : 'save_error';
              _this.statusField.html(res.message);
              _this.el.removeClass('sending').addClass(state);
              setTimeout(function() {
                _this.el.removeClass('save_success save_error');
                return _this.statusField.html('');
              }, 3500);
              if (_this["new"]) {
                return _this["new"] = false;
              }
            };
          })(this)
        });
      }
    };
  }

}).call(this);
