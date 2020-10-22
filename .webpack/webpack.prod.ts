import { merge } from "webpack-merge"
import createBaseConfig from "./webpack.common"
import type { Configuration } from "webpack"

import { CleanWebpackPlugin } from "clean-webpack-plugin"
import TerserPlugin from "terser-webpack-plugin"
import OptimizeCSSAssetsPlugin from "optimize-css-assets-webpack-plugin"
import ESLintPlugin from "eslint-webpack-plugin"
import path from "path"

process.env.NODE_ENV = "production"

const config: Configuration = {
	mode: "production",
	devtool: "source-map",
	stats: {
		children: false,
		modules: false,
		entrypoints: false,
	},
	performance: {
		hints: "warning",
		maxEntrypointSize: 1 << 20,
		maxAssetSize: 1 << 20,
		assetFilter: filename => {
			const ext = path.extname(filename)
			return ext === "css" || ext === ".js"
		},
	},
	optimization: {
		minimizer: [
			new TerserPlugin({
				sourceMap: true,
				parallel: true,
			}),
			new OptimizeCSSAssetsPlugin(),
		],
	},
	module: {
		rules: [
			{
				test: /\.worker\.ts$/,
				exclude: /node_modules/,
				use: [
					"worker-loader",
					"babel-loader",
					{
						loader: "ts-loader",
						options: { context: path.join(process.cwd(), "src") },
					},
				],
			},
			{
				test: /\.tsx?$/,
				exclude: /node_modules|\.test.tsx?|\.worker\.ts$/,
				use: ["babel-loader", { loader: "ts-loader", options: { context: path.join(process.cwd(), "src") } }],
			},
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				use: ["babel-loader"],
			},
		],
	},
	plugins: [
		new ESLintPlugin({ context: path.join(process.cwd(), "src"), extensions: ["js", "jsx", "ts", "tsx"] }),
		new CleanWebpackPlugin({
			cleanOnceBeforeBuildPatterns: ["**/*"],
			cleanAfterEveryBuildPatterns: ["assets"],
		}),
	],
}

export default merge(createBaseConfig(), config)
