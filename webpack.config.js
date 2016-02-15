var webpack = require('webpack');
module.exports = {
	entry: './src/index.ts',
	output: {
		filename: './build/fnk.all.js'
	},
	devtool: 'source-map',
	resolve: {
		extensions: ['', '.webpack.js', '.web.js', '.ts', '.js']
	},
	plugins: [
		//new webpack.optimize.UglifyJsPlugin()
	],
	module: {
		loaders: [
			{ test: /\.ts$/, loader: 'ts-loader' }
		]
	}
}