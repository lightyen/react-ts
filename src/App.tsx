import React from "react"
import { makeStore } from "~/store"
import { Provider } from "react-redux"
import StyledThemeProvider from "~/components/StyledThemeProvider"
import LanguageProvider from "~/components/LanguageProvider"
import AppLayout from "~/layout/AppLayout"
import { Global, css } from "@emotion/core"
import tw from "twin.macro"

import FiraCodeFont from "assets/fonts/FiraCode-Regular.woff2"
import "tailwindcss/dist/base.min.css"

const globalStyle = css`
	@font-face {
		font-family: Fira Code;
		src: local("Fira Code"), url(${FiraCodeFont}) format("woff2");
	}
	body {
		${tw`m-0 leading-normal overflow-hidden`}
		font-family: Roboto, 微軟正黑體, Microsoft JhengHei, Helvetica Neue,
		Helvetica, Arial, PingFang TC, 黑體-繁, Heiti TC, 蘋果儷中黑,
		Apple LiGothic Medium, sans-serif;
	}
	/* ::selection {
	background: rgb(115, 80, 196);
	@apply text-gray-100;
	} */
	button:-moz-focusring,
	[type="button"]:-moz-focusring,
	[type="reset"]:-moz-focusring,
	[type="submit"]:-moz-focusring {
		outline: none;
	}

	#modal-root {
		position: absolute;
		bottom: 100%;
		${tw`left-0 right-0 top-0`}
	}
`

export default function App() {
	return (
		<React.StrictMode>
			<Global styles={globalStyle} />
			<Provider store={makeStore()}>
				<StyledThemeProvider>
					<LanguageProvider>
						<AppLayout />
					</LanguageProvider>
				</StyledThemeProvider>
			</Provider>
		</React.StrictMode>
	)
}
