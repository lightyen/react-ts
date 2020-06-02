import { combineReducers } from "@reduxjs/toolkit"

import { AppStore, app } from "./app/reducer"
import { ThemeStore, theme } from "./theme/reducer"
import { I18nStore, i18n } from "./i18n/reducer"

interface RootStoreType {
	app: AppStore
	theme: ThemeStore
	i18n: I18nStore
}

type DeepReadonly<T> = {
	readonly [K in keyof T]: DeepReadonly<T[K]>
}

export type RootStore = DeepReadonly<RootStoreType>

export const reducer = combineReducers({
	app,
	theme,
	i18n,
})
