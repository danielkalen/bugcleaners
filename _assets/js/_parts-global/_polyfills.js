/* ES6 Shim
   ========================================================================== */
// (function(e,t){if(typeof define==="function"&&define.amd){define(t)}else if(typeof exports==="object"){module.exports=t()}else{e.returnExports=t()}})(this,function(){"use strict";var e=Function.call.bind(Function.apply);var t=Function.call.bind(Function.call);var r=Array.isArray;var n=function notThunker(t){return function notThunk(){return!e(t,this,arguments)}};var o=function(e){try{e();return false}catch(t){return true}};var i=function valueOrFalseIfThrows(e){try{return e()}catch(t){return false}};var a=n(o);var u=function(){return!o(function(){Object.defineProperty({},"x",{get:function(){}})})};var s=!!Object.defineProperty&&u();var f=function foo(){}.name==="foo";var c=Function.call.bind(Array.prototype.forEach);var l=Function.call.bind(Array.prototype.reduce);var p=Function.call.bind(Array.prototype.filter);var v=Function.call.bind(Array.prototype.every);var y=function createDataProperty(e,t,r){if(s){Object.defineProperty(e,t,{configurable:true,enumerable:true,writable:true,value:r})}else{e[t]=r}};var h=function createDataPropertyOrThrow(e,t,r){y(e,t,r);if(!oe.SameValue(e[t],r)){throw new TypeError("property is nonconfigurable")}};var g=function(e,t,r,n){if(!n&&t in e){return}if(s){Object.defineProperty(e,t,{configurable:true,enumerable:false,writable:true,value:r})}else{e[t]=r}};var b=function(e,t){c(Object.keys(t),function(r){var n=t[r];g(e,r,n,false)})};var d=Object.create||function(e,t){var r=function Prototype(){};r.prototype=e;var n=new r;if(typeof t!=="undefined"){Object.keys(t).forEach(function(e){V.defineByDescriptor(n,e,t[e])})}return n};var m=function(e,t){if(!Object.setPrototypeOf){return false}return i(function(){var r=function Subclass(t){var r=new e(t);Object.setPrototypeOf(r,Subclass.prototype);return r};Object.setPrototypeOf(r,e);r.prototype=d(e.prototype,{constructor:{value:r}});return t(r)})};var O=function(){return String.prototype.startsWith&&o(function(){"/a/".startsWith(/a/)})};var w=function(){return String.prototype.startsWith&&"abc".startsWith("a",Infinity)===false}();var j=function(){if(typeof self!=="undefined"){return self}if(typeof window!=="undefined"){return window}if(typeof global!=="undefined"){return global}throw new Error("unable to locate global object")};var S=j();var T=S.isFinite;var I=function(){return this===null}.call(null);var E=O()&&w;var M=Function.call.bind(String.prototype.indexOf);var P=Function.call.bind(Object.prototype.toString);var x=Function.call.bind(Array.prototype.concat);var N=Function.call.bind(String.prototype.slice);var C=Function.call.bind(Array.prototype.push);var A=Function.apply.bind(Array.prototype.push);var _=Function.call.bind(Array.prototype.shift);var k=Math.max;var R=Math.min;var F=Math.floor;var D=Math.abs;var z=Math.log;var L=Math.sqrt;var q=Function.call.bind(Object.prototype.hasOwnProperty);var G;var W=function(){};var H=S.Symbol||{};var B=H.species||"@@species";var V={getter:function(e,t,r){if(!s){throw new TypeError("getters require true ES5 support")}Object.defineProperty(e,t,{configurable:true,enumerable:false,get:r})},proxy:function(e,t,r){if(!s){throw new TypeError("getters require true ES5 support")}var n=Object.getOwnPropertyDescriptor(e,t);Object.defineProperty(r,t,{configurable:n.configurable,enumerable:n.enumerable,get:function getKey(){return e[t]},set:function setKey(r){e[t]=r}})},redefine:function(e,t,r){if(s){var n=Object.getOwnPropertyDescriptor(e,t);n.value=r;Object.defineProperty(e,t,n)}else{e[t]=r}},defineByDescriptor:function(e,t,r){if(s){Object.defineProperty(e,t,r)}else if("value"in r){e[t]=r.value}},preserveToString:function(e,t){g(e,"toString",t.toString.bind(t),true)}};var $=function wrapConstructor(e,t,r){V.preserveToString(t,e);if(Object.setPrototypeOf){Object.setPrototypeOf(e,t)}c(Object.getOwnPropertyNames(e),function(n){if(n in W||r[n]){return}V.proxy(e,n,t)});t.prototype=e.prototype;V.redefine(e.prototype,"constructor",t)};var J=function(){return this};var U=function(e){if(s&&!q(e,B)){V.getter(e,B,J)}};var K={primitive:function(e){return e===null||typeof e!=="function"&&typeof e!=="object"},object:function(e){return e!==null&&typeof e==="object"},string:function(e){return P(e)==="[object String]"},regex:function(e){return P(e)==="[object RegExp]"},symbol:function(e){return typeof S.Symbol==="function"&&typeof e==="symbol"}};var X=Number.isNaN||function isNaN(e){return e!==e};var Z=Number.isFinite||function isFinite(e){return typeof e==="number"&&T(e)};var Q=function overrideNative(e,t,r){var n=e[t];g(e,t,r,true);V.preserveToString(e[t],n)};var Y=K.symbol(H.iterator)?H.iterator:"_es6-shim iterator_";if(S.Set&&typeof(new S.Set)["@@iterator"]==="function"){Y="@@iterator"}var ee=function(e,t){var r=t||function iterator(){return this};g(e,Y,r);if(!e[Y]&&K.symbol(Y)){e[Y]=r}};var te=function isArguments(e){return P(e)==="[object Arguments]"};var re=function isArguments(e){return e!==null&&typeof e==="object"&&typeof e.length==="number"&&e.length>=0&&P(e)!=="[object Array]"&&P(e.callee)==="[object Function]"};var ne=te(arguments)?te:re;var oe={Call:function Call(t,r){var n=arguments.length>2?arguments[2]:[];if(!oe.IsCallable(t)){throw new TypeError(t+" is not a function")}return e(t,r,n)},RequireObjectCoercible:function(e,t){if(e==null){throw new TypeError(t||"Cannot call method on "+e)}},TypeIsObject:function(e){return e!=null&&Object(e)===e},ToObject:function(e,t){oe.RequireObjectCoercible(e,t);return Object(e)},IsCallable:function(e){return typeof e==="function"&&P(e)==="[object Function]"},IsConstructor:function(e){return oe.IsCallable(e)},ToInt32:function(e){return oe.ToNumber(e)>>0},ToUint32:function(e){return oe.ToNumber(e)>>>0},ToNumber:function(e){if(P(e)==="[object Symbol]"){throw new TypeError("Cannot convert a Symbol value to a number")}return+e},ToInteger:function(e){var t=oe.ToNumber(e);if(X(t)){return 0}if(t===0||!Z(t)){return t}return(t>0?1:-1)*F(D(t))},ToLength:function(e){var t=oe.ToInteger(e);if(t<=0){return 0}if(t>Number.MAX_SAFE_INTEGER){return Number.MAX_SAFE_INTEGER}return t},SameValue:function(e,t){if(e===t){if(e===0){return 1/e===1/t}return true}return X(e)&&X(t)},SameValueZero:function(e,t){return e===t||X(e)&&X(t)},IsIterable:function(e){return oe.TypeIsObject(e)&&(typeof e[Y]!=="undefined"||ne(e))},GetIterator:function(e){if(ne(e)){return new G(e,"value")}var r=oe.GetMethod(e,Y);if(!oe.IsCallable(r)){throw new TypeError("value is not an iterable")}var n=t(r,e);if(!oe.TypeIsObject(n)){throw new TypeError("bad iterator")}return n},GetMethod:function(e,t){var r=oe.ToObject(e)[t];if(r===void 0||r===null){return void 0}if(!oe.IsCallable(r)){throw new TypeError("Method not callable: "+t)}return r},IteratorComplete:function(e){return!!e.done},IteratorClose:function(e,r){var n=oe.GetMethod(e,"return");if(n===void 0){return}var o,i;try{o=t(n,e)}catch(a){i=a}if(r){return}if(i){throw i}if(!oe.TypeIsObject(o)){throw new TypeError("Iterator's return method returned a non-object.")}},IteratorNext:function(e){var t=arguments.length>1?e.next(arguments[1]):e.next();if(!oe.TypeIsObject(t)){throw new TypeError("bad iterator")}return t},IteratorStep:function(e){var t=oe.IteratorNext(e);var r=oe.IteratorComplete(t);return r?false:t},Construct:function(e,t,r,n){if(r===void 0){r=e}if(!n){return dr.construct(e,t,r)}var o=r.prototype;if(!oe.TypeIsObject(o)){o=Object.prototype}var i=d(o);var a=oe.Call(e,i,t);return oe.TypeIsObject(a)?a:i},SpeciesConstructor:function(e,t){var r=e.constructor;if(r===void 0){return t}if(!oe.TypeIsObject(r)){throw new TypeError("Bad constructor")}var n=r[B];if(n===void 0||n===null){return t}if(!oe.IsConstructor(n)){throw new TypeError("Bad @@species")}return n},CreateHTML:function(e,t,r,n){var o=String(e);var i="<"+t;if(r!==""){var a=String(n);var u=a.replace(/"/g,"&quot;");i+=" "+r+'="'+u+'"'}var s=i+">";var f=s+o;return f+"</"+t+">"}};var ie=function(e,t,r,n){if(!oe.TypeIsObject(e)){throw new TypeError("Constructor requires `new`: "+t.name)}var o=t.prototype;if(!oe.TypeIsObject(o)){o=r}e=d(o);for(var i in n){if(q(n,i)){var a=n[i];g(e,i,a,true)}}return e};if(String.fromCodePoint&&String.fromCodePoint.length!==1){var ae=String.fromCodePoint;Q(String,"fromCodePoint",function fromCodePoint(t){return e(ae,this,arguments)})}var ue={fromCodePoint:function fromCodePoint(e){var t=[];var r;for(var n=0,o=arguments.length;n<o;n++){r=Number(arguments[n]);if(!oe.SameValue(r,oe.ToInteger(r))||r<0||r>1114111){throw new RangeError("Invalid code point "+r)}if(r<65536){C(t,String.fromCharCode(r))}else{r-=65536;C(t,String.fromCharCode((r>>10)+55296));C(t,String.fromCharCode(r%1024+56320))}}return t.join("")},raw:function raw(e){var t=oe.ToObject(e,"bad callSite");var r=oe.ToObject(t.raw,"bad raw value");var n=r.length;var o=oe.ToLength(n);if(o<=0){return""}var i=[];var a=0;var u,s,f,c;while(a<o){u=String(a);f=String(r[u]);C(i,f);if(a+1>=o){break}s=a+1<arguments.length?arguments[a+1]:"";c=String(s);C(i,c);a++}return i.join("")}};b(String,ue);if(String.raw({raw:{0:"x",1:"y",length:2}})!=="xy"){Q(String,"raw",ue.raw)}var se=function repeat(e,t){if(t<1){return""}if(t%2){return repeat(e,t-1)+e}var r=repeat(e,t/2);return r+r};var fe=Infinity;var ce={repeat:function repeat(e){oe.RequireObjectCoercible(this);var t=String(this);var r=oe.ToInteger(e);if(r<0||r>=fe){throw new RangeError("repeat count must be less than infinity and not overflow maximum string size")}return se(t,r)},startsWith:function startsWith(e){oe.RequireObjectCoercible(this);var t=String(this);if(K.regex(e)){throw new TypeError('Cannot call method "startsWith" with a regex')}var r=String(e);var n=arguments.length>1?arguments[1]:void 0;var o=k(oe.ToInteger(n),0);return N(t,o,o+r.length)===r},endsWith:function endsWith(e){oe.RequireObjectCoercible(this);var t=String(this);if(K.regex(e)){throw new TypeError('Cannot call method "endsWith" with a regex')}var r=String(e);var n=t.length;var o=arguments.length>1?arguments[1]:void 0;var i=typeof o==="undefined"?n:oe.ToInteger(o);var a=R(k(i,0),n);return N(t,a-r.length,a)===r},includes:function includes(e){if(K.regex(e)){throw new TypeError('"includes" does not accept a RegExp')}var t;if(arguments.length>1){t=arguments[1]}return M(this,e,t)!==-1},codePointAt:function codePointAt(e){oe.RequireObjectCoercible(this);var t=String(this);var r=oe.ToInteger(e);var n=t.length;if(r>=0&&r<n){var o=t.charCodeAt(r);var i=r+1===n;if(o<55296||o>56319||i){return o}var a=t.charCodeAt(r+1);if(a<56320||a>57343){return o}return(o-55296)*1024+(a-56320)+65536}}};b(String.prototype,ce);if("a".includes("a",Infinity)!==false){Q(String.prototype,"includes",ce.includes)}var le="\x85".trim().length!==1;if(le){delete String.prototype.trim;var pe=[" \n\f\r \xa0\u1680\u180e\u2000\u2001\u2002\u2003","\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028","\u2029\ufeff"].join("");var ve=new RegExp("(^["+pe+"]+)|(["+pe+"]+$)","g");b(String.prototype,{trim:function trim(){if(typeof this==="undefined"||this===null){throw new TypeError("can't convert "+this+" to object")}return String(this).replace(ve,"")}})}var ye=function(e){oe.RequireObjectCoercible(e);this._s=String(e);this._i=0};ye.prototype.next=function(){var e=this._s,t=this._i;if(typeof e==="undefined"||t>=e.length){this._s=void 0;return{value:void 0,done:true}}var r=e.charCodeAt(t),n,o;if(r<55296||r>56319||t+1===e.length){o=1}else{n=e.charCodeAt(t+1);o=n<56320||n>57343?1:2}this._i=t+o;return{value:e.substr(t,o),done:false}};ee(ye.prototype);ee(String.prototype,function(){return new ye(this)});if(!E){Q(String.prototype,"startsWith",ce.startsWith);Q(String.prototype,"endsWith",ce.endsWith)}var he={from:function from(e){var r=this;var n=arguments.length>1?arguments[1]:void 0;var o,i;if(n===void 0){o=false}else{if(!oe.IsCallable(n)){throw new TypeError("Array.from: when provided, the second argument must be a function")}i=arguments.length>2?arguments[2]:void 0;o=true}var a=ne(e)||oe.GetMethod(e,Y);var u,s,f;if(a!==void 0){s=oe.IsConstructor(r)?Object(new r):[];var c=oe.GetIterator(e);var l,p;f=0;while(true){l=oe.IteratorStep(c);if(l===false){break}p=l.value;try{if(o){p=i!==undefined?t(n,i,p,f):n(p,f)}s[f]=p}catch(v){oe.IteratorClose(c,true);throw v}f+=1}u=f}else{var y=oe.ToObject(e);u=oe.ToLength(y.length);s=oe.IsConstructor(r)?Object(new r(u)):new Array(u);var h;for(f=0;f<u;++f){h=y[f];if(o){h=i!==undefined?t(n,i,h,f):n(h,f)}s[f]=h}}s.length=u;return s},of:function of(){var e=arguments.length;var t=this;var n=r(t)||!oe.IsCallable(t)?new Array(e):oe.Construct(t,[e]);for(var o=0;o<e;++o){h(n,o,arguments[o])}n.length=e;return n}};b(Array,he);U(Array);var ge=function(e){return{value:e,done:arguments.length===0}};G=function(e,t){this.i=0;this.array=e;this.kind=t};b(G.prototype,{next:function(){var e=this.i,t=this.array;if(!(this instanceof G)){throw new TypeError("Not an ArrayIterator")}if(typeof t!=="undefined"){var r=oe.ToLength(t.length);for(;e<r;e++){var n=this.kind;var o;if(n==="key"){o=e}else if(n==="value"){o=t[e]}else if(n==="entry"){o=[e,t[e]]}this.i=e+1;return{value:o,done:false}}}this.array=void 0;return{value:void 0,done:true}}});ee(G.prototype);var be=function(e,t){b(this,{object:e,array:de(e),kind:t})};var de=function getAllKeys(e){var t=[];for(var r in e){C(t,r)}return t};b(be.prototype,{next:function next(){var e;var t=this.array;if(!(this instanceof be)){throw new TypeError("Not an ObjectIterator")}while(t.length>0){e=_(t);if(!(e in this.object)){continue}if(this.kind==="key"){return ge(e)}else if(this.kind==="value"){return ge(this.object[e])}else{return ge([e,this.object[e]])}}return ge()}});ee(be.prototype);var me=Array.of===he.of||function(){var e=function Foo(e){this.length=e};e.prototype=[];var t=Array.of.apply(e,[1,2]);return t instanceof e&&t.length===2}();if(!me){Q(Array,"of",he.of)}var Oe={copyWithin:function copyWithin(e,t){var r=arguments[2];var n=oe.ToObject(this);var o=oe.ToLength(n.length);var i=oe.ToInteger(e);var a=oe.ToInteger(t);var u=i<0?k(o+i,0):R(i,o);var s=a<0?k(o+a,0):R(a,o);r=typeof r==="undefined"?o:oe.ToInteger(r);var f=r<0?k(o+r,0):R(r,o);var c=R(f-s,o-u);var l=1;if(s<u&&u<s+c){l=-1;s+=c-1;u+=c-1}while(c>0){if(q(n,s)){n[u]=n[s]}else{delete n[s]}s+=l;u+=l;c-=1}return n},fill:function fill(e){var t=arguments.length>1?arguments[1]:void 0;var r=arguments.length>2?arguments[2]:void 0;var n=oe.ToObject(this);var o=oe.ToLength(n.length);t=oe.ToInteger(typeof t==="undefined"?0:t);r=oe.ToInteger(typeof r==="undefined"?o:r);var i=t<0?k(o+t,0):R(t,o);var a=r<0?o+r:r;for(var u=i;u<o&&u<a;++u){n[u]=e}return n},find:function find(e){var r=oe.ToObject(this);var n=oe.ToLength(r.length);if(!oe.IsCallable(e)){throw new TypeError("Array#find: predicate must be a function")}var o=arguments.length>1?arguments[1]:null;for(var i=0,a;i<n;i++){a=r[i];if(o){if(t(e,o,a,i,r)){return a}}else if(e(a,i,r)){return a}}},findIndex:function findIndex(e){var r=oe.ToObject(this);var n=oe.ToLength(r.length);if(!oe.IsCallable(e)){throw new TypeError("Array#findIndex: predicate must be a function")}var o=arguments.length>1?arguments[1]:null;for(var i=0;i<n;i++){if(o){if(t(e,o,r[i],i,r)){return i}}else if(e(r[i],i,r)){return i}}return-1},keys:function keys(){return new G(this,"key")},values:function values(){return new G(this,"value")},entries:function entries(){return new G(this,"entry")}};if(Array.prototype.keys&&!oe.IsCallable([1].keys().next)){delete Array.prototype.keys}if(Array.prototype.entries&&!oe.IsCallable([1].entries().next)){delete Array.prototype.entries}if(Array.prototype.keys&&Array.prototype.entries&&!Array.prototype.values&&Array.prototype[Y]){b(Array.prototype,{values:Array.prototype[Y]});if(K.symbol(H.unscopables)){Array.prototype[H.unscopables].values=true}}if(f&&Array.prototype.values&&Array.prototype.values.name!=="values"){var we=Array.prototype.values;Q(Array.prototype,"values",function values(){return t(we,this)});g(Array.prototype,Y,Array.prototype.values,true)}b(Array.prototype,Oe);ee(Array.prototype,function(){return this.values()});if(Object.getPrototypeOf){ee(Object.getPrototypeOf([].values()))}var je=function(){return i(function(){return Array.from({length:-1}).length===0})}();var Se=function(){var e=Array.from([0].entries());return e.length===1&&r(e[0])&&e[0][0]===0&&e[0][1]===0}();if(!je||!Se){Q(Array,"from",he.from)}var Te=function(){return i(function(){return Array.from([0],undefined)})}();if(!Te){var Ie=Array.from;Q(Array,"from",function from(r){if(arguments.length>0&&typeof arguments[1]!=="undefined"){return e(Ie,this,arguments)}else{return t(Ie,this,r)}})}var Ee=function(e,r){var n={length:-1};n[r?(-1>>>0)-1:0]=true;return i(function(){t(e,n,function(){throw new RangeError("should not reach here")},[])})};if(!Ee(Array.prototype.forEach)){var Me=Array.prototype.forEach;Q(Array.prototype,"forEach",function forEach(t){return e(Me,this.length>=0?this:[],arguments)},true)}if(!Ee(Array.prototype.map)){var Pe=Array.prototype.map;Q(Array.prototype,"map",function map(t){return e(Pe,this.length>=0?this:[],arguments)},true)}if(!Ee(Array.prototype.filter)){var xe=Array.prototype.filter;Q(Array.prototype,"filter",function filter(t){return e(xe,this.length>=0?this:[],arguments)},true)}if(!Ee(Array.prototype.some)){var Ne=Array.prototype.some;Q(Array.prototype,"some",function some(t){return e(Ne,this.length>=0?this:[],arguments)},true)}if(!Ee(Array.prototype.every)){var Ce=Array.prototype.every;Q(Array.prototype,"every",function every(t){return e(Ce,this.length>=0?this:[],arguments)},true)}if(!Ee(Array.prototype.reduce)){var Ae=Array.prototype.reduce;Q(Array.prototype,"reduce",function reduce(t){return e(Ae,this.length>=0?this:[],arguments)},true)}if(!Ee(Array.prototype.reduceRight,true)){var _e=Array.prototype.reduceRight;Q(Array.prototype,"reduceRight",function reduceRight(t){return e(_e,this.length>=0?this:[],arguments)},true)}if(Number("0o10")!==8||Number("0b10")!==2){var ke=Number;var Re=/^0b/i;var Fe=/^0o/i;var De=Re.test.bind(Re);var ze=Fe.test.bind(Fe);var Le=function(e){var t;if(typeof e.valueOf==="function"){t=e.valueOf();if(K.primitive(t)){return t}}if(typeof e.toString==="function"){t=e.toString();if(K.primitive(t)){return t}}throw new TypeError("No default value")};var qe=function(){return function Number(e){var t=K.primitive(e)?e:Le(e,"number");if(typeof t==="string"){if(De(t)){t=parseInt(N(t,2),2)}else if(ze(t)){t=parseInt(N(t,2),8)}}if(this instanceof Number){return new ke(t)}return ke(t)}}();$(ke,qe,{});Number=qe;V.redefine(S,"Number",qe)}var Ge=Math.pow(2,53)-1;b(Number,{MAX_SAFE_INTEGER:Ge,MIN_SAFE_INTEGER:-Ge,EPSILON:2.220446049250313e-16,parseInt:S.parseInt,parseFloat:S.parseFloat,isFinite:Z,isInteger:function isInteger(e){return Z(e)&&oe.ToInteger(e)===e},isSafeInteger:function isSafeInteger(e){return Number.isInteger(e)&&D(e)<=Number.MAX_SAFE_INTEGER},isNaN:X});g(Number,"parseInt",S.parseInt,Number.parseInt!==S.parseInt);if(![,1].find(function(e,t){return t===0})){Q(Array.prototype,"find",Oe.find)}if([,1].findIndex(function(e,t){return t===0})!==0){Q(Array.prototype,"findIndex",Oe.findIndex)}var We=Function.bind.call(Function.bind,Object.prototype.propertyIsEnumerable);var He=function sliceArgs(){var e=Number(this);var t=arguments.length;var r=t-e;var n=new Array(r<0?0:r);for(var o=e;o<t;++o){n[o-e]=arguments[o]}return n};var Be=function assignTo(e){return function assignToSource(t,r){t[r]=e[r];return t}};var Ve=function(e,t){var r=Object.keys(Object(t));var n;if(oe.IsCallable(Object.getOwnPropertySymbols)){n=p(Object.getOwnPropertySymbols(Object(t)),We(t))}return l(x(r,n||[]),Be(t),e)};var $e={assign:function(t,r){var n=oe.ToObject(t,"Cannot convert undefined or null to object");return l(e(He,1,arguments),Ve,n)},is:function is(e,t){return oe.SameValue(e,t)}};var Je=Object.assign&&Object.preventExtensions&&function(){var e=Object.preventExtensions({1:2});try{Object.assign(e,"xy")}catch(t){return e[1]==="y"}}();if(Je){Q(Object,"assign",$e.assign)}b(Object,$e);if(s){var Ue={setPrototypeOf:function(e,r){var n;var o=function(e,t){if(!oe.TypeIsObject(e)){throw new TypeError("cannot set prototype on a non-object")}if(!(t===null||oe.TypeIsObject(t))){throw new TypeError("can only set prototype to an object or null"+t)}};var i=function(e,r){o(e,r);t(n,e,r);return e};try{n=e.getOwnPropertyDescriptor(e.prototype,r).set;t(n,{},null)}catch(a){if(e.prototype!=={}[r]){return}n=function(e){this[r]=e};i.polyfill=i(i({},null),e.prototype)instanceof e}return i}(Object,"__proto__")};b(Object,Ue)}if(Object.setPrototypeOf&&Object.getPrototypeOf&&Object.getPrototypeOf(Object.setPrototypeOf({},null))!==null&&Object.getPrototypeOf(Object.create(null))===null){(function(){var e=Object.create(null);var t=Object.getPrototypeOf,r=Object.setPrototypeOf;Object.getPrototypeOf=function(r){var n=t(r);return n===e?null:n};Object.setPrototypeOf=function(t,n){var o=n===null?e:n;return r(t,o)};Object.setPrototypeOf.polyfill=false})()}var Ke=!o(function(){Object.keys("foo")});if(!Ke){var Xe=Object.keys;Q(Object,"keys",function keys(e){return Xe(oe.ToObject(e))})}if(Object.getOwnPropertyNames){var Ze=!o(function(){Object.getOwnPropertyNames("foo")});if(!Ze){var Qe=typeof window==="object"?Object.getOwnPropertyNames(window):[];var Ye=Object.getOwnPropertyNames;Q(Object,"getOwnPropertyNames",function getOwnPropertyNames(e){var t=oe.ToObject(e);if(P(t)==="[object Window]"){try{return Ye(t)}catch(r){return x([],Qe)}}return Ye(t)})}}if(Object.getOwnPropertyDescriptor){var et=!o(function(){Object.getOwnPropertyDescriptor("foo","bar")});if(!et){var tt=Object.getOwnPropertyDescriptor;Q(Object,"getOwnPropertyDescriptor",function getOwnPropertyDescriptor(e,t){return tt(oe.ToObject(e),t)})}}if(Object.seal){var rt=!o(function(){Object.seal("foo")});if(!rt){var nt=Object.seal;Q(Object,"seal",function seal(e){if(!K.object(e)){return e}return nt(e)})}}if(Object.isSealed){var ot=!o(function(){Object.isSealed("foo")});if(!ot){var it=Object.isSealed;Q(Object,"isSealed",function isSealed(e){if(!K.object(e)){return true}return it(e)})}}if(Object.freeze){var at=!o(function(){Object.freeze("foo")});if(!at){var ut=Object.freeze;Q(Object,"freeze",function freeze(e){if(!K.object(e)){return e}return ut(e)})}}if(Object.isFrozen){var st=!o(function(){Object.isFrozen("foo")});if(!st){var ft=Object.isFrozen;Q(Object,"isFrozen",function isFrozen(e){if(!K.object(e)){return true}return ft(e)})}}if(Object.preventExtensions){var ct=!o(function(){Object.preventExtensions("foo")});if(!ct){var lt=Object.preventExtensions;Q(Object,"preventExtensions",function preventExtensions(e){if(!K.object(e)){return e}return lt(e)})}}if(Object.isExtensible){var pt=!o(function(){Object.isExtensible("foo")});if(!pt){var vt=Object.isExtensible;Q(Object,"isExtensible",function isExtensible(e){if(!K.object(e)){return false}return vt(e)})}}if(Object.getPrototypeOf){var yt=!o(function(){Object.getPrototypeOf("foo")});if(!yt){var ht=Object.getPrototypeOf;Q(Object,"getPrototypeOf",function getPrototypeOf(e){return ht(oe.ToObject(e))})}}if(!RegExp.prototype.flags&&s){var gt=function flags(){if(!oe.TypeIsObject(this)){throw new TypeError("Method called on incompatible type: must be an object.")}var e="";if(this.global){e+="g"}if(this.ignoreCase){e+="i"}if(this.multiline){e+="m"}if(this.unicode){e+="u"}if(this.sticky){e+="y"}return e};V.getter(RegExp.prototype,"flags",gt)}var bt=i(function(){return String(new RegExp(/a/g,"i"))==="/a/i"});if(!bt&&s){var dt=RegExp;var mt=function RegExp(e,t){var r=this instanceof RegExp;if(!r&&(K.regex(e)||e&&e.constructor===RegExp)){return e}if(K.regex(e)&&K.string(t)){return new RegExp(e.source,t)}return new dt(e,t)};$(dt,mt,{$input:true});RegExp=mt;V.redefine(S,"RegExp",mt)}if(s){var Ot={input:"$_",lastMatch:"$&",lastParen:"$+",leftContext:"$`",rightContext:"$'"};c(Object.keys(Ot),function(e){if(e in RegExp&&!(Ot[e]in RegExp)){V.getter(RegExp,Ot[e],function get(){return RegExp[e]})}})}U(RegExp);var wt=1/Number.EPSILON;var jt=function roundTiesToEven(e){return e+wt-wt};var St=Math.pow(2,-23);var Tt=Math.pow(2,127)*(2-St);var It=Math.pow(2,-126);var Et=Number.prototype.clz;delete Number.prototype.clz;var Mt={acosh:function acosh(e){var t=Number(e);if(Number.isNaN(t)||e<1){return NaN}if(t===1){return 0}if(t===Infinity){return t}return z(t/Math.E+L(t+1)*L(t-1)/Math.E)+1},asinh:function asinh(e){var t=Number(e);if(t===0||!T(t)){return t}return t<0?-Math.asinh(-t):z(t+L(t*t+1))},atanh:function atanh(e){var t=Number(e);if(Number.isNaN(t)||t<-1||t>1){return NaN}if(t===-1){return-Infinity}if(t===1){return Infinity}if(t===0){return t}return.5*z((1+t)/(1-t))},cbrt:function cbrt(e){var t=Number(e);if(t===0){return t}var r=t<0,n;if(r){t=-t}if(t===Infinity){n=Infinity}else{n=Math.exp(z(t)/3);n=(t/(n*n)+2*n)/3}return r?-n:n},clz32:function clz32(e){var r=Number(e);var n=oe.ToUint32(r);if(n===0){return 32}return Et?t(Et,n):31-F(z(n+.5)*Math.LOG2E)},cosh:function cosh(e){var t=Number(e);if(t===0){return 1}if(Number.isNaN(t)){return NaN}if(!T(t)){return Infinity}if(t<0){t=-t}if(t>21){return Math.exp(t)/2}return(Math.exp(t)+Math.exp(-t))/2},expm1:function expm1(e){var t=Number(e);if(t===-Infinity){return-1}if(!T(t)||t===0){return t}if(D(t)>.5){return Math.exp(t)-1}var r=t;var n=0;var o=1;while(n+r!==n){n+=r;o+=1;r*=t/o}return n},hypot:function hypot(e,t){var r=0;var n=0;for(var o=0;o<arguments.length;++o){var i=D(Number(arguments[o]));if(n<i){r*=n/i*(n/i);r+=1;n=i}else{r+=i>0?i/n*(i/n):i}}return n===Infinity?Infinity:n*L(r)},log2:function log2(e){return z(e)*Math.LOG2E},log10:function log10(e){return z(e)*Math.LOG10E},log1p:function log1p(e){var t=Number(e);if(t<-1||Number.isNaN(t)){return NaN}if(t===0||t===Infinity){return t}if(t===-1){return-Infinity}return 1+t-1===0?t:t*(z(1+t)/(1+t-1))},sign:function sign(e){var t=Number(e);if(t===0){return t}if(Number.isNaN(t)){return t}return t<0?-1:1},sinh:function sinh(e){var t=Number(e);if(!T(t)||t===0){return t}if(D(t)<1){return(Math.expm1(t)-Math.expm1(-t))/2}return(Math.exp(t-1)-Math.exp(-t-1))*Math.E/2},tanh:function tanh(e){var t=Number(e);if(Number.isNaN(t)||t===0){return t}if(t===Infinity){return 1}if(t===-Infinity){return-1}var r=Math.expm1(t);var n=Math.expm1(-t);if(r===Infinity){return 1}if(n===Infinity){return-1}return(r-n)/(Math.exp(t)+Math.exp(-t))},trunc:function trunc(e){var t=Number(e);return t<0?-F(-t):F(t)},imul:function imul(e,t){var r=oe.ToUint32(e);var n=oe.ToUint32(t);var o=r>>>16&65535;var i=r&65535;var a=n>>>16&65535;var u=n&65535;return i*u+(o*u+i*a<<16>>>0)|0},fround:function fround(e){var t=Number(e);if(t===0||t===Infinity||t===-Infinity||X(t)){return t}var r=Math.sign(t);var n=D(t);if(n<It){return r*jt(n/It/St)*It*St}var o=(1+St/Number.EPSILON)*n;var i=o-(o-n);if(i>Tt||X(i)){return r*Infinity}return r*i}};b(Math,Mt);g(Math,"log1p",Mt.log1p,Math.log1p(-1e-17)!==-1e-17);g(Math,"asinh",Mt.asinh,Math.asinh(-1e7)!==-Math.asinh(1e7));g(Math,"tanh",Mt.tanh,Math.tanh(-2e-17)!==-2e-17);g(Math,"acosh",Mt.acosh,Math.acosh(Number.MAX_VALUE)===Infinity);g(Math,"cbrt",Mt.cbrt,Math.abs(1-Math.cbrt(1e-300)/1e-100)/Number.EPSILON>8);g(Math,"sinh",Mt.sinh,Math.sinh(-2e-17)!==-2e-17);var Pt=Math.expm1(10);g(Math,"expm1",Mt.expm1,Pt>22025.465794806718||Pt<22025.465794806718);var xt=Math.round;var Nt=Math.round(.5-Number.EPSILON/4)===0&&Math.round(-.5+Number.EPSILON/3.99)===1;var Ct=wt+1;var At=2*wt-1;var _t=[Ct,At].every(function(e){return Math.round(e)===e});g(Math,"round",function round(e){var t=F(e);var r=t===-1?-0:t+1;return e-t<.5?t:r},!Nt||!_t);V.preserveToString(Math.round,xt);var kt=Math.imul;if(Math.imul(4294967295,5)!==-5){Math.imul=Mt.imul;V.preserveToString(Math.imul,kt)}if(Math.imul.length!==2){Q(Math,"imul",function imul(t,r){return e(kt,Math,arguments)})}var Rt=function(){var e=S.setTimeout;if(typeof e!=="function"){return}oe.IsPromise=function(e){if(!oe.TypeIsObject(e)){return false}if(typeof e._promise==="undefined"){return false}return true};var r=function(e){if(!oe.IsConstructor(e)){throw new TypeError("Bad promise constructor")}var t=this;var r=function(e,r){if(t.resolve!==void 0||t.reject!==void 0){throw new TypeError("Bad Promise implementation!")}t.resolve=e;t.reject=r};t.promise=new e(r);if(!(oe.IsCallable(t.resolve)&&oe.IsCallable(t.reject))){throw new TypeError("Bad promise constructor")}};var n;if(typeof window!=="undefined"&&oe.IsCallable(window.postMessage)){n=function(){var e=[];var t="zero-timeout-message";var r=function(r){C(e,r);window.postMessage(t,"*")};var n=function(r){if(r.source===window&&r.data===t){r.stopPropagation();if(e.length===0){return}var n=_(e);n()}};window.addEventListener("message",n,true);return r}}var o=function(){var e=S.Promise;return e&&e.resolve&&function(t){return e.resolve().then(t)}};var i=oe.IsCallable(S.setImmediate)?S.setImmediate.bind(S):typeof process==="object"&&process.nextTick?process.nextTick:o()||(oe.IsCallable(n)?n():function(t){e(t,0)});var a=1;var u=2;var s=3;var f=4;var l=5;var p=function(e,t){var r=e.capabilities;var n=e.handler;var o,i=false,s;if(n===a){o=t}else if(n===u){o=t;i=true}else{try{o=n(t)}catch(f){o=f;i=true}}s=i?r.reject:r.resolve;s(o)};var v=function(e,t){c(e,function(e){i(function(){p(e,t)})})};var y=function(e,t){var r=e._promise;var n=r.fulfillReactions;r.result=t;r.fulfillReactions=void 0;r.rejectReactions=void 0;r.state=f;v(n,t)};var h=function(e,t){var r=e._promise;var n=r.rejectReactions;r.result=t;r.fulfillReactions=void 0;r.rejectReactions=void 0;r.state=l;v(n,t)};var g=function(e){var t=false;var r=function(r){var n;if(t){return}t=true;if(r===e){return h(e,new TypeError("Self resolution"))}if(!oe.TypeIsObject(r)){return y(e,r)}try{n=r.then}catch(o){return h(e,o)}if(!oe.IsCallable(n)){return y(e,r)}i(function(){d(e,r,n)})};var n=function(r){if(t){return}t=true;return h(e,r)};return{resolve:r,reject:n}};var d=function(e,r,n){var o=g(e);var i=o.resolve;var a=o.reject;try{t(n,r,i,a)}catch(u){a(u)}};var m=function(e){if(!oe.TypeIsObject(e)){throw new TypeError("Promise is not object")}var t=e[B];if(t!==void 0&&t!==null){return t}return e};var O=function Promise(e){if(!(this instanceof Promise)){throw new TypeError('Constructor Promise requires "new"')}if(this&&this._promise){throw new TypeError("Bad construction")}if(!oe.IsCallable(e)){throw new TypeError("not a valid resolver")}var t=ie(this,Promise,w,{_promise:{result:void 0,state:s,fulfillReactions:[],rejectReactions:[]}});var r=g(t);var n=r.reject;try{e(r.resolve,n)}catch(o){n(o)}return t};var w=O.prototype;var j=function(e,t,r,n){var o=false;return function(i){if(o){return}o=true;t[e]=i;if(--n.count===0){var a=r.resolve;a(t)}}};var T=function(e,t,r){var n=e.iterator;var o=[],i={count:1},a,u;var s=0;while(true){try{a=oe.IteratorStep(n);if(a===false){e.done=true;break}u=a.value}catch(f){e.done=true;throw f}o[s]=void 0;var c=t.resolve(u);var l=j(s,o,r,i);i.count++;c.then(l,r.reject);s+=1}if(--i.count===0){var p=r.resolve;p(o)}return r.promise};var I=function(e,t,r){var n=e.iterator,o,i,a;while(true){try{o=oe.IteratorStep(n);if(o===false){e.done=true;break}i=o.value}catch(u){e.done=true;throw u}a=t.resolve(i);a.then(r.resolve,r.reject)}return r.promise};b(O,{all:function all(e){var t=m(this);var n=new r(t);var o,i;try{o=oe.GetIterator(e);i={iterator:o,done:false};return T(i,t,n)}catch(a){if(i&&!i.done){try{oe.IteratorClose(o,true)}catch(u){a=u}}var s=n.reject;s(a);return n.promise}},race:function race(e){var t=m(this);var n=new r(t);var o,i;try{o=oe.GetIterator(e);i={iterator:o,done:false};return I(i,t,n)}catch(a){if(i&&!i.done){try{oe.IteratorClose(o,true)}catch(u){a=u}}var s=n.reject;s(a);return n.promise}},reject:function reject(e){var t=this;var n=new r(t);var o=n.reject;o(e);return n.promise},resolve:function resolve(e){var t=this;if(oe.IsPromise(e)){var n=e.constructor;if(n===t){return e}}var o=new r(t);var i=o.resolve;i(e);return o.promise}});b(w,{"catch":function(e){return this.then(void 0,e)},then:function then(e,t){var n=this;if(!oe.IsPromise(n)){throw new TypeError("not a promise")}var o=oe.SpeciesConstructor(n,O);var c=new r(o);if(!oe.IsCallable(e)){e=a}if(!oe.IsCallable(t)){t=u}var v={capabilities:c,handler:e};var y={capabilities:c,handler:t};var h=n._promise,g;if(h.state===s){
// C(h.fulfillReactions,v);C(h.rejectReactions,y)}else if(h.state===f){g=h.result;i(function(){p(v,g)})}else if(h.state===l){g=h.result;i(function(){p(y,g)})}else{throw new TypeError("unexpected Promise state")}return c.promise}});return O}();if(S.Promise){delete S.Promise.accept;delete S.Promise.defer;delete S.Promise.prototype.chain}if(typeof Rt==="function"){b(S,{Promise:Rt});var Ft=m(S.Promise,function(e){return e.resolve(42).then(function(){})instanceof e});var Dt=!o(function(){S.Promise.reject(42).then(null,5).then(null,W)});var zt=o(function(){S.Promise.call(3,W)});var Lt=function(e){var t=e.resolve(5);t.constructor={};var r=e.resolve(t);return t===r}(S.Promise);if(!Ft||!Dt||!zt||Lt){Promise=Rt;Q(S,"Promise",Rt)}U(Promise)}var qt=function(e){var t=Object.keys(l(e,function(e,t){e[t]=true;return e},{}));return e.join(":")===t.join(":")};var Gt=qt(["z","a","bb"]);var Wt=qt(["z",1,"a","3",2]);if(s){var Ht=function fastkey(e){if(!Gt){return null}var t=typeof e;if(t==="undefined"||e===null){return"^"+String(e)}else if(t==="string"){return"$"+e}else if(t==="number"){if(!Wt){return"n"+e}return e}else if(t==="boolean"){return"b"+e}return null};var Bt=function emptyObject(){return Object.create?Object.create(null):{}};var Vt=function addIterableToMap(e,n,o){if(r(o)||K.string(o)){c(o,function(e){n.set(e[0],e[1])})}else if(o instanceof e){t(e.prototype.forEach,o,function(e,t){n.set(t,e)})}else{var i,a;if(o!==null&&typeof o!=="undefined"){a=n.set;if(!oe.IsCallable(a)){throw new TypeError("bad map")}i=oe.GetIterator(o)}if(typeof i!=="undefined"){while(true){var u=oe.IteratorStep(i);if(u===false){break}var s=u.value;try{if(!oe.TypeIsObject(s)){throw new TypeError("expected iterable of pairs")}t(a,n,s[0],s[1])}catch(f){oe.IteratorClose(i,true);throw f}}}}};var $t=function addIterableToSet(e,n,o){if(r(o)||K.string(o)){c(o,function(e){n.add(e)})}else if(o instanceof e){t(e.prototype.forEach,o,function(e){n.add(e)})}else{var i,a;if(o!==null&&typeof o!=="undefined"){a=n.add;if(!oe.IsCallable(a)){throw new TypeError("bad set")}i=oe.GetIterator(o)}if(typeof i!=="undefined"){while(true){var u=oe.IteratorStep(i);if(u===false){break}var s=u.value;try{t(a,n,s)}catch(f){oe.IteratorClose(i,true);throw f}}}}};var Jt={Map:function(){var e={};var r=function MapEntry(e,t){this.key=e;this.value=t;this.next=null;this.prev=null};r.prototype.isRemoved=function isRemoved(){return this.key===e};var n=function isMap(e){return!!e._es6map};var o=function requireMapSlot(e,t){if(!oe.TypeIsObject(e)||!n(e)){throw new TypeError("Method Map.prototype."+t+" called on incompatible receiver "+String(e))}};var i=function MapIterator(e,t){o(e,"[[MapIterator]]");this.head=e._head;this.i=this.head;this.kind=t};i.prototype={next:function next(){var e=this.i,t=this.kind,r=this.head,n;if(typeof this.i==="undefined"){return{value:void 0,done:true}}while(e.isRemoved()&&e!==r){e=e.prev}while(e.next!==r){e=e.next;if(!e.isRemoved()){if(t==="key"){n=e.key}else if(t==="value"){n=e.value}else{n=[e.key,e.value]}this.i=e;return{value:n,done:false}}}this.i=void 0;return{value:void 0,done:true}}};ee(i.prototype);var a=function Map(){if(!(this instanceof Map)){throw new TypeError('Constructor Map requires "new"')}if(this&&this._es6map){throw new TypeError("Bad construction")}var e=ie(this,Map,u,{_es6map:true,_head:null,_storage:Bt(),_size:0});var t=new r(null,null);t.next=t.prev=t;e._head=t;if(arguments.length>0){Vt(Map,e,arguments[0])}return e};var u=a.prototype;V.getter(u,"size",function(){if(typeof this._size==="undefined"){throw new TypeError("size method called on incompatible Map")}return this._size});b(u,{get:function get(e){o(this,"get");var t=Ht(e);if(t!==null){var r=this._storage[t];if(r){return r.value}else{return}}var n=this._head,i=n;while((i=i.next)!==n){if(oe.SameValueZero(i.key,e)){return i.value}}},has:function has(e){o(this,"has");var t=Ht(e);if(t!==null){return typeof this._storage[t]!=="undefined"}var r=this._head,n=r;while((n=n.next)!==r){if(oe.SameValueZero(n.key,e)){return true}}return false},set:function set(e,t){o(this,"set");var n=this._head,i=n,a;var u=Ht(e);if(u!==null){if(typeof this._storage[u]!=="undefined"){this._storage[u].value=t;return this}else{a=this._storage[u]=new r(e,t);i=n.prev}}while((i=i.next)!==n){if(oe.SameValueZero(i.key,e)){i.value=t;return this}}a=a||new r(e,t);if(oe.SameValue(-0,e)){a.key=+0}a.next=this._head;a.prev=this._head.prev;a.prev.next=a;a.next.prev=a;this._size+=1;return this},"delete":function(t){o(this,"delete");var r=this._head,n=r;var i=Ht(t);if(i!==null){if(typeof this._storage[i]==="undefined"){return false}n=this._storage[i].prev;delete this._storage[i]}while((n=n.next)!==r){if(oe.SameValueZero(n.key,t)){n.key=n.value=e;n.prev.next=n.next;n.next.prev=n.prev;this._size-=1;return true}}return false},clear:function clear(){o(this,"clear");this._size=0;this._storage=Bt();var t=this._head,r=t,n=r.next;while((r=n)!==t){r.key=r.value=e;n=r.next;r.next=r.prev=t}t.next=t.prev=t},keys:function keys(){o(this,"keys");return new i(this,"key")},values:function values(){o(this,"values");return new i(this,"value")},entries:function entries(){o(this,"entries");return new i(this,"key+value")},forEach:function forEach(e){o(this,"forEach");var r=arguments.length>1?arguments[1]:null;var n=this.entries();for(var i=n.next();!i.done;i=n.next()){if(r){t(e,r,i.value[1],i.value[0],this)}else{e(i.value[1],i.value[0],this)}}}});ee(u,u.entries);return a}(),Set:function(){var e=function isSet(e){return e._es6set&&typeof e._storage!=="undefined"};var r=function requireSetSlot(t,r){if(!oe.TypeIsObject(t)||!e(t)){throw new TypeError("Set.prototype."+r+" called on incompatible receiver "+String(t))}};var n=function Set(){if(!(this instanceof Set)){throw new TypeError('Constructor Set requires "new"')}if(this&&this._es6set){throw new TypeError("Bad construction")}var e=ie(this,Set,o,{_es6set:true,"[[SetData]]":null,_storage:Bt()});if(!e._es6set){throw new TypeError("bad set")}if(arguments.length>0){$t(Set,e,arguments[0])}return e};var o=n.prototype;var i=function ensureMap(e){if(!e["[[SetData]]"]){var t=e["[[SetData]]"]=new Jt.Map;c(Object.keys(e._storage),function(e){if(e==="^null"){e=null}else if(e==="^undefined"){e=void 0}else{var r=e.charAt(0);if(r==="$"){e=N(e,1)}else if(r==="n"){e=+N(e,1)}else if(r==="b"){e=e==="btrue"}else{e=+e}}t.set(e,e)});e._storage=null}};V.getter(n.prototype,"size",function(){r(this,"size");i(this);return this["[[SetData]]"].size});b(n.prototype,{has:function has(e){r(this,"has");var t;if(this._storage&&(t=Ht(e))!==null){return!!this._storage[t]}i(this);return this["[[SetData]]"].has(e)},add:function add(e){r(this,"add");var t;if(this._storage&&(t=Ht(e))!==null){this._storage[t]=true;return this}i(this);this["[[SetData]]"].set(e,e);return this},"delete":function(e){r(this,"delete");var t;if(this._storage&&(t=Ht(e))!==null){var n=q(this._storage,t);return delete this._storage[t]&&n}i(this);return this["[[SetData]]"]["delete"](e)},clear:function clear(){r(this,"clear");if(this._storage){this._storage=Bt()}else{this["[[SetData]]"].clear()}},values:function values(){r(this,"values");i(this);return this["[[SetData]]"].values()},entries:function entries(){r(this,"entries");i(this);return this["[[SetData]]"].entries()},forEach:function forEach(e){r(this,"forEach");var n=arguments.length>1?arguments[1]:null;var o=this;i(o);this["[[SetData]]"].forEach(function(r,i){if(n){t(e,n,i,i,o)}else{e(i,i,o)}})}});g(n.prototype,"keys",n.prototype.values,true);ee(n.prototype,n.prototype.values);return n}()};if(S.Map||S.Set){var Ut=i(function(){return new Map([[1,2]]).get(1)===2});if(!Ut){var Kt=S.Map;S.Map=function Map(){if(!(this instanceof Map)){throw new TypeError('Constructor Map requires "new"')}var e=new Kt;if(arguments.length>0){Vt(Map,e,arguments[0])}Object.setPrototypeOf(e,S.Map.prototype);g(e,"constructor",Map,true);return e};S.Map.prototype=d(Kt.prototype);V.preserveToString(S.Map,Kt)}var Xt=new Map;var Zt=function(e){e["delete"](0);e["delete"](-0);e.set(0,3);e.get(-0,4);return e.get(0)===3&&e.get(-0)===4}(Xt);var Qt=Xt.set(1,2)===Xt;if(!Zt||!Qt){var Yt=Map.prototype.set;Q(Map.prototype,"set",function set(e,r){t(Yt,this,e===0?0:e,r);return this})}if(!Zt){var er=Map.prototype.get;var tr=Map.prototype.has;b(Map.prototype,{get:function get(e){return t(er,this,e===0?0:e)},has:function has(e){return t(tr,this,e===0?0:e)}},true);V.preserveToString(Map.prototype.get,er);V.preserveToString(Map.prototype.has,tr)}var rr=new Set;var nr=function(e){e["delete"](0);e.add(-0);return!e.has(0)}(rr);var or=rr.add(1)===rr;if(!nr||!or){var ir=Set.prototype.add;Set.prototype.add=function add(e){t(ir,this,e===0?0:e);return this};V.preserveToString(Set.prototype.add,ir)}if(!nr){var ar=Set.prototype.has;Set.prototype.has=function has(e){return t(ar,this,e===0?0:e)};V.preserveToString(Set.prototype.has,ar);var ur=Set.prototype["delete"];Set.prototype["delete"]=function SetDelete(e){return t(ur,this,e===0?0:e)};V.preserveToString(Set.prototype["delete"],ur)}var sr=m(S.Map,function(e){var t=new e([]);t.set(42,42);return t instanceof e});var fr=Object.setPrototypeOf&&!sr;var cr=function(){try{return!(S.Map()instanceof S.Map)}catch(e){return e instanceof TypeError}}();if(S.Map.length!==0||fr||!cr){var lr=S.Map;S.Map=function Map(){if(!(this instanceof Map)){throw new TypeError('Constructor Map requires "new"')}var e=new lr;if(arguments.length>0){Vt(Map,e,arguments[0])}Object.setPrototypeOf(e,Map.prototype);g(e,"constructor",Map,true);return e};S.Map.prototype=lr.prototype;V.preserveToString(S.Map,lr)}var pr=m(S.Set,function(e){var t=new e([]);t.add(42,42);return t instanceof e});var vr=Object.setPrototypeOf&&!pr;var yr=function(){try{return!(S.Set()instanceof S.Set)}catch(e){return e instanceof TypeError}}();if(S.Set.length!==0||vr||!yr){var hr=S.Set;S.Set=function Set(){if(!(this instanceof Set)){throw new TypeError('Constructor Set requires "new"')}var e=new hr;if(arguments.length>0){$t(Set,e,arguments[0])}Object.setPrototypeOf(e,Set.prototype);g(e,"constructor",Set,true);return e};S.Set.prototype=hr.prototype;V.preserveToString(S.Set,hr)}var gr=!i(function(){return(new Map).keys().next().done});if(typeof S.Map.prototype.clear!=="function"||(new S.Set).size!==0||(new S.Map).size!==0||typeof S.Map.prototype.keys!=="function"||typeof S.Set.prototype.keys!=="function"||typeof S.Map.prototype.forEach!=="function"||typeof S.Set.prototype.forEach!=="function"||a(S.Map)||a(S.Set)||typeof(new S.Map).keys().next!=="function"||gr||!sr){delete S.Map;delete S.Set;b(S,{Map:Jt.Map,Set:Jt.Set},true)}if(S.Set.prototype.keys!==S.Set.prototype.values){g(S.Set.prototype,"keys",S.Set.prototype.values,true)}ee(Object.getPrototypeOf((new S.Map).keys()));ee(Object.getPrototypeOf((new S.Set).keys()));if(f&&S.Set.prototype.has.name!=="has"){var br=S.Set.prototype.has;Q(S.Set.prototype,"has",function has(e){return t(br,this,e)})}}b(S,Jt);U(S.Map);U(S.Set)}if(!S.Reflect){g(S,"Reflect",{})}var dr=S.Reflect;var mr=function throwUnlessTargetIsObject(e){if(!oe.TypeIsObject(e)){throw new TypeError("target must be an object")}};var Or={apply:function apply(){return e(oe.Call,null,arguments)},construct:function construct(e,t){if(!oe.IsConstructor(e)){throw new TypeError("First argument must be a constructor.")}var r=arguments.length<3?e:arguments[2];if(!oe.IsConstructor(r)){throw new TypeError("new.target must be a constructor.")}return oe.Construct(e,t,r,"internal")},deleteProperty:function deleteProperty(e,t){mr(e);if(s){var r=Object.getOwnPropertyDescriptor(e,t);if(r&&!r.configurable){return false}}return delete e[t]},enumerate:function enumerate(e){mr(e);return new be(e,"key")},has:function has(e,t){mr(e);return t in e}};if(Object.getOwnPropertyNames){Object.assign(Or,{ownKeys:function ownKeys(e){mr(e);var t=Object.getOwnPropertyNames(e);if(oe.IsCallable(Object.getOwnPropertySymbols)){A(t,Object.getOwnPropertySymbols(e))}return t}})}var wr=function ConvertExceptionToBoolean(e){return!o(e)};if(Object.preventExtensions){Object.assign(Or,{isExtensible:function isExtensible(e){mr(e);return Object.isExtensible(e)},preventExtensions:function preventExtensions(e){mr(e);return wr(function(){Object.preventExtensions(e)})}})}if(s){var jr=function get(e,r,n){var o=Object.getOwnPropertyDescriptor(e,r);if(!o){var i=Object.getPrototypeOf(e);if(i===null){return undefined}return jr(i,r,n)}if("value"in o){return o.value}if(o.get){return t(o.get,n)}return undefined};var Sr=function set(e,r,n,o){var i=Object.getOwnPropertyDescriptor(e,r);if(!i){var a=Object.getPrototypeOf(e);if(a!==null){return Sr(a,r,n,o)}i={value:void 0,writable:true,enumerable:true,configurable:true}}if("value"in i){if(!i.writable){return false}if(!oe.TypeIsObject(o)){return false}var u=Object.getOwnPropertyDescriptor(o,r);if(u){return dr.defineProperty(o,r,{value:n})}else{return dr.defineProperty(o,r,{value:n,writable:true,enumerable:true,configurable:true})}}if(i.set){t(i.set,o,n);return true}return false};Object.assign(Or,{defineProperty:function defineProperty(e,t,r){mr(e);return wr(function(){Object.defineProperty(e,t,r)})},getOwnPropertyDescriptor:function getOwnPropertyDescriptor(e,t){mr(e);return Object.getOwnPropertyDescriptor(e,t)},get:function get(e,t){mr(e);var r=arguments.length>2?arguments[2]:e;return jr(e,t,r)},set:function set(e,t,r){mr(e);var n=arguments.length>3?arguments[3]:e;return Sr(e,t,r,n)}})}if(Object.getPrototypeOf){var Tr=Object.getPrototypeOf;Or.getPrototypeOf=function getPrototypeOf(e){mr(e);return Tr(e)}}if(Object.setPrototypeOf&&Or.getPrototypeOf){var Ir=function(e,t){while(t){if(e===t){return true}t=Or.getPrototypeOf(t)}return false};Object.assign(Or,{setPrototypeOf:function setPrototypeOf(e,t){mr(e);if(t!==null&&!oe.TypeIsObject(t)){throw new TypeError("proto must be an object or null")}if(t===dr.getPrototypeOf(e)){return true}if(dr.isExtensible&&!dr.isExtensible(e)){return false}if(Ir(e,t)){return false}Object.setPrototypeOf(e,t);return true}})}var Er=function(e,t){if(!oe.IsCallable(S.Reflect[e])){g(S.Reflect,e,t)}else{var r=i(function(){S.Reflect[e](1);S.Reflect[e](NaN);S.Reflect[e](true);return true});if(r){Q(S.Reflect,e,t)}}};Object.keys(Or).forEach(function(e){Er(e,Or[e])});if(f&&S.Reflect.getPrototypeOf.name!=="getPrototypeOf"){var Mr=S.Reflect.getPrototypeOf;Q(S.Reflect,"getPrototypeOf",function getPrototypeOf(e){return t(Mr,S.Reflect,e)})}if(S.Reflect.setPrototypeOf){if(i(function(){S.Reflect.setPrototypeOf(1,{});return true})){Q(S.Reflect,"setPrototypeOf",Or.setPrototypeOf)}}if(S.Reflect.defineProperty){if(!i(function(){var e=!S.Reflect.defineProperty(1,"test",{value:1});var t=typeof Object.preventExtensions!=="function"||!S.Reflect.defineProperty(Object.preventExtensions({}),"test",{});return e&&t})){Q(S.Reflect,"defineProperty",Or.defineProperty)}}if(S.Reflect.construct){if(!i(function(){var e=function F(){};return S.Reflect.construct(function(){},[],e)instanceof e})){Q(S.Reflect,"construct",Or.construct)}}if(String(new Date(NaN))!=="Invalid Date"){var Pr=Date.prototype.toString;var xr=function toString(){var e=+this;if(e!==e){return"Invalid Date"}return t(Pr,this)};Q(Date.prototype,"toString",xr)}var Nr={anchor:function anchor(e){return oe.CreateHTML(this,"a","name",e)},big:function big(){return oe.CreateHTML(this,"big","","")},blink:function blink(){return oe.CreateHTML(this,"blink","","")},bold:function bold(){return oe.CreateHTML(this,"b","","")},fixed:function fixed(){return oe.CreateHTML(this,"tt","","")},fontcolor:function fontcolor(e){return oe.CreateHTML(this,"font","color",e)},fontsize:function fontsize(e){return oe.CreateHTML(this,"font","size",e)},italics:function italics(){return oe.CreateHTML(this,"i","","")},link:function link(e){return oe.CreateHTML(this,"a","href",e)},small:function small(){return oe.CreateHTML(this,"small","","")},strike:function strike(){return oe.CreateHTML(this,"strike","","")},sub:function sub(){return oe.CreateHTML(this,"sub","","")},sup:function sub(){return oe.CreateHTML(this,"sup","","")}};c(Object.keys(Nr),function(e){var r=String.prototype[e];var n=false;if(oe.IsCallable(r)){var o=t(r,"",' " ');var i=x([],o.match(/"/g)).length;n=o!==o.toLowerCase()||i>2}else{n=true}if(n){Q(String.prototype,e,Nr[e])}});var Cr=function(){if(!K.symbol(H.iterator)){return false}var e=typeof JSON==="object"&&typeof JSON.stringify==="function"?JSON.stringify:null;if(!e){return false}if(typeof e(H())!=="undefined"){return true}if(e([H()])!=="[null]"){return true}var t={a:H()};t[H()]=true;if(e(t)!=="{}"){return true}return false}();var Ar=i(function(){if(!K.symbol(H.iterator)){return true}return JSON.stringify(Object(H()))==="{}"&&JSON.stringify([Object(H())])==="[{}]"});if(Cr||!Ar){var _r=JSON.stringify;Q(JSON,"stringify",function stringify(e){if(typeof e==="symbol"){return}var n;if(arguments.length>1){n=arguments[1]}var o=[e];if(!r(n)){var i=oe.IsCallable(n)?n:null;var a=function(e,r){var o=n?t(n,this,e,r):r;if(typeof o!=="symbol"){if(K.symbol(o)){return Be({})(o)}else{return o}}};o.push(a)}else{o.push(n)}if(arguments.length>2){o.push(arguments[2])}return _r.apply(this,o)})}return S});




/* Collections polyfill
   ========================================================================== */
(function(e){function f(a,c){function b(a){if(!this||this.constructor!==b)return new b(a);this._keys=[];this._values=[];this._itp=[];this.objectOnly=c;a&&v.call(this,a)}c||w(a,"size",{get:x});a.constructor=b;b.prototype=a;return b}function v(a){this.add?a.forEach(this.add,this):a.forEach(function(a){this.set(a[0],a[1])},this)}function d(a){this.has(a)&&(this._keys.splice(b,1),this._values.splice(b,1),this._itp.forEach(function(a){b<a[0]&&a[0]--}));return-1<b}function m(a){return this.has(a)?this._values[b]:void 0}function n(a,c){if(this.objectOnly&&c!==Object(c))throw new TypeError("Invalid value used as weak collection key");if(c!=c||0===c)for(b=a.length;b--&&!y(a[b],c););else b=a.indexOf(c);return-1<b}function p(a){return n.call(this,this._values,a)}function q(a){return n.call(this,this._keys,a)}function r(a,c){this.has(a)?this._values[b]=c:this._values[this._keys.push(a)-1]=c;return this}function t(a){this.has(a)||this._values.push(a);return this}function h(){(this._keys||0).length=this._values.length=0}function z(){return k(this._itp,this._keys)}function l(){return k(this._itp,this._values)}function A(){return k(this._itp,this._keys,this._values)}function B(){return k(this._itp,this._values,this._values)}function k(a,c,b){var g=[0],e=!1;a.push(g);return{next:function(){var f,d=g[0];!e&&d<c.length?(f=b?[c[d],b[d]]:c[d],g[0]++):(e=!0,a.splice(a.indexOf(g),1));return{done:e,value:f}}}}function x(){return this._values.length}function u(a,c){for(var b=this.entries();;){var d=b.next();if(d.done)break;a.call(c,d.value[1],d.value[0],this)}}var b,w=Object.defineProperty,y=function(a,b){return isNaN(a)?isNaN(b):a===b};"undefined"==typeof WeakMap&&(e.WeakMap=f({"delete":d,clear:h,get:m,has:q,set:r},!0));"undefined"!=typeof Map&&"function"===typeof(new Map).values&&(new Map).values().next||(e.Map=f({"delete":d,has:q,get:m,set:r,keys:z,values:l,entries:A,forEach:u,clear:h}));"undefined"!=typeof Set&&"function"===typeof(new Set).values&&(new Set).values().next||(e.Set=f({has:p,add:t,"delete":d,clear:h,keys:l,values:l,entries:B,forEach:u}));"undefined"==typeof WeakSet&&(e.WeakSet=f({"delete":d,add:t,clear:h,has:p},!0))})("undefined"!=typeof exports&&"undefined"!=typeof global?global:window);




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



/* Array.isArray()
   ========================================================================== */
if (!Array.prototype.isArray) {
	Array.prototype.isArray = function(arg) {
		return Object.prototype.toString.call(arg) === '[object Array]';
	};
}


/* Array.includes()
   ========================================================================== */
if (!Array.prototype.includes) {
	Array.prototype.includes = function(searchElement /*, fromIndex*/ ) {
		'use strict';
		var O = Object(this),
			len = parseInt(O.length) || 0;
		if (len === 0) return false;
		
		var n = parseInt(arguments[1]) || 0,
			k;
		if (n >= 0) {
		  k = n;
		} else {
		  k = len + n;
		  if (k < 0) {k = 0;}
		}
		var currentElement;
		while (k < len) {
		  currentElement = O[k];
		  if (searchElement === currentElement ||
		     (searchElement !== searchElement && currentElement !== currentElement)) {
		    return true;
		  }
		  k++;
		}
		return false;
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
// if (!Object.prototype.forEach) {
//   Object.prototype.forEach = function(iterator, context) {
//       for (var key in this) {
//         iterator.call(context, this[key], key, this);
//       }
//    };
// }





/* String.includes()
   ========================================================================== */
if (!String.prototype.includes) {
	String.prototype.includes = function() {'use strict';
		return String.prototype.indexOf.apply(this, arguments) !== -1;
	};
}



/* String.endsWith()
   ========================================================================== */
if (!String.prototype.endsWith) {
	String.prototype.endsWith = function(searchString, position) {
		var subjectString = this.toString();
		if (typeof position !== 'number' || !isFinite(position) || Math.floor(position) !== position || position > subjectString.length) {
			position = subjectString.length;
		}
		position -= searchString.length;
		var lastIndex = subjectString.indexOf(searchString, position);
		return lastIndex !== -1 && lastIndex === position;
	};
}


/* String.startsWith()
   ========================================================================== */
if (!String.prototype.startsWith) {
	String.prototype.startsWith = function(searchString, position) {
		position = position || 0;
		return this.indexOf(searchString, position) === position;
	};
}



/* String.repeat()
   ========================================================================== */
if (!String.prototype.repeat) {
	String.prototype.repeat = function(count) {
		'use strict';
		if (this == null) {
			throw new TypeError('can\'t convert ' + this + ' to object');
		}
		var str = '' + this;
		count = +count;
		if (count != count) {
			count = 0;
		}
		if (count < 0) {
			throw new RangeError('repeat count must be non-negative');
		}
		if (count == Infinity) {
			throw new RangeError('repeat count must be less than infinity');
		}
		count = Math.floor(count);
		if (str.length == 0 || count == 0) {
			return '';
		}
		// Ensuring count is a 31-bit integer allows us to heavily optimize the
		// main part. But anyway, most current (August 2014) browsers can't handle
		// strings 1 << 28 chars or longer, so:
		if (str.length * count >= 1 << 28) {
			throw new RangeError('repeat count must not overflow maximum string size');
		}
		var rpt = '';
		for (;;) {
			if ((count & 1) == 1) {
				rpt += str;
			}
			count >>>= 1;
			if (count == 0) {
				break;
			}
			str += str;
		}
		return rpt;
	}
}





/* Promises
   ========================================================================== */
if (!Promise) {
  (function Promise(e){
    "use strict";
    if(!(this instanceof Promise)){throw new TypeError('Constructor Promise requires "new"')}if(this&&this._promise){throw new TypeError("Bad construction")}if(!oe.IsCallable(e)){throw new TypeError("not a valid resolver")}var t=ie(this,Promise,w,{_promise:{result:void 0,state:s,fulfillReactions:[],rejectReactions:[]}});var r=g(t);var n=r.reject;try{e(r.resolve,n)}catch(o){n(o)}return t});
}





