import React from "react"
import tw from "twin.macro"
import styled from "@emotion/styled"
import { NavLink as __NavLink } from "react-router-dom"
import type { NavLinkProps } from "react-router-dom"

const Link = styled(__NavLink)`
	${tw`bg-white inline-block py-2 px-4 rounded-t text-blue-500 hover:text-blue-800 font-semibold focus:outline-none`}
	&.active {
		${tw`border-l border-t border-r text-blue-700`}
	}
`

const NavItem = styled.li`
	${tw`mr-1`}
	${Link}.active {
		${tw`-mb-px`}
	}
`

export const Tabs = tw.ul`flex border-b`

export const TabLink = (props: NavLinkProps) => {
	return (
		<NavItem>
			<Link {...props} />
		</NavItem>
	)
}

export const TabContent = tw.div`bg-white shadow rounded-b p-6`
