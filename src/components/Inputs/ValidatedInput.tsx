import React from "react"
import classnames from "classnames"

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
	const { defaultValue, value, validator, className, onChange, ...rest } = props
	const [inputValue, setInputValue] = React.useState<number | string | readonly string[]>(
		props.value || defaultValue || "",
	)

	// when props changed
	React.useEffect(() => {
		const new_value = (props.value as string) || (props.defaultValue as string) || ""
		setInputValue(new_value)
	}, [props])

	const msgs = validator && validator(inputValue.toString())
	const classes = msgs?.error?.length ? "invalid" : msgs?.success?.length ? "valid" : ""

	return (
		<div>
			<input
				ref={ref}
				value={inputValue}
				onChange={e => {
					setInputValue(e.target.value)
					onChange && onChange(e.target.value)
				}}
				className={classnames("validated-input", classes, className)}
				{...rest}
			/>
			{msgs?.error?.map((e, i) => (
				<div key={i} className="invalid-message">
					{e}
				</div>
			))}
			{msgs?.error?.length == 0 &&
				msgs?.success?.map((e, i) => (
					<div key={i} className="valid-message">
						{e}
					</div>
				))}
		</div>
	)
})
