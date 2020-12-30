const plugin = require("tailwindcss/plugin")
const colors = require("tailwindcss/colors")

module.exports = {
	purge: ["./src/**/*.js", "./src/**/*.jsx", "./src/**/*.ts", "./src/**/*.tsx"],
	darkMode: "class", // or 'media' or 'class'
	theme: {
		minHeight: {
			8: "2rem",
		},
	},
	variants: {
		extend: {},
	},
	plugins: [
		require("@tailwindcss/typography"),
		require("@tailwindcss/forms"),
		plugin(function ({ addComponents }) {
			addComponents({
				".btn": {
					padding: ".5rem 1rem",
					borderRadius: ".25rem",
					fontWeight: "600",
				},
				".btn-blue": {
					backgroundColor: "#3490dc",
					"&:hover": {
						backgroundColor: "#2779bd",
					},
				},
				".btn-red": {
					backgroundColor: "#e3342f",
					color: "#fff",
					"&:hover": {
						backgroundColor: "#cc1f1a",
					},
				},
			})
		}),
	],
}
