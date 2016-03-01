# @import '_plugins/jquery.js'
# @import '_plugins/jquery-cache.js'
# @import '_plugins/fastclick.js'
# @import '_plugins/css_browser_selectors.js'
# @import '_plugins/SimplyBind.min.js'
# @import '_parts-global/_helpers.js'
# @import '_parts-global/_polyfills.js'
# @import '_parts-global/form-engine.js'
# @import '_parts-global/ensure-min_height.coffee'
# @import '_parts-global/header.coffee'
# @import '_plugins/sortable.js'
# @import '_plugins/notices.coffee'
# @import '_plugins/subnotices.coffee'

$window = $$(window)
isMobileWidth = window.innerWidth <= 736
isMobile = $$('html').hasClass('mobile')
isPageManagement = $$('body').hasClass('pages')
isPostManagement = $$('body').hasClass('posts')
isLeadManagement = $$('body').hasClass('leads')

do ($ = jQuery)->
	# @import _parts-manage/field-templates.coffee
	# @import _parts-manage/manage-init_forms.coffee
	# @import _parts-manage/manage-db_queries.coffee
	# @import _parts-manage/manage-logout.coffee
	# @import _parts-manage/manage-sidebar.coffee
	# @import _parts-manage/manage-page-variations.coffee
	# @import _parts-manage/manage-pages.coffee
	# @import _parts-manage/manage-posts.coffee
	# @import _parts-manage/manage-leads.coffee
	# @import _parts-manage/manage-page_actions.coffee
	# @import _parts-manage/manage-post_actions.coffee
	# @import _parts-manage/manage-page-variations_actions.coffee
	# @import _parts-manage/manage-block_appension.coffee
	# @import _parts-manage/manage-login.coffee
	# @import _parts-manage/manage-item_opening.coffee
	# @import _parts-manage/manage-sortable.coffee
