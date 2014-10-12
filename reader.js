// Sets up the readable page with keyboard shortcuts and stuff.
(function() {
	/**
	 * Polyfill for requestAnimationFrame
	 */
	(function() {
		var lastTime = 0;
		var vendors = ['ms', 'moz', 'webkit', 'o'];
		for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
			window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
			window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame']
				|| window[vendors[x]+'CancelRequestAnimationFrame'];
		}

		if (!window.requestAnimationFrame)
			window.requestAnimationFrame = function(callback, element) {
				var currTime = new Date().getTime();
				var timeToCall = Math.max(0, 16 - (currTime - lastTime));
				var id = window.setTimeout(function() { callback(currTime + timeToCall); },
				                           timeToCall);
				lastTime = currTime + timeToCall;
				return id;
			};

		if (!window.cancelAnimationFrame)
			window.cancelAnimationFrame = function(id) {
				window.clearTimeout(id);
			};
	}());

	/**
	 * Run the reader (after jQuery is loaded)
	 */
	var run = function(){
		var speed = 0;

		$(document).keydown(function(e){
			if (e.keyCode >= 49 && e.keyCode <= 57) {
				// Numbers 1 to 9
				speed = e.keyCode-48;
				return false;
			} else if (e.keyCode == 13 || e.keyCode == 48) {
				// enter or 0
				speed = 0;
				return false;
			} else if (e.keyCode == 27) {
				// escape
				window.location.href=window.location.href;
				return false;
			}
			return true;
		});

		var oldFps = 33.0;
		var time;
		function draw() {
			window.requestAnimationFrame(draw);

			var now = new Date().getTime();
			var dt = now - (time || now);
			time = now;

			window.scrollBy(0, (speed*dt/oldFps)*1.5);
		}
		draw();
	};

	/**
	 * Load jQuery if we don't have it
	 */
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
