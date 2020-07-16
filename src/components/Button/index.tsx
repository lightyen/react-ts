import React from "react"
import { useRipple } from "./hooks"
import tw from "twin.macro"
import styled from "@emotion/styled"
import { css } from "@emotion/core"

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
	variant?: "gray" | "blue" | "green" | "orange" | "red"
}

const Button = styled.button<ButtonProps>(({ variant = "gray" }) => {
	return [
		css`
			transition-property: background-color, box-shadow;
			transition-duration: 200ms;
			transition-timing-function: ease;
		`,
		tw`py-3 px-6 rounded text-white leading-none relative overflow-hidden`,
		variant === "gray" &&
			css`
				${tw`bg-gray-700 text-white`}
				:focus {
					box-shadow: 0 0 0 3px rgba(160, 174, 192, 0.5);
					${tw`outline-none`}
				}
				:hover {
					box-shadow: 0 0 0 3px rgba(160, 174, 192, 0.5);
					${tw`bg-gray-500`}
				}
			`,
		variant === "blue" &&
			css`
				${tw`bg-blue-500 text-white`}
				:focus {
					box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.5);
					${tw`outline-none`}
				}
				:hover {
					box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.5);
					${tw`bg-blue-600`}
				}
			`,
		variant === "green" &&
			css`
				${tw`bg-green-500 text-white`}
				:focus {
					box-shadow: 0 0 0 3px rgba(72, 187, 120, 0.5);
					${tw`outline-none`}
				}
				:hover {
					box-shadow: 0 0 0 3px rgba(72, 187, 120, 0.5);
					${tw`bg-green-600`}
				}
			`,
		variant === "orange" &&
			css`
				${tw`bg-orange-500 text-white`}
				:focus {
					box-shadow: 0 0 0 3px rgba(237, 137, 54, 0.5);
					${tw`outline-none`}
				}
				:hover {
					box-shadow: 0 0 0 3px rgba(237, 137, 54, 0.5);
					${tw`bg-orange-600`}
				}
			`,
		variant === "red" &&
			css`
				${tw`bg-red-500 text-white`}
				:focus {
					box-shadow: 0 0 0 3px rgba(245, 101, 101, 0.5);
					${tw`outline-none`}
				}
				:hover {
					box-shadow: 0 0 0 3px rgba(245, 101, 101, 0.5);
					${tw`bg-red-600`}
				}
			`,
	]
})

export const RippleButton: React.FC<ButtonProps> = ({ children, ...props }) => {
	const ref = useRipple<HTMLButtonElement>()
	return (
		<Button ref={ref} {...props}>
			{children}
		</Button>
	)
}

export default Button
