import React from "react"
import Select from "react-select"
import { motion } from "framer-motion"
import { FormattedMessage, useIntl } from "react-intl"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFilter } from "@fortawesome/free-solid-svg-icons/faFilter"

export interface OptionType<T> {
	label: React.ReactNode
	value: T
}

interface Props<T = string> {
	tabIndex: number
	options: OptionType<T>[]
	onChange?(value: T): void
}

function useFocusExit() {
	const [focus, setFocus] = React.useState(false)
	const ref = React.useRef<HTMLDivElement>()
	const exit = React.useCallback((e: MouseEvent) => {
		if (e.target instanceof Node) {
			!ref.current.contains(e.target) && setFocus(false)
		}
	}, [])
	React.useEffect(() => {
		return () => {
			if (focus) {
				window.removeEventListener("mousedown", exit)
			}
		}
	}, [exit, focus])
	return { ref, exit, focus, setFocus }
}

export const AddFilter: React.FC<Props> = ({ tabIndex, options, onChange }) => {
	const intl = useIntl()
	const { focus, setFocus, exit, ref } = useFocusExit()
	return (
		<div className="mb-2 mr-3 sm:h-12 outline-none" tabIndex={tabIndex}>
			{focus && (
				<motion.div
					initial={{ scaleY: 0.7, opacity: 0.5 }}
					animate={{ scaleY: 1, opacity: 1, transition: { duration: 0.15 } }}
					onAnimationComplete={() => window.addEventListener("mousedown", exit)}
				>
					<div ref={ref} style={{ width: 180 }}>
						<Select
							menuIsOpen
							isSearchable
							isClearable={false}
							options={options}
							placeholder={intl.formatMessage({ id: "select_placeholder" })}
							noOptionsMessage={() => intl.formatMessage({ id: "select_no_options" })}
							styles={{
								option: style => ({ ...style, whiteSpace: "nowrap" }),
							}}
							onChange={v => {
								onChange && onChange(v["value"])
								setFocus(false)
							}}
						/>
					</div>
				</motion.div>
			)}
			{!focus && (
				<button className="add-filter" onMouseDown={e => setFocus(true)}>
					<FontAwesomeIcon icon={faFilter} />
					<span className="pl-2 whitespace-no-wrap">
						<FormattedMessage id="add_filter" />
					</span>
				</button>
			)}
		</div>
	)
}
