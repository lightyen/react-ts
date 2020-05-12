import React from "react"
import { bindActionCreators } from "@reduxjs/toolkit"
import { createDispatchHook, createSelectorHook, TypedUseSelectorHook } from "react-redux"
import { RootStore } from "./store"
import actionCreators from "./filter/action"

export const Context = React.createContext(null)

const useDispatch = createDispatchHook(Context)
const useReduxSelector = createSelectorHook(Context)

export const useFiltersSelector: TypedUseSelectorHook<RootStore> = useReduxSelector

export function useFiltersAction() {
	const dispatch = useDispatch()
	return React.useMemo(() => ({ ...bindActionCreators(actionCreators, dispatch) }), [dispatch])
}

export function useReduxContext() {
	return React.useContext(Context)
}
