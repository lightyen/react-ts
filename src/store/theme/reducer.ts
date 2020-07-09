import { Theme, ThemeMode, themes } from "./themes"
import { createReducer } from "@reduxjs/toolkit"
import { changeTheme } from "./action"
import chroma from "chroma-js"

export interface ThemeStore extends Theme {
	name: ThemeMode
}

const darkmodeQuery = window.matchMedia("(prefers-color-scheme: dark)")

function getTheme(): Theme & { name: ThemeMode } {
	const theme = localStorage.getItem("theme")
	if (theme == "dark") {
		return { name: "dark", ...themes.dark }
	}
	if (theme == "light") {
		return { name: "light", ...themes.light }
	}
	// auto
	const darkmode = darkmodeQuery.matches
	if (darkmode) {
		return { name: "dark", ...themes.dark }
	}
	return { name: "light", ...themes.light }
}

function initTheme(theme: Theme) {
	const root = document.documentElement
	root.style.setProperty("--theme-main-bg", theme.background)
	root.style.setProperty("--theme-header-bg", theme.secondary)
	root.style.setProperty("--theme-header-text", theme.text.secondary)
	root.style.setProperty("--theme-header-hover", theme.hover.secondary)
	root.style.setProperty("--theme-footer-bg", theme.background)
	root.style.setProperty("--theme-footer-text", theme.text.background)
	root.style.setProperty("--theme-sider-bg", theme.primary)
	root.style.setProperty("--theme-sider-text", theme.text.primary)
	root.style.setProperty("--theme-nav-item-hover", theme.hover.primary)
	root.style.setProperty("--theme-nav-item-active", theme.primaryVariant)
	root.style.setProperty("--theme-nav-item-text", theme.text.primary)
	root.style.setProperty("--theme-modal-cover-bg", chroma(theme.primary).alpha(0.5).css())
	root.style.setProperty("--theme-modal-bg", theme.surface)
	// const color = chroma(theme.primary)
	// // const light = color.luminance() > 0.5
	// root.style.setProperty("--theme-btn-background", color.set("hsv.v", "0.5").css())
	// root.style.setProperty("--theme-btn-background-hover", color.set("hsv.v", "0.7").css())
	// root.style.setProperty("--theme-btn-focus-shadow", color.set("hsv.v", "0.5").alpha(0.7).css())
	document.body.style.color = theme.text.background
	document.body.style.backgroundColor = theme.background
}

const init: ThemeStore = {
	...getTheme(),
}
initTheme(init)

export const theme = createReducer(init, builder =>
	builder.addCase(changeTheme, (state, { payload: { name } }) => {
		localStorage.setItem("theme", name)
		initTheme(themes[name])
		return { ...state, name, ...themes[name] }
	}),
)
