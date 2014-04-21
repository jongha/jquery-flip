(function($) {
	$.fn.flip = function(options) {

		var interval = (options && options.interval) || 200;
		var settings = $.extend({
			"interval": interval,
			"transition": function(interval) { return "all " + ((interval) ? (interval / 1000) : 0) + "s ease-in-out"; },
			"transform": function(back) { return (!!back) ? "scaleX(-1)" : "scaleX(1)"; },
			"front": ".flip-front",
			"back": ".flip-back",
			"event": (options && options.event) || ["click"] // ["click"], ["mouseover", "mouseout"]
		}, options);

		options = $.extend(settings, options);

		//scaleX(1.1);
		var setTransition = function(obj, interval) {
			return obj.css(
				{ "-webkit-transition": options.transition(interval) },
				{ "-moz-transition": options.transition(interval) },
				{ "-o-transition": options.transition(interval) },
				{ "transition": options.transition(interval) }
			);
		};

    var eventHandler = function() {
			var condition = $(this).data("flip");

			setTransition($(this), interval).css(
				{ "-webkit-transform": options.transform(true) },
				{ "-moz-transform": options.transform(true) },
				{ "-o-transform": options.transform(true) },
				{ "transform": options.transform(true) }

			).data("flip", !!!condition);

			(function(obj, condition) {
				var front = obj.find(options.front).hide();
				var back = obj.find(options.back).hide();

				setTimeout(function() {

					setTransition(obj, 0).css(
						{ "-webkit-transform": options.transform() },
						{ "-moz-transform": options.transform() },
						{ "-o-transform": options.transform() },
						{ "transform": options.transform() }
					);

					if(condition) {
						front.show();
						back.hide();
					}else {
						front.hide();
						back.show();
					}

				}, interval);
			})($(this), condition);
		};

		$(this).each(function() {
			setTransition($(this), interval).find(options.back).hide();
		});

    for(var idx in settings.event) {
			$(this).bind(settings.event[idx], eventHandler);
		}

		return this;
	};
}(jQuery));

