// Generated by CoffeeScript 1.10.0
(function() {
  var PAGES, PageItem;

  if (isPageManagement) {
    PAGES = {
      'list': $('.manage-sidebar'),
      'template': $(fieldTemplates.page),
      'items': [],
      addExisting: function($el) {
        var newItem;
        newItem = new PageItem($el.attr('id'), $el.data('slug'), $el.children().html(), $el, $el.children('.manage-content-list-title-text'));
        this.items.push(newItem);
        bindPageData(newItem.el);
        return newItem;
      },
      add: function(sidebarItem) {
        var $newItem, newItem;
        $newItem = this.template.clone();
        newItem = new PageItem('', sidebarItem.slug, sidebarItem.label, $newItem, $newItem.children('.manage-content-list-title-text'));
        this.items.push(newItem);
        newItem.el.data('show', true).data('new', true).data('slug', newItem.slug).attr('id', '').addClass(newItem.slug).find('.manage-content-list-item').data('closed', true).end().appendTo(PAGES.list);
        newItem.show();
        initForm(newItem.el);
        bindPageData(newItem.el);
        return newItem;
      },
      remove: function(slug) {
        var indexOfItem, itemInArray;
        itemInArray = this.items.filter(function(item) {
          return item.slug === slug;
        });
        indexOfItem = this.items.indexOf(itemInArray);
        if (indexOfItem !== -1) {
          this.items.splice(indexOfItem, 1);
          return true;
        } else {
          return false;
        }
      }
    };
    PageItem = function(id, slug, label, el, elTitle, sidebar) {
      this.id = id;
      this.slug = slug;
      this.label = label;
      this.el = el;
      this.elTitle = elTitle;
      return this.sidebar = sidebar || SIDEBAR.items.filter(function(item) {
        return item.slug === pageData.slug.value;
      });
    };
    PageItem.prototype.show = function() {
      return this.el.addClass('show').siblings().removeClass('show');
    };
    PageItem.prototype.hide = function() {
      return this.el.removeClass('show');
    };
    PageItem.prototype.remove = function() {
      var isLastPage;
      isLastPage = !this.el.siblings('.step').length;
      if (isLastPage) {
        return alert('You cannot delete the last page in the database.');
      }
      if (confirm('Are you sure you want to delete this page?')) {
        PAGES.remove(this.slug);
        SIDEBAR.remove(this.slug);
        if (this.id) {
          return DB.page.remove({
            'id': this.id,
            'cb': (function(_this) {
              return function(res) {
                if (res.success) {
                  _this.sidebar.remove();
                  return _this.el.removeClass('show').prev().addClass('show').end().remove();
                }
              };
            })(this)
          });
        }
      }
    };
    $('.manage-sidebar-list-item').each(function() {
      return PAGES.addExisting($(this));
    });
  }

}).call(this);
