import { FormattedMessage } from "react-intl"
import Page from "~/components/Page"
import "twin.macro"
import "dayjs/locale/zh-tw"

const HomePage = () => {
	return (
		<Page>
			<FormattedMessage id="test" values={{ name: "React" }} />
		</Page>
	)
}

export default HomePage
