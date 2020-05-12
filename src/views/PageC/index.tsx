import React from "react"
import chroma from "chroma-js"
import { useVirtualScroll, useStay, VirtualItem, VirtualScrollProps } from "./useVirtualScroll"
import { useScrollBar } from "~/components/ScrollBar"

function outerHeight(target: HTMLElement) {
	const marginTop = parseInt(document.defaultView.getComputedStyle(target).getPropertyValue("margin-top"))
	const marginBottom = parseInt(document.defaultView.getComputedStyle(target).getPropertyValue("margin-bottom"))
	return target.getBoundingClientRect().height + marginTop + marginBottom
}

interface Item extends VirtualItem {
	color: string
	background: string
}

function randomItem(): Item {
	const background = chroma.random().brighten().hex()
	const color = chroma.contrast(background, "white") > 2 ? "#f7fafc" : "#1a202c"
	return { background, color, height: Math.round(200.0 * (Math.random() + 1.0)) }
}

function createData(size = 20000) {
	console.log("create large data:", size)
	console.time("create large data")
	const data = new Array<Item>(size)
	while (size--) data[size] = randomItem()
	console.timeEnd("create large data")
	return data
}

interface MyContextState {
	offsetTop: number
	data: Item[]
}

interface ChangeDataAction {
	type: "CHANGE_DATA"
	data: Item[]
}

interface ChangeOffsetTopAction {
	type: "CHANGE_OFFSETTOP"
	offsetTop: number
}

type MyContextAction = ChangeDataAction | ChangeOffsetTopAction

interface MyContextType extends MyContextState {
	dispatch: React.Dispatch<MyContextAction>
}

const MyContext = React.createContext<MyContextType>(null)

function reducer(state: MyContextState, action: MyContextAction) {
	switch (action.type) {
		case "CHANGE_DATA":
			return { ...state, data: action.data }
		case "CHANGE_OFFSETTOP":
			return { ...state, offsetTop: action.offsetTop }
		default:
			throw new Error("action is not implement")
	}
}

function useMyContext() {
	const { dispatch, ...state } = React.useContext(MyContext)
	const changeData = React.useCallback((data: Item[]) => dispatch({ type: "CHANGE_DATA", data }), [dispatch])
	const changeOffsetTop = React.useCallback(
		(offsetTop: number) => dispatch({ type: "CHANGE_OFFSETTOP", offsetTop }),
		[dispatch],
	)
	return { ...state, changeData, changeOffsetTop }
}

// ///////

const VirtualList: React.FC = () => {
	const { data, offsetTop, changeOffsetTop } = useMyContext()
	const scrollbar = useScrollBar()
	const container = React.useRef<HTMLDivElement>()
	React.useEffect(() => {
		const e = container.current
		const marginTop = parseInt(
			document.defaultView.getComputedStyle(e.parentElement).getPropertyValue("margin-top"),
		)
		changeOffsetTop(e.offsetTop + marginTop)
	}, [changeOffsetTop])

	const virtual = useVirtualScroll({
		scrollbar,
		data,
		offsetTop,
		// minDisplay: 5,
	})
	useStay({ ...virtual })
	const { start, end, paddingTop, totalHeight } = virtual

	return (
		<div ref={container} className="relative">
			<Information {...virtual} />
			<div className="relative" style={{ height: totalHeight }}>
				<div
					className="relative"
					style={{
						willChange: "transform",
						transform: `translateY(${paddingTop}px)`,
					}}
				>
					{data.slice(start, end).map(({ ...style }, i) => (
						<div key={start + i} className="flex flex-col items-center text-2xl pt-6" style={style}>
							<div>{start + i}</div>
							<div className="spinner" />
						</div>
					))}
				</div>
			</div>
		</div>
	)
}

function scrollTo(options: {
	index: number
	accHeights: number[]
	scrollbar: HTMLElement
	offsetTop?: number
	behavior?: "auto" | "smooth"
}) {
	const { scrollbar, accHeights, index, offsetTop = 0, behavior = "auto" } = options
	if (index != undefined) {
		const top = (accHeights[index - 1] ?? 0) + offsetTop
		scrollbar.scrollTo({ top, behavior })
	}
}

const Information: React.FC<VirtualScrollProps> = ({ scrollTop, start, end, accHeights, scrollbar }) => {
	const { offsetTop, changeData } = useMyContext()
	const input = React.useRef(0)
	const ref = React.useRef<HTMLDivElement>()

	const [marginBottom, setMarginBottom] = React.useState(0)
	React.useEffect(() => {
		setMarginBottom(-outerHeight(ref.current))
	}, [])

	return (
		<div ref={ref} className="sticky text-xl z-10 w-4/5 mx-auto" style={{ top: "1rem", marginBottom }}>
			<div className="p-3 bg-gray-300" style={{ background: "#e2e8f0a0" }}>
				<button
					className="btn btn-blue mb-3"
					onClick={e =>
						scrollTo({
							scrollbar,
							accHeights,
							index: input.current,
							offsetTop,
							behavior: "smooth",
						})
					}
				>
					Goto
				</button>
				<input
					className="border-gray-300 rounded-lg mx-3 py-2 px-4"
					type="number"
					defaultValue={0}
					onChange={e => {
						if (/^\d+$/.test(e.target.value)) {
							const x = parseInt(e.target.value)
							if (x >= 0 && x < accHeights.length) {
								input.current = x
							} else {
								input.current = undefined
							}
						}
					}}
					onKeyDown={e => {
						if (e.key === "Enter") {
							scrollTo({
								scrollbar,
								accHeights,
								index: input.current,
								offsetTop,
								behavior: "smooth",
							})
						}
					}}
				/>
				<button className="btn btn-blue" style={{ top: 120 }} onClick={e => changeData(createData())}>
					Create
				</button>
				<div>Items: {accHeights.length}</div>
				<div>ScrollTop: {scrollTop}px</div>
				<div>Start: {start}</div>
				<div>End: {end}</div>
				<div>Delta: {accHeights[start] - scrollTop + offsetTop}px</div>
				<div>Display: {end - start}</div>
				<div>OffsetTop: {offsetTop}px</div>
			</div>
		</div>
	)
}

const PageC: React.FC = () => {
	const [state, dispatch] = React.useReducer(reducer, null, () => ({ offsetTop: 0, data: createData() }))
	const value = React.useMemo(() => ({ ...state, dispatch }), [state, dispatch])
	return (
		<MyContext.Provider value={value}>
			<div className="m-3 pt-1 px-6 pb-6 relative bg-white">
				<h2 className="text-3xl mt-4 mb-2 font-black">Virtual List</h2>
				<VirtualList />
			</div>
		</MyContext.Provider>
	)
}

export default PageC
