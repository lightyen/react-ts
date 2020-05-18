import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBars } from "@fortawesome/free-solid-svg-icons/faBars"
import { FormattedMessage } from "react-intl"
import { DebounceValidatedInput } from "~/components/Inputs/DebounceValidatedInput"
import { Modal } from "~/components/Modal"
import { startOfDay, endOfDay, subDays } from "date-fns"
import { CustomDateRangePicker, DateRange } from "~/components/DateRangePicker/DateRangePicker"
import { PromptModal } from "~/components/PromptModal"

const PageA: React.FC = () => {
	const [dateRange, setDateRange] = React.useState<DateRange>(() => {
		const now = new Date()
		return { startDate: startOfDay(subDays(now, 2)), endDate: endOfDay(now) }
	})
	const [value, setValue] = React.useState("")
	const [open, setOpen] = React.useState(false)
	const [open2, setOpen2] = React.useState(false)
	return (
		<div className="m-3 p-6 bg-white">
			<PromptModal when={false} />
			<h2 className="text-3xl mb-2 font-black">Components</h2>
			<h3 className="text-xl mt-4 mb-2 font-bold">
				<FormattedMessage id="button" />
			</h3>
			<div className="-pb-2 mb-6">
				<button className="btn inline-block mr-2 mb-2">Button</button>
				<button className="btn btn-blue inline-block mr-2 mb-2">Button</button>
				<button className="btn btn-green inline-block mr-2 mb-2">Button</button>
				<button className="btn btn-red inline-block mr-2 mb-2">Button</button>
				<button className="btn btn-orange inline-block mr-2 mb-2">
					<FontAwesomeIcon className="mr-2" icon={faBars} />
					Button
				</button>
			</div>
			<h3 className="text-xl mt-4 mb-2 font-bold">
				<FormattedMessage id="date_range_picker" />
			</h3>
			<div className="mb-6">
				<CustomDateRangePicker
					className="btn btn-blue font-normal"
					range={dateRange}
					onChange={e => setDateRange(e)}
				/>
			</div>
			<h3 className="text-xl mt-4 mb-2 font-bold">
				<FormattedMessage id="card" />
			</h3>
			<div className="max-w-sm mb-6 rounded overflow-hidden shadow-lg">
				<div className="bg-darkslateblue-300 w-auto h-48 " />
				<div className="px-6 py-4">
					<div className="font-bold text-xl mb-2">The Coldest Sunset</div>
					<p className="text-gray-700 text-base">
						Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et
						perferendis eaque, exercitationem praesentium nihil.
					</p>
				</div>
			</div>
			<h3 className="text-xl mt-4 mb-2 font-bold">
				<FormattedMessage id="input" />
				{value ? `: ${value}` : ""}
			</h3>
			<div className="mb-6">
				<DebounceValidatedInput
					placeholder="text"
					defaultValue={value}
					validator={e => !e && { error: ["Value is required."] }}
					onChange={v => setValue(v)}
				/>
			</div>
			<h3 className="text-xl mt-4 mb-2 font-bold">
				<FormattedMessage id="modal" />
			</h3>
			<div className="mb-6">
				<button className="btn mr-3" onClick={e => setOpen(true)}>
					Modal
				</button>
				<Modal open={open} onMouseDownOutside={e => setOpen(false)}>
					<div className="px-6 my-3">
						<div className="mt-4 mb-2">
							<div className="font-bold text-xl mb-2">Title</div>
						</div>
						<div className="h-12 mb-3">bla bla bla...</div>
						<div className="mb-3 flex justify-end">
							<button
								className="btn btn-blue"
								onClick={e => {
									e.preventDefault()
									e.stopPropagation()
									setOpen(false)
								}}
							>
								Ok
							</button>
						</div>
					</div>
				</Modal>
				<button className="btn btn-green" onClick={e => setOpen2(true)}>
					Modal
				</button>
				<Modal className="w-3/4" open={open2} exitAnime={false} onMouseDownOutside={e => setOpen2(false)}>
					<div className="px-6 my-3">
						<div className="mt-4 mb-2">
							<div className="font-bold text-xl mb-2">Title</div>
						</div>
						<div className="h-12 mb-3">ha ha ha...</div>
						<div className="mb-3 flex justify-end">
							<button
								className="btn btn-green"
								onClick={e => {
									e.preventDefault()
									e.stopPropagation()
									setOpen2(false)
								}}
							>
								Ok
							</button>
						</div>
					</div>
				</Modal>
			</div>
		</div>
	)
}

export default PageA
