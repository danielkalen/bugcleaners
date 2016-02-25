/* ==========================================================================
   Input event polyfill
   ========================================================================== */
!function(e){function t(e){var t=e.nodeName.toUpperCase();return"TEXTAREA"===t||"INPUT"===t}function n(e){m={el:e,value:e.value},d=Object.getOwnPropertyDescriptor(e.constructor.prototype,"value"),Object.defineProperty(m.el,"value",p),m.el.attachEvent("onpropertychange",o)}function u(){m.el&&(delete m.el.value,m.el.detachEvent("onpropertychange",o),m={el:null,value:null},d=null)}function c(t){a?t.fireEvent("on"+e,i()):t.dispatchEvent(i())}function o(e){if("value"===e.propertyName){var t=e.srcElement.value;t!==m.value&&(m.value=t,c(m.el))}}function l(){m.el&&m.el.value!==m.value&&(m.value=m.el.value,c(m.el))}var a="undefined"==typeof document.dispatchEvent,r=document.createElement("input"),v="oninput"in r&&(!("documentMode"in document)||document.documentMode>9),i=function(){var t;return a?(t=document.createEventObject(),t.type="change",t.bubbles=!0,t.cancelable=!1):(t=document.createEvent("CustomEvent"),t.initCustomEvent(e,!0,!1,{})),t},d=null,p={get:function(){return d.get.call(this)},set:function(e){m.value=e,d.set.call(this,e)}},m={el:null,value:null};v?"input"!==e&&document.addEventListener("input",function(e){c(e.target)},!1):(document.attachEvent("onfocusin",function(e){t(e.srcElement)&&(u(),n(e.srcElement))}),document.attachEvent("onfocusout",function(){u()}),document.attachEvent("onselectionchange",l),document.attachEvent("onkeyup",l),document.attachEvent("onkeydown",l))}("input");


/* ==========================================================================
   Placeholder Polyfill
   ========================================================================== */
!function(e,t,l){function n(e){function t(){return i=h(e)}function l(){setTimeout(function(){var l=i,n=t();l!==n&&e.__placeholder&&(e.value=n),e.__placeholder&&e.value!==n&&(e.__placeholder=!1)},0)}function n(){e.value?c():a()}function a(){e.__placeholder||e.value||r()}function r(){e.__placeholder=!0,e.value=t(),d(e,"-placeholder")}function c(){e.__placeholder&&(e.__placeholder=!1,e.value="",p(e,"-placeholder"))}if(null!=e.__placeholder)return void(e.__placeholder&&(e.value=t()));var i=h(e);e.value?(e.__placeholder=!1,e.value===t()&&r()):a(),o(e,"keyup",n),o(e,"keyDown",n),o(e,"blur",n),o(e,"focus",c),o(e,"click",c),e.addEventListener?o(e,"DOMAttrModified",l):e.attachEvent&&"onpropertychange"in e&&o(e,"propertychange",l)}function a(){var e=[];return c(arguments,function(t){"number"!=typeof t.length&&(t=[t]),e.push.apply(e,i(t,r))}),e}function r(e){var t=(e.nodeName||"").toLowerCase();return"textarea"===t||"input"===t&&("text"===e.type||"password"===e.type)}function o(e,t,l){e.addEventListener?e.addEventListener(t,l,!1):e.attachEvent&&e.attachEvent("on"+t,l)}function c(e,t){if(e.forEach)return e.forEach(t);for(var l=0,n=e.length;n>l;l++)t.call(null,e[l],l,e)}function i(e,t){if(e.filter)return e.filter(t);for(var l=[],n=0,a=e.length;a>n;n++)t.call(null,e[n],n,e)&&l.push(e[n]);return l}function u(e){return y[e]||(y[e]=new RegExp("(^|\\s)+"+e+"(\\s|$)+","g")),y[e]}function d(e,t){e.className+=" "+t}function p(e,t){e.className=e.className.replace(u(t)," ")}function h(e){return e.getAttribute("placeholder")||e.attributes.placeholder&&e.attributes.placeholder.nodeValue}function f(){var e=t.styleSheets&&t.styleSheets[0];if(!e){var l=(t.head||t.getElementsByTagName("head")[0],t.createElement("style"));l.appendChild(t.createTextNode("")),t.head.appendChild(l),e=l.sheet}return e}if("placeholder"in t.createElement("input"))return t.placeholderPolyfill=function(){},void(t.placeholderPolyfill.active=!1);var s=t.getElementsByTagName("input"),v=t.getElementsByTagName("textarea");t.placeholderPolyfill=function(e){e=e?a(e):a(s,v),c(e,n)},t.placeholderPolyfill.active=!0,t.placeholderPolyfill(),t.addEventListener?(t.addEventListener("DOMAttrModified",t.placeholderPolyfill),t.addEventListener("DOMNodeInserted",t.placeholderPolyfill)):t.attachEvent&&"onpropertychange"in t&&t.attachEvent("onpropertychange",t.placeholderPolyfill),f().addRule(".-placeholder","color: #888;",0);var y={}}(window,document);





/* ==========================================================================
   Collections polyfill
   ========================================================================== */
(function(e){function f(a,c){function b(a){if(!this||this.constructor!==b)return new b(a);this._keys=[];this._values=[];this._itp=[];this.objectOnly=c;a&&v.call(this,a)}c||w(a,"size",{get:x});a.constructor=b;b.prototype=a;return b}function v(a){this.add?a.forEach(this.add,this):a.forEach(function(a){this.set(a[0],a[1])},this)}function d(a){this.has(a)&&(this._keys.splice(b,1),this._values.splice(b,1),this._itp.forEach(function(a){b<a[0]&&a[0]--}));return-1<b}function m(a){return this.has(a)?this._values[b]:void 0}function n(a,c){if(this.objectOnly&&c!==Object(c))throw new TypeError("Invalid value used as weak collection key");if(c!=c||0===c)for(b=a.length;b--&&!y(a[b],c););else b=a.indexOf(c);return-1<b}function p(a){return n.call(this,this._values,a)}function q(a){return n.call(this,this._keys,a)}function r(a,c){this.has(a)?this._values[b]=c:this._values[this._keys.push(a)-1]=c;return this}function t(a){this.has(a)||this._values.push(a);return this}function h(){(this._keys||0).length=this._values.length=0}function z(){return k(this._itp,this._keys)}function l(){return k(this._itp,this._values)}function A(){return k(this._itp,this._keys,this._values)}function B(){return k(this._itp,this._values,this._values)}function k(a,c,b){var g=[0],e=!1;a.push(g);return{next:function(){var f,d=g[0];!e&&d<c.length?(f=b?[c[d],b[d]]:c[d],g[0]++):(e=!0,a.splice(a.indexOf(g),1));return{done:e,value:f}}}}function x(){return this._values.length}function u(a,c){for(var b=this.entries();;){var d=b.next();if(d.done)break;a.call(c,d.value[1],d.value[0],this)}}var b,w=Object.defineProperty,y=function(a,b){return isNaN(a)?isNaN(b):a===b};"undefined"==typeof WeakMap&&(e.WeakMap=f({"delete":d,clear:h,get:m,has:q,set:r},!0));"undefined"!=typeof Map&&"function"===typeof(new Map).values&&(new Map).values().next||(e.Map=f({"delete":d,has:q,get:m,set:r,keys:z,values:l,entries:A,forEach:u,clear:h}));"undefined"!=typeof Set&&"function"===typeof(new Set).values&&(new Set).values().next||(e.Set=f({has:p,add:t,"delete":d,clear:h,keys:l,values:l,entries:B,forEach:u}));"undefined"==typeof WeakSet&&(e.WeakSet=f({"delete":d,add:t,clear:h,has:p},!0))})("undefined"!=typeof exports&&"undefined"!=typeof global?global:window);




/* ==========================================================================
   Array.find()
   ========================================================================== */
if (!Array.prototype.find) {
	Array.prototype.find = function (callback, thisArg) {
		var val;
		this.forEach(function (elmVal, i, arr) {
			if (callback.call(thisArg, elmVal, i, arr)) {if (!val) val=elmVal;}
		});
		return val;
	};
}




/* ==========================================================================
   Array.findIndex()
   ========================================================================== */
// if (!Array.prototype.findIndex) {
//   Array.prototype.findIndex = function(predicate) {
//     if (this === null) {
//       throw new TypeError('Array.prototype.findIndex called on null or undefined');
//     }
//     if (typeof predicate !== 'function') {
//       throw new TypeError('predicate must be a function');
//     }
//     var list = Object(this),
//       length = list.length >>> 0;
//       thisArg = arguments[1];
//       value;

//     for (var i = 0; i < length; i++) {
//       value = list[i];
//       if (predicate.call(thisArg, value, i, list)) {
//         return i;
//       }
//     }
//     return -1;
//   };
// }



/* ==========================================================================
   Array.isArray()
   ========================================================================== */
if (!Array.prototype.isArray) {
	Array.prototype.isArray = function(arg) {
		return Object.prototype.toString.call(arg) === '[object Array]';
	};
}


/* ==========================================================================
   Array.includes()
   ========================================================================== */
if (!Array.prototype.includes) {
	Array.prototype.includes = function(searchElement) {return this.indexOf(searchElement);};
}



/* ==========================================================================
   Array.forEach()
   ========================================================================== */
if (!Array.prototype.forEach) {
	Array.prototype.forEach = function (fn, arg) {
		var arr = this,
			len = arr.length,
			thisArg = arg ? arg : undefined,
			i;
		for (i = 0; i < len; i += 1) {
			if (arr.hasOwnProperty(i)) {
				fn.call(thisArg, arr[i], i, arr);
			}
		}
		return undefined;
	};
}



/* ==========================================================================
   Array.from()
   ========================================================================== */
if (!Array.prototype.from) {
    Array.prototype.from = function (object){return [].slice.call(object);};
}








/* ==========================================================================
   String.includes()
   ========================================================================== */
if (!String.prototype.includes) {
	String.prototype.includes = function(str, start) {
		return String.prototype.indexOf(str, start||0) !== -1;
	};
}



/* ==========================================================================
   String.endsWith()
   ========================================================================== */
if (!String.prototype.endsWith) {
	String.prototype.endsWith = function(str) {
		return this.indexOf(str, this.length - str.length) !== -1;
	};
}


/* ==========================================================================
   String.startsWith()
   ========================================================================== */
if (!String.prototype.startsWith) {
	String.prototype.startsWith = function(str, pos) {
		return this.indexOf(str, pos||0) === 0;
	};
}



/* ==========================================================================
   String.repeat()
   ========================================================================== */
if (!String.prototype.repeat) {
	String.prototype.repeat = function(n) {
		var rpt = '', i;
		for (i = 0; i < n; i++) {
			rpt += str;
		}
		return rpt;
	}
}



/* ==========================================================================
   ClassList polyfill
   ========================================================================== */
(function () {
	if (typeof window.Element === "undefined" || "classList" in document.documentElement) return;

	var prototype = Array.prototype,
			push = prototype.push,
			splice = prototype.splice,
			join = prototype.join;

	function DOMTokenList(el) {
		this.el = el;
		// The className needs to be trimmed and split on whitespace
		// to retrieve a list of classes.
		var classes = el.className.replace(/^\s+|\s+$/g,'').split(/\s+/);
		for (var i = 0; i < classes.length; i++) {
			push.call(this, classes[i]);
		}
	};

	DOMTokenList.prototype = {
		add: function(token) {
			if(this.contains(token)) return;
			push.call(this, token);
			this.el.className = this.toString();
		},
		contains: function(token) {
			return this.el.className.indexOf(token) != -1;
		},
		item: function(index) {
			return this[index] || null;
		},
		remove: function(token) {
			if (!this.contains(token)) return;
			for (var i = 0; i < this.length; i++) {
				if (this[i] == token) break;
			}
			splice.call(this, i, 1);
			this.el.className = this.toString();
		},
		toString: function() {
			return join.call(this, ' ');
		},
		toggle: function(token) {
			if (!this.contains(token)) {
				this.add(token);
			} else {
				this.remove(token);
			}

			return this.contains(token);
		}
	};

	window.DOMTokenList = DOMTokenList;

	function defineElementGetter (obj, prop, getter) {
			if (Object.defineProperty) {
					Object.defineProperty(obj, prop,{
							get : getter
					});
			} else {
					obj.__defineGetter__(prop, getter);
			}
	}

	defineElementGetter(Element.prototype, 'classList', function () {
		return new DOMTokenList(this);
	});
})();






/* ==========================================================================
   Promises
   ========================================================================== */
if (!Promise) {
  	window.Promise = function(e){
    	"use strict";
    	if(!(this instanceof Promise)){throw new TypeError('Constructor Promise requires "new"')}if(this&&this._promise){throw new TypeError("Bad construction")}if(!oe.IsCallable(e)){throw new TypeError("not a valid resolver")}var t=ie(this,Promise,w,{_promise:{result:void 0,state:s,fulfillReactions:[],rejectReactions:[]}});var r=g(t);var n=r.reject;try{e(r.resolve,n)}catch(o){n(o)}return t
	};
}