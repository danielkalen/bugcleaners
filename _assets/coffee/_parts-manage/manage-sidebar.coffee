window.existingSlugs = []
generateNewSlug = (index = 1)->
	newSlug = 'new-page-'+index
	
	if existingSlugs.includes(newSlug)
		newSlug = generateNewSlug(index+1)
	else
		existingSlugs.push(newSlug)
		return newSlug



window.SIDEBAR = 
	'list': $('.manage-sidebar-list')
	'template': $(fieldTemplates.sidebarItem)
	'items': []

	addExisting: ($el)->
		newItem = new SidebarItem($el.data('slug'), $el.children().html(), $el, $el.children())
		@items.push(newItem)
	
		return newItem
	


	add: (label, slug, itemToInsertAfter)->
		$newItem = $(@template[0].cloneNode(true))
		newItem = new SidebarItem(slug, label, $newItem, $newItem.children())
		@items.push(newItem)

		newItem.el
			.data('slug', newItem.slug)
			.find('.manage-sidebar-list-item-text')
				.html(newItem.label)
				.end()
		
		if itemToInsertAfter
			newItem.el.insertAfter(itemToInsertAfter)
		else
			newItem.el.appendTo(SIDEBAR.list)

		newItem.show()
		return newItem
	


	remove: (slug)->
		itemsInArray = @items.filter (item)-> item.slug is slug
		itemsInArray.forEach (item)=>
			indexOfItem = @items.indexOf item

			item.remove()

			if indexOfItem isnt -1
				@items.splice(indexOfItem, 1)
				return true
			else
				return false



SidebarItem = (slug, label, el, elTitle)->
	@slug = slug or generateNewSlug()
	@label = label or 'New Page'
	@el = el
	@elTitle = elTitle
	@assocItem = null

	@el.data('item', @)
	SimplyBind('label').of(@).to('textContent').of(@elTitle)

	if slug then existingSlugs.push(slug)
	return @



SidebarItem::show = ()->
	@el.addClass('active').siblings().removeClass('active')

SidebarItem::hide = ()->
	@el.removeClass('active')

SidebarItem::remove = ()->
	@el
		.removeClass('active')
		.siblings()
			.first()
				.addClass('active')
				.end()
			.end()
		.remove()


$('.manage-sidebar').find('.manage-sidebar-list-item').each ()-> SIDEBAR.addExisting $(@)











### ==========================================================================
	 Sidebar - Fixed with scroll
	 ========================================================================== ###

if $('sidebar').length
	sidebarMinMax = undefined
	alreadySetMinMax = false

	setMinMax = (afterInitLoad)->
		alreadySetMinMax = true if not alreadySetMinMax
		padding = if afterInitLoad then -60 else -30
		sidebarMinMax =
			min: $$('.header')[0].offsetHeight + 40
			max: $$('body')[0].offsetHeight - ($$('.footer')[0].offsetHeight) - ($$('sidebar')[0].offsetHeight) + padding

	setMinMax()
	
	setSidebarPosition = ()->
		if !isMobileWidth
			pageScroll = window.pageYOffset
			passedMin = pageScroll >= sidebarMinMax.min
			passedMax = pageScroll >= sidebarMinMax.max
			maxWidth = $$('sidebar').parent()[0].offsetWidth - 1
			if passedMin and !passedMax
				$$('sidebar').addClass('fixed').css
					'max-width': maxWidth
					'top': '10px'
			else
				if !passedMin
					$$('sidebar').removeClass 'fixed'
				if passedMax
					overflowAmount = (window.pageYOffset - (sidebarMinMax.max + 10)) * -1
					$$('sidebar').css 'top', overflowAmount


	$window.on 'scroll', setSidebarPosition
	$window.on 'resize', util.debounce ()->
		setMinMax()
	, 250

	### ==========================================================================
		 Anchor link highlight on scroll
		========================================================================== ###

	$$('.manage-sidebar-list-item').first().addClass 'active'
	$$('.manage-sidebar').on 'click', '.manage-sidebar-list-item', ()->
		sidebarItem = $(this).data('item')

		sidebarItem.show()
		sidebarItem.assocItem.show()
		setMinMax()



	
