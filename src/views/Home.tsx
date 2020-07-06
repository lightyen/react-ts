import React from "react"
import { FormattedMessage } from "react-intl"
import FileUploader from "~/components/FileUploader"

const Home: React.FC = () => {
	return (
		<div className="m-3 p-3 bg-white">
			<FormattedMessage id="test" values={{ name: "React" }} />
			<FileUploader />
		</div>
	)
}

export default Home
