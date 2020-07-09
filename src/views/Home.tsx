import React from "react"
import { FormattedMessage } from "react-intl"
import Page from "~/components/Page"
import DarkModeToggle from "~/components/DarkModeToggle"

const Home: React.FC = () => {
	return (
		<Page>
			<FormattedMessage id="test" values={{ name: "React" }} />
			<DarkModeToggle />
		</Page>
	)
}

export default Home
