// Sets up the readable page with keyboard shortcuts and stuff.
(function() {
    var run = function(){
	var speed = 0;

	$(document).keydown(function(e){
	    if (e.keyCode >= 49 && e.keyCode <= 57) {
		// Numbers 1 to 9
		speed = e.keyCode-48
	    } else if (e.keyCode == 13 || e.keyCode == 48) {
		// enter or 0
		speed = 0;
		return false;
	    } else if (e.keyCode == 27) {
		// escape
		window.location.href=window.location.href;
		return false;
	    }
	});

	window.setInterval(function() {
	    window.scrollBy(0, speed*1.5);
	}, 33);
    };

    if (window.jQuery === undefined) {
	var done = false;
	var script = document.createElement("script");
	script.src = "http://code.jquery.com/jquery-1.11.0.min.js";
	script.onload = script.onreadystatechange = function(){
	    if (!done && (!this.readyState || this.readyState == "loaded" || this.readyState == "complete")) {
		done = true;
		run();
	    }
	};
	document.getElementsByTagName("head")[0].appendChild(script);
    } else {
	run();
    }
})();


