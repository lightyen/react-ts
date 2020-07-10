import { Theme, ThemeMode, themes } from "./themes"
import { createReducer } from "@reduxjs/toolkit"
import { changeTheme } from "./action"
import chroma from "chroma-js"

export interface ThemeStore extends Theme {
	name: ThemeMode
}

// You will need to change gtk3 theme and restart the browser if you are on linux.
const darkmodeQuery = window.matchMedia("(prefers-color-scheme: dark)")

function getTheme(): ThemeMode {
	const theme = localStorage.getItem("theme")
	if (theme == "dark") {
		return "dark"
	}
	if (theme == "light") {
		return "light"
	}
	// auto
	const darkmode = darkmodeQuery.matches
	if (darkmode) {
		return "dark"
	}
	return "light"
}

function initTheme(name: ThemeMode, cached: boolean) {
	const theme = themes[name]
	document.body.style.color = theme.text.background
	document.body.style.backgroundColor = theme.background
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
	root.style.setProperty("--theme-modal-bg", theme.surface)
	root.style.setProperty("--theme-modal-cover-bg", chroma(theme.text.background).alpha(0.5).css())
	root.style.setProperty("--theme-modal-shadow", chroma(theme.background).alpha(0.2).css())
	root.style.setProperty("--theme-shadow", chroma(theme.text.background).alpha(0.2).css())
	root.style.setProperty("--theme-shadow-ambient", chroma(theme.text.background).alpha(0.05).css())

	const bg = chroma(theme.background)
	const darkmode = bg.luminance() < 0.3
	root.style.setProperty("--theme--color-picker-background", darkmode ? bg.brighten(0.5).css() : bg.darken(0.5).css())

	if (cached) {
		localStorage.setItem("theme", name)
	} else {
		localStorage.setItem("theme", "auto")
	}
	return { ...theme, name: darkmode ? "dark" : "light" }
}

export const theme = createReducer(initTheme(getTheme(), false), builder =>
	builder.addCase(changeTheme, (state, { payload: { name, cached = false } }) => {
		initTheme(name, cached)
		return { ...state, name, ...themes[name] }
	}),
)
