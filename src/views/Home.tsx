import React from "react"
import { FormattedMessage } from "react-intl"
import Page from "~/components/Page"
import FileUploader from "~/components/FileUploader"

const Home: React.FC = () => {
	return (
		<Page>
			<FormattedMessage id="test" values={{ name: "React" }} />
			<FileUploader />
		</Page>
	)
}

export default Home
