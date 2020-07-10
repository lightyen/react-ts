import React from "react"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSun } from "@fortawesome/free-solid-svg-icons/faSun"
import { faMoon } from "@fortawesome/free-solid-svg-icons/faMoon"

const DarkModeToggle: React.FC = () => {
	return (
		<div className="relative">
			<div className="absolute top-0 left-0">
				<FontAwesomeIcon icon={faSun} />
				<FontAwesomeIcon icon={faMoon} />
			</div>
			<div className="absolute top-0 left-0 bg-gray-600 h-full" style={{ width: "1rem" }}></div>
			<input type="checkbox" style={{ width: 1, height: 1, margin: -1 }} />
		</div>
	)
}

export default DarkModeToggle
