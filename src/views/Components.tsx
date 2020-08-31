/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBars } from "@fortawesome/free-solid-svg-icons/faBars"
import { FormattedMessage } from "react-intl"
import Modal from "~/components/Modal"
import { startOfDay, endOfDay, subDays } from "date-fns"
import { CustomDateRangePicker, DateRange } from "~/components/DateRangePicker"
import { PromptModal } from "~/components/PromptModal"
import { RippleButton } from "~/components/Button"
import Page from "~/components/Page"
import tw from "twin.macro"
import { css } from "@emotion/core"
import StyledInput from "~/components/StyledInput"
import { useForm } from "react-hook-form"

function useDebounce<T extends (...args: any[]) => void>(cb: T, delay: number) {
	const handle = React.useRef<number>()
	return React.useCallback(
		(...args: Parameters<T>) => {
			window.clearTimeout(handle.current)
			handle.current = window.setTimeout(cb, delay, args)
		},
		[cb, delay],
	)
}

function debounceValidate<T extends (...args: any[]) => any>(cb: T, delay: number): (...args: any[]) => Promise<any> {
	let h: number
	return (...args: any[]) =>
		new Promise<any>(resolve => {
			window.clearTimeout(h)
			h = window.setTimeout(() => resolve(cb(...args)), delay)
		})
}

interface FormData {
	test: string
}

const ComponentsPage = () => {
	const [dateRange, setDateRange] = React.useState<DateRange>(() => {
		const now = new Date()
		return { startDate: startOfDay(subDays(now, 2)), endDate: endOfDay(now) }
	})
	const { register, handleSubmit, errors } = useForm<FormData>()
	const [value, setValue] = React.useState("")
	const [submitedValue, setSubmitedValue] = React.useState("")
	const debounceChange = useDebounce(e => setValue(e), 500)
	const [open, setOpen] = React.useState(false)
	const [open2, setOpen2] = React.useState(false)

	return (
		<Page>
			<PromptModal when={false} />
			<h2 tw="text-3xl mt-8 mb-5 font-black capitalize">
				<FormattedMessage id="nav_components" />
			</h2>
			<h3 tw="text-xl mt-6 mb-3 font-bold capitalize">
				<FormattedMessage id="button" />
			</h3>
			<div tw="-mb-2">
				<RippleButton tw="inline-block mr-2 mb-2">
					<FormattedMessage id="button" />
				</RippleButton>
				<RippleButton variant="blue" tw="inline-block mr-2 mb-2">
					<FormattedMessage id="button" />
				</RippleButton>
				<RippleButton variant="green" tw="inline-block mr-2 mb-2">
					<FormattedMessage id="button" />
				</RippleButton>
				<RippleButton variant="red" tw="inline-block mr-2 mb-2">
					<FormattedMessage id="button" />
				</RippleButton>
				<RippleButton variant="orange" tw="inline-block mr-2 mb-2">
					<FontAwesomeIcon tw="mr-2" icon={faBars} />
					<FormattedMessage id="button" />
				</RippleButton>
			</div>
			<h3 tw="text-xl mt-6 mb-3 font-bold capitalize">
				<FormattedMessage id="date_range_picker" />
			</h3>
			<div tw="mb-6">
				<CustomDateRangePicker
					tw="font-normal capitalize py-2 px-3 rounded"
					css={css`
						${tw`bg-blue-500 text-white transition ease-in-out duration-200`}
						:focus {
							box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.5);
							${tw`outline-none`}
						}
						:hover {
							box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.5);
							${tw`bg-blue-600`}
						}
					`}
					range={dateRange}
					onChange={e => setDateRange(e)}
				/>
			</div>
			<h3 tw="text-xl mt-6 mb-3 font-bold capitalize">
				<FormattedMessage id="card" />
			</h3>
			<div
				tw="max-w-sm mb-6 rounded overflow-hidden"
				css={css`
					box-shadow: 2px 2px 12px -1px rgba(var(--theme-shadow)),
						0px 0px 6px 0px rgba(var(--theme-shadow-ambient));
				`}
			>
				<div
					tw="w-auto h-48"
					css={css`
						background: rgb(var(--theme-primary));
					`}
				/>
				<div tw="px-6 py-4">
					<div tw="font-bold text-xl mb-2">The Coldest Sunset</div>
					<p tw="text-base">
						Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et
						perferendis eaque, exercitationem praesentium nihil.
					</p>
				</div>
			</div>
			<h3 tw="text-xl mt-6 mb-3 font-bold capitalize">
				<FormattedMessage id="input" />
				{value ? `: ${value}` : ""}
			</h3>
			<form
				tw="mb-6"
				onSubmit={handleSubmit(data => {
					setSubmitedValue(data.test)
				})}
			>
				<StyledInput
					placeholder="text"
					ref={register({
						required: { value: true, message: "Value is required." },
						// validate: debounceValidate(data => {
						// 	if (!data) {
						// 		return "Value is required."
						// 	}
						// 	return null
						// }, 500),
					})}
					name="test"
					autoComplete="off"
					// onChange={e => debounceChange(e.target.value)}
					invalid={!!errors.test}
				/>
				{errors.test && <p aria-label="invalid-message">{errors.test.message}</p>}
				{submitedValue && <p>{submitedValue}</p>}
			</form>
			<h3 tw="text-xl mt-6 mb-3 font-bold capitalize">
				<FormattedMessage id="modal" />
			</h3>
			<div tw="mb-6">
				<RippleButton variant="blue" tw="mr-3" onClick={e => setOpen(true)}>
					<FormattedMessage id="modal" />
				</RippleButton>
				<Modal tw="w-1/2" open={open} onMouseDownOutside={e => setOpen(false)}>
					<div tw="px-6 my-3">
						<div tw="mt-4 mb-2">
							<div tw="font-bold text-xl mb-2 capitalize">
								<FormattedMessage id="title" />
							</div>
						</div>
						<div tw="h-12 mb-3">bla bla bla...</div>
						<div tw="mb-3 flex justify-end">
							<RippleButton
								variant="blue"
								onClick={e => {
									e.preventDefault()
									e.stopPropagation()
									setOpen(false)
								}}
							>
								<FormattedMessage id="ok" />
							</RippleButton>
						</div>
					</div>
				</Modal>
				<RippleButton onClick={e => setOpen2(true)}>
					<FormattedMessage id="modal" />
				</RippleButton>
				<Modal tw="w-1/2" open={open2} exitAnime={false} onMouseDownOutside={e => setOpen2(false)}>
					<div tw="px-6 my-3">
						<div tw="mt-4 mb-2">
							<div tw="font-bold text-xl mb-2 capitalize">
								<FormattedMessage id="title" />
							</div>
						</div>
						<div tw="h-12 mb-3">ha ha ha...</div>
						<div tw="mb-3 flex justify-end">
							<RippleButton
								variant="green"
								tw="flex items-center"
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
								<span tw="pl-2">
									<FormattedMessage id="ok" />
								</span>
							</RippleButton>
						</div>
					</div>
				</Modal>
			</div>
		</Page>
	)
}

export default ComponentsPage
