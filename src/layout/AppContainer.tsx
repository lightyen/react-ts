import React from "react"
import { useSelector } from "~/store/hooks"
import { Switch, useLocation } from "react-router-dom"
import { routes } from "~/routes"
import { AnimatePresence } from "framer-motion"
import { Footer } from "./Footer"
import { ScrollBar } from "~/components/ScrollBar"
import { MotionRoute, MotionRedirect } from "~/components/MotionReactRouter"
import { css } from "@emotion/core"
import tw from "twin.macro"

const AppRouter = () => {
	const location = useLocation()
	return (
		<AnimatePresence exitBeforeEnter>
			<Switch location={location} key={location.pathname}>
				{routes.map((props, i) => {
					return <MotionRoute key={i} {...props} />
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
			<article tw="flex-grow flex flex-col">
				<AppRouter />
			</article>
			<Footer />
		</ScrollBar>
	)
}
