import React from "react"
import { FormattedMessage } from "react-intl"
import Page from "~/components/Page"
import "twin.macro"

const Home: React.FC = () => {
	return (
		<Page>
			<FormattedMessage id="test" values={{ name: "React" }} />
		</Page>
	)
}

export default Home
