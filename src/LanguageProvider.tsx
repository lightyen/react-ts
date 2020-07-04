import React from "react"
import { IntlProvider } from "react-intl"
import { useSelector } from "~/store"
import { motion } from "framer-motion"
import { getLocaleMessages } from "~/store/i18n/languages"

const LanguageProvider: React.FC = ({ children }) => {
	const locale = useSelector(state => state.i18n.locale)
	return (
		<IntlProvider locale={locale} key={locale} messages={getLocaleMessages(locale)}>
			<motion.div
				key={locale}
				initial={{ opacity: 0 }}
				animate={{ opacity: 1, transition: { easings: "linear" } }}
			>
				{children}
			</motion.div>
		</IntlProvider>
	)
}

export default LanguageProvider
