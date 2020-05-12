import React from "react"
import { useSelector } from "~/store"
import { NavLink } from "react-router-dom"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faThLarge } from "@fortawesome/free-solid-svg-icons/faThLarge"
import { faThList } from "@fortawesome/free-solid-svg-icons/faThList"
import { faInfinity } from "@fortawesome/free-solid-svg-icons/faInfinity"
import { faDiceD6 } from "@fortawesome/free-solid-svg-icons/faDiceD6"
import { faDiceD20 } from "@fortawesome/free-solid-svg-icons/faDiceD20"
import { faBox } from "@fortawesome/free-solid-svg-icons/faBox"

interface Props {
	top: number
	width: number
}

export const Sidebar: React.FC<Props> = ({ top, width }) => {
	const collapsed = useSelector(state => state.app.collapsed)
	return (
		<nav
			className="nav-sidebar"
			style={{
				height: `calc(100vh - ${top}px)`,
				top,
				width: width,
				transform: collapsed ? `translateX(${-width}px)` : "translateX(0px)",
			}}
		>
			<ul>
				<NavLink to="/page-a" className="nav-item" activeClassName="active">
					<div className="w-8 mr-2 flex justify-end">
						<FontAwesomeIcon icon={faThLarge} />
					</div>
					<div>Components</div>
				</NavLink>
				<NavLink to="/page-b" className="nav-item" activeClassName="active">
					<div className="w-8 mr-2 flex justify-end">
						<FontAwesomeIcon icon={faThList} />
					</div>
					<div>Table</div>
				</NavLink>
				<NavLink to="/page-c" className="nav-item" activeClassName="active">
					<div className="w-8 mr-2 flex justify-end">
						<FontAwesomeIcon icon={faInfinity} />
					</div>
					<div>Virtual List</div>
				</NavLink>
				<NavLink to="/page-d" className="nav-item" activeClassName="active">
					<div className="w-8 mr-2 relative" style={{ left: "0.875rem" }}>
						<FontAwesomeIcon icon={faDiceD6} />
					</div>
					<div>Transition</div>
				</NavLink>
				<NavLink to="/page-e" className="nav-item" activeClassName="active">
					<div className="w-8 mr-2 relative" style={{ left: "0.8rem" }}>
						<FontAwesomeIcon icon={faDiceD20} />
					</div>
					<div>Chart</div>
				</NavLink>
				<NavLink to="/page-f" className="nav-item" activeClassName="active">
					<div className="w-8 mr-2 relative" style={{ left: "0.8rem" }}>
						<FontAwesomeIcon icon={faBox} />
					</div>
					<div>Web Components</div>
				</NavLink>
			</ul>
		</nav>
	)
}
