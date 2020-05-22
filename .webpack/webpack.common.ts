import packageJSON from "../package.json"

import path from "path"
import { EnvironmentPlugin, ExtendedAPIPlugin } from "webpack"

// Plugins
import HtmlWebpackPlugin from "html-webpack-plugin"
import MiniCssExtractPlugin from "mini-css-extract-plugin"
import WebpackBarPlugin from "webpackbar"
import TsPathsResolvePlugin from "ts-paths-resolve-plugin"

import type { Configuration, Plugin, Loader } from "webpack"

// NOTE: 關閉 webpack 要求 donate 訊息
process.env.DISABLE_OPENCOLLECTIVE = "true"

export default function (): Configuration {
	const workingDirectory = process.cwd()
	const src = path.resolve(workingDirectory, "src")
	const dist = path.resolve(workingDirectory, "build")
	const assets = path.resolve(workingDirectory, "public", "assets")
	const isDevelopment = process.env.NODE_ENV === "development"

	const plugins: Plugin[] = [
		new WebpackBarPlugin({ color: "blue", name: "React" }),
		new EnvironmentPlugin({
			NODE_ENV: "development",
			PUBLIC_URL: "",
			APP_NAME: packageJSON.name,
			TAILWIND_CONFIG: JSON.stringify(require("../tailwind.config")),
		}),
		new MiniCssExtractPlugin({
			filename: "css/[name].[contenthash:8].css",
			chunkFilename: "css/[name].[contenthash:8].chunk.css",
		}),
		new HtmlWebpackPlugin({
			inject: false,
			filename: "index.html",
			title: "React App",
			template: path.join(workingDirectory, "public", "index.pug"),
			favicon: path.join(workingDirectory, "public", "favicon.ico"),
			minify: false,
		}),
	]

	if (!isDevelopment) {
		plugins.push(new ExtendedAPIPlugin())
	}

	const styleLoader: Loader = {
		loader: isDevelopment ? "style-loader" : MiniCssExtractPlugin.loader,
		options: {
			...(!isDevelopment && {
				publicPath: "../",
			}),
		},
	}

	return {
		entry: {
			index: path.join(src, "index.tsx"),
		},
		output: {
			path: dist,
			filename: "js/[name].[hash:8].js",
			chunkFilename: "js/[name].[hash:8].chunk.js",
			publicPath: "/",
		},
		target: "web",
		module: {
			rules: [
				{
					test: /\.pug$/,
					use: [
						{
							loader: "pug-loader",
							options: {
								pretty: true,
							},
						},
					],
				},
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
					use: [{ loader: "babel-loader" }],
				},
				{
					test: /\.(png|jpe?g|gif|svg|ico)$/i,
					use: [
						{
							loader: "url-loader",
							options: {
								name: "assets/images/[name].[ext]",
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
								name: "[name].[ext]?[hash:8]",
								outputPath: "assets/fonts",
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
				// {
				//     exclude: /node_modules/,
				//     test: /\.less$/,
				//     use: [
				//         styleLoader,
				//         {
				//             loader: "css-loader",
				//             options: {
				//                 url: true,
				//                 modules: true,
				//                 importLoaders: 2,
				//             },
				//         },
				//         "postcss-loader",
				//         "less-loader",
				//     ],
				// },
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
				// {
				//     include: /node_modules/,
				//     test: /\.less$/,
				//     use: [styleLoader, "css-loader", "postcss-loader", "less-loader"],
				// },
				{
					include: /node_modules/,
					test: /\.s(a|c)ss$/,
					use: [styleLoader, "css-loader", "postcss-loader", "sass-loader"],
				},
			],
		},
		// NOTE: https://webpack.js.org/configuration/resolve/
		resolve: {
			extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
			alias: {
				assets,
			},
			plugins: [new TsPathsResolvePlugin({ configFile: path.resolve(src, "tsconfig.json") })],
		},
		resolveLoader: {
			alias: {
				"custom-loader": path.resolve(__dirname, "./loaders/custom-loader.ts"),
			},
		},
		plugins,
	}
}
