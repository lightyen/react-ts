import React from "react"
import classnames from "classnames"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBars } from "@fortawesome/free-solid-svg-icons/faBars"
import { FormattedMessage } from "react-intl"
import { DebounceValidatedInput } from "~/components/Inputs/DebounceValidatedInput"
import { Modal } from "~/components/Modal"
import { startOfDay, endOfDay, subDays } from "date-fns"
import { CustomDateRangePicker, DateRange } from "~/components/DateRangePicker/DateRangePicker"
import { PromptModal } from "~/components/PromptModal"
import { useRipple } from "~/components/Button/hooks"
import Page from "~/components/Page"

const Button: React.FC<{ className?: string }> = ({ className, children }) => {
	const ref = useRipple<HTMLButtonElement>()
	return (
		<button ref={ref} className={classnames("btn relative overflow-hidden", className)}>
			{children}
		</button>
	)
}

const PageA: React.FC = () => {
	const [dateRange, setDateRange] = React.useState<DateRange>(() => {
		const now = new Date()
		return { startDate: startOfDay(subDays(now, 2)), endDate: endOfDay(now) }
	})
	const [value, setValue] = React.useState("")
	const [open, setOpen] = React.useState(false)
	const [open2, setOpen2] = React.useState(false)
	return (
		<Page>
			<PromptModal when={false} />
			<h2 className="text-3xl mt-8 mb-5 font-black capitalize">
				<FormattedMessage id="nav_components" />
			</h2>
			<h3 className="text-xl mt-6 mb-3 font-bold capitalize">
				<FormattedMessage id="button" />
			</h3>
			<div className="-pb-2 mb-6">
				<Button className="inline-block mr-2 mb-2">
					<FormattedMessage id="button" />
				</Button>
				<Button className="btn-blue inline-block mr-2 mb-2">
					<FormattedMessage id="button" />
				</Button>
				<Button className="btn-green inline-block mr-2 mb-2">
					<FormattedMessage id="button" />
				</Button>
				<Button className="btn-red inline-block mr-2 mb-2">
					<FormattedMessage id="button" />
				</Button>
				<Button className="btn-orange inline-block mr-2 mb-2">
					<FontAwesomeIcon className="mr-2" icon={faBars} />
					<FormattedMessage id="button" />
				</Button>
			</div>
			<h3 className="text-xl mt-6 mb-3 font-bold capitalize">
				<FormattedMessage id="date_range_picker" />
			</h3>
			<div className="mb-6">
				<CustomDateRangePicker
					className="btn btn-blue font-normal capitalize"
					range={dateRange}
					onChange={e => setDateRange(e)}
				/>
			</div>
			<h3 className="text-xl mt-6 mb-3 font-bold capitalize">
				<FormattedMessage id="card" />
			</h3>
			<div className="max-w-sm mb-6 rounded overflow-hidden t-shadow">
				<div className="bg-darkslateblue-300 w-auto h-48" />
				<div className="px-6 py-4">
					<div className="font-bold text-xl mb-2">The Coldest Sunset</div>
					<p className="text-base">
						Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et
						perferendis eaque, exercitationem praesentium nihil.
					</p>
				</div>
			</div>
			<h3 className="text-xl mt-6 mb-3 font-bold capitalize">
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
			<h3 className="text-xl mt-6 mb-3 font-bold capitalize">
				<FormattedMessage id="modal" />
			</h3>
			<div className="mb-6">
				<button className="btn mr-3" onClick={e => setOpen(true)}>
					<FormattedMessage id="modal" />
				</button>
				<Modal open={open} onMouseDownOutside={e => setOpen(false)}>
					<div className="px-6 my-3">
						<div className="mt-4 mb-2">
							<div className="font-bold text-xl mb-2 capitalize">
								<FormattedMessage id="title" />
							</div>
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
								<FormattedMessage id="ok" />
							</button>
						</div>
					</div>
				</Modal>
				<button className="btn btn-green" onClick={e => setOpen2(true)}>
					<FormattedMessage id="modal" />
				</button>
				<Modal className="w-3/4" open={open2} exitAnime={false} onMouseDownOutside={e => setOpen2(false)}>
					<div className="px-6 my-3">
						<div className="mt-4 mb-2">
							<div className="font-bold text-xl mb-2 capitalize">
								<FormattedMessage id="title" />
							</div>
						</div>
						<div className="h-12 mb-3">ha ha ha...</div>
						<div className="mb-3 flex justify-end">
							<button
								className="btn btn-green flex items-center"
								onClick={e => {
									e.preventDefault()
									e.stopPropagation()
									setOpen2(false)
								}}
							>
								<svg
									id="i-checkmark"
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 32 32"
									width="16"
									height="16"
									fill="none"
									stroke="currentcolor"
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="4"
								>
									<path d="M2 20 L12 28 30 4" />
								</svg>
								<span className="pl-2">
									<FormattedMessage id="ok" />
								</span>
							</button>
						</div>
					</div>
				</Modal>
			</div>
		</Page>
	)
}

export default PageA
