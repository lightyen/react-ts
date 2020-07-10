import React from "react"
import { IntlProvider } from "react-intl"
import { useI18n, useTheme } from "~/store"
import { motion } from "framer-motion"
import { getLocaleMessages } from "~/store/i18n/languages"

const LanguageProvider: React.FC = ({ children }) => {
	const { locale } = useI18n()
	const {
		background: backgroundColor,
		text: { background: color },
	} = useTheme()
	return (
		<IntlProvider locale={locale} key={locale} messages={getLocaleMessages(locale)}>
			<motion.div
				key={locale}
				initial={{ opacity: 0.3 }}
				animate={{ opacity: 1 }}
				style={{ color, backgroundColor }}
			>
				{children}
			</motion.div>
		</IntlProvider>
	)
}

export default LanguageProvider
