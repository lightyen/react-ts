import React from "react"
import { Provider } from "react-redux"
import LanguageProvider from "~/LanguageProvider"
import AppLayout from "~/layout/AppLayout"
import { makeStore } from "~/store"

import "react-date-range/dist/styles.css" // main style file
import "react-date-range/dist/theme/default.css" // theme css file
import "~/css/styles.css"

export default () => (
	// <React.StrictMode>
	<Provider store={makeStore()}>
		<LanguageProvider>
			<AppLayout />
		</LanguageProvider>
	</Provider>
	// </React.StrictMode>
)
