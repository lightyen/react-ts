import React from "react"
import styled from "@emotion/styled"
import { useScollBarVisible } from "./ScrollBar"
import tw from "twin.macro"

const PageDetectScrollbar = styled.div<{ hasScrollbar: boolean }>`
	${tw`m-3 p-3`}
	${({ hasScrollbar }) => hasScrollbar && tw`mr-1`}
	background-color: rgb(var(--theme-surface));
	color: rgb(var(--theme-text-surface));
`

const Page: React.FC = ({ children, ...props }) => {
	const hasScrollbar = useScollBarVisible()
	return (
		<PageDetectScrollbar hasScrollbar={hasScrollbar} {...props}>
			{children}
		</PageDetectScrollbar>
	)
}

export default Page
