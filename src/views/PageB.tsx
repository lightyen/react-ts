import React from "react"
import { Table, withTextRegexp } from "~/components/Table"
import { useIntl, FormattedMessage } from "react-intl"
import chroma from "chroma-js"
import { useSelector } from "~/store"
import type { BreakingPoint } from "~/store/app/model"
import { Column, register } from "~/components/Table"
register("#mytable")

interface Item {
	title: string
	author: string
	views: number
}

const data: Item[] = [
	{ title: "Intro to CSS", author: "Adam", views: 858 },
	{
		title: " A Long and Winding Tour of the History of UI Frameworks and Tools and the Impact on Design",
		author: "Adam",
		views: 112,
	},
	{ title: "Intro to JavaScript", author: "Chris", views: 1280 },
	{ title: "Intro to CSS", author: "Adam", views: 858 },
	{
		title: " A Long and Winding Tour of the History of UI Frameworks and Tools and the Impact on Design",
		author: "Adam",
		views: 112,
	},
	{ title: "Intro to JavaScript", author: "Chris", views: 1280 },
	{ title: "Intro to CSS", author: "Adam", views: 858 },
	{
		title: " A Long and Winding Tour of the History of UI Frameworks and Tools and the Impact on Design",
		author: "Adam",
		views: 112,
	},
	{ title: "Intro to JavaScript", author: "Chris", views: 1280 },
	{ title: "Intro to CSS", author: "Adam", views: 858 },
	{
		title: " A Long and Winding Tour of the History of UI Frameworks and Tools and the Impact on Design",
		author: "Adam",
		views: 112,
	},
	{ title: "Intro to JavaScript", author: "Chris", views: 1280 },
	{ title: "Intro to CSS", author: "Adam", views: 858 },
	{
		title: " A Long and Winding Tour of the History of UI Frameworks and Tools and the Impact on Design",
		author: "Adam",
		views: 112,
	},
	{ title: "Intro to JavaScript", author: "Chris", views: 1280 },
	{ title: "Intro to CSS", author: "Adam", views: 858 },
	{
		title: " A Long and Winding Tour of the History of UI Frameworks and Tools and the Impact on Design",
		author: "Adam",
		views: 112,
	},
	{ title: "Intro to JavaScript", author: "Chris", views: 1280 },
]

const PageB: React.FC = () => {
	const intl = useIntl()
	const bk = useSelector(state => state.app.breakpoint)
	function getMaxPageCount(breakpoint: BreakingPoint) {
		switch (breakpoint) {
			case "md":
			case "lg":
			case "xl":
				return 5
			default:
				return 2
		}
	}
	const columns: Array<Column<Item>> = [
		{
			title: intl.formatMessage({ id: "title" }),
			className: "md:w-1/2 hidden sm:table-cell",
			render: record => record.title,
			filters: [
				{
					type: "pattern",
					label: intl.formatMessage({ id: "title" }),
					filter: (keyword, record) => withTextRegexp(keyword).test(record.title),
				},
			],
		},
		{
			title: "Author",
			className: "md:w-1/4",
			render: record => record.author,
			sorter: (a, b) => a.author.localeCompare(b.author),
			filters: [
				{
					type: "select",
					label: "Author",
					isMulti: true,
					filterOptions: [
						{ label: "Adam", value: "Adam", color: "#36c236" },
						{ label: "Chris", value: "Chris", color: "#3636c2" },
					],
					filter: (values, record) => {
						if (values.length == 0) {
							return true
						}
						for (const s of values) {
							if (record.author.includes(s)) {
								return true
							}
						}
						return false
					},
					styles: {
						option: (styles, { data, isDisabled, isFocused, isSelected }) => {
							const color = chroma(data.color)
							return {
								...styles,
								whiteSpace: "nowrap",
								background: isSelected ? data.color : isFocused ? color.alpha(0.1).css() : null,
								color: isSelected ? (color.luminance() < 0.5 ? "white" : "black") : data.color,
							}
						},
						indicatorsContainer: style => ({ ...style, paddingLeft: "1.5rem" }),
						multiValue: (styles, { data }) => {
							const color = chroma(data.color)
							return {
								...styles,
								backgroundColor: color.alpha(0.1).css(),
							}
						},
						multiValueLabel: (styles, { data }) => ({
							...styles,
							color: data.color,
						}),
						multiValueRemove: (styles, { data }) => ({
							...styles,
							color: data.color,
							":hover": {
								backgroundColor: data.color,
								color: "white",
							},
						}),
					},
				},
			],
		},
		{
			title: "Views",
			className: "md:w-1/4",
			render: record => record.views,
			sorter: (a, b) => a.views - b.views,
		},
	]

	return (
		<div className="m-3 p-3 bg-white">
			<h2 className="text-3xl mt-8 mb-5 font-black">Table</h2>

			<Table
				id="#mytable"
				data={data}
				columns={columns}
				rowKey={(v, i) => i}
				pageSize={[10, 100]}
				maxPageItem={getMaxPageCount(bk)}
				showTotal={(total, from, to) => (
					<div className="pr-2 text-gray-600">
						<FormattedMessage id="pagination_total" values={{ total, from, to }} />
					</div>
				)}
			/>
		</div>
	)
}

export default PageB
