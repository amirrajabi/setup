module.exports.register = function (Handlebars, options) {

	//https://stackoverflow.com/questions/18427507/using-variables-for-a-partial-template
	Handlebars.registerHelper('partial', function(name, ctx, hash) {
	    var ps = Handlebars.partials;
	    if(typeof ps[name] !== 'function')
	        ps[name] = Handlebars.compile(ps[name]);
	    return ps[name](ctx, hash);
	});

}