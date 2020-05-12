import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGithub } from "@fortawesome/free-brands-svg-icons/faGithub"
import { motion } from "framer-motion"

export const Footer: React.FC = () => {
	return (
		<footer className="app-footer">
			<motion.a
				className="text-gray-700 focus:outline-none"
				initial={{ opacity: 0.5 }}
				whileHover={{ opacity: 1, transition: { duration: 0.15 } }}
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
