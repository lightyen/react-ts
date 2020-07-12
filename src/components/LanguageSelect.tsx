import React from "react"
import { useAction } from "~/store"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faLanguage } from "@fortawesome/free-solid-svg-icons/faLanguage"
import { motion, AnimatePresence } from "framer-motion"
import { FormattedMessage } from "react-intl"
import { supports } from "~/store/i18n/languages"
import { entries } from "~/type-safed"

import styled, { ThemedStyledProps } from "styled-components"
import { ThemeStore } from "~/store/theme/reducer"

type Props = ThemedStyledProps<
	{
		/** */
	},
	ThemeStore
>

const Button = styled.button`
	opacity: 0.8;
	transition: all 200ms ease;
	background: ${({ theme }: Props) => (theme.name == "dark" ? "#183622" : "#c1f7d4")};
	:hover {
		opacity: 1;
		background: ${({ theme }: Props) => (theme.name == "dark" ? "#21422c" : "#aae6bf")};
	}
`

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
		<div className="relative whitespace-no-wrap">
			<Button
				ref={button}
				className="cursor-pointer select-none rounded-lg px-3 focus:outline-none hover:underline"
				onClick={() => setSpread(true)}
			>
				<FontAwesomeIcon icon={faLanguage} /> <FormattedMessage id="language" />
			</Button>
			<AnimatePresence>
				{spread && (
					<motion.ul
						ref={ul}
						className="language-menu z-10"
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

export default LanguageSelect
