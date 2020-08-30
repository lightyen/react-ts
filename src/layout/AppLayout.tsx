import React from "react"
import { BrowserRouter, RouteProps, RedirectProps, Redirect, Route, Switch } from "react-router-dom"
import { Sidebar } from "./Sidebar"
import { Header } from "./Header"
import AppMain from "./AppMain"
import { motion } from "framer-motion"
import Login from "~/pages/Login"
import Page404 from "~/pages/404"

const MotionRedirect = ({ children, ...props }: React.PropsWithChildren<RedirectProps>) => (
	<motion.div exit="undefined">
		<Redirect {...props} />
	</motion.div>
)

const isAuthenticated = (): boolean => {
	return true // try get localstorage token
}

const AuthenticatedRoute = ({ children, ...rest }: React.PropsWithChildren<RouteProps>) => (
	<Route {...rest}>{isAuthenticated() ? children : <MotionRedirect to="/login" />}</Route>
)

const NoAuthenticatedRoute = ({ children, ...rest }: React.PropsWithChildren<RouteProps>) => (
	<Route {...rest}>{!isAuthenticated() ? children : <MotionRedirect to="/" />}</Route>
)

const AppLayout = () => {
	const h = 45
	const w = 246
	return (
		<div tw="h-screen flex flex-col relative">
			<Header height={h} />
			<Sidebar top={h} width={w} />
			<AppMain headerHeight={h} sidebarWidth={w} />
		</div>
	)
}

const AppRouter = () => {
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

const Router = () => (
	<BrowserRouter>
		<AppRouter />
	</BrowserRouter>
)

export default Router
