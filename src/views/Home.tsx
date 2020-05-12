import React from "react"
import { FormattedMessage } from "react-intl"

const Home: React.FC = () => {
	return (
		<div className="m-3 p-3 bg-white">
			<FormattedMessage id="test" values={{ name: "React" }} />
		</div>
	)
}

export default Home
