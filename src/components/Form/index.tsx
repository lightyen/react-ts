import React from "react"
import tw from "twin.macro"
import styled from "@emotion/styled"

export const FormGroup = tw.div`md:flex mb-6`

export const Label = ({ children }: { children?: React.ReactNode }) => {
	return (
		<div tw="md:w-1/3">
			<label tw="mb-3 md:mb-0 block font-bold text-gray-700 md:text-left pr-4">{children}</label>
		</div>
	)
}

export const InputContent = tw.div`md:w-2/3`

export const InputText = styled.input<{ invalid?: boolean }>`
	${tw`w-full shadow appearance-none py-2 px-4 leading-tight placeholder-gray-900 bg-gray-200 text-gray-900 border border-gray-500 focus:bg-white focus:outline-none focus:shadow-outline`}
	${({ invalid }) => invalid && tw`border-red-500`}
	:focus {
		${({ invalid }) => invalid && `box-shadow: 0 0 0 3px rgba(245, 101, 101, 0.5);`}
	}
`

export const ErrorMessage = tw.p`text-red-500`
