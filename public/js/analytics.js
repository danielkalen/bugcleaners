!function(){function t(t){k.set(t)}function e(t){if(100!=t.get(Be)&&b(ut(t,Ie))%1e4>=100*ht(t,Be))throw"abort"}function n(t){if(U(ut(t,Ve)))throw"abort"}function i(){var t=H.location.protocol;if("http:"!=t&&"https:"!=t)throw"abort"}function r(e){try{F.navigator.sendBeacon?t(42):F.XMLHttpRequest&&"withCredentials"in new F.XMLHttpRequest&&t(40)}catch(n){}e.set(ve,x(e),!0),e.set(Lt,ht(e,Lt)+1);var i=[];st.map(function(t,n){if(n.F){var r=e.get(t);void 0!=r&&r!=n.defaultValue&&("boolean"==typeof r&&(r*=1),i.push(n.F+"="+I(""+r)))}}),i.push("z="+rt()),e.set(Ct,i.join("&"),!0)}function a(t){var e=ut(t,Xe)||K()+"/collect",n=ut(t,Tt);if(!n&&t.get(At)&&(n="beacon"),n){var i=ut(t,Ct),r=t.get(St),r=r||E;"image"==n?J(e,i,r):"xhr"==n&&Q(e,i,r)||"beacon"==n&&tt(e,i,r)||Z(e,i,r)}else Z(e,ut(t,Ct),t.get(St));t.set(St,E,!0)}function o(t){var e=F.gaData;e&&(e.expId&&t.set(oe,e.expId),e.expVar&&t.set(se,e.expVar))}function s(){if(F.navigator&&"preview"==F.navigator.loadPurpose)throw"abort"}function c(t){var e=F.gaDevIds;S(e)&&0!=e.length&&t.set("&did",e.join(","),!0)}function u(t){if(!t.get(Ve))throw"abort"}function h(e){var n=ht(e,le);n>=500&&t(15);var i=ut(e,Ot);if("transaction"!=i&&"item"!=i){var i=ht(e,ge),r=(new Date).getTime(),a=ht(e,fe);if(0==a&&e.set(fe,r),a=Math.round(2*(r-a)/1e3),a>0&&(i=Math.min(i+a,20),e.set(fe,r)),0>=i)throw"abort";e.set(ge,--i)}e.set(le,++n)}function l(e,n,i,r){n[e]=function(){try{return r&&t(r),i.apply(this,arguments)}catch(n){throw et("exc",e,n&&n.name),n}}}function f(){var t,e,n;if((n=(n=F.navigator)?n.plugins:null)&&n.length)for(var i=0;i<n.length&&!e;i++){var r=n[i];-1<r.name.indexOf("Shockwave Flash")&&(e=r.description)}if(!e)try{t=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7"),e=t.GetVariable("$version")}catch(a){}if(!e)try{t=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6"),e="WIN 6,0,21,0",t.AllowScriptAccess="always",e=t.GetVariable("$version")}catch(o){}if(!e)try{t=new ActiveXObject("ShockwaveFlash.ShockwaveFlash"),e=t.GetVariable("$version")}catch(s){}return e&&(t=e.match(/[\d]+/g))&&3<=t.length&&(e=t[0]+"."+t[1]+" r"+t[2]),e||void 0}function g(t,e,n){"none"==e&&(e="");var i=[],r=B(t);t="__utma"==t?6:2;for(var a=0;a<r.length;a++){var o=(""+r[a]).split(".");o.length>=t&&i.push({hash:o[0],R:r[a],O:o})}return 0==i.length?void 0:1==i.length?i[0]:v(e,i)||v(n,i)||v(null,i)||i[0]}function v(t,e){var n,i;null==t?n=i=1:(n=b(t),i=b(A(t,".")?t.substring(1):"."+t));for(var r=0;r<e.length;r++)if(e[r].hash==n||e[r].hash==i)return e[r]}function d(t){t=t.get(Ie);var e=p(t,0);return"_ga=1."+I(e+"."+t)}function p(t,e){for(var n=new Date,i=F.navigator,r=i.plugins||[],n=[t,i.userAgent,n.getTimezoneOffset(),n.getYear(),n.getDate(),n.getHours(),n.getMinutes()+e],i=0;i<r.length;++i)n.push(r[i].description);return b(n.join("."))}function m(t,e){if(e==H.location.hostname)return!1;for(var n=0;n<t.length;n++)if(t[n]instanceof RegExp){if(t[n].test(e))return!0}else if(0<=e.indexOf(t[n]))return!0;return!1}function w(t){return 0<=t.indexOf(".")||0<=t.indexOf(":")}function b(t){var e,n=1,i=0;if(t)for(n=0,e=t.length-1;e>=0;e--)i=t.charCodeAt(e),n=(n<<6&268435455)+i+(i<<14),i=266338304&n,n=0!=i?n^i>>21:n;return n}var y=function(t){this.w=t||[]};y.prototype.set=function(t){this.w[t]=!0},y.prototype.encode=function(){for(var t=[],e=0;e<this.w.length;e++)this.w[e]&&(t[Math.floor(e/6)]^=1<<e%6);for(e=0;e<t.length;e++)t[e]="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_".charAt(t[e]||0);return t.join("")+"~"};var k=new y,_=function(t,e){var n=new y(j(t));n.set(e),t.set(de,n.w)},x=function(t){t=j(t),t=new y(t);for(var e=k.w.slice(),n=0;n<t.w.length;n++)e[n]=e[n]||t.w[n];return new y(e).encode()},j=function(t){return t=t.get(de),S(t)||(t=[]),t},O=function(t){return"function"==typeof t},S=function(t){return"[object Array]"==Object.prototype.toString.call(Object(t))},C=function(t){return void 0!=t&&-1<(t.constructor+"").indexOf("String")},A=function(t,e){return 0==t.indexOf(e)},T=function(t){return t?t.replace(/^[\s\xa0]+|[\s\xa0]+$/g,""):""},L=function(t){var e=H.createElement("img");return e.width=1,e.height=1,e.src=t,e},E=function(){},I=function(e){return encodeURIComponent instanceof Function?encodeURIComponent(e):(t(28),e)},P=function(e,n,i,r){try{e.addEventListener?e.addEventListener(n,i,!!r):e.attachEvent&&e.attachEvent("on"+n,i)}catch(a){t(27)}},V=function(t,e){if(t){var n=H.createElement("script");n.type="text/javascript",n.async=!0,n.src=t,e&&(n.id=e);var i=H.getElementsByTagName("script")[0];i.parentNode.insertBefore(n,i)}},M=function(){return"https:"==H.location.protocol},N=function(){var t=""+H.location.hostname;return 0==t.indexOf("www.")?t.substring(4):t},D=function(t){var e=H.referrer;if(/^https?:\/\//i.test(e)){if(t)return e;t="//"+H.location.hostname;var n=e.indexOf(t);if((5==n||6==n)&&(t=e.charAt(n+t.length),"/"==t||"?"==t||""==t||":"==t))return;return e}},G=function(t,e){if(1==e.length&&null!=e[0]&&"object"==typeof e[0])return e[0];for(var n={},i=Math.min(t.length+1,e.length),r=0;i>r;r++){if("object"==typeof e[r]){for(var a in e[r])e[r].hasOwnProperty(a)&&(n[a]=e[r][a]);break}r<t.length&&(n[t[r]]=e[r])}return n},R=function(){this.keys=[],this.values={},this.m={}};R.prototype.set=function(t,e,n){this.keys.push(t),n?this.m[":"+t]=e:this.values[":"+t]=e},R.prototype.get=function(t){return this.m.hasOwnProperty(":"+t)?this.m[":"+t]:this.values[":"+t]},R.prototype.map=function(t){for(var e=0;e<this.keys.length;e++){var n=this.keys[e],i=this.get(n);i&&t(n,i)}};var F=window,H=document,$=function(){for(var t=F.navigator.userAgent+(H.cookie?H.cookie:"")+(H.referrer?H.referrer:""),e=t.length,n=F.history.length;n>0;)t+=n--^e++;return b(t)},U=function(t){var e=F._gaUserPrefs;if(e&&e.ioo&&e.ioo()||t&&!0===F["ga-disable-"+t])return!0;try{var n=F.external;if(n&&n._gaUserPrefs&&"oo"==n._gaUserPrefs)return!0}catch(i){}return!1},B=function(t){var e=[],n=H.cookie.split(";");t=new RegExp("^\\s*"+t+"=\\s*(.*?)\\s*$");for(var i=0;i<n.length;i++){var r=n[i].match(t);r&&e.push(r[1])}return e},z=function(e,n,i,r,a,o){if(a=U(a)?!1:W.test(H.location.hostname)||"/"==i&&X.test(r)?!1:!0,!a)return!1;if(n&&1200<n.length&&(n=n.substring(0,1200),t(24)),i=e+"="+n+"; path="+i+"; ",o&&(i+="expires="+new Date((new Date).getTime()+o).toGMTString()+"; "),r&&"none"!=r&&(i+="domain="+r+";"),r=H.cookie,H.cookie=i,!(r=r!=H.cookie))t:{for(e=B(e),r=0;r<e.length;r++)if(n==e[r]){r=!0;break t}r=!1}return r},q=function(t){return I(t).replace(/\(/g,"%28").replace(/\)/g,"%29")},X=/^(www\.)?google(\.com?)?(\.[a-z]{2})?$/,W=/(^|\.)doubleclick\.net$/i,K=function(){return(yt||M()?"https:":"http:")+"//www.google-analytics.com"},Y=function(t){this.name="len",this.message=t+"-8192"},Z=function(t,e,n){if(n=n||E,2036>=e.length)J(t,e,n);else{if(!(8192>=e.length))throw et("len",e.length),new Y(e.length);tt(t,e,n)||Q(t,e,n)||J(t,e,n)}},J=function(t,e,n){var i=L(t+"?"+e);i.onload=i.onerror=function(){i.onload=null,i.onerror=null,n()}},Q=function(t,e,n){var i=F.XMLHttpRequest;if(!i)return!1;var r=new i;return"withCredentials"in r?(r.open("POST",t,!0),r.withCredentials=!0,r.setRequestHeader("Content-Type","text/plain"),r.onreadystatechange=function(){4==r.readyState&&(n(),r=null)},r.send(e),!0):!1},tt=function(t,e,n){return F.navigator.sendBeacon&&F.navigator.sendBeacon(t,e)?(n(),!0):!1},et=function(t,e,n){1<=100*Math.random()||U("?")||(t=["t=error","_e="+t,"_v=j39","sr=1"],e&&t.push("_f="+e),n&&t.push("_m="+I(n.substring(0,100))),t.push("aip=1"),t.push("z="+at()),J(K()+"/collect",t.join("&"),E))},nt=function(){this.M=[]};nt.prototype.add=function(t){this.M.push(t)},nt.prototype.D=function(t){try{for(var e=0;e<this.M.length;e++){var n=t.get(this.M[e]);n&&O(n)&&n.call(F,t)}}catch(i){}e=t.get(St),e!=E&&O(e)&&(t.set(St,E,!0),setTimeout(e,10))};var it=function(){return Math.round(2147483647*Math.random())},rt=function(){try{var t=new Uint32Array(1);return F.crypto.getRandomValues(t),2147483647&t[0]}catch(e){return it()}},at=it,ot=function(){this.data=new R},st=new R,ct=[];ot.prototype.get=function(t){var e=gt(t),n=this.data.get(t);return e&&void 0==n&&(n=O(e.defaultValue)?e.defaultValue():e.defaultValue),e&&e.Z?e.Z(this,t,n):n};var ut=function(t,e){var n=t.get(e);return void 0==n?"":""+n},ht=function(t,e){var n=t.get(e);return void 0==n||""===n?0:1*n};ot.prototype.set=function(t,e,n){if(t)if("object"==typeof t)for(var i in t)t.hasOwnProperty(i)&&lt(this,i,t[i],n);else lt(this,t,e,n)};var lt=function(t,e,n,i){if(void 0!=n)switch(e){case Ve:En.test(n)}var r=gt(e);r&&r.o?r.o(t,e,n,i):t.data.set(e,n,i)},ft=function(t,e,n,i,r){this.name=t,this.F=e,this.Z=i,this.o=r,this.defaultValue=n},gt=function(t){var e=st.get(t);if(!e)for(var n=0;n<ct.length;n++){var i=ct[n],r=i[0].exec(t);if(r){e=i[1](r),st.set(e.name,e);break}}return e},vt=function(t){var e;return st.map(function(n,i){i.F==t&&(e=i)}),e&&e.name},dt=function(t,e,n,i,r){return t=new ft(t,e,n,i,r),st.set(t.name,t),t.name},pt=function(t,e){ct.push([new RegExp("^"+t+"$"),e])},mt=function(t,e,n){return dt(t,e,n,void 0,wt)},wt=function(){},bt=C(window.GoogleAnalyticsObject)&&T(window.GoogleAnalyticsObject)||"ga",yt=!1,kt=dt("_br"),_t=mt("apiVersion","v"),xt=mt("clientVersion","_v");dt("anonymizeIp","aip");var jt=dt("adSenseId","a"),Ot=dt("hitType","t"),St=dt("hitCallback"),Ct=dt("hitPayload");dt("nonInteraction","ni"),dt("currencyCode","cu"),dt("dataSource","ds");var At=dt("useBeacon",void 0,!1),Tt=dt("transport");dt("sessionControl","sc",""),dt("sessionGroup","sg"),dt("queueTime","qt");var Lt=dt("_s","_s");dt("screenName","cd");var Et=dt("location","dl",""),It=dt("referrer","dr"),Pt=dt("page","dp","");dt("hostname","dh");var Vt=dt("language","ul"),Mt=dt("encoding","de");dt("title","dt",function(){return H.title||void 0}),pt("contentGroup([0-9]+)",function(t){return new ft(t[0],"cg"+t[1])});var Nt=dt("screenColors","sd"),Dt=dt("screenResolution","sr"),Gt=dt("viewportSize","vp"),Rt=dt("javaEnabled","je"),Ft=dt("flashVersion","fl");dt("campaignId","ci"),dt("campaignName","cn"),dt("campaignSource","cs"),dt("campaignMedium","cm"),dt("campaignKeyword","ck"),dt("campaignContent","cc");var Ht=dt("eventCategory","ec"),$t=dt("eventAction","ea"),Ut=dt("eventLabel","el"),Bt=dt("eventValue","ev"),zt=dt("socialNetwork","sn"),qt=dt("socialAction","sa"),Xt=dt("socialTarget","st"),Wt=dt("l1","plt"),Kt=dt("l2","pdt"),Yt=dt("l3","dns"),Zt=dt("l4","rrt"),Jt=dt("l5","srt"),Qt=dt("l6","tcp"),te=dt("l7","dit"),ee=dt("l8","clt"),ne=dt("timingCategory","utc"),ie=dt("timingVar","utv"),re=dt("timingLabel","utl"),ae=dt("timingValue","utt");dt("appName","an"),dt("appVersion","av",""),dt("appId","aid",""),dt("appInstallerId","aiid",""),dt("exDescription","exd"),dt("exFatal","exf");var oe=dt("expId","xid"),se=dt("expVar","xvar"),ce=dt("_utma","_utma"),ue=dt("_utmz","_utmz"),he=dt("_utmht","_utmht"),le=dt("_hc",void 0,0),fe=dt("_ti",void 0,0),ge=dt("_to",void 0,20);pt("dimension([0-9]+)",function(t){return new ft(t[0],"cd"+t[1])}),pt("metric([0-9]+)",function(t){return new ft(t[0],"cm"+t[1])}),dt("linkerParam",void 0,void 0,d,wt);var ve=dt("usage","_u"),de=dt("_um");dt("forceSSL",void 0,void 0,function(){return yt},function(e,n,i){t(34),yt=!!i});var pe=dt("_j1","jid");pt("\\&(.*)",function(t){var e=new ft(t[0],t[1]),n=vt(t[0].substring(1));return n&&(e.Z=function(t){return t.get(n)},e.o=function(t,e,i,r){t.set(n,i,r)},e.F=void 0),e});var me=mt("_oot"),we=dt("previewTask"),be=dt("checkProtocolTask"),ye=dt("validationTask"),ke=dt("checkStorageTask"),_e=dt("historyImportTask"),xe=dt("samplerTask"),je=dt("_rlt"),Oe=dt("buildHitTask"),Se=dt("sendHitTask"),Ce=dt("ceTask"),Ae=dt("devIdTask"),Te=dt("timingTask"),Le=dt("displayFeaturesTask"),Ee=mt("name"),Ie=mt("clientId","cid"),Pe=dt("userId","uid"),Ve=mt("trackingId","tid"),Me=mt("cookieName",void 0,"_ga"),Ne=mt("cookieDomain"),De=mt("cookiePath",void 0,"/"),Ge=mt("cookieExpires",void 0,63072e3),Re=mt("legacyCookieDomain"),Fe=mt("legacyHistoryImport",void 0,!0),He=mt("storage",void 0,"cookie"),$e=mt("allowLinker",void 0,!1),Ue=mt("allowAnchor",void 0,!0),Be=mt("sampleRate","sf",100),ze=mt("siteSpeedSampleRate",void 0,1),qe=mt("alwaysSendReferrer",void 0,!1),Xe=dt("transportUrl"),We=dt("_r","_r"),Ke=function(t,e,n){this.V=1e4,this.fa=t,this.$=!1,this.B=e,this.ea=n||1},Ye=function(t,e){var n;if(t.fa&&t.$)return 0;if(t.$=!0,e){if(t.B&&ht(e,t.B))return ht(e,t.B);if(0==e.get(ze))return 0}return 0==t.V?0:(void 0===n&&(n=rt()),0==n%t.V?Math.floor(n/t.V)%t.ea+1:0)},Ze=new Ke(!0,kt,7),Je=function(t){if(!M()&&!yt){var e=Ye(Ze,t);if(e&&!(!F.navigator.sendBeacon&&e>=4&&6>=e)){var n=(new Date).getHours(),i=[rt(),rt(),rt()].join(".");t=(3==e||5==e?"https:":"http:")+"//www.google-analytics.com/collect?z=br.",t+=[e,"A",n,i].join(".");var r=1!=e%3?"https:":"http:",r=r+"//www.google-analytics.com/collect?z=br.",r=r+[e,"B",n,i].join(".");7==e&&(r=r.replace("//www.","//ssl.")),n=function(){e>=4&&6>=e?F.navigator.sendBeacon(r,""):L(r)},rt()%2?(L(t),n()):(n(),L(t))}}},Qe=function(t,e){var n=Math.min(ht(t,ze),100);if(!(b(ut(t,Ie))%100>=n)&&(n={},tn(n)||en(n))){var i=n[Wt];void 0==i||1/0==i||isNaN(i)||(i>0?(nn(n,Yt),nn(n,Qt),nn(n,Jt),nn(n,Kt),nn(n,Zt),nn(n,te),nn(n,ee),e(n)):P(F,"load",function(){Qe(t,e)},!1))}},tn=function(t){var e=F.performance||F.webkitPerformance,e=e&&e.timing;if(!e)return!1;var n=e.navigationStart;return 0==n?!1:(t[Wt]=e.loadEventStart-n,t[Yt]=e.domainLookupEnd-e.domainLookupStart,t[Qt]=e.connectEnd-e.connectStart,t[Jt]=e.responseStart-e.requestStart,t[Kt]=e.responseEnd-e.responseStart,t[Zt]=e.fetchStart-n,t[te]=e.domInteractive-n,t[ee]=e.domContentLoadedEventStart-n,!0)},en=function(t){if(F.top!=F)return!1;var e=F.external,n=e&&e.onloadT;return e&&!e.isValidLoadTime&&(n=void 0),n>2147483648&&(n=void 0),n>0&&e.setPageReadyTime(),void 0==n?!1:(t[Wt]=n,!0)},nn=function(t,e){var n=t[e];(isNaN(n)||1/0==n||0>n)&&(t[e]=void 0)},rn=function(t){return function(e){"pageview"!=e.get(Ot)||t.I||(t.I=!0,Qe(e,function(e){t.send("timing",e)}))}},an=!1,on=function(e){if("cookie"==ut(e,He)){var n=ut(e,Me),i=un(e),r=gn(ut(e,De)),a=ln(ut(e,Ne)),o=1e3*ht(e,Ge),s=ut(e,Ve);if("auto"!=a)z(n,i,r,a,s,o)&&(an=!0);else{t(32);var c;if(i=[],a=N().split("."),4!=a.length||(c=a[a.length-1],parseInt(c,10)!=c)){for(c=a.length-2;c>=0;c--)i.push(a.slice(c).join("."));i.push("none"),c=i}else c=["none"];for(var u=0;u<c.length;u++)if(a=c[u],e.data.set(Ne,a),i=un(e),z(n,i,r,a,s,o))return void(an=!0);e.data.set(Ne,"auto")}}},sn=function(t){if("cookie"==ut(t,He)&&!an&&(on(t),!an))throw"abort"},cn=function(e){if(e.get(Fe)){var n=ut(e,Ne),i=ut(e,Re)||N(),r=g("__utma",i,n);r&&(t(19),e.set(he,(new Date).getTime(),!0),e.set(ce,r.R),(n=g("__utmz",i,n))&&r.hash==n.hash&&e.set(ue,n.R))}},un=function(t){var e=q(ut(t,Ie)),n=fn(ut(t,Ne));return t=vn(ut(t,De)),t>1&&(n+="-"+t),["GA1",n,e].join(".")},hn=function(t,e,n){for(var i,r=[],a=[],o=0;o<t.length;o++){var s=t[o];s.H[n]==e?r.push(s):void 0==i||s.H[n]<i?(a=[s],i=s.H[n]):s.H[n]==i&&a.push(s)}return 0<r.length?r:a},ln=function(t){return 0==t.indexOf(".")?t.substr(1):t},fn=function(t){return ln(t).split(".").length},gn=function(t){return t?(1<t.length&&t.lastIndexOf("/")==t.length-1&&(t=t.substr(0,t.length-1)),0!=t.indexOf("/")&&(t="/"+t),t):"/"},vn=function(t){return t=gn(t),"/"==t?1:t.split("/").length},dn=new RegExp(/^https?:\/\/([^\/:]+)/),pn=/(.*)([?&#])(?:_ga=[^&#]*)(?:&?)(.*)/,mn=function(e){t(48),this.target=e,this.T=!1};mn.prototype.ca=function(t,e){if(t.tagName){if("a"==t.tagName.toLowerCase())return void(t.href&&(t.href=wn(this,t.href,e)));if("form"==t.tagName.toLowerCase())return bn(this,t)}return"string"==typeof t?wn(this,t,e):void 0};var wn=function(t,e,n){var i=pn.exec(e);i&&3<=i.length&&(e=i[1]+(i[3]?i[2]+i[3]:"")),t=t.target.get("linkerParam");var r=e.indexOf("?"),i=e.indexOf("#");return n?e+=(-1==i?"#":"&")+t:(n=-1==r?"?":"&",e=-1==i?e+(n+t):e.substring(0,i)+n+t+e.substring(i)),e},bn=function(t,e){if(e&&e.action){var n=t.target.get("linkerParam").split("=")[1];if("get"==e.method.toLowerCase()){for(var i=e.childNodes||[],r=0;r<i.length;r++)if("_ga"==i[r].name)return void i[r].setAttribute("value",n);i=H.createElement("input"),i.setAttribute("type","hidden"),i.setAttribute("name","_ga"),i.setAttribute("value",n),e.appendChild(i)}else"post"==e.method.toLowerCase()&&(e.action=wn(t,e.action))}};mn.prototype.S=function(e,n,i){function r(i){try{i=i||F.event;var r;t:{var o=i.target||i.srcElement;for(i=100;o&&i>0;){if(o.href&&o.nodeName.match(/^a(?:rea)?$/i)){r=o;break t}o=o.parentNode,i--}r={}}("http:"==r.protocol||"https:"==r.protocol)&&m(e,r.hostname||"")&&r.href&&(r.href=wn(a,r.href,n))}catch(s){t(26)}}var a=this;if(this.T||(this.T=!0,P(H,"mousedown",r,!1),P(H,"keyup",r,!1)),i){i=function(t){if(t=t||F.event,(t=t.target||t.srcElement)&&t.action){var n=t.action.match(dn);n&&m(e,n[1])&&bn(a,t)}};for(var o=0;o<H.forms.length;o++)P(H.forms[o],"submit",i)}};var yn,kn=function(t,e,n){this.U=pe,this.aa=e,(e=n)||(e=(e=ut(t,Ee))&&"t0"!=e?Sn.test(e)?"_gat_"+q(ut(t,Ve)):"_gat_"+q(e):"_gat"),this.Y=e},_n=function(t,e){var n=e.get(Oe);e.set(Oe,function(e){xn(t,e);var i=n(e);return jn(t,e),i});var i=e.get(Se);e.set(Se,function(e){var n=i(e);return On(t,e),n})},xn=function(t,e){e.get(t.U)||("1"==B(t.Y)[0]?e.set(t.U,"",!0):e.set(t.U,""+at(),!0))},jn=function(t,e){e.get(t.U)&&z(t.Y,"1",e.get(De),e.get(Ne),e.get(Ve),6e5)},On=function(t,e){if(e.get(t.U)){var n=new R,i=function(t){gt(t).F&&n.set(gt(t).F,e.get(t))};i(_t),i(xt),i(Ve),i(Ie),i(t.U),n.set(gt(ve).F,x(e));var r=t.aa;n.map(function(t,e){r+=I(t)+"=",r+=I(""+e)+"&"}),r+="z="+at(),L(r),e.set(t.U,"",!0)}},Sn=/^gtm\d+$/,Cn=function(t,e){var n=t.b;if(!n.get("dcLoaded")){_(n,29),e=e||{};var i;e[Me]&&(i=q(e[Me])),i=new kn(n,"https://stats.g.doubleclick.net/r/collect?t=dc&aip=1&_r=3&",i),_n(i,n),n.set("dcLoaded",!0)}},An=function(t){var e;e=t.get("dcLoaded")?!1:"cookie"!=t.get(He)?!1:!0,e&&(_(t,51),e=new kn(t),xn(e,t),jn(e,t),t.get(e.U)&&(t.set(We,1,!0),t.set(Xe,K()+"/r/collect",!0)))},Tn=function(){var t=F.gaGlobal=F.gaGlobal||{};return t.hid=t.hid||at()},Ln=function(t,e,n){if(!yn){var i;i=H.location.hash;var r=F.name,a=/^#?gaso=([^&]*)/;(r=(i=(i=i&&i.match(a)||r&&r.match(a))?i[1]:B("GASO")[0]||"")&&i.match(/^(?:!([-0-9a-z.]{1,40})!)?([-.\w]{10,1200})$/i))&&(z("GASO",""+i,n,e,t,0),window._udo||(window._udo=e),window._utcp||(window._utcp=n),t=r[1],V("https://www.google.com/analytics/web/inpage/pub/inpage.js?"+(t?"prefix="+t+"&":"")+at(),"_gasojs")),yn=!0}},En=/^(UA|YT|MO|GP)-(\d+)-(\d+)$/,In=function(t){function l(t,e){g.b.data.set(t,e)}function f(t,e){l(t,e),g.filters.add(t)}var g=this;this.b=new ot,this.filters=new nt,l(Ee,t[Ee]),l(Ve,T(t[Ve])),l(Me,t[Me]),l(Ne,t[Ne]||N()),l(De,t[De]),l(Ge,t[Ge]),l(Re,t[Re]),l(Fe,t[Fe]),l($e,t[$e]),l(Ue,t[Ue]),l(Be,t[Be]),l(ze,t[ze]),l(qe,t[qe]),l(He,t[He]),l(Pe,t[Pe]),l(_t,1),l(xt,"j39"),f(me,n),f(we,s),f(be,i),f(ye,u),f(ke,sn),f(_e,cn),f(xe,e),f(je,h),f(Ce,o),f(Ae,c),f(Le,An),f(Oe,r),f(Se,a),f(Te,rn(this)),Pn(this.b,t[Ie]),Vn(this.b),this.b.set(jt,Tn()),Ln(this.b.get(Ve),this.b.get(Ne),this.b.get(De))},Pn=function(e,n){if("cookie"==ut(e,He)){an=!1;var i;t:{var r=B(ut(e,Me));if(r&&!(1>r.length)){i=[];for(var a=0;a<r.length;a++){var o;o=r[a].split(".");var s=o.shift();("GA1"==s||"1"==s)&&1<o.length?(s=o.shift().split("-"),1==s.length&&(s[1]="1"),s[0]*=1,s[1]*=1,o={H:s,s:o.join(".")}):o=void 0,o&&i.push(o)}if(1==i.length){t(13),i=i[0].s;break t}if(0!=i.length){if(t(14),r=fn(ut(e,Ne)),i=hn(i,r,0),1==i.length){i=i[0].s;break t}r=vn(ut(e,De)),i=hn(i,r,1),i=i[0]&&i[0].s;break t}t(12)}i=void 0}i||(i=ut(e,Ne),r=ut(e,Re)||N(),i=g("__utma",r,i),void 0!=i?(t(10),i=i.O[1]+"."+i.O[2]):i=void 0),i&&(e.data.set(Ie,i),an=!0)}i=e.get(Ue),(a=(i=H.location[i?"href":"search"].match("(?:&|#|\\?)"+I("_ga").replace(/([.*+?^=!:${}()|\[\]\/\\])/g,"\\$1")+"=([^&#]*)"))&&2==i.length?i[1]:"")&&(e.get($e)?(i=a.indexOf("."),-1==i?t(22):(r=a.substring(i+1),"1"!=a.substring(0,i)?t(22):(i=r.indexOf("."),-1==i?t(22):(a=r.substring(0,i),i=r.substring(i+1),a!=p(i,0)&&a!=p(i,-1)&&a!=p(i,-2)?t(23):(t(11),e.data.set(Ie,i)))))):t(21)),n&&(t(9),e.data.set(Ie,I(n))),e.get(Ie)||((i=(i=F.gaGlobal&&F.gaGlobal.vid)&&-1!=i.search(/^(?:utma\.)?\d+\.\d+$/)?i:void 0)?(t(17),e.data.set(Ie,i)):(t(8),e.data.set(Ie,[at()^2147483647&$(),Math.round((new Date).getTime()/1e3)].join(".")))),on(e)},Vn=function(e){var n=F.navigator,i=F.screen,r=H.location;if(e.set(It,D(e.get(qe))),r){var a=r.pathname||"";"/"!=a.charAt(0)&&(t(31),a="/"+a),e.set(Et,r.protocol+"//"+r.hostname+a+r.search)}i&&e.set(Dt,i.width+"x"+i.height),i&&e.set(Nt,i.colorDepth+"-bit");var i=H.documentElement,o=(a=H.body)&&a.clientWidth&&a.clientHeight,s=[];if(i&&i.clientWidth&&i.clientHeight&&("CSS1Compat"===H.compatMode||!o)?s=[i.clientWidth,i.clientHeight]:o&&(s=[a.clientWidth,a.clientHeight]),i=0>=s[0]||0>=s[1]?"":s.join("x"),e.set(Gt,i),e.set(Ft,f()),e.set(Mt,H.characterSet||H.charset),e.set(Rt,n&&"function"==typeof n.javaEnabled&&n.javaEnabled()||!1),e.set(Vt,(n&&(n.language||n.browserLanguage)||"").toLowerCase()),r&&e.get(Ue)&&(n=H.location.hash)){for(n=n.split(/[?&#]+/),r=[],i=0;i<n.length;++i)(A(n[i],"utm_id")||A(n[i],"utm_campaign")||A(n[i],"utm_source")||A(n[i],"utm_medium")||A(n[i],"utm_term")||A(n[i],"utm_content")||A(n[i],"gclid")||A(n[i],"dclid")||A(n[i],"gclsrc"))&&r.push(n[i]);0<r.length&&(n="#"+r.join("&"),e.set(Et,e.get(Et)+n))}};In.prototype.get=function(t){return this.b.get(t)},In.prototype.set=function(t,e){this.b.set(t,e)};var Mn={pageview:[Pt],event:[Ht,$t,Ut,Bt],social:[zt,qt,Xt],timing:[ne,ie,ae,re]};In.prototype.send=function(t){if(!(1>arguments.length)){var e,n;"string"==typeof arguments[0]?(e=arguments[0],n=[].slice.call(arguments,1)):(e=arguments[0]&&arguments[0][Ot],n=arguments),e&&(n=G(Mn[e]||[],n),n[Ot]=e,this.b.set(n,void 0,!0),this.filters.D(this.b),this.b.data.m={},Je(this.b))}};var Nn,Dn,Gn,Rn=function(t){return"prerender"==H.visibilityState?!1:(t(),!0)},Fn=/^(?:(\w+)\.)?(?:(\w+):)?(\w+)$/,Hn=function(t){if(O(t[0]))this.u=t[0];else{var e=Fn.exec(t[0]);if(null!=e&&4==e.length&&(this.c=e[1]||"t0",this.K=e[2]||"",this.C=e[3],this.a=[].slice.call(t,1),this.K||(this.A="create"==this.C,this.i="require"==this.C,this.g="provide"==this.C,this.ba="remove"==this.C),this.i&&(3<=this.a.length?(this.X=this.a[1],this.W=this.a[2]):this.a[1]&&(C(this.a[1])?this.X=this.a[1]:this.W=this.a[1]))),e=t[1],t=t[2],!this.C)throw"abort";if(this.i&&(!C(e)||""==e))throw"abort";if(this.g&&(!C(e)||""==e||!O(t)))throw"abort";if(w(this.c)||w(this.K))throw"abort";if(this.g&&"t0"!=this.c)throw"abort"}};Nn=new R,Gn=new R,Dn={ec:45,ecommerce:46,linkid:47};var $n=function(t){function e(t){var e=(t.hostname||"").split(":")[0].toLowerCase(),n=(t.protocol||"").toLowerCase(),n=1*t.port||("http:"==n?80:"https:"==n?443:"");return t=t.pathname||"",A(t,"/")||(t="/"+t),[e,""+n,t]}var n=H.createElement("a");n.href=H.location.href;var i=(n.protocol||"").toLowerCase(),r=e(n),a=n.search||"",o=i+"//"+r[0]+(r[1]?":"+r[1]:"");return A(t,"//")?t=i+t:A(t,"/")?t=o+t:!t||A(t,"?")?t=o+r[2]+(t||a):0>t.split("/")[0].indexOf(":")&&(t=o+r[2].substring(0,r[2].lastIndexOf("/"))+"/"+t),n.href=t,i=e(n),{protocol:(n.protocol||"").toLowerCase(),host:i[0],port:i[1],path:i[2],G:n.search||"",url:t||""}},Un={ga:function(){Un.f=[]}};Un.ga(),Un.D=function(t){var e=Un.J.apply(Un,arguments),e=Un.f.concat(e);for(Un.f=[];0<e.length&&!Un.v(e[0])&&(e.shift(),!(0<Un.f.length)););Un.f=Un.f.concat(e)},Un.J=function(e){for(var n=[],i=0;i<arguments.length;i++)try{var r=new Hn(arguments[i]);if(r.g)Nn.set(r.a[0],r.a[1]);else{if(r.i){var a=r,o=a.a[0];if(!O(Nn.get(o))&&!Gn.get(o)){Dn.hasOwnProperty(o)&&t(Dn[o]);var s=a.X;if(!s&&Dn.hasOwnProperty(o)?(t(39),s=o+".js"):t(43),s){s&&0<=s.indexOf("/")||(s=(yt||M()?"https:":"http:")+"//www.google-analytics.com/plugins/ua/"+s);var c,u=$n(s),a=void 0,h=u.protocol,l=H.location.protocol,a="https:"==h||h==l?!0:"http:"!=h?!1:"http:"==l;if(c=a){var a=u,f=$n(H.location.href);if(a.G||0<=a.url.indexOf("?")||0<=a.path.indexOf("://"))c=!1;else if(a.host==f.host&&a.port==f.port)c=!0;else{var g="http:"==a.protocol?80:443;c="www.google-analytics.com"==a.host&&(a.port||g)==g&&A(a.path,"/plugins/")?!0:!1}}c&&(V(u.url),Gn.set(o,!0))}}}n.push(r)}}catch(v){}return n},Un.v=function(t){try{if(t.u)t.u.call(F,Bn.j("t0"));else{var e=t.c==bt?Bn:Bn.j(t.c);if(t.A)"t0"==t.c&&Bn.create.apply(Bn,t.a);else if(t.ba)Bn.remove(t.c);else if(e)if(t.i){var n,i=t.a[0],r=t.W;e==Bn||e.get(Ee);var a=Nn.get(i);if(O(a)?(e.plugins_=e.plugins_||new R,e.plugins_.get(i)||e.plugins_.set(i,new a(e,r||{})),n=!0):n=!1,!n)return!0}else if(t.K){var o=t.C,s=t.a,c=e.plugins_.get(t.K);c[o].apply(c,s)}else e[t.C].apply(e,t.a)}}catch(u){}};var Bn=function(e){t(1),Un.D.apply(Un,[arguments])};Bn.h={},Bn.P=[],Bn.L=0,Bn.answer=42;var zn=[Ve,Ne,Ee];Bn.create=function(t){var e=G(zn,[].slice.call(arguments));e[Ee]||(e[Ee]="t0");var n=""+e[Ee];return Bn.h[n]?Bn.h[n]:(e=new In(e),Bn.h[n]=e,Bn.P.push(e),e)},Bn.remove=function(t){for(var e=0;e<Bn.P.length;e++)if(Bn.P[e].get(Ee)==t){Bn.P.splice(e,1),Bn.h[t]=null;break}},Bn.j=function(t){return Bn.h[t]},Bn.getAll=function(){return Bn.P.slice(0)},Bn.N=function(){"ga"!=bt&&t(49);var e=F[bt];if(!e||42!=e.answer){Bn.L=e&&e.l,Bn.loaded=!0;var n=F[bt]=Bn;if(l("create",n,n.create),l("remove",n,n.remove),l("getByName",n,n.j,5),l("getAll",n,n.getAll,6),n=In.prototype,l("get",n,n.get,7),l("set",n,n.set,4),l("send",n,n.send),n=ot.prototype,l("get",n,n.get),l("set",n,n.set),!M()&&!yt){t:{for(var n=H.getElementsByTagName("script"),i=0;i<n.length&&100>i;i++){var r=n[i].src;if(r&&0==r.indexOf("https://www.google-analytics.com/analytics")){t(33),n=!0;break t}}n=!1}n&&(yt=!0)}M()||yt||!Ye(new Ke)||(t(36),yt=!0),(F.gaplugins=F.gaplugins||{}).Linker=mn,n=mn.prototype,Nn.set("linker",mn),l("decorate",n,n.ca,20),l("autoLink",n,n.S,25),Nn.set("displayfeatures",Cn),Nn.set("adfeatures",Cn),e=e&&e.q,S(e)?Un.D.apply(Bn,e):t(50)}},Bn.da=function(){for(var t=Bn.getAll(),e=0;e<t.length;e++)t[e].get(Ee)},function(){var e=Bn.N;if(!Rn(e)){t(16);var n=!1,i=function(){if(!n&&Rn(e)){n=!0;var t=i,r=H;r.removeEventListener?r.removeEventListener("visibilitychange",t,!1):r.detachEvent&&r.detachEvent("onvisibilitychange",t)}};P(H,"visibilitychange",i)}}()}(window);
