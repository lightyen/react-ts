import packageJSON from "../package.json"

import path from "path"
import { EnvironmentPlugin } from "webpack"
import { Configuration } from "webpack"

// Plugins
import HtmlWebpackPlugin from "html-webpack-plugin"
import MiniCssExtractPlugin from "mini-css-extract-plugin"
import WebpackBarPlugin from "webpackbar"
import TsPathsResolvePlugin from "ts-paths-resolve-plugin"

export default function (): Configuration {
	const outputCSS = "css"
	const outputJS = "js"
	const publicPath = "/"

	const workingDirectory = process.cwd()
	const src = path.resolve(workingDirectory, "src")
	const dist = path.resolve(workingDirectory, "build")
	const isDevelopment = process.env.NODE_ENV === "development"

	const join_network = (...args: string[]) => path.join(...args).replace(path.sep, "/")

	const styleLoader = {
		loader: isDevelopment ? "style-loader" : MiniCssExtractPlugin.loader,
		options: {
			...(!isDevelopment && { publicPath: path.relative(path.join(publicPath, outputCSS), publicPath) }),
		},
	}

	return {
		target: "web",
		plugins: [
			new WebpackBarPlugin({ color: "blue", name: "React" }),
			new EnvironmentPlugin({
				NODE_ENV: "development",
				PUBLIC_URL: "",
				APP_NAME: packageJSON.name,
				TAILWIND_CONFIG: JSON.stringify(require(path.resolve(workingDirectory, "tailwind.config.js"))),
			}),
			new MiniCssExtractPlugin({
				filename: join_network(outputCSS, "[name].css?[fullhash]"),
				chunkFilename: join_network(outputCSS, "[name].chunk.css?[fullhash:8]"),
			}),
			new HtmlWebpackPlugin({
				inject: true,
				title: "React App",
				minify: true,
				template: path.join(workingDirectory, "public", "index.ejs"),
				favicon: path.join(workingDirectory, "public", "favicon.ico"),
				isDevelopment,
			}),
		],
		// NOTE: https://webpack.js.org/configuration/resolve/
		resolve: {
			extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
			plugins: [new TsPathsResolvePlugin({ tsConfigPath: path.resolve(src, "tsconfig.json") })],
		},
		resolveLoader: {
			alias: {
				"custom-loader": path.resolve(__dirname, "loaders", "custom-loader.ts"),
			},
		},
		entry: {
			index: path.resolve(src, "index.tsx"),
		},
		output: {
			path: dist,
			filename: join_network(outputJS, "[name].js?[fullhash]"),
			chunkFilename: join_network(outputJS, "[name].js?.[fullhash:8]"),
			publicPath,
		},
		module: {
			rules: [
				{
					test: /\.(png|jpe?g|gif|svg|ico)$/i,
					use: [
						{
							loader: "url-loader",
							options: {
								name: join_network("img", "[name].[ext]?[fullhash]"),
								limit: 8192,
							},
						},
					],
				},
				{
					test: /\.ya?ml$/,
					use: "js-yaml-loader",
				},
				{
					test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
					use: [
						{
							loader: "file-loader",
							options: {
								name: join_network("fonts", "[name].[ext]?[fullhash]"),
							},
						},
					],
				},
				// For user space:
				{
					exclude: /node_modules/,
					test: /\.css$/,
					use: [
						styleLoader,
						{
							loader: "css-loader",
							options: {
								url: true,
								sourceMap: true,
							},
						},
						"postcss-loader",
					],
				},
				{
					exclude: /node_modules/,
					test: /\.s(a|c)ss$/,
					use: [
						styleLoader,
						{
							loader: "css-loader",
							options: {
								url: true,
								sourceMap: true,
							},
						},
						"postcss-loader",
						{
							loader: "sass-loader",
							options: {
								sourceMap: true,
							},
						},
					],
				},
				// For node_modules:
				{
					include: /node_modules/,
					test: /.css$/,
					use: [styleLoader, "css-loader", "postcss-loader"],
				},
				{
					include: /node_modules/,
					test: /\.s(a|c)ss$/,
					use: [styleLoader, "css-loader", "postcss-loader", "sass-loader"],
				},
			],
		},
	}
}
