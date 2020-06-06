import React from "react"
import { hot } from "react-hot-loader/root"
import { BrowserRouter, RouteProps, RedirectProps, Redirect, Route, Switch } from "react-router-dom"
import { Sidebar } from "./Sidebar"
import { Header } from "./Header"
import { AppContainer } from "./AppContainer"
import { motion } from "framer-motion"
import Login from "~/pages/Login"
import Page404 from "~/pages/404"

import "react-date-range/dist/styles.css" // main style file
import "react-date-range/dist/theme/default.css" // theme css file
import "~/css/styles.css"

const MotionRedirect: React.FC<RedirectProps> = ({ children, ...props }) => (
	<motion.div exit="undefined">
		<Redirect {...props} />
	</motion.div>
)

const isAuthenticated = (): boolean => {
	return true // try get localstorage token
}

const AuthenticatedRoute: React.FC<RouteProps> = ({ children, ...rest }) => (
	<Route {...rest}>{isAuthenticated() ? children : <MotionRedirect to="/login" />}</Route>
)

const NoAuthenticatedRoute: React.FC<RouteProps> = ({ children, ...rest }) => (
	<Route {...rest}>{!isAuthenticated() ? children : <MotionRedirect to="/" />}</Route>
)

const AppLayout: React.FC = props => {
	const h = 45
	const w = 230
	return (
		<div className="h-screen flex flex-col relative">
			<Header height={h} />
			<Sidebar top={h} width={w} />
			<AppContainer headerHeight={h} sidebarWidth={w} />
		</div>
	)
}

const AppRouter: React.FC = () => {
	return (
		<Switch>
			<Route path="/404" exact>
				<Page404 />
			</Route>
			<NoAuthenticatedRoute path="/login" exact>
				<Login />
			</NoAuthenticatedRoute>
			<AuthenticatedRoute path="/">
				<AppLayout />
			</AuthenticatedRoute>
		</Switch>
	)
}

const Router: React.FC = () => (
	<BrowserRouter>
		<AppRouter />
	</BrowserRouter>
)

export default hot(Router)
