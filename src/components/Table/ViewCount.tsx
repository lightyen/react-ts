import React from "react"
import Select from "react-select"

export interface ViewOption {
	label: string
	value: number
}

interface Props {
	count: number
	options: ViewOption[]
	onChange?(value: number): void
	option?: React.CSSProperties
	container?: React.CSSProperties
}

export const ViewCount: React.FC<Props> = ({ count, options, onChange, option, container }) => {
	return (
		<Select
			options={options}
			value={options.find(v => v.value == count)}
			onChange={v => onChange && onChange(v["value"])}
			isSearchable={false}
			styles={{
				option: styles => ({ ...styles, ...option }),
				container: styles => ({ ...styles, ...container }),
			}}
		/>
	)
}
