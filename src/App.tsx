import React from "react"
import type { Store } from "redux"
import { Provider } from "react-redux"
import AppLayout from "~/layout/AppLayout"
import { Global, css } from "@emotion/core"
import tw from "twin.macro"

import { useSelector } from "~/store/hooks"
import { ThemeProvider } from "emotion-theming"
import { IntlProvider } from "react-intl"
import { getLocaleMessages } from "~/store/i18n/languages"

import FiraCodeFont from "assets/fonts/FiraCode-Regular.woff2"

import "~/style.css"

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
		${tw`text-gray-100`}
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

const StyledThemeProvider = ({ children }: { children: React.ReactNode }) => {
	const theme = useSelector(state => state.theme)
	return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}

const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
	const locale = useSelector(state => state.i18n.locale)
	return (
		<IntlProvider locale={locale} messages={getLocaleMessages(locale)}>
			{children}
		</IntlProvider>
	)
}

export default ({ store }: { store: Store }) => (
	<Provider store={store}>
		<Global styles={globalStyle} />
		<StyledThemeProvider>
			<LanguageProvider>
				<AppLayout />
			</LanguageProvider>
		</StyledThemeProvider>
	</Provider>
)
