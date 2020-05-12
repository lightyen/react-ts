import React from "react"
import classnames from "classnames"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowUp } from "@fortawesome/free-solid-svg-icons/faArrowUp"
import { faArrowsAltV } from "@fortawesome/free-solid-svg-icons/faArrowsAltV"
import { motion, AnimatePresence } from "framer-motion"

export type SortType = "none" | "ascending" | "descending"

interface Props {
	hide?: boolean
	sortType?: SortType
	onClick?(e: React.MouseEvent): void
	className?: string
	style?: React.CSSProperties
}

function SortIcon({ type }: { type: SortType }) {
	return (
		<div className="sort-icon-container">
			<AnimatePresence exitBeforeEnter>
				{(type === "ascending" || type === "descending") && (
					<motion.div
						className="sort-icon-2"
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
						className="sort-icon-1"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
					>
						<FontAwesomeIcon icon={faArrowsAltV} />
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	)
}

export const TheadCell: React.FC<Props> = ({ children, hide, sortType, onClick, className, style }) => {
	if (sortType) {
		return (
			<th
				className={classnames(
					className,
					{ hidden: hide },
					"select-none",
					"text-nowrap",
					"hover:bg-gray-300 cursor-pointer",
				)}
				onClick={e => {
					e.preventDefault()
					e.stopPropagation()
					onClick && onClick(e)
				}}
				style={style}
			>
				<div className="flex justify-between">
					{children}
					<div className="pl-3">
						<SortIcon type={sortType} />
					</div>
				</div>
			</th>
		)
	} else {
		return (
			<th className={classnames(className, "text-nowrap", { hidden: hide })} style={style}>
				{children}
			</th>
		)
	}
}
