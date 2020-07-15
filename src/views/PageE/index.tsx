import React from "react"
import { spinner } from "../styles"

function useVisible(timeout = 0) {
	const [visible, setVisible] = React.useState(false)
	React.useEffect(() => {
		const handle = window.setTimeout(() => setVisible(true), timeout)
		return () => window.clearTimeout(handle)
	}, [timeout])
	return visible
}

const Loadable: React.FC<{ timeout: number }> = ({ timeout = 500, children }) => {
	const visible = useVisible(timeout)
	return visible ? <>{children}</> : null
}

const MyChart = React.lazy(() => import("./MyChart"))

const PageE: React.FC = () => {
	const ref = React.useRef<HTMLDivElement>()
	const [width, setWidth] = React.useState(0)

	React.useEffect(() => {
		const container = ref.current
		let handle = 0
		if (width === 0) {
			const rect = container.getBoundingClientRect()
			setWidth(rect.width)
		}
		function resize() {
			window.cancelAnimationFrame(handle)
			handle = window.requestAnimationFrame(() => {
				const rect = container.getBoundingClientRect()
				setWidth(rect.width)
			})
		}
		window.addEventListener("resize", resize)
		return () => {
			window.cancelAnimationFrame(handle)
			window.removeEventListener("resize", resize)
		}
	}, [width])

	return (
		<div className="h-full relative p-3">
			<div
				ref={ref}
				className="absolute bg-gray-900"
				style={{ width: "calc(100% - 1.5rem)", height: "calc(100% - 1.5rem)" }}
			>
				<React.Suspense
					fallback={
						<Loadable timeout={500}>
							<div style={{ width, height: 600 }} className="relative p-6 flex justify-center">
								<div css={spinner} />
							</div>
						</Loadable>
					}
				>
					<MyChart width={width} height={600} />
				</React.Suspense>
			</div>
		</div>
	)
}

export default PageE
