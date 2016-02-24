function Util(){
	

	/* ==========================================================================
	   Function Helpers
	   ========================================================================== */
	
	// ==== Debounce =================================================================================
	/**
	 * Returns a function, that, as long as it continues to be invoked, will not
	 * be triggered. The function will be called after it stops being called for
	 * N milliseconds. If 'immediate' is passed, trigger the function on the
	 * leading edge, instead of the trailing.
	 *
	 *	Usage:
	 *		var myEfficientFn = debounce(function() {
	 *			// All the taxing stuff you do
	 *		}, 250);
	 *		window.addEventListener('resize', myEfficientFn);
	 *
	 * @param  {Function} func     	 Function to perform debouncing on.
	 * @param  {number} wait     	 Time in ms to wait before executing the function.
	 * @param  {bool} immediate 	 Indicate if the function should be triggered on the leading (true) or trailing (false) edge.
	 */
	this.debounce = function(func, wait, immediate) {
		var timeout;
		return function() {
			var context = this, args = arguments;
			var later = function() {
				timeout = null;
				if (!immediate) func.apply(context, args);
			};
			var callNow = immediate && !timeout;
			clearTimeout(timeout);
			timeout = setTimeout(later, wait);
			if (callNow) func.apply(context, args);
		};
	};




	// ==== Once =================================================================================
	/**
	 * Trigger a function only once and don't trigger when called after the first time.
	 *
	 *	Usage
	 *		var canOnlyFireOnce = once(function() {
	 *			console.log('Fired!');
	 *		});
	 *		canOnlyFireOnce(); // "Fired!"
	 *		canOnlyFireOnce(); // nada
	 *
	 * @param  {Function} fn      Function to trigger once.
	 * @param  {object}   context Optional context to set 'this' to.
	 */
	this.once = function(fn, context) { 
		var result;

		return function() { 
			if(fn) {
				result = fn.apply(context || this, arguments);
				fn = null;
			}

			return result;
		};
	}
































	/* ==========================================================================
	   Performance Test Utilities
	   ========================================================================== */
	this.perf = {
		/**
		 * Triggers an action repeatedly for a given time and returns the number of times the function completed.
		 * 
		 * @param  {Function} fn           Function to trigger.
		 * @param  {number}   milliSeconds The time that the function should trigger for.
		 * @return {number}                The number of times the function was triggered.
		 */
		count: function(fn, milliSeconds) {
			var startTime = performance.now(),
				endTime = 0,
				i = 0;

			if (typeof milliSeconds == 'undefined') {
				milliSeconds = 1000;
			}

			while ( endTime - startTime < milliSeconds ) {
				fn();
				i++;
				endTime = performance.now();
			}

			return i;
		},

		/**
		 * Triggers an action a given number of times and returns the average time it took for the function to complete.
		 * 
		 * @param  {Function} fn           Function to trigger.
		 * @param  {number}   times		   The number of times to trigger the functions.
		 * @return {number}                The times it took for the function to trigger under the given timeframe.
		 */
		average: function(fn) {
			var	startTime, endTime,
				i = 0;

			startTime = performance.now();
			while (i < 10000) {
				fn();
				i++;
			}
			endTime = performance.now();
		
			return (endTime - startTime)/10;
		},

		compare: function(fn1, fn2) {
			var fn1Time = this.average(fn1),
				fn2Time = this.average(fn2),
				difference;

			if (fn1Time > fn2Time) {
				difference = Math.round((fn1Time/fn2Time) * 100)/100;
				return 'Second is faster by '+difference+' times.';
			} else {
				difference = Math.round((fn2Time/fn1Time) * 100)/100;
				return 'First is faster by '+difference+' times.';
			}
		},



		'old': {
			count: function(fn, milliSeconds) {
				var startTime = new Date().getTime(),
					endTime = 0,
					repeatFunction = true,
					i = 0;

				if (typeof milliSeconds == 'undefined') {
					var milliSeconds = 5000;
				}

				while ( repeatFunction ) {
					fn.apply(this, arguments);
					i++

					if (endTime - startTime < milliSeconds) {
						endTime = new Date().getTime();
					} else {
						console.log('Completed function ' + i + ' times');
						repeatFunction = false;
					}

				}
			},
			time: function(fn, times) {
				var startTime = new Date().getTime();
				var i = 0;

				if (typeof times == 'undefined') {
					var times = 100000;
				}

				while (i < (times + 1)) {
					fn.apply(this, arguments);

					if (i === times) {
						var endTime = new Date().getTime(),
							finishTime = endTime - startTime;
						console.log(finishTime);
					}

					i++;
				}

			}
		}
	}





















	// ==========================================================================
	// Animation
	// ========================================================================== 
	// var animationFrame = (function(win, t) {
	//   return win["r" + t] || win["webkitR" + t] || win["mozR" + t] || win["msR" + t] || function(fn) { setTimeout(fn, 60); };
	// })(window, "equestAnimationFrame");

	// heightHistory = {'elements': [], 'heights': [], 'displays': []};

	// this.animateHeight = function(el, duration, height, customWidth, targetDisplay){
	// 	var	whenToEnd = Date.now() + duration,
	// 		remaining, startingHeight, targetHeight, currentProgress, inc, indexInHistory, display, onStart, onEnd;
		
	// 	if (typeof height === 'string') {
	// 		startingHeight = el.offsetHeight;
	// 		indexInHistory = heightHistory.elements.indexOf(el);
			
	// 		if (indexInHistory === -1) {
	// 			targetHeight = util.getHiddenElementHeight(el, customWidth);
	// 			display = targetDisplay || getComputedStyle(el).display;
	// 			display = display === 'none' && targetDisplay !== 'none' ? 'block' : display;
			
	// 			heightHistory.elements.push(el);
	// 			heightHistory.heights.push(targetHeight);
	// 			heightHistory.displays.push(display);
	// 		} else {
	// 			targetHeight = heightHistory.heights[indexInHistory];
	// 			display = heightHistory.displays[indexInHistory];
	// 		}


	// 		if (height === 'down') {
	// 			onStart = function(){el.style.overflow = 'hidden'; el.style.display = display;};
	// 			onEnd = function(){};
	// 		} else if (height === 'up') {
	// 			targetHeight = 0;
	// 			onStart = function(){el.style.overflow = 'hidden';};
	// 			onEnd = function(){el.style.display = 'none';};
	// 		}

	// 		// targetHeight = targetHeight - startingHeight;
	// 	}

	// 	return new Promise(function(resolve) {
	// 		currentProgress = startingHeight;
	// 		onStart();
	// 		console.log(startingHeight, targetHeight);

	// 		function step(){
	// 			remaining = whenToEnd - Date.now();
	// 			currentProgress = targetHeight - (remaining/duration)*(targetHeight-startingHeight);

	// 			if(remaining < 60) {
	// 				el.style.height = targetHeight+'px';
	// 				onEnd();
	// 				return resolve();

	// 			} else {
	// 				el.style.height = currentProgress+'px';
	// 			}

	// 			animationFrame(step);
	// 		}
	// 		animationFrame(step);
	// 	});
	// };
























	/* ==========================================================================
	   Object & Array helpers.
	   ========================================================================== */
	
	// ==== Form values to Object coversion for submission =================================================================================
	/**
	 * Finds all field values under a given form and converts the values intro a key:value pair format object for ajax submission.
	 * 
	 * @param  {object} $form jQuery Object that contains the form to be converted.
	 * @return {object}       Data object containing all form values.
	 */
	this.convertFormToObject = function($form, enableFormFields){
		if (enableFormFields) {
			var $inputFields = $form.find('input:disabled').not('disabled_forever');
			$inputFields.prop('disabled', false);
		}
		var fieldData = $form.serializeArray(),
			arrayRegEx = /\[\]$/;
			data = {};

		fieldData.forEach(function(item){
			if (!item.name.includes('_xyz_')) {
				if ( arrayRegEx.test(item.name) ) { // Check if the name of the field is an array
					item.name = item.name.replace('[]', '');
					if (data[item.name]) { // Check if array exists in the new data object.
						data[item.name].push(item.value); // If it does, just push the next value into that array.
					} else {
						if (item.value !== '') {
							data[item.name] = [item.value]; // If not, create a new array and append the first value to it.
						}
					}
				} else {
					data[item.name] = item.value; // If the name of the field isn't an array, just push it as a regular value to the data object.
				}
			}
		});
		if (enableFormFields) $inputFields.prop('disabled', true);
		return data;
	};



	// ==== Convert object to array. =================================================================================
	/**
	 * Converts objects that are number-indexed to an array.
	 * 
	 * @param  {object} object  object to convert to an array.
	 * @return {array}          Newly formed array.
	 */
	this.convertObjectToArray = function(object){
		return Object.keys(object).map(function(key) { return object[key] });
	};

































	/* ==========================================================================
	   Various
	   ========================================================================== */

	// ==== Get Object Length =================================================================================
	/**
	 * Iterites through each direct property in an object and increments an eventually-returned length var;
	 * @param  {obejct} object Object to iterate through
	 * @return {number}        Length of the given object
	 */
	this.objectLength = function(object){
		var length = 0;
		for (i in object) {
			length++;
		}
		return length;
	};

	// ==== String finder =================================================================================
	/**
	 * Searches a given string to see if it contains another string.
	 * @param  {string} haystack String to search in.
	 * @param  {string} needle   String to search for.
	 * @return {bool}         	 Indicator for whether or not the string was found.
	 */
	this.stringContains = function(haystack, needle){
		if (haystack.indexOf(needle) !== -1) {
			return true;
		} else {
			return false;
		}
	};


	// ==== Get the height of a hidden element =================================================================================
	/**
	 * Quickly displays the hidden element and takes it out of context in order to grab its dimensions and then returns it back to the original form.
	 * 
	 * @param  {element} $element       Hidden DOM element.
	 * @param  {string} setCustomWidth Optional width string to set the object to before grabbing the dimentions.
	 * @return {number}                Element's height.
	 */
	this.getHiddenElementHeight = function(el, setCustomWidth){
		var initialStyles = {
			position: 	el.style.position,
			visibility: el.style.visibility,
			display: 	el.style.display,
			width: 	el.style.width
		};
		el.style.position = 'absolute';
		el.style.visibility = 'hidden';
		el.style.display = 'block';
		if (setCustomWidth) {
			el.style.width = setCustomWidth;
		}
		var height = el.offsetHeight;
		
		el.style.position = initialStyles.position;
		el.style.visibility = initialStyles.visibility;
		el.style.display = initialStyles.display;
		if (setCustomWidth) {
			el.style.width = initialStyles.width;
		}

		return height;
	};





	// ==== Clone Node safely (preserving values) =================================================================================
	this.cloneSafe = function(el, returnJquery){
		if (el.constructor === jQuery) {
			el = el[0];
		}
		var cloned, 
			type = el.nodeName;
		
		cloned = el.cloneNode(false);
		if (type === 'TEXTAREA' || type === 'SELECT') {
			cloned.value = el.value;
		}
		if (el.childNodes.length) {
			[].slice.call(el.childNodes).forEach(function(child){
				cloned.appendChild( util.cloneSafe(child) );
			});
		}
		return returnJquery ? jQuery(cloned) : cloned;
	};
	this.cloneNode = this.cloneSafe;




	// ==== Random Number Generator =================================================================================
	this.random = function(decimals){
		var multiplier;
		if (!decimals) {
			multiplier = 10000000;
		} else {
			multiplier = 10;
			for (var i = 1; i < decimals; i++) {
				multiplier = multiplier * 10;
			}
		}

		return Math.floor(Math.random() * multiplier);
	};



	// ==== Get Keycode =================================================================================
	/**
	 * Goes through a given event object and returns the keycode from the property that's supported by the browser.
	 * 
	 * @param  {object} event 					Event Object
	 * @param  {bool} 	returnKeyType			Optional argument to indicate what should be returned form the func.
	 * @return {number || string || bool}       The event's keycode.
	 */
	this.getKeycode = function(event, returnKeyType){
		var keyPressed, explicitKey = false;

		if (event.charCode !== undefined && event.charCode !== 0) {
			keyPressed = event.charCode;
		} else if (event.keyCode !== undefined && event.keyCode !== 0) {
			keyPressed = event.keyCode;
		} else if (event.which !== undefined && event.which !== 0) {
			keyPressed = event.which;
		} else {
			explicitKey = true;
			if (event.key !== undefined) {
				keyPressed = event.key;
			} else if (event.keyIdentifier !== undefined) {
				keyPressed = event.keyIdentifier;
			}
		}
		if (returnKeyType) {
			return explicitKey;
		} else {
			return keyPressed;
		}
	};
	// Alias
	this.getKeyCode = function(event, returnKeyType){ return util.getKeycode(event, returnKeyType); };



	// ==== Capitalize a set of words =================================================================================
	this.capitalize = function(string, delimiter){
		delimiter = delimiter || ' ';
		string = string.split(delimiter)

		string = string.map(function(word){
			return word[0].toUpperCase() + word.slice(1);
		});
		
		return string.join(' ');
	}




	// ==== RegEx =================================================================================
	this.regEx = {
		whiteSpace: /^\s+|\s+$/g,
		email: new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i),
		phone: /^[\W\d\s\-\(\)]+$/,
		fullName: /\w+\s+\w+/
	};






























	/* ==========================================================================
	   Date Helpers
	   ========================================================================== */
	// this.date = {};
	// 	// ==== Months =================================================================================
	// 	this.date.getMonthArray = function(){
	// 		return ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
	// 	};
	// 	this.date.getMonthShortArray = function(){
	// 		return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
	// 	};
	// 	this.date.getMonthName = function(index){
	// 		if (typeof index !== 'number') var index = parseFloat(index) - 1;
	// 		var monthNames = util.date.getMonthArray();
	// 		return monthNames[index];
	// 	};
	// 	this.date.getMonthShortName = function(index){
	// 		if (typeof index !== 'number') var index = parseFloat(index) - 1;
	// 		var monthNames = util.date.getMonthShortArray();
	// 		return monthNames[index];
	// 	};
	// 	this.date.getMonthDaysLimit = function(index){
	// 		if (typeof index !== 'number') var index = parseFloat(index) - 1;
	// 		var monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
	// 		return monthDays[index];
	// 	};
		
	// 	// ==== Days =================================================================================
	// 	this.date.getDayArray = function(){
	// 		return ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
	// 	};
	// 	this.date.getDayShortArray = function(){
	// 		return ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
	// 	};
	// 	this.date.getDayName = function(index){
	// 		if (typeof index !== 'number') var index = parseFloat(index);
	// 		var dayNames = util.date.getDayArray();
	// 		return dayNames[index];
	// 	};
	// 	this.date.getDayShortName = function(index){
	// 		if (typeof index !== 'number') var index = parseFloat(index);
	// 		var dayNames = util.date.getDayShortArray();
	// 		return dayNames[index];
	// 	};


	// 	this.date.getWeekSegment = function(date, month){
	// 		var date = parseFloat(date),
	// 			index;
			
	// 		if (date <= 31)	index = '4';
	// 		if (date <= 21)	index = '3';
	// 		if (date <= 14)	index = '2';
	// 		if (date <= 7) 	index = '1';

	// 		if (month) {
	// 			var weekName = util.date.getMonthShortName(month) + ' ' + index;
	// 		} else {
	// 			var weekName = 'Week ' + index;
	// 		}
	// 		return weekName;
	// 	};

	// 	this.date.goBack = function(date, range){
	// 		var dateBreakdown = date.match(/(\d+)(?:-|\/| |\.)(\d+)(?:-|\/| |\.)(\d+)/),
	// 			day = dateBreakdown[3],
	// 			month = dateBreakdown[2],
	// 			year = dateBreakdown[1];

	// 		if (typeof range === 'number') {
	// 			day = parseFloat(day) - range;
	// 			if (day < 1) { // Check if day is 0 or lower, which indicates that we must go to the previous month.
	// 				day = util.date.getMonthDaysLimit(parseFloat(month) - 2) + day;
	// 				month = parseFloat(month) - 1;
	// 				if (month < 1) { // Check if month is 0 or lower, which indicates that we must go to the previous year.
	// 					month = 12;
	// 					year = parseFloat(year) - 1;
	// 				}
	// 			}
	// 		}
	// 		if (range === 'week') {
	// 			day = parseFloat(day) - 6;
	// 			if (day < 1) { // Check if day is 0 or lower, which indicates that we must go to the previous month.
	// 				day = util.date.getMonthDaysLimit(parseFloat(month) - 2) + day;
	// 				month = parseFloat(month) - 1;
	// 				if (month < 1) { // Check if month is 0 or lower, which indicates that we must go to the previous year.
	// 					month = 12;
	// 					year = parseFloat(year) - 1;
	// 				}
	// 			}
	// 		}
	// 		if (range === 'month') {
	// 			month = parseFloat(month) - 1;
	// 			if (month < 1) { // Check if month is 0 or lower, which indicates that we must go to the previous year.
	// 				month = 12;
	// 				year = parseFloat(year) - 1;
	// 			}
	// 		}
	// 		if (range === 'year') {
	// 			year = parseFloat(year) - 1;
	// 			month = parseFloat(month) + 1;
	// 			day = 1;
	// 		}

	// 		month = month.toString().length < 2 ? '0'+month : month;

	// 		return year +'-'+ month +'-'+ day;
	// 	};





}; var util = new Util(); var utils = util;



// ==== Log =================================================================================
function log() {
  try {
    console.log.apply( console, arguments );
  } catch(e) {
    try {
      opera.postError.apply( opera, arguments );
    } catch(e){
      alert( Array.prototype.join.call( arguments, " " ) );
    }
  }
}





