makeGroupSortable = ($group, groupChildrenName)->
	group = $group[0]
	variationName = $group.parents('.manage-content-list-item').attr('id')
	groupName = group.classList[0]

	$group.each ()->
		$groupItem = $(this)
		groupItem = this
		$groupItem.data 'Sortable', new Sortable groupItem,
			group: variationName + '___' + groupName
			sort: true
			draggable: groupChildrenName
			onUpdate: (event)->
				parentRepeater = $(event.target).parents('.fieldset').first().data('Field')
				parentRepeater.collectFields()


initSortables = ($variation)->
	$repeaterItems = $variation.find('.repeater-items')
	if $repeaterItems.length
		makeGroupSortable $repeaterItems, '.repeater-item'


$('.manage-content-list-item').each ()->
	initSortables $(this)
