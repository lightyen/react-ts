import React from "react"
import { makeStore } from "~/store"
import { Provider } from "react-redux"
import StyledThemeProvider from "~/StyledThemeProvider"
import LanguageProvider from "~/LanguageProvider"
import AppLayout from "~/layout/AppLayout"

import "~/css/styles.css"

export default () => (
	<React.StrictMode>
		<Provider store={makeStore()}>
			<StyledThemeProvider>
				<LanguageProvider>
					<AppLayout />
				</LanguageProvider>
			</StyledThemeProvider>
		</Provider>
	</React.StrictMode>
)
