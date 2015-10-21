(function(){
	var ua = window.navigator.userAgent,
		AndroidBrowserOld = ua.indexOf( "Android 4." ) > -1 && ua.indexOf( "like Gecko" ) > -1 && ua.indexOf( "Chrome" ) === -1,
		ie8andBefore = !document.addEventListener;
	
	if (AndroidBrowserOld) {
		loadCSS('/theme/css/_fonts/ttf.css');
	} else if (ie8andBefore) {
		loadCSS('/theme/css/_fonts/eot.css');
	}







	function loadCSS( href, before, media ){
		var doc = window.document,
			ss = doc.createElement( "link" ),
			ref;

		if (before) {
			ref = before;
		} else {
			var refs = ( doc.body || doc.getElementsByTagName( "head" )[ 0 ] ).childNodes;
			ref = refs[ refs.length - 1];
		}

		var sheets = doc.styleSheets;
		ss.rel = "stylesheet";
		ss.href = href;

		ss.media = "only x";

		ref.parentNode.insertBefore( ss, ( before ? ref : ref.nextSibling ) );
		var onloadcssdefined = function( cb ){
			var resolvedHref = ss.href;
			var i = sheets.length;
			while( i-- ){
				if( sheets[ i ].href === resolvedHref ){
					return cb();
				}
			}
			setTimeout(function() {
				onloadcssdefined( cb );
			});
		};

		ss.onloadcssdefined = onloadcssdefined;
		onloadcssdefined(function() {
			ss.media = media || "all";
		});
		return ss;
	};
})();