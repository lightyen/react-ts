import React from "react"
import { useSelector, useAction, useI18n } from "~/store"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBars } from "@fortawesome/free-solid-svg-icons/faBars"
import { faLanguage } from "@fortawesome/free-solid-svg-icons/faLanguage"
import { Link } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { FormattedMessage } from "react-intl"
import { supports } from "~/store/i18n/languages"
import { entries } from "~/type-safed"

interface Props {
	height: number
}

export const Header: React.FC<Props> = ({ height }) => {
	const { setSidebarVisible } = useAction().app
	const visible = useSelector(state => state.app.sidebarVisible)
	const { enable } = useI18n()
	return (
		<header className="app-header" style={{ height }}>
			<Link className="px-3 capitalize outline-none hover:underline" to="/">
				<FormattedMessage id="home" />
			</Link>
			<motion.button
				className="px-3 focus:outline-none select-none"
				initial={{ opacity: visible ? 1 : 0.5 }}
				animate={{ opacity: visible ? 1 : 0.5 }}
				onClick={() => setSidebarVisible({ visible: !visible })}
			>
				<FontAwesomeIcon icon={faBars} />
			</motion.button>
			{enable && (
				<div className="flex-grow flex justify-end px-6">
					<LanguageSelect />
				</div>
			)}
		</header>
	)
}

const LanguageSelect: React.FC = () => {
	const [spread, setSpread] = React.useState(false)
	const { setLocale } = useAction().i18n
	const button = React.useRef<HTMLButtonElement>()
	const ul = React.useRef<HTMLUListElement>()
	React.useEffect(() => {
		const btn = button.current
		const menu = ul.current
		function onMouseDown(e: MouseEvent) {
			if (spread && !menu.contains(e.target as Node) && !btn.contains(e.target as Node)) {
				setSpread(false)
			}
		}
		window.addEventListener("mousedown", onMouseDown)
		return () => window.removeEventListener("mousedown", onMouseDown)
	}, [spread])

	return (
		<div className="relative">
			<motion.button
				ref={button}
				className="cursor-pointer focus:outline-none hover:underline"
				initial={{ opacity: 0.5 }}
				animate={{ opacity: spread ? 1 : 0.5 }}
				whileHover={{ opacity: 1 }}
				onClick={() => setSpread(true)}
			>
				<FontAwesomeIcon icon={faLanguage} /> <FormattedMessage id="language" />
			</motion.button>
			<AnimatePresence>
				{spread && (
					<motion.ul
						ref={ul}
						className="language-menu"
						initial={{ opacity: 0, scaleY: 0.2, translateY: -20 }}
						animate={{
							opacity: 1,
							scaleY: 1,
							translateY: 0,
							transition: { easings: "easeIn", duration: 0.1 },
						}}
						exit={{
							opacity: 0,
							scaleY: 0.2,
							translateY: -20,
							transition: { easings: "easeOut", duration: 0.1 },
						}}
					>
						{entries(supports).map(([locale, value]) => (
							<li key={locale} className="language-item" onClick={() => setLocale({ locale })}>
								{value}
							</li>
						))}
					</motion.ul>
				)}
			</AnimatePresence>
		</div>
	)
}
