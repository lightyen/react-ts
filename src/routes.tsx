import React from "react"
import { FormattedMessage } from "react-intl"
import { RouteProps } from "react-router-dom"
import Home from "~/views/Home"
import Components from "~/views/Components"
import VirtualList from "~/views/VirtualList"
import Table from "~/views/Table"
import Transition from "~/views/Transition"
import WebComponent from "~/views/WebComponent"
import Editor from "~/views/Editor"
import Carousel from "~/views/Carousel"
import ColorPicker from "~/views/ColorPicker"

interface RouteItem extends RouteProps {
	name: React.ReactNode
}

export const routes: RouteItem[] = [
	{ path: "/", exact: true, name: <FormattedMessage id="home" />, component: Home },
	{ path: "/components", name: <FormattedMessage id="nav_components" />, component: Components },
	{ path: "/virtual-list", name: <FormattedMessage id="nav_virtual_list" />, component: VirtualList },
	{ path: "/table", name: <FormattedMessage id="nav_table" />, component: Table },
	{ path: "/transition", name: <FormattedMessage id="nav_transition" />, component: Transition },
	{ path: "/web-component", name: <FormattedMessage defaultMessage="Web Components" />, component: WebComponent },
	{ path: "/codemirror", name: <FormattedMessage id="nav_editor" />, component: Editor },
	{ path: "/carousel", name: <FormattedMessage id="nav_carousel" />, component: Carousel },
	{ path: "/color-picker", name: <FormattedMessage id="nav_color_picker" />, component: ColorPicker },
]

export function getRouteName(url: string): React.ReactNode {
	const r = routes.find(i => i.path === url)
	if (r) {
		return r.name
	}
	const u = new URL(url)
	return u.pathname
}
