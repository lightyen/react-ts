module.exports = {
	purge: {
		enabled: process.env.NODE_ENV === "production",
		content: ["./src/**/*.js", "./src/**/*.jsx", "./src/**/*.ts", "./src/**/*.tsx"],
	},
	darkMode: false,
	theme: {
		minHeight: {
			0: "0",
			8: "2rem",
			full: "100%",
			screen: "100vh",
		},
		extend: {},
	},
	variants: {
		extend: {
			backgroundColor: ["group-focus"],
		},
	},
	plugins: [
		require("@tailwindcss/typography"),
		function ({ addUtilities, addComponents, e, prefix, config }) {
			// Add your custom styles here
			addUtilities({
				".test-10": {
					color: "#100",
				},
				".test-50": {
					color: "#400",
				},
			})
		},
	],
}
