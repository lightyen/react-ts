import { FormattedMessage } from "react-intl"
import Page from "~/components/Page"
import "twin.macro"
import "dayjs/locale/zh-tw"

import ReactLogo from "~/assets/logo.svg"

const HomePage = () => {
	return (
		<Page>
			<ReactLogo tw="w-32" />
			<FormattedMessage id="test" values={{ name: "React" }} />
		</Page>
	)
}

export default HomePage
