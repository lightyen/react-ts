import styled from "@emotion/styled"
import tw from "twin.macro"

const Input = styled.input<{ invalid?: boolean; valid?: boolean }>`
	transition: all ease 160ms;
	& ~ [aria-label="invalid-message"] {
		${tw`mt-1 text-red-500 text-xs italic`}
	}
	& ~ [aria-label=".valid-message"] {
		${tw`mt-1 text-green-500 text-xs italic`}
	}
	${tw`bg-white border border-gray-300 rounded-lg py-2 px-4 block w-full`}
	:focus {
		${tw`outline-none shadow-outline`}
	}
	${({ invalid }) => invalid && tw`bg-red-200 border-red-500`}
	:focus {
		${({ invalid }) => invalid && tw`bg-red-100`}
		${({ invalid }) => invalid && `box-shadow: 0 0 0 3px rgba(225, 66, 66, 0.507);`}
	}

	${({ valid }) => valid && tw`bg-green-200 border-green-500`}
	:focus {
		${({ valid }) => valid && tw`bg-green-100`}
		${({ valid }) => valid && `box-shadow: 0 0 0 3px rgba(79, 225, 66, 0.507);`}
	}
`
export default Input
