module.exports = {
	plugins: [
		require("postcss-import"),
		require("tailwindcss")("node_modules/tailwindcss/tailwind.config.js"),
		require("autoprefixer"),
	],
}
