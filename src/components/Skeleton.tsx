import React from "react"
import styled from "@emotion/styled"
import { keyframes } from "@emotion/core"
import "twin.macro"

const shimmer = keyframes`
 100% {
    transform: translateX(100%);
  }
`

export const skeleton = (component: React.ComponentType) => {
	return styled(component)`
		position: relative;
		overflow: hidden;
		&:after {
			position: absolute;
			top: 0;
			right: 0;
			bottom: 0;
			left: 0;
			transform: translateX(-100%);
			background-image: linear-gradient(
				90deg,
				rgba(255, 255, 255, 0) 0,
				rgba(255, 255, 255, 0.3) 30%,
				rgba(255, 255, 255, 0.5) 50%,
				rgba(255, 255, 255, 0.3) 80%,
				rgba(255, 255, 255, 0)
			);
			animation: ${shimmer} 2.2s infinite;
			content: "";
		}
	`
}

const SkeletonBox = skeleton(props => (
	<div
		tw="rounded min-h-8 inline-flex items-center justify-center w-full px-4 py-2 bg-gray-300 text-gray-600"
		{...props}
	/>
))

export default ({
	children,
	pending = true,
	content,
	...props
}: React.PropsWithChildren<{ pending?: boolean; content?: React.ReactNode }>) => {
	return pending ? <SkeletonBox {...props}>{content}</SkeletonBox> : <>{children}</>
}
