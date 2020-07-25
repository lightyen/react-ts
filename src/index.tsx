import React from "react"
import { render } from "react-dom"
import App from "~/App"
import { createInstance } from "localforage"

const store = createInstance({ name: "app" })

// store.setItem("test", "helloworld")

store.getItem("test", (err, value) => {
	console.log(typeof value)
	render(<App />, document.getElementById("root"))
})

import TestWorker from "./test.worker"
const worker = new TestWorker()
worker.onmessage = function (e) {
	console.log(e.data)
}
worker.postMessage([3, 7])
