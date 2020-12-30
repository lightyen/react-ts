import { FormattedMessage } from "react-intl"
import Page from "~/components/Page"
import { theme } from "twin.macro"

const a = theme`gridRowStart.auto`

const interactionStyles = () => <div tw="hover:(text-black underline) focus:(text-blue-500 underline)" />

const test2 = () => <div className="sm:dark:bg-red-800" />

const test1 = () => <div tw="lg:after:(bg-blue-200)" />

const mediaStyles = () => <div tw="sm:(w-4 mt-3) lg:(w-8 mt-6) dark:(bg-black) container bg-transparent" />

const pseudoElementStyles = () => (
	<div tw="before:content after:(content block w-10 h-10 bg-black) transition duration-150" />
)

const stackedVariants = () => <div tw="sm:hover:(bg-black text-black) hocus:bg-blue-300" />

const variantsInGroups = () => <div tw="sm:(bg-black! hover:bg-white!) btn-blue"></div>
