import React from "react"
import { Theme } from "@nivo/core"
import { Pie, PieDatum } from "@nivo/pie"

const theme: Theme = {
	labels: {
		text: { fontSize: 16 },
	},
	legends: {
		text: { fontSize: 16 },
	},
}

interface MyPieProps {
	data: PieDatum[]
	width: number
	height: number
	theme?: Theme
}

const MyPie = ({ data, width, height, theme }: MyPieProps) => (
	<Pie
		data={data}
		width={width}
		height={height}
		theme={{
			...theme,
			tooltip: {
				container: {
					color: "#1a202c",
				},
			},
		}}
		margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
		innerRadius={0.5}
		padAngle={0.7}
		cornerRadius={3}
		colors={{ scheme: "nivo" }}
		borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
		radialLabelsSkipAngle={10}
		radialLabelsTextXOffset={6}
		radialLabelsTextColor="#fff"
		radialLabelsLinkOffset={0}
		radialLabelsLinkDiagonalLength={16}
		radialLabelsLinkHorizontalLength={24}
		radialLabelsLinkStrokeWidth={1}
		radialLabelsLinkColor={{ from: "color" }}
		slicesLabelsSkipAngle={10}
		slicesLabelsTextColor="#333333"
		animate={true}
		motionStiffness={90}
		motionDamping={15}
		defs={[
			{
				id: "dots",
				type: "patternDots",
				background: "inherit",
				color: "rgba(255, 255, 255, 0.3)",
				size: 4,
				padding: 1,
				stagger: true,
			},
			{
				id: "lines",
				type: "patternLines",
				background: "inherit",
				color: "rgba(255, 255, 255, 0.3)",
				rotation: -45,
				lineWidth: 6,
				spacing: 10,
			},
		]}
		fill={[
			{
				match: {
					id: "ruby",
				},
				id: "dots",
			},
			{
				match: {
					id: "c",
				},
				id: "dots",
			},
			{
				match: {
					id: "go",
				},
				id: "dots",
			},
			{
				match: {
					id: "python",
				},
				id: "dots",
			},
			{
				match: {
					id: "scala",
				},
				id: "lines",
			},
			{
				match: {
					id: "lisp",
				},
				id: "lines",
			},
			{
				match: {
					id: "elixir",
				},
				id: "lines",
			},
			{
				match: {
					id: "javascript",
				},
				id: "lines",
			},
		]}
		legends={[
			{
				anchor: "bottom",
				direction: "row",
				translateY: 56,
				itemWidth: 100,
				itemHeight: 18,
				itemTextColor: "#fff",
				symbolSize: 18,
				symbolShape: "circle",
				effects: [
					{
						on: "hover",
						style: {
							itemTextColor: "#ddd",
						},
					},
				],
			},
		]}
	/>
)

const MyChart = ({ width, height }: { width: number; height: number }) => {
	const data: PieDatum[] = [
		{
			id: "javascript",
			label: "javascript",
			value: 591,
			color: "hsl(278, 70%, 50%)",
		},
		{
			id: "java",
			label: "java",
			value: 55,
			color: "hsl(178, 70%, 50%)",
		},
		{
			id: "make",
			label: "make",
			value: 417,
			color: "hsl(315, 70%, 50%)",
		},
		{
			id: "php",
			label: "php",
			value: 192,
			color: "hsl(216, 70%, 50%)",
		},
		{
			id: "rust",
			label: "rust",
			value: 417,
			color: "hsl(348, 70%, 50%)",
		},
	]
	return <MyPie data={data} theme={theme} width={width} height={600} />
}

export default MyChart
