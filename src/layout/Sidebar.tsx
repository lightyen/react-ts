import React from "react"
import classnames from "classnames"
import { useSelector } from "~/store"
import { NavLink, NavLinkProps } from "react-router-dom"
import { FormattedMessage } from "react-intl"

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
					<div className="w-8 mr-1 text-center">
						<FontAwesomeIcon icon={faThLarge} />
					</div>
					<FormattedMessage id="nav_components" />
				</RippleNavLink>
				<RippleNavLink to="/page-b" className="nav-item" activeClassName="active">
					<div className="w-8 mr-1 text-center">
						<FontAwesomeIcon icon={faThList} />
					</div>
					<FormattedMessage id="nav_table" />
				</RippleNavLink>
				<RippleNavLink to="/page-c" className="nav-item" activeClassName="active">
					<div className="w-8 mr-1 text-center">
						<FontAwesomeIcon icon={faInfinity} />
					</div>
					<FormattedMessage id="nav_virtual_list" />
				</RippleNavLink>
				<RippleNavLink to="/page-d" className="nav-item" activeClassName="active">
					<div className="w-8 mr-1 text-center">
						<FontAwesomeIcon icon={faDiceD6} />
					</div>
					<FormattedMessage id="nav_transition" />
				</RippleNavLink>
				<RippleNavLink to="/page-e" className="nav-item" activeClassName="active">
					<div className="w-8 mr-1 text-center">
						<FontAwesomeIcon icon={faDiceD20} />
					</div>
					<FormattedMessage id="nav_chart" />
				</RippleNavLink>
				<RippleNavLink to="/page-f" className="nav-item" activeClassName="active">
					<div className="w-8 mr-1 text-center">
						<FontAwesomeIcon icon={faBox} />
					</div>
					<FormattedMessage id="nav_web_component" />
				</RippleNavLink>
				<RippleNavLink to="/page-g" className="nav-item" activeClassName="active">
					<div className="w-8 mr-1 text-center">
						<FontAwesomeIcon icon={faCode} />
					</div>
					<FormattedMessage id="nav_editor" />
				</RippleNavLink>
				<RippleNavLink to="/page-h" className="nav-item" activeClassName="active">
					<div className="w-8 mr-1 text-center">
						<FontAwesomeIcon icon={faCode} />
					</div>
					<FormattedMessage id="nav_carousel" />
				</RippleNavLink>
				<RippleNavLink to="/page-i" className="nav-item" activeClassName="active">
					<div className="w-8 mr-1 text-center">
						<FontAwesomeIcon icon={faCode} />
					</div>
					<FormattedMessage id="nav_color_picker" />
				</RippleNavLink>
			</ul>
		</nav>
	)
}
