import React from "react"
import classnames from "classnames"
import { useSelector } from "~/store"
import { NavLink, Prompt, useLocation, NavLinkProps } from "react-router-dom"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faThLarge } from "@fortawesome/free-solid-svg-icons/faThLarge"
import { faThList } from "@fortawesome/free-solid-svg-icons/faThList"
import { faInfinity } from "@fortawesome/free-solid-svg-icons/faInfinity"
import { faDiceD6 } from "@fortawesome/free-solid-svg-icons/faDiceD6"
import { faDiceD20 } from "@fortawesome/free-solid-svg-icons/faDiceD20"
import { faBox } from "@fortawesome/free-solid-svg-icons/faBox"
import { faCode } from "@fortawesome/free-solid-svg-icons/faCode"
import { useRipple } from "~/components/Button/hooks"

const RippleNavLink: React.FC<NavLinkProps> = ({ className, ...props }) => {
	const ref = useRipple<HTMLAnchorElement>()
	return <NavLink ref={ref} className={classnames("relative overflow-hidden", className)} {...props} />
}

interface Props {
	top: number
	width: number
}

export const Sidebar: React.FC<Props> = ({ top, width }) => {
	const collapsed = useSelector(state => state.app.collapsed)
	const location = useLocation()
	return (
		<nav
			className="nav-sidebar"
			style={{
				height: `calc(100vh - ${top}px)`,
				top,
				width,
				marginLeft: collapsed ? `${-width}px` : "0px",
			}}
		>
			<ul>
				<RippleNavLink to="/page-a" className="nav-item" activeClassName="active">
					<div className="w-8 mr-2 flex justify-end">
						<FontAwesomeIcon icon={faThLarge} />
					</div>
					<div>Components</div>
				</RippleNavLink>
				<RippleNavLink to="/page-b" className="nav-item" activeClassName="active">
					<div className="w-8 mr-2 flex justify-end">
						<FontAwesomeIcon icon={faThList} />
					</div>
					<div>Table</div>
				</RippleNavLink>
				<RippleNavLink to="/page-c" className="nav-item" activeClassName="active">
					<div className="w-8 mr-2 flex justify-end">
						<FontAwesomeIcon icon={faInfinity} />
					</div>
					<div>Virtual List</div>
				</RippleNavLink>
				<RippleNavLink to="/page-d" className="nav-item" activeClassName="active">
					<div className="w-8 mr-2 relative" style={{ left: "0.875rem" }}>
						<FontAwesomeIcon icon={faDiceD6} />
					</div>
					<div>Transition</div>
				</RippleNavLink>
				<RippleNavLink to="/page-e" className="nav-item" activeClassName="active">
					<div className="w-8 mr-2 relative" style={{ left: "0.8rem" }}>
						<FontAwesomeIcon icon={faDiceD20} />
					</div>
					<div>Chart</div>
				</RippleNavLink>
				<RippleNavLink to="/page-f" className="nav-item" activeClassName="active">
					<div className="w-8 mr-2 relative" style={{ left: "0.8rem" }}>
						<FontAwesomeIcon icon={faBox} />
					</div>
					<div>Web Components</div>
				</RippleNavLink>
				<RippleNavLink to="/page-g" className="nav-item" activeClassName="active">
					<div className="w-8 mr-2 relative" style={{ left: "0.8rem" }}>
						<FontAwesomeIcon icon={faCode} />
					</div>
					<div>CodeMirror</div>
				</RippleNavLink>
			</ul>
		</nav>
	)
}
