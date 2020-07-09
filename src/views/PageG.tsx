import React, { forwardRef, useRef, useEffect, useImperativeHandle } from "react"

import { fromTextArea, on, off } from "codemirror"
import type { Editor, EditorConfiguration, EditorFromTextArea, Doc, EditorChange } from "codemirror"

import "codemirror/addon/comment/comment"
import "codemirror/addon/edit/closetag"
import "codemirror/addon/edit/closebrackets"
import "codemirror/addon/edit/continuelist"

// highlights
import "codemirror/mode/markdown/markdown"
import "codemirror/mode/javascript/javascript"
import "codemirror/mode/jsx/jsx"
import "codemirror/mode/go/go"
import "codemirror/mode/sass/sass"
import "codemirror/mode/css/css"

import Page from "~/components/Page"

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
		`# Test

code

\`\`\`tsx
import React from "react"
const Card: React.FC = () => {
    return (
        <div>Card</div>
    )
}
\`\`\`
`,
	)

	return (
		<Page>
			<CodeMirror
				id="hehehe"
				ref={ref}
				options={{
					lineNumbers: true,
					mode: "markdown",
					theme: "dracula",
					extraKeys: {
						Enter: "newlineAndIndentContinueMarkdownList",
						Tab: function (cm) {
							cm.replaceSelection(Array(cm.getOption("tabSize")).join(" "))
						},
						"Ctrl-/": "toggleComment",
						"Ctrl-S": function (cm) {
							// no code
						},
					},
					indentWithTabs: true,
					indentUnit: 4,
					autoCloseTags: true,
					autoCloseBrackets: true,
					autofocus: true,
				}}
				defaultValue={cache.current}
				onChange={e => (cache.current = e)}
			/>
		</Page>
	)
}

export default PageG
