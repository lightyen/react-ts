import React from "react"
import Input from "./StyledInput"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function useDebounce<T extends (...args: any[]) => void>(callback: T, delay: number) {
	const handle = React.useRef<number>()
	return React.useCallback(
		(...args: Parameters<T>) => {
			window.clearTimeout(handle.current)
			handle.current = window.setTimeout(() => callback(...args), delay)
		},
		[callback, delay],
	)
}

interface Messages {
	error?: string[]
	success?: string[]
}

interface Props {
	timeout?: number
	onChange?: (e: string) => void
	validator?: (value: string) => Messages
}

export const DebounceValidatedInput = React.forwardRef<
	HTMLInputElement,
	Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> & Props
>((props, ref) => {
	const { timeout = 200, defaultValue, value, validator, onChange, ...rest } = props
	const [inputValue, setInputValue] = React.useState<number | string | readonly string[]>(value || defaultValue || "")

	const debounceChange = useDebounce(onChange, timeout)

	// restore when props changed
	React.useEffect(() => {
		const new_value = props.value || props.defaultValue || ""
		setInputValue(new_value)
	}, [props])

	const msgs = validator && validator(inputValue.toString())
	return (
		<div>
			<Input
				ref={ref}
				invalid={msgs?.error?.length > 0}
				valid={msgs?.error?.length == 0 && msgs?.success?.length > 0}
				value={inputValue}
				onChange={e => {
					setInputValue(e.target.value)
					onChange && debounceChange(e.target.value)
				}}
				{...rest}
			/>
			{msgs?.error?.map((e, i) => (
				<div key={i} aria-label="invalid-message">
					{e}
				</div>
			))}
			{msgs?.error?.length == 0 &&
				msgs?.success?.map((e, i) => (
					<div key={i} aria-label="valid-message">
						{e}
					</div>
				))}
		</div>
	)
})
