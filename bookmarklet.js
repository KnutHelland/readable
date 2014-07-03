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

    // function getInnerText(el) {
    // 	var sel, range, innerText = "";
    // 	if (typeof document.selection != "undefined" && typeof document.body.createTextRange != "undefined") {
    //         range = document.body.createTextRange();
    //         range.moveToElementText(el);
    //         innerText = range.text;
    // 	} else if (typeof window.getSelection != "undefined" && typeof document.createRange != "undefined") {
    //         sel = window.getSelection();
    //         sel.selectAllChildren(el);
    //         innerText = "" + sel;
    //         sel.removeAllRanges();
    // 	}
    // 	return innerText;
    // }
    
    function initMyBookmarklet() {
	(window.myBookmarklet = function() {
	    jQuery.ajax({
		url: "https://readability.com/api/content/v1/parser?url=" + encodeURIComponent(document.URL) + "&token=2f9852dfa20fba2d6b117bf4210609d9729027f4",
		dataType: "jsonp",
		type: "get",
		crossDomain: true,
		success: function (data) {
		    // var divId = "clip" + Math.round((Math.random()*1000000));
		    // var div = jQuery("<div id='"+divId+"'></div>");
		    // div.append(jQuery(data.content));
		    // jQuery("body").append(div);
		    // var text = getInnerText(document.getElementById(divId));
		    // alert(text);
		    // window.clipboardData.setData("text", data.content.replace(/<(?:.|\n)*?>/gm, ''));

		    var speed = 0;

		    window.myFunc = function() {
			alert("Mufunc");
			$(document).keydown(function(e){
			    alert("keydown");
			    if (e.keyCode == 38) { 
				// up
				speed -= 1;
				return false;
			    } else if (e.keyCode == 40) {
				// down
				speed += 1;
				return false;
			    } else if (e.keyCode == 13) {
				// enter
				speed = 0;
				return false;
			    } else if (e.keyCode == 27) {
				// escape
				location.reload();
				return false;
			    }
			});
		    }

		    document.open();
		    document.write("<html><head><style>body { background-color: black; font-size: 14em; -ms-hyphens: auto; hyphens: auto; font-weight: bold; font-family: Verdana; width: 100%; color: yellow; line-height: 1.2em; } p { margin-bottom: 0.5em; line-height: 1.2em; -ms-hyphens: auto; hyphens: auto; } a { color: yellow; text-decoration: underline; } img { display: none }</style></head><body onload='myFunc()'>"+data.content+"</body><script type='text/javascript'>alert('New page');</script></html>");

		    // jQuery("head").append("<style>body { background-color: black; font-size: 100em; -ms-hyphens: auto; hyphens: auto; font-weight: bold; font-family: Verdana; width: 100%; word-break: break-all; color: yellow; line-height: 1.2em; } p { margin-bottom: 0.5em; line-height: 1.2em; -ms-hyphens: auto; hyphens: auto; } a { color: yellow; text-decoration: underline; } img { display: none }</style>");
		    // jQuery("body").html(data.content);
		    document.close();

		    window.setInterval(function() {
			window.scrollBy(0, speed*2);
		    }, 33);
		}
	    });
	})();
    }
})();
