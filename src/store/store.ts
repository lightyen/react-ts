import { configureStore } from "@reduxjs/toolkit"
import { reducer } from "./reducer"
import createSagaMiddleware from "redux-saga"
import rootSaga from "./saga"

// import { RootStore } from "./reducer"
// import { createEpicMiddleware } from "redux-observable"
// import { rootEpic } from "~/store/epic"
// import { switchMap } from "rxjs/operators"
// import { BehaviorSubject } from "rxjs"
// import { RootAction } from "./epic"

export function makeStore() {
	const sagaMiddleware = createSagaMiddleware()
	// const epicMiddleware = createEpicMiddleware<RootAction, RootAction, RootStore>()

	const store = configureStore({
		reducer,
		middleware: [sagaMiddleware],
		preloadedState: undefined,
		devTools: process.env.NODE_ENV === "development" ? { name: "react is awesome" } : false,
	})

	// TODO: 也許這幾乎沒什麼卵用，未來考慮移除
	module.hot?.accept([require.resolve("~/store/reducer")] as string[], () => {
		console.log("hot replacement root reducer")
		store.replaceReducer(reducer)
	})

	let sagaTask = sagaMiddleware.run(rootSaga)
	module.hot?.accept([require.resolve("~/store/saga")] as string[], () => {
		console.log("hot replacement redux-saga")
		sagaTask.cancel()
		sagaTask.toPromise().then(() => {
			sagaTask = sagaMiddleware.run(rootSaga)
		})
	})

	// const epic$ = new BehaviorSubject(rootEpic)
	// epicMiddleware.run((action$, state$, dep$) => epic$.pipe(switchMap(epic => epic(action$, state$, dep$))))
	// module.hot?.accept(require.resolve("~/store/epic") as string, () => {
	//     console.log("hot replacement redux-observable")
	//     const nextRootEpic = require("~/store/epic").rootEpic
	//     epic$.next(nextRootEpic)
	// })

	return store
}
