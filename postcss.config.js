const path  = require('path');

module.exports = (ctx) => ({
	plugins: [
		require('postcss-modules')({
			generateScopedName: 'zap-extras-[name]-[local]',
			getJSON: ctx.extractModules || (() => {}),
		}),
		require('postcss-url')({
			url: 'copy',
		}),
	],
});
