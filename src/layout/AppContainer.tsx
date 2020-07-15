import React from "react"
import { useSelector } from "~/store"
import { Switch, Route, useLocation, Redirect, RouteProps, RedirectProps } from "react-router-dom"
import { routes } from "~/routes"
import { motion, AnimatePresence } from "framer-motion"
import { Footer } from "./Footer"
import { ScrollBar } from "~/components/ScrollBar"
import { css } from "@emotion/core"
import tw from "twin.macro"

const ViewRoute: React.FC<RouteProps> = ({ component, ...props }) => {
	const Component = component as React.ComponentType
	return (
		<motion.div
			tw="flex-grow h-full"
			initial={{ opacity: 0, x: "1rem" }}
			animate={{ opacity: 1, x: 0, transition: { duration: 0.15, ease: "easeInOut" } }}
			exit={{ opacity: 0, transition: { duration: 0.15, ease: "easeInOut" } }}
		>
			<Route {...props}>
				<Component />
			</Route>
		</motion.div>
	)
}

const MotionRedirect: React.FC<RedirectProps> = ({ children, ...props }) => (
	<motion.div exit="undefined">
		<Redirect {...props} />
	</motion.div>
)

const AppSwitch = () => {
	const location = useLocation()
	return (
		<AnimatePresence exitBeforeEnter>
			<Switch location={location} key={location.pathname}>
				{routes.map(({ ...props }, i) => {
					return <ViewRoute key={i} {...props} />
				})}
				<MotionRedirect to="/404" />
			</Switch>
		</AnimatePresence>
	)
}

interface Props {
	headerHeight: number
	sidebarWidth: number
}

export const AppContainer: React.FC<Props> = ({ headerHeight, sidebarWidth }) => {
	const collapsed = useSelector(state => state.app.collapsed)
	return (
		<ScrollBar
			css={[
				tw`flex-grow flex flex-col overflow-x-hidden overflow-y-auto`,
				css`
					transition-property: color background;
					transition-duration: 0.2s;
					transition-timing-function: ease;
				`,
				{
					height: `calc(100vh - ${headerHeight}px)`,
					marginLeft: collapsed ? 0 : sidebarWidth,
				},
			]}
		>
			<article className="flex-grow flex flex-col">
				<AppSwitch />
			</article>
			<Footer />
		</ScrollBar>
	)
}
