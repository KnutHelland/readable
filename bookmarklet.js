// Add to bookmarks:
// javascript:(function(){document.body.appendChild(document.createElement('script')).src='http://www.knuthelland.com/bookmarklet.js?'+Math.random();})();

(function(){
    // check prior inclusion and version
    if (window.jQuery === undefined) {
	var done = false;
	var script = document.createElement("script");
	script.src = "http://code.jquery.com/jquery-1.11.0.min.js";
	script.onload = script.onreadystatechange = function(){
	    if (!done && (!this.readyState || this.readyState == "loaded" || this.readyState == "complete")) {
		done = true;
		initMyBookmarklet();
	    }
	};
	document.getElementsByTagName("head")[0].appendChild(script);
    } else {
	initMyBookmarklet();
    }
    
    function initMyBookmarklet() {
	(window.myBookmarklet = function() {
	    jQuery.ajax({
		url: "https://readability.com/api/content/v1/parser?url=" + encodeURIComponent(document.URL) + "&token=2f9852dfa20fba2d6b117bf4210609d9729027f4",
		dataType: "jsonp",
		type: "get",
		crossDomain: true,
		success: function (data) {
		    document.open();
		    document.write("<html><head><style>body { background-color: black; font-size: 14em; -ms-hyphens: auto; hyphens: auto; font-weight: bold; font-family: Verdana; width: 100%; color: yellow; line-height: 1.2em; } p { margin-bottom: 0.5em; line-height: 1.2em; -ms-hyphens: auto; hyphens: auto; } a { color: yellow; text-decoration: underline; } img { display: none }</style></head><body>"+data.content+"</body><script type='text/javascript' src='http://www.knuthelland.com/reader.js?"+Math.random()+"'></script></html>");
		    document.close();
		}
	    });
	})();
    }
})();
