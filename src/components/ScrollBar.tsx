import React from "react"
import styled from "styled-components"
import { useSelector } from "~/store"

interface CustomScrollBarProps {
	/** Color with scrollbar thumb, ex: #cccccc */
	color?: string
	/** The width of scrollbar thumb */
	width?: number
	padding?: number
}

// https://css-tricks.com/custom-scrollbars-in-webkit/
const CustomScrollBar = styled.div.attrs(({ className, style, ...props }) => ({
	width: 6,
	padding: 4,
	color: "black",
	...props,
}))<CustomScrollBarProps>`
	color: transparent;
	overflow-x: hidden;
	overflow-y: auto;
	overflow-anchor: none;

	::-webkit-scrollbar {
		width: ${({ width, padding }) => width + padding * 2}px;
		height: ${({ width, padding }) => width + padding * 2}px;
		background: #333333;
	}
	::-webkit-scrollbar-corner {
		background: #333333;
	}

	::-webkit-scrollbar-track {
		display: none;
	}

	:hover {
		color: ${({ color }) => color}80;
	}

	:focus {
		outline: none;
	}

	::-webkit-scrollbar-thumb {
		transition: all 3s ease;
		width: 2px;
		min-height: 30px;
		border: ${({ padding }) => padding}px solid transparent;
		border-radius: ${({ width, padding }) => width / 2 + padding}px;
		box-shadow: inset 0 0 0 100px;
	}

	::-webkit-scrollbar-thumb:hover {
		border: ${({ padding }) => padding - 2}px solid transparent;
		box-shadow: inset 0 0 0 100px;
	}
`
const ScrollBarContext = React.createContext<HTMLDivElement>(null)

export function useScrollBarSource() {
	return React.useContext(ScrollBarContext)
}

export function useScrollTop({ scrollbar }: { scrollbar: HTMLElement }) {
	const [scrollTop, setScrollTop] = React.useState(scrollbar.scrollTop)
	const animationFrame = React.useRef(0)
	React.useEffect(() => {
		function scroll() {
			if (animationFrame.current) {
				cancelAnimationFrame(animationFrame.current)
			}
			animationFrame.current = requestAnimationFrame(() => setScrollTop(scrollbar.scrollTop))
		}
		scrollbar.addEventListener("scroll", scroll, { passive: true })
		return () => scrollbar.removeEventListener("scroll", scroll)
	}, [scrollbar])
	return scrollTop
}

interface ScrollBarProps {
	className?: string
	style?: React.CSSProperties
	top?: number
}

export const ScrollBar: React.FC<ScrollBarProps> = ({ children, ...props }) => {
	const ref = React.useRef<HTMLDivElement>()
	const [handle, setHandle] = React.useState<HTMLDivElement>(ref.current)
	const isMount = React.useRef(false)

	const backgroundColor = useSelector(state => state.theme.backgroundColor)
	const textColor = useSelector(state => state.theme.textColor)
	const [thumbColor, setThumbColor] = React.useState(backgroundColor)
	React.useEffect(() => {
		isMount.current = true
		setHandle(ref.current)
		return () => (isMount.current = false)
	}, [])

	const tick = React.useRef<number>(0)

	React.useEffect(() => {
		const target = ref.current
		function cb() {
			window.requestAnimationFrame(() => {
				window.clearTimeout(tick.current)
				setThumbColor(backgroundColor)
				tick.current = window.setTimeout(() => {
					if (isMount.current) {
						setThumbColor(textColor)
					}
				}, 3000)
			})
		}

		// https://developers.google.com/web/tools/lighthouse/audits/passive-event-listeners?hl=zh-tw
		target.addEventListener("wheel", cb, { passive: true })
		target.addEventListener("mousemove", cb, { passive: true })
		target.focus()
		return () => {
			target.removeEventListener("mousemove", cb)
			target.removeEventListener("wheel", cb)
		}
	}, [textColor, backgroundColor])

	return (
		<CustomScrollBar
			tabIndex={0}
			ref={ref}
			onMouseDown={() => {
				window.clearTimeout(tick.current)
				setThumbColor(backgroundColor)
			}}
			onMouseUp={() => {
				tick.current = window.setTimeout(() => {
					if (isMount.current) {
						setThumbColor(textColor)
					}
				}, 3000)
			}}
			color={thumbColor}
			{...props}
		>
			{handle && (
				<ScrollBarContext.Provider value={handle}>
					<div className="flex-grow flex flex-col" style={{ color: textColor }}>
						{children}
					</div>
				</ScrollBarContext.Provider>
			)}
		</CustomScrollBar>
	)
}
