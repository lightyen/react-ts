import type { WebWorker } from "./typings/type"
export default {} as WebWorker

const w = (self as unknown) as DedicatedWorkerGlobalScope

w.onmessage = function (e) {
	console.log("Message received from main script")
	const workerResult = "Result: " + e.data[0] * e.data[1]
	console.log("Posting message back to main script")
	w.postMessage(workerResult)
	w.close()
}
