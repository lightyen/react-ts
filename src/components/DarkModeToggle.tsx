import React from "react"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSun } from "@fortawesome/free-solid-svg-icons/faSun"
import { faMoon } from "@fortawesome/free-solid-svg-icons/faMoon"
import { useTheme, useAction } from "~/store"

import styled from "styled-components"

const Check = styled.input.attrs(props => ({ ...props, type: "checkbox", id: "toggle" }))`
	display: none;
`

const Slider = styled.label.attrs(props => ({ ...props, htmlFor: "toggle" }))`
	width: 3.6rem;
	height: 1.5rem;
	border-radius: 9999px;
	transition: all 200ms ease;

	position: relative;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 0 0.4rem;
	cursor: pointer;

	background: #c1f7d4;
	color: #555;
	${Check}:checked + & {
		background: #222;
		color: #f2ec0c;
	}

	&::after {
		content: "";
		transition: all 200ms ease;
		width: 1.2rem;
		height: 1.2rem;
		top: 0.15rem;
		left: 0.16rem;
		transform: translateX(0.14rem);
		cursor: pointer;
		position: absolute;
		border-radius: 9999px;
		background: #999;
	}

	${Check}:checked + &::after {
		transform: translateX(2rem);
		background: #fff;
	}
`

const DarkModeToggle: React.FC = () => {
	const { name } = useTheme()
	const { changeTheme } = useAction().theme
	return (
		<div className="relative mx-2">
			<Check
				defaultChecked={name == "dark"}
				onChange={e => {
					changeTheme({ name: e.target.checked ? "dark" : "light", cached: false })
				}}
			/>
			<Slider>
				<FontAwesomeIcon icon={faMoon} />
				<FontAwesomeIcon icon={faSun} />
			</Slider>
		</div>
	)
}

export default DarkModeToggle
