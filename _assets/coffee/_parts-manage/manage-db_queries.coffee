DB =
	'page':
		insert: (params)->
			callback = params.cb || (res)-> console.log('Page inserted successfuly!') if res.success
			$.post '/api/insert/pages', params.data, callback, 'JSON'
			
			
			
		update: (params)->
			dataToSubmit = 
				'query': 
					'_id': params.id
				'data': params.data or {}

			if not params.data
				dataToSubmit.data[params.name] = params.value

			callback = params.cb || (res)-> console.log('Page data successfuly updated!') if res.success
			$.post '/api/update/pages', dataToSubmit, callback, 'JSON'
			


		remove: (params)->
			$.post '/api/delete/pages', {_id: params.id}, params.cb, 'JSON'





	'variation':
		update: (params)->
			dataToSubmit = 
				'query': 
					'_id': params.id
				'updateQuery': 
					'$set': params.data
			
			callback = params.cb || (res)-> console.log('Variation updated successfuly!') if res.success
			$.post '/api/update/pages', dataToSubmit, callback, 'JSON'
		


		save: (params)->
			dataToSubmit = 
				'query': 
					'_id': params.id
				'updateQuery': params.data
			
			callback = params.cb || (res)-> console.log('Variation saved successfuly!') if res.success
			$.post '/api/update/pages', dataToSubmit, callback, 'JSON'

		

		remove: (params)->
			dataToSubmit = {queries: [
				{
					'query': 
						'_id': params.id
					'updateQuery': 
						'$unset': {}
				}
				{
					'query': 
						'_id': params.id
					'updateQuery': 
						'$pull':
							'variations': 'null'
				}
			]}
			dataToSubmit.queries[0].updateQuery.$unset["variations.#{params.index}"] = 1
			
			callback = params.cb || (res)-> console.log('Variation updated successfuly!') if res.success
			$.ajax 
				method: 'POST'
				url: '/api/updatemulti/pages'
				data: dataToSubmit
				contentType: 'application/x-www-form-urlencoded; charset=UTF-8'
				# contentType: 'application/json; charset=UTF-8'
				success: callback
				dataType: 'json'













	'post':
		insert: (params)->
			callback = params.cb || (res)-> console.log('Page inserted successfuly!') if res.success
			$.post '/api/insert/posts', params.data, callback, 'JSON'
			
			
			
		update: (params)->
			dataToSubmit = 
				'query': 
					'_id': params.id
				'data': params.data or {}

			if not params.data
				dataToSubmit.data[params.name] = params.value

			callback = params.cb || (res)-> console.log('Page data successfuly updated!') if res.success
			$.post '/api/update/posts', dataToSubmit, callback, 'JSON'
			


		remove: (params)->
			$.post '/api/delete/posts', {_id: params.id}, params.cb, 'JSON'

