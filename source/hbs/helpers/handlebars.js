module.exports.register = function (Handlebars, options) {
	
	/**
	 * The {{#is}} helper checks if a variable is defined.
	 * See: http://stackoverflow.com/questions/17095813/handlebars-if-and-numeric-zeroes
	 */
	Handlebars.registerHelper('is', function(variable, options) {
		if ( typeof variable !== 'undefined' && variable ) {
			return options.fn(this);
		} else {
			return options.inverse(this);
		}
	});
	
	/**
	 * {{#equals variable value}}
	 */
	Handlebars.registerHelper('equals', function(variable, value, options) {
		if (variable == value) {
			return options.fn(this);
		} else {
			return options.inverse(this);
		}
	});

	/**
	 * {{#not variable value}}
	 */
	Handlebars.registerHelper('not', function(variable, value, options) {
		if ( !variable || variable != value) {
			return options.fn(this);
		} else {
			return options.inverse(this);
		}
	});
}