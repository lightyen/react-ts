import React from "react"
import ReactDOM from "react-dom"

// reference
// https://www.webcomponents.org/
// https://hacks.mozilla.org/2018/11/the-power-of-web-components/

const template = document.createElement("template")
template.innerHTML = `
<style>
.link {
	color: #222222;
	text-decoration: none;
}
.link:hover {
	color: #444444;
}
</style>`

window.customElements.define(
	"x-search",
	class extends HTMLElement {
		constructor() {
			super()
		}
		attributeChangedCallback() {
			//
		}
		connectedCallback() {
			const mountPoint = document.createElement("span")

			const search = this.getAttribute("search")
			const classes = this.getAttribute("class")
			const url = "https://www.google.com/search?q=" + encodeURIComponent(search)
			this.appendChild(mountPoint)
			ReactDOM.render(
				<a href={url} className={classes}>
					{search}
				</a>,
				mountPoint,
			)

			this.addEventListener("click", this.handleClick.bind(this))
		}

		disconnectedCallback() {
			this.removeEventListener("click", this.handleClick)
		}
		onSlotChange(e) {
			console.log("slot change", e)
		}
		adoptedCallback() {
			//
		}
		handleClick(e) {
			console.log("on click")
		}
	},
)

const PageF = () => {
	return (
		<div className="m-3 p-3 bg-white">
			<x-search class="hover:underline" search="Test">
				{/* <div>Helloworld</div> */}
			</x-search>
		</div>
	)
}

export default PageF
