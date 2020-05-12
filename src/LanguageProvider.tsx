import React from "react"
import { IntlProvider } from "react-intl"
import { useSelector } from "~/store"
import { motion } from "framer-motion"

const LanguageProvider: React.FC = ({ children }) => {
	const name = useSelector(state => state.i18n.name)
	const messages = useSelector(state => state.i18n.messages)
	return (
		<IntlProvider locale={name} key={name} messages={messages as Record<string, string>}>
			<motion.div key={name} initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { easings: "linear" } }}>
				{children}
			</motion.div>
		</IntlProvider>
	)
}

export default LanguageProvider
