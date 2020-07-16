import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowUp } from "@fortawesome/free-solid-svg-icons/faArrowUp"
import { faArrowsAltV } from "@fortawesome/free-solid-svg-icons/faArrowsAltV"
import { motion, AnimatePresence } from "framer-motion"
import type { Interpolation } from "@emotion/core"
import { css as _css } from "@emotion/core"
import styled from "@emotion/styled"
import tw from "twin.macro"

export type SortType = "none" | "ascending" | "descending"

interface Props {
	hide?: boolean
	sortType?: SortType
	onClick?(e: React.MouseEvent): void
	css?: Interpolation
}

const Icon = styled.div`
	width: 1rem;
	height: 24px;
	position: relative;
`

function SortIcon({ type }: { type: SortType }) {
	return (
		<Icon>
			<AnimatePresence exitBeforeEnter>
				{(type === "ascending" || type === "descending") && (
					<motion.div
						tw="absolute"
						initial={{ opacity: 0 }}
						animate={{
							rotate: type === "descending" ? 180 : 0,
							opacity: 1,
						}}
						exit={{ opacity: 0 }}
					>
						<FontAwesomeIcon icon={faArrowUp} />
					</motion.div>
				)}
			</AnimatePresence>
			<AnimatePresence exitBeforeEnter>
				{type !== "ascending" && type !== "descending" && (
					<motion.div
						tw="absolute"
						css={_css`
							left: 50%;
							transform: translateX(-50%);
						`}
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
					>
						<FontAwesomeIcon icon={faArrowsAltV} />
					</motion.div>
				)}
			</AnimatePresence>
		</Icon>
	)
}

export const TheadCell: React.FC<Props> = ({ children, hide, sortType, onClick, css }) => {
	if (sortType) {
		return (
			<th
				css={[
					_css`
						transition: all ease 0.16s;
					`,
					hide && tw`hidden`,
					tw`text-gray-900 bg-white whitespace-no-wrap box-border p-3 whitespace-no-wrap`,
					tw`select-none hover:bg-gray-300 cursor-pointer`,
					css,
				]}
				onClick={e => {
					e.preventDefault()
					e.stopPropagation()
					onClick && onClick(e)
				}}
			>
				<div tw="flex justify-between">
					{children}
					<div tw="pl-3">
						<SortIcon type={sortType} />
					</div>
				</div>
			</th>
		)
	} else {
		return (
			<th
				css={[
					css,
					hide && tw`hidden`,
					tw`text-gray-900 bg-white whitespace-no-wrap box-border p-3 whitespace-no-wrap`,
				]}
			>
				{children}
			</th>
		)
	}
}
