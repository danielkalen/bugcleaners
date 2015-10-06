/* Array.find()
   ========================================================================== */

if (!Array.prototype.find) {
  Array.prototype.find = function(predicate) {
    if (this === null) {
      throw new TypeError('Array.prototype.find called on null or undefined');
    }
    if (typeof predicate !== 'function') {
      throw new TypeError('predicate must be a function');
    }
    var list = Object(this),
      length = list.length >>> 0;
      thisArg = arguments[1];
      value;

    for (var i = 0; i < length; i++) {
      value = list[i];
      if (predicate.call(thisArg, value, i, list)) {
        return value;
      }
    }
    return undefined;
  };
}




/* Array.findIndex()
   ========================================================================== */
if (!Array.prototype.findIndex) {
  Array.prototype.findIndex = function(predicate) {
    if (this === null) {
      throw new TypeError('Array.prototype.findIndex called on null or undefined');
    }
    if (typeof predicate !== 'function') {
      throw new TypeError('predicate must be a function');
    }
    var list = Object(this),
      length = list.length >>> 0;
      thisArg = arguments[1];
      value;

    for (var i = 0; i < length; i++) {
      value = list[i];
      if (predicate.call(thisArg, value, i, list)) {
        return i;
      }
    }
    return -1;
  };
}




/* Array.forEach()
   ========================================================================== */
if (!Array.prototype.forEach) {
  Array.prototype.forEach = function(callback, thisArg) {
    var T, k;

    if (this == null) throw new TypeError(' this is null or not defined');

    var O = Object(this),
        len = O.length >>> 0;

    if (typeof callback !== "function") throw new TypeError(callback + ' is not a function');

    if (arguments.length > 1) T = thisArg;

    k = 0;
    while (k < len) {
      var kValue;

      if (k in O) {
        kValue = O[k];
        callback.call(T, kValue, k, O);
      } k++;
    }
  };
}



/* Array.from()
   ========================================================================== */
if (!Array.from) {
  Array.from = (function () {
    var toStr = Object.prototype.toString;
    var isCallable = function (fn) {
      return typeof fn === 'function' || toStr.call(fn) === '[object Function]';
    };
    var toInteger = function (value) {
      var number = Number(value);
      if (isNaN(number)) { return 0; }
      if (number === 0 || !isFinite(number)) { return number; }
      return (number > 0 ? 1 : -1) * Math.floor(Math.abs(number));
    };
    var maxSafeInteger = Math.pow(2, 53) - 1;
    var toLength = function (value) {
      var len = toInteger(value);
      return Math.min(Math.max(len, 0), maxSafeInteger);
    };

    return function from(arrayLike/*, mapFn, thisArg */) {
      var C = this,
          items = Object(arrayLike);

      if (arrayLike == null) {
        throw new TypeError("Array.from requires an array-like object - not null or undefined");
      }

      var mapFn = arguments.length > 1 ? arguments[1] : void undefined;
      var T;
      if (typeof mapFn !== 'undefined') {
        if (!isCallable(mapFn)) {
          throw new TypeError('Array.from: when provided, the second argument must be a function');
        }

        if (arguments.length > 2) {
          T = arguments[2];
        }
      }

      var len = toLength(items.length),
          A = isCallable(C) ? Object(new C(len)) : new Array(len),
          k = 0,
          kValue;
      while (k < len) {
        kValue = items[k];
        if (mapFn) {
          A[k] = typeof T === 'undefined' ? mapFn(kValue, k) : mapFn.call(T, kValue, k);
        } else {
          A[k] = kValue;
        }
        k += 1;
      }
      A.length = len;
      return A;
    };
  }());
}







/* Object.forEach()
   ========================================================================== */
if (!Object.prototype.forEach) {
  Object.prototype.forEach = function(callback, thisArg) {
    var T, k;

    if (this == null) throw new TypeError(' this is null or not defined');

    var O = Object(this),
        len = O.length >>> 0;

    if (typeof callback !== "function") throw new TypeError(callback + ' is not a function');

    if (arguments.length > 1) T = thisArg;

    k = 0;
    while (k < len) {
      var kValue;

      if (k in O) {
        kValue = O[k];
        callback.call(T, kValue, k, O);
      } k++;
    }
  };
}








/* Array.add()
   ========================================================================== */
// if (!Array.prototype.add){
//   Array.prototype.add = function(item){
//     if ()
//   };
// }





