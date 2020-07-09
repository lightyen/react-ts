import React from "react"
import { motion, AnimatePresence } from "framer-motion"
import Page from "~/components/Page"

// const PageD: React.FC = () => {
// 	const x = useMotionValue(500)
// 	const input = [0, 500, 1000]
// 	const output = [0.1, 1, 0.1]
// 	const opacity = useTransform(x, input, output)
// 	const color = useMotionValue("#cd00bb")

// 	useEffect(() => {
// 		function update() {
// 			color.set(transform(x.get(), [0, 1000], ["#F00", "#80F"]))
// 		}
// 		const unsubscribe = x.onChange(() => {
// 			update()
// 		})
// 		return () => {
// 			unsubscribe()
// 		}
// 	}, [color, x])
// 	return (
// 		<div className="m-3 p-3 bg-white">
// 			<div className="bg-gray-800 text-gray-100 relative" style={{ height: 700 }}>
// 				<motion.svg
// 					className="cursor-pointer"
// 					height="100"
// 					width="100"
// 					drag
// 					dragConstraints={{
// 						left: 0,
// 						right: 800,
// 						top: 0,
// 						bottom: 300,
// 					}}
// 					style={{
// 						x,
// 						opacity,
// 						color,
// 					}}
// 				>
// 					<circle cx={50} cy={50} r="50" fill="currentColor" />
// 				</motion.svg>
// 			</div>
// 		</div>
// 	)
// }

const Box: React.FC<{ value: number; onRemove: (v: number) => void }> = ({ value, onRemove }) => {
	return (
		<motion.div
			className="inline-block relative p-3 -mr-3 -mb-3"
			exit={{ opacity: 0, scale: 0, transition: { duration: 0.16 } }}
			positionTransition={{
				type: "spring",
				damping: 30,
				stiffness: 300,
			}}
		>
			<motion.button
				className="bg-gray-900 text-gray-100 rounded-lg focus:outline-none"
				style={{
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
		<Page className="pt-0">
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
