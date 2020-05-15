import React, { forwardRef, useRef, useEffect, useImperativeHandle } from "react"

import { fromTextArea, on, off, defineMIME } from "codemirror"
import type { Editor, EditorConfiguration, EditorFromTextArea, Doc, EditorChange } from "codemirror"

import "codemirror/mode/javascript/javascript.js"
import "codemirror/mode/jsx/jsx.js"
import "codemirror/addon/comment/comment.js"
import "codemirror/addon/edit/closetag.js"

defineMIME("text/typescript", { name: "text/javascript", typescript: true })

interface MyProps {
	options?: EditorConfiguration
	onChange?: (value: string) => void
}

type Textarea = Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "onChange">
type Props = Textarea & MyProps

const CodeMirror = forwardRef<Editor, Props>(({ options, className, style, onChange, ...props }, ref) => {
	const textareaRef = useRef<HTMLTextAreaElement>()
	const editorRef = useRef<EditorFromTextArea>()
	useImperativeHandle<Partial<Editor>, Partial<Editor>>(ref, () => ({
		focus: () => editorRef.current.focus(),
	}))
	useEffect(() => {
		editorRef.current = fromTextArea(textareaRef.current, options)
		editorRef.current.setSize("auto", 600)
		return () => {
			editorRef.current.toTextArea()
		}
	}, [options])

	useEffect(() => {
		const cm = editorRef.current
		const handler = (instance: Doc, changeArgs: EditorChange) => {
			onChange(cm.getValue())
		}
		if (onChange) {
			on(cm.getDoc(), "change", handler)
		}
		return () => {
			if (onChange) {
				off(cm.getDoc(), "change", handler)
			}
		}
	}, [onChange])

	return (
		<div className={className} style={style}>
			<textarea
				ref={textareaRef}
				{...props}
				onChange={e => {
					// no code
				}}
			/>
		</div>
	)
})

const PageG: React.FC = () => {
	const ref = useRef<Editor>()

	const cache = React.useRef(
		`import React from "react"
const Card: React.FC = () => {
	return (
		<div>Card</div>
	)
}

`,
	)

	return (
		<div className="m-3 p-3 bg-white">
			<CodeMirror
				id="hehehe"
				ref={ref}
				options={{
					lineNumbers: true,
					mode: "jsx",
					theme: "dracula",
					extraKeys: {
						"Ctrl-/": "toggleComment",
						"Ctrl-S": function (instance) {
							// no code
						},
					},
					indentWithTabs: true,
					indentUnit: 4,
					autoCloseTags: true,
					autofocus: true,
				}}
				defaultValue={cache.current}
				onChange={e => (cache.current = e)}
			/>
			<button className="btn btn-blue" onClick={() => ref.current.focus()}>
				Click
			</button>
		</div>
	)
}

export default PageG
