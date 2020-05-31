import React from "react"
import { render } from "react-dom"
import App from "~/App"
render(<App />, document.getElementById("root"))

import TestWorker from "./test.worker"
const worker = new TestWorker()
worker.onmessage = function (e) {
	console.log(e.data)
}
worker.postMessage([3, 7])
