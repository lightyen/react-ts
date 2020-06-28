import React from "react"
import { RouteProps } from "react-router-dom"
import Home from "~/views/Home"
import PageA from "~/views/PageA"
import PageB from "~/views/PageB"
import PageC from "~/views/PageC"
import PageD from "~/views/PageD"
import PageE from "~/views/PageE"
import PageF from "~/views/PageF"
import PageG from "~/views/PageG"
import PageH from "~/views/PageH"
import PageI from "~/views/PageI"

interface RouteItem extends RouteProps {
	name: React.ReactNode
}

export const routes: RouteItem[] = [
	{ path: "/", exact: true, name: "Home", component: Home },
	{ path: "/page-a", name: <div>Page A</div>, component: PageA },
	{ path: "/page-b", name: <div>Page B</div>, component: PageB },
	{ path: "/page-c", name: <div>Page C</div>, component: PageC },
	{ path: "/page-d", name: <div>Page D</div>, component: PageD },
	{ path: "/page-e", name: <div>Page E</div>, component: PageE },
	{ path: "/page-f", name: <div>Page F</div>, component: PageF },
	{ path: "/page-g", name: <div>Page G</div>, component: PageG },
	{ path: "/page-h", name: <div>Page H</div>, component: PageH },
	{ path: "/page-i", name: <div>Page I</div>, component: PageI },
]

export function getRouteName(url: string): React.ReactNode {
	const r = routes.find(i => i.path === url)
	if (r) {
		return r.name
	}
	const u = new URL(url)
	return u.pathname
}
