import { HotModuleReplacementPlugin } from "webpack"
import webpackMerge from "webpack-merge"
import createBaseConfig from "./webpack.common"
import type { Configuration } from "webpack"
import "webpack-dev-server"

process.env.NODE_ENV = "development"
process.env.PUBLIC_URL = ""

const config: Configuration = {
	mode: "development",
	devtool: "inline-source-map",
	stats: {
		children: false,
		modules: false,
		entrypoints: false,
	},
	performance: {
		hints: false,
		assetFilter: filename => {
			return filename.endsWith(".css") || filename.endsWith(".js")
		},
	},
	resolve: {
		alias: {
			"react-dom": "@hot-loader/react-dom",
		},
	},
	plugins: [new HotModuleReplacementPlugin()],
	// output: {
	// 	publicPath: `http://localhost:${defaultPort}/`,
	// },
	devServer: {
		hot: true,
		compress: true,
		open: true,
		host: "localhost",
		// port: defaultPort,
		// public: `localhost:${defaultPort}`,
		// publicPath: "/",
		clientLogLevel: "none",
		contentBase: false,
		quiet: true,
		noInfo: true,
		historyApiFallback: true,
	},
}

export default webpackMerge(createBaseConfig(), config)
