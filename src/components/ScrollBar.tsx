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
const CustomScrollBar = styled.div.attrs(props => ({ width: 10, padding: 3, color: "black", ...props }))<
	CustomScrollBarProps
>`
	color: transparent;
	transition: all ease 0.2s;
	overflow-x: hidden;
	overflow-y: auto;
	overflow-anchor: none;

	&::-webkit-scrollbar {
		width: ${({ width, padding }) => width + padding * 2}px;
		height: ${({ width, padding }) => width + padding * 2}px;
	}

	&::-webkit-scrollbar-track {
		display: none;
	}

	&:hover {
		color: ${({ color }) => color}80;
	}

	&:focus {
		outline: none;
	}

	&::-webkit-scrollbar-thumb {
		border-radius: ${({ width, padding }) => width / 2 + padding}px;
		border: ${({ padding }) => padding}px solid transparent;
		box-shadow: inset 0 0 0 100px;
		min-height: 60px;
	}
`
const ScrollBarContext = React.createContext<HTMLDivElement>(null)

export function useScrollBar() {
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
		return () => {
			scrollbar.removeEventListener("scroll", scroll)
		}
	}, [scrollbar])
	return scrollTop
}

interface ScrollBarProps {
	className?: string
	style?: React.CSSProperties
	top?: number
}

export const ScrollBar: React.FC<ScrollBarProps> = ({ children, ...props }) => {
	const color = useSelector(state => state.theme.textColor)
	const backgroundColor = useSelector(state => state.theme.backgroundColor)
	const ref = React.useRef<HTMLDivElement>()
	const [handle, setHandle] = React.useState<HTMLDivElement>(ref.current)
	const [thumbColor, setColor] = React.useState(backgroundColor)
	const isMount = React.useRef(false)
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
				setColor(color)
				tick.current = window.setTimeout(() => {
					if (isMount.current) {
						setColor(backgroundColor)
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
	}, [color, backgroundColor])

	return (
		<CustomScrollBar
			tabIndex={0}
			ref={ref}
			onMouseDown={() => {
				window.clearTimeout(tick.current)
				setColor(color)
			}}
			onMouseUp={() => {
				tick.current = window.setTimeout(() => {
					if (isMount.current) {
						setColor(backgroundColor)
					}
				}, 3000)
			}}
			color={thumbColor}
			{...props}
		>
			{handle && (
				<ScrollBarContext.Provider value={handle}>
					<div className="flex-grow flex flex-col" style={{ color }}>
						{children}
					</div>
				</ScrollBarContext.Provider>
			)}
		</CustomScrollBar>
	)
}
