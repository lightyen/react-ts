import React, { forwardRef, useRef, useEffect, useImperativeHandle } from "react"

import { fromTextArea, on, off, EditorChange } from "codemirror"
import type { Editor, EditorConfiguration, EditorFromTextArea, Doc } from "codemirror"

import "codemirror/mode/javascript/javascript.js"
import "codemirror/addon/comment/comment.js"

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
		`
class Greeter {
	greeting: string;
	constructor (message: string) {
		this.greeting = message;
	}
	greet() {
		return "Hello, " + this.greeting;
	}
}

var greeter = new Greeter("world");

var button = document.createElement('button')
button.innerText = "Say Hello"
button.onclick = function() {
	alert(greeter.greet())
}
document.body.appendChild(button)
	`,
	)

	return (
		<div className="m-3 p-3">
			<CodeMirror
				id="hehehe"
				ref={ref}
				style={{ height: 600 }}
				options={{
					lineNumbers: true,
					mode: "text/typescript",
					theme: "dracula",
					extraKeys: { "Ctrl-/": "toggleComment" },
					tabSize: 4,
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
