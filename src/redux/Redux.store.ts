import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getDBGastos } from "../configs/database";

const INIT_STATE: StateType = {
    count: 0,
    gastos: []
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
        builder.addCase(getGastos.fulfilled, (state, action) => {
            state.gastos = action.payload
        })
    }
})

export const getGastos = createAsyncThunk(
    "teste/getGastos",
    async (numero: number, thunkAPI) => {
        const gastos: Gasto[] = await getDBGastos()
        return gastos
    }
)

export const { increment, decrement } = stock.actions
export const stockReducer = stock.reducer