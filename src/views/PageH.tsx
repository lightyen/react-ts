import React from "react"
import { motion, useMotionValue, useTransform } from "framer-motion"
import chroma from "chroma-js"

const colors = ["#48bb78", "#4299e1", "#f56565", "#ed8936", "#9f7aea"]

const Page: React.FC = () => {
	return (
		<div className="m-3 p-3">
			<Carousel />
		</div>
	)
}

const ResizeObserver = window["ResizeObserver"]

const Carousel: React.FC = () => {
	const [isDragging, setDragging] = React.useState(false)
	const [index, setIndex] = React.useState(0)
	// workaround for useTransform
	const i = React.useRef(0)
	// workaround for useTransform
	const w = React.useRef(0)
	const dragOriginX = useMotionValue(0)
	const x = useMotionValue(0)

	const viewport = React.useRef<HTMLDivElement>()
	const container = React.useRef<HTMLDivElement>()
	const [width, setWidth] = React.useState(0)
	React.useLayoutEffect(() => {
		const el = viewport.current
		w.current = el.clientWidth
		setWidth(w.current)
		const resizeObserver = new ResizeObserver(entries => {
			for (const { contentRect } of entries) {
				w.current = contentRect.width
				setWidth(contentRect.width)
			}
		})

		resizeObserver.observe(el)

		return () => {
			resizeObserver.unobserve(el)
			resizeObserver.disconnect()
		}
	}, [])

	const background = useTransform(x, delta => {
		const index = i.current
		const ratio = Math.abs(delta / w.current)
		const bg =
			delta >= 0
				? chroma.mix(colors[index], colors[index - 1 >= 0 ? index - 1 : 0], ratio)
				: chroma.mix(colors[index], colors[index + 1 < 5 ? index + 1 : 4], ratio)
		return bg.darken(0.4).css()
	})

	return (
		<div ref={viewport}>
			<motion.div
				className="relative text-gray-200 text-center select-none overflow-hidden"
				style={{ background, lineHeight: "100px", left: 0, right: 0, height: 500 }}
			>
				{index}
				<motion.div
					ref={container}
					className="absolute flex"
					style={{ top: 100, left: -(index * width), x, width: "500%" }}
					drag="x"
					dragConstraints={{ left: 0, right: 0 }}
					onDrag={(e, { point }) => {
						const distance = Math.abs(point.x)
						if (distance > width / 2) {
							const delta = (point.x > 0 ? -1 : 1) * Math.floor((distance + width / 2) / width)

							if (index + delta < 0 || index + delta >= 5) {
								return
							}
							i.current = index + delta
							setIndex(index + delta)
						}
					}}
					dragOriginX={dragOriginX}
					onDragStart={() => setDragging(true)}
					onDragEnd={() => setDragging(false)}
					dragElastic={1}
					positionTransition={({ delta }) => {
						if (isDragging) {
							const t = dragOriginX.get() + (1 / 1) * delta.x
							dragOriginX.set(t)
							return false
						}
						return { type: "spring", damping: 1000 }
					}}
				>
					<div
						className="h-64 bg-green-500 text-center shadow-lg"
						style={{ width: "20%", height: "16rem", lineHeight: "16rem" }}
					>
						0
					</div>
					<div
						className="h-64 bg-blue-500 text-center shadow-lg"
						style={{ width: "20%", height: "16rem", lineHeight: "16rem" }}
					>
						1
					</div>
					<div
						className="h-64 bg-red-500 text-center shadow-lg"
						style={{ width: "20%", height: "16rem", lineHeight: "16rem" }}
					>
						2
					</div>
					<div
						className="h-64 bg-orange-500 text-center shadow-lg"
						style={{ width: "20%", height: "16rem", lineHeight: "16rem" }}
					>
						3
					</div>
					<div
						className="h-64 bg-purple-500 text-center"
						style={{ width: "20%", height: "16rem", lineHeight: "16rem" }}
					>
						4
					</div>
				</motion.div>
			</motion.div>
		</div>
	)
}

export default Page
