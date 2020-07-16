import React from "react"
import { motion, AnimatePresence } from "framer-motion"
import Page from "~/components/Page"
import { FormattedMessage } from "react-intl"
import "twin.macro"

const Box: React.FC<{ value: number; onRemove: (v: number) => void }> = ({ value, onRemove }) => {
	return (
		<motion.div
			tw="inline-block relative p-3 -mr-3 -mb-3"
			exit={{ opacity: 0, scale: 0, transition: { duration: 0.16 } }}
			positionTransition={{
				type: "spring",
				damping: 30,
				stiffness: 300,
			}}
		>
			<motion.button
				tw="bg-gray-900 text-gray-100 rounded-lg focus:outline-none"
				css={{
					width: 300,
					height: 80,
				}}
				whileTap={{ scale: 0.98, opacity: 0.9 }}
				onClick={() => onRemove(value)}
			>
				#{value}
			</motion.button>
		</motion.div>
	)
}

const PageD: React.FC = () => {
	const [data, setData] = React.useState([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
	return (
		<Page>
			<h2 tw="text-3xl mt-8 mb-2 font-black capitalize">
				<FormattedMessage id="nav_transition" />
			</h2>
			<AnimatePresence>
				{data.map(d => (
					<Box
						key={d}
						value={d}
						onRemove={v => {
							const newData = [...data]
							const i = newData.findIndex(d => d === v)
							if (i >= 0) {
								newData.splice(i, 1)
								setData(newData)
							}
						}}
					/>
				))}
			</AnimatePresence>
		</Page>
	)
}

export default PageD
