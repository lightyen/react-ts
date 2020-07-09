import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGithub } from "@fortawesome/free-brands-svg-icons/faGithub"
import { motion } from "framer-motion"

export const Footer: React.FC = () => {
	return (
		<footer className="app-footer">
			<motion.a
				className="focus:outline-none"
				initial={{ opacity: 0.4 }}
				whileHover={{ opacity: 1 }}
				href="https://github.com/lightyen/react-ts"
				aria-label="repository"
				target="_blank"
				rel="noopener"
			>
				<FontAwesomeIcon icon={faGithub} size="2x" />
			</motion.a>
		</footer>
	)
}
