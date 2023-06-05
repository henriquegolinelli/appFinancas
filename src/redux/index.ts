import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit"
import { stockReducer } from "./Redux.store"
import { useDispatch } from "react-redux"

const store = configureStore({
    reducer: {
        stock: stockReducer
    }
})

export type storeStateType = ReturnType<typeof store.getState>

export default store