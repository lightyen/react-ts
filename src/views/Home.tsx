import { FormattedMessage } from "react-intl"
import Page from "~/components/Page"
import "twin.macro"

import ReactLogo from "~/assets/logo.svg"

const HomePage = () => {
	return (
		<Page>
			<ReactLogo tw="w-32 text-blue-500 h-5 mr-3" />
			<FormattedMessage id="test" values={{ name: "React" }} />
			<div className="">
				<input type="checkbox" className="text-pink-500 border-0 focus:bg-black placeholder-black" />
				<p tw="text-indigo-600 md:(hover:bg-blue-300 before:absolute) hover:btn-blue  border-blue-500 md:before:(content bg-black)">
					New Project
				</p>
				<p tw="text-indigo-100 group-hocus:text-red-500">
					Create a new project from a variety of starting templates.
				</p>
			</div>
			<div className="group">
				<p tw="md:(hover:bg-black) p-3">Helloworld</p>
			</div>
		</Page>
	)
}

export default HomePage
