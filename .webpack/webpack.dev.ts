import { HotModuleReplacementPlugin } from "webpack"
import webpackMerge from "webpack-merge"
import createBaseConfig from "./webpack.common"
import type { Configuration } from "webpack"
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin"
import path from "path"

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
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				exclude: /node_modules|\.test.tsx?$/,
				use: [
					{
						loader: "cache-loader",
						options: {
							cacheDirectory: path.resolve(".cache"),
						},
					},
					{ loader: "thread-loader" },
					{ loader: "babel-loader" },
					{
						loader: "ts-loader",
						options: {
							happyPackMode: true,
						},
					},
				],
			},
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				use: [
					{
						loader: "cache-loader",
						options: {
							cacheDirectory: path.resolve(".cache"),
						},
					},
					{ loader: "thread-loader" },
					{ loader: "babel-loader" },
				],
			},
		],
	},
	resolve: {
		alias: {
			"react-dom": "@hot-loader/react-dom",
		},
	},
	plugins: [
		new HotModuleReplacementPlugin(),
		new ForkTsCheckerWebpackPlugin({
			checkSyntacticErrors: true,
			tsconfig: path.resolve(process.cwd(), "src", "tsconfig.json"),
		}),
	],
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
