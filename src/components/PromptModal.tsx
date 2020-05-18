import React from "react"

import { Prompt, useLocation, useHistory } from "react-router-dom"
import { Modal } from "./Modal"

interface Props {
	/** 是否要攔截路由跳轉？ */
	when?: boolean
}

export const PromptModal: React.FC<Props> = ({ when = true }) => {
	const [modalVisible, setModalVisible] = React.useState(false)
	const location = useLocation()
	const history = useHistory()

	const target = React.useRef(undefined) // 要前往的目標路由
	const isDone = React.useRef(false) // 使用者決定離開？

	return (
		<>
			<Prompt
				when={when}
				message={next => {
					// 一樣的路由就懶的處理了
					if (location.pathname === next.pathname) {
						return false
					}
					// console.log(isDone.current, next.pathname) // 這裡應會顯示兩次，一次是 modal 開啟前，一次是 modal 關閉後
					if (!isDone.current) {
						target.current = next
						setModalVisible(true)
						return false // 表明還不要跳轉
					}
					return true
				}}
			/>
			<Modal
				open={modalVisible}
				onMouseDownOutside={e => setModalVisible(false)}
				afterClose={() => {
					if (isDone.current) {
						history.push(target.current.pathname)
					}
				}}
			>
				<div className="px-6 my-3">
					<div className="mt-4 mb-2">
						<div className="font-bold text-xl mb-2">路由跳轉</div>
					</div>
					<div className="h-12 mb-3">確定要離開？</div>
					<div className="mb-3 flex justify-end">
						<button
							className="btn btn-blue"
							onClick={e => {
								e.preventDefault()
								e.stopPropagation()
								isDone.current = true
								setModalVisible(false)
							}}
						>
							是的
						</button>
					</div>
				</div>
			</Modal>
		</>
	)
}
