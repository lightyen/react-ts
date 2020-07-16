import React from "react"
import { FormattedMessage } from "react-intl"
import Page from "~/components/Page"
import FileUploader from "~/components/FileUploader"
import "twin.macro"

const Home: React.FC = () => {
	return (
		<Page>
			<FormattedMessage id="test" values={{ name: "React" }} />
			<FileUploader />
			<div tw="h-16 w-16 bg-green-500 md:bg-red-500"></div>
		</Page>
	)
}

export default Home
