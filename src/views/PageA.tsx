import React from "react"
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
import tw from "twin.macro"
import styled from "@emotion/styled"
import { css } from "@emotion/core"

interface ButtonProps {
	variant?: "gray" | "blue" | "green" | "orange" | "red"
	onClick?: (e: React.MouseEvent) => void
}

const StyledButton = styled.button<ButtonProps>(({ variant = "gray" }) => {
	return [
		css`
			transition-property: background-color, box-shadow;
			transition-duration: 200ms;
			transition-timing-function: ease;
		`,
		tw`py-3 px-6 rounded text-white leading-none relative overflow-hidden`,
		variant === "gray" &&
			css`
				${tw`bg-gray-700 text-white`}
				:focus {
					box-shadow: 0 0 0 3px rgba(160, 174, 192, 0.5);
					${tw`outline-none`}
				}
				:hover {
					box-shadow: 0 0 0 3px rgba(160, 174, 192, 0.5);
					${tw`bg-gray-500`}
				}
			`,
		variant === "blue" &&
			css`
				${tw`bg-blue-500 text-white`}
				:focus {
					box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.5);
					${tw`outline-none`}
				}
				:hover {
					box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.5);
					${tw`bg-blue-600`}
				}
			`,
		variant === "green" &&
			css`
				${tw`bg-green-500 text-white`}
				:focus {
					box-shadow: 0 0 0 3px rgba(72, 187, 120, 0.5);
					${tw`outline-none`}
				}
				:hover {
					box-shadow: 0 0 0 3px rgba(72, 187, 120, 0.5);
					${tw`bg-green-600`}
				}
			`,
		variant === "orange" &&
			css`
				${tw`bg-orange-500 text-white`}
				:focus {
					box-shadow: 0 0 0 3px rgba(237, 137, 54, 0.5);
					${tw`outline-none`}
				}
				:hover {
					box-shadow: 0 0 0 3px rgba(237, 137, 54, 0.5);
					${tw`bg-orange-600`}
				}
			`,
		variant === "red" &&
			css`
				${tw`bg-red-500 text-white`}
				:focus {
					box-shadow: 0 0 0 3px rgba(245, 101, 101, 0.5);
					${tw`outline-none`}
				}
				:hover {
					box-shadow: 0 0 0 3px rgba(245, 101, 101, 0.5);
					${tw`bg-red-600`}
				}
			`,
	]
})

const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
	const ref = useRipple<HTMLButtonElement>()
	return (
		<StyledButton ref={ref} {...props}>
			{children}
		</StyledButton>
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
			<h2 tw="text-3xl mt-8 mb-5 font-black capitalize">
				<FormattedMessage id="nav_components" />
			</h2>
			<h3 tw="text-xl mt-6 mb-3 font-bold capitalize">
				<FormattedMessage id="button" />
			</h3>
			<div tw="-mb-2">
				<Button tw="inline-block mr-2 mb-2">
					<FormattedMessage id="button" />
				</Button>
				<Button variant="blue" tw="inline-block mr-2 mb-2">
					<FormattedMessage id="button" />
				</Button>
				<Button variant="green" tw="inline-block mr-2 mb-2">
					<FormattedMessage id="button" />
				</Button>
				<Button variant="red" tw="inline-block mr-2 mb-2">
					<FormattedMessage id="button" />
				</Button>
				<Button variant="orange" tw="inline-block mr-2 mb-2">
					<FontAwesomeIcon tw="mr-2" icon={faBars} />
					<FormattedMessage id="button" />
				</Button>
			</div>
			<h3 tw="text-xl mt-6 mb-3 font-bold capitalize">
				<FormattedMessage id="date_range_picker" />
			</h3>
			<div tw="mb-6">
				<CustomDateRangePicker tw="font-normal capitalize" range={dateRange} onChange={e => setDateRange(e)} />
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
			<div tw="mb-6">
				<DebounceValidatedInput
					placeholder="text"
					defaultValue={value}
					validator={e => !e && { error: ["Value is required."] }}
					onChange={v => setValue(v)}
				/>
			</div>
			<h3 tw="text-xl mt-6 mb-3 font-bold capitalize">
				<FormattedMessage id="modal" />
			</h3>
			<div tw="mb-6">
				<Button tw="mr-3" onClick={e => setOpen(true)}>
					<FormattedMessage id="modal" />
				</Button>
				<Modal open={open} onMouseDownOutside={e => setOpen(false)}>
					<div tw="px-6 my-3">
						<div tw="mt-4 mb-2">
							<div tw="font-bold text-xl mb-2 capitalize">
								<FormattedMessage id="title" />
							</div>
						</div>
						<div tw="h-12 mb-3">bla bla bla...</div>
						<div tw="mb-3 flex justify-end">
							<Button
								variant="blue"
								onClick={e => {
									e.preventDefault()
									e.stopPropagation()
									setOpen(false)
								}}
							>
								<FormattedMessage id="ok" />
							</Button>
						</div>
					</div>
				</Modal>
				<Button variant="green" onClick={e => setOpen2(true)}>
					<FormattedMessage id="modal" />
				</Button>
				<Modal tw="w-3/4" open={open2} exitAnime={false} onMouseDownOutside={e => setOpen2(false)}>
					<div tw="px-6 my-3">
						<div tw="mt-4 mb-2">
							<div tw="font-bold text-xl mb-2 capitalize">
								<FormattedMessage id="title" />
							</div>
						</div>
						<div tw="h-12 mb-3">ha ha ha...</div>
						<div tw="mb-3 flex justify-end">
							<Button
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
							</Button>
						</div>
					</div>
				</Modal>
			</div>
		</Page>
	)
}

export default PageA
