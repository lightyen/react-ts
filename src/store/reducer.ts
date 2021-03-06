import { combineReducers } from "@reduxjs/toolkit"

import { AppStore, app } from "./app/reducer"
import { ThemeStore, theme } from "./theme/reducer"
import { I18nStore, i18n } from "./i18n/reducer"
import { DataStore, data } from "./data/reducer"

interface RootStoreType {
	app: AppStore
	theme: ThemeStore
	i18n: I18nStore
	data: DataStore
}

type DeepReadonly<T> = {
	readonly [K in keyof T]: T[K] extends Record<string, unknown> ? DeepReadonly<T[K]> : T[K]
}

export type RootStore = DeepReadonly<RootStoreType>

export default combineReducers({
	app,
	theme,
	i18n,
	data,
})
