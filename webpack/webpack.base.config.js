const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

const optimization = () => {
	const config = {
		splitChunks: {
			chunks: 'all',
		},
	};

	return config;
};

const filename = ext => `[name].${ext}`;

const babelOptions = preset => {
	const opts = {
		presets: [
			'@babel/preset-env',
		],
		plugins: [
			'@babel/plugin-proposal-class-properties',
		],
	};

	if (preset) {
		opts.presets.push(preset);
	}

	return opts;
};

const jsLoaders = () => {
	const loaders = [{
		loader: 'babel-loader',
		options: babelOptions(),
	}];

	loaders.push('eslint-loader');

	return loaders;
};

const plugins = () => {
	const base = [
		new CleanWebpackPlugin(),
	];

	return base;
};

module.exports = {
	output: {
		filename: filename('js'),
		publicPath: '/app/',
		path: path.resolve(__dirname, 'dist'),
	},
	resolve: {
		extensions: ['.js', '.json', '.png', '.ts'],
		alias: {
			ajvSchemas: path.resolve(__dirname, '../src/ajvSchemas'),
			configs: path.resolve(__dirname, '../src/configs'),
			database: path.resolve(__dirname, '../src/database'),
			interfaces: path.resolve(__dirname, '../src/interfaces'),
      models: path.resolve(__dirname, '../src/models'),
      routes: path.resolve(__dirname, '../src/routes'),
      sockets: path.resolve(__dirname, '../src/sockets'),
      utils: path.resolve(__dirname, '../src/utils'),
		}
	},
	optimization: optimization(),
	devtool: 'source-map',
	plugins: plugins(),
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: jsLoaders(),
			},
			{
				test: /\.ts$/,
				use: [
          'ts-loader',
        ],
			},
		],
	},
};