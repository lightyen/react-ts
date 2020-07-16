import React from "react"
import Input from "./StyledInput"

interface Props {
	onChange: (value: string) => void
	validator: (value: string) => Messages
}

interface Messages {
	error?: string[]
	success?: string[]
}

export const ValidatedInput = React.forwardRef<
	HTMLInputElement,
	Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> & Props
>((props, ref) => {
	const { defaultValue, value, validator, onChange, ...rest } = props
	const [inputValue, setInputValue] = React.useState<number | string | readonly string[]>(
		props.value || defaultValue || "",
	)

	// when props changed
	React.useEffect(() => {
		const new_value = (props.value as string) || (props.defaultValue as string) || ""
		setInputValue(new_value)
	}, [props])

	const msgs = validator && validator(inputValue.toString())
	return (
		<div>
			<Input
				invalid={msgs?.error?.length > 0}
				valid={msgs?.error?.length == 0 && msgs?.success?.length > 0}
				ref={ref}
				value={inputValue}
				onChange={e => {
					setInputValue(e.target.value)
					onChange && onChange(e.target.value)
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
