import tailwind from "~/tailwind.config"

export interface Theme {
	primary: string
	primaryVariant: string
	secondary: string
	secondaryVariant: string
	background: string
	surface: string
	error: string
	success: string
	text: {
		primary: string
		secondary: string
		background: string
		surface: string
		error: string
		success: string
	}
	hover: {
		primary: string
		secondary: string
		background: string
		surface: string
		error: string
		success: string
	}
}

const colors = tailwind.theme.colors

export const themes: { [key: string]: Theme } = {
	light: {
		primary: colors.blue[300],
		primaryVariant: colors.blue[400],
		secondary: colors.green[300],
		secondaryVariant: colors.green[400],
		background: colors.gray[200],
		surface: colors.gray[100],
		error: colors.red[500],
		success: colors.green[500],
		text: {
			primary: colors.gray[800],
			secondary: colors.gray[800],
			background: colors.gray[900],
			surface: colors.gray[900],
			error: colors.gray[900],
			success: colors.gray[900],
		},
		hover: {
			primary: colors.blue[500],
			secondary: colors.green[400],
			background: colors.gray[500],
			surface: colors.gray[500],
			error: colors.red[200],
			success: colors.green[200],
		},
	},
	dark: {
		primary: colors.blue[900],
		primaryVariant: colors.blue[800],
		secondary: colors.green[900],
		secondaryVariant: colors.green[800],
		background: colors.gray[900],
		surface: colors.gray[700],
		error: colors.red[500],
		success: colors.green[500],
		text: {
			primary: colors.gray[100],
			secondary: colors.gray[100],
			background: colors.gray[100],
			surface: colors.gray[100],
			error: colors.gray[100],
			success: colors.gray[100],
		},
		hover: {
			primary: colors.blue[700],
			secondary: colors.green[700],
			background: colors.gray[500],
			surface: colors.gray[500],
			error: colors.red[800],
			success: colors.green[800],
		},
	},
}

export type ThemeMode = "light" | "dark" | "auto"
