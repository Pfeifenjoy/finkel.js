const path = require("path")
const webpack = require("webpack")


const baseConfig = {
	output: {
		path: path.resolve(__dirname, "./build"),
		filename: "[name].bundle.js",
		sourceMapFilename: "[file].map"
	},
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				include: [
					path.resolve(__dirname, "./src")
				],
				loader: "babel-loader"
			}
		]
	}
}


const index = () => Object.assign({ }, baseConfig, {
	target: "node",
	entry: {
		index: path.resolve("src/index.js")
	},
	output: {
		path: path.resolve("build"),
		filename: "index.js",
		sourceMapFilename: "index.map",
		library: "homepage",
		libraryTarget: "umd"
	},
	node: {
		__dirname: false,
		__filename: false
	}
})

// decorators
const production = config => Object.assign({ }, config(), {
	plugins: [
		new webpack.DefinePlugin({
			"process.env":{
				"NODE_ENV": JSON.stringify("production")
			}
		}),
		new webpack.optimize.UglifyJsPlugin({
			compress:{
				warnings: true
			}
		})
	]
})

const development = config => Object.assign({ }, config(), {
	devServer: {
		historyApiFallback: true,
		stats: "errors-only",
		host: process.env.HOST,
		port: 3000,
		compress: true,
		overlay: true,
	},
	devtool: "source-map"
})

module.exports = env => {
	if (env === "production") {
		return production(index)
	} else {
		return development(index)
	}
}
