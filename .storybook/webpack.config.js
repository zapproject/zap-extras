const path = require('path');

module.exports = ({ config }) => {
	console.log('----- config.module.rules', config.module.rules);
	config.module.rules = config.module.rules.filter(rule => String(rule.test) !== String(/\.css$/))
	config.module.rules.push({
		test: /\.tsx?$/,
		use: [
			{
				loader: require.resolve('ts-loader'),
			},
			{
				loader: require.resolve('react-docgen-typescript-loader'),
			},
		],
	},
	{
		test: /\.css$/,
		loader: require.resolve('style-loader'),
	},
	{
		test: /\.css$/,
		loader: require.resolve('css-loader'),
		options: {
			modules: {
				mode: 'local',
				localIdentName: 'zap-extras-[name]-[local]',
				context: path.resolve(__dirname, 'src'),
			},
		},
	});
	console.log('=------- config.module.rules', config.module.rules);
	config.resolve.extensions.push('.ts', '.tsx');
	return config;
}
