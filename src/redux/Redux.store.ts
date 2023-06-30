import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getDBTransacoes } from "../configs/database";
import { Transacao } from "../model/transacao";
import { StateType } from "./Redux.model";

const INIT_STATE: StateType = {
    count: 0,
    transacoes: []
}

const stock = createSlice({
    name: "stock",
    initialState: INIT_STATE,
    reducers: {
        increment(state) {
            state.count += 1
        },
        decrement(state) {
            state.count -= 1
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getTransacoes.fulfilled, (state, action) => {
            state.transacoes = action.payload
        })
    }
})

export const getTransacoes = createAsyncThunk(
    "teste/getGastos",
    async (numero: number, thunkAPI) => {
        console.log("dispatch")
        const transacoes: Transacao[] = await getDBTransacoes()

        return transacoes
    }
)

export const { increment, decrement } = stock.actions
export const stockReducer = stock.reducer