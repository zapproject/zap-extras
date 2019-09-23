const path = require('path');

module.exports = ({ config }) => {
	config.module.rules = config.module.rules.filter(rule => String(rule.test) !== String(/\.css$/))
	config.module.rules.push({
		test: /\.(ts|tsx)$/,
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
    test: /\.stories\.jsx?$/,
    loaders: [
      {
        loader: require.resolve('@storybook/source-loader'),
        options: {
          prettierConfig: {
            tabWidth: 2,
          },
        },
      },
    ],
    enforce: 'pre',
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
	config.resolve.extensions.push('.ts', '.tsx');
	return config;
}
