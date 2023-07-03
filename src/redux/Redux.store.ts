import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getDBCategorias, getDBContas, getDBTransacoes } from "../configs/database";
import { Transacao } from "../model/transacao";
import { StateType } from "./Redux.model";
import { Conta } from "../model/conta";

const INIT_STATE: StateType = {
    count: 0,
    transacoes: [],
    categorias: [],
    contas: []
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
        },
        addTransacao: (state, action) => {
            state.transacoes.push(action.payload)
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getTransacoes.fulfilled, (state, action) => {
            state.transacoes = action.payload
        }),
        builder.addCase(getCategorias.fulfilled, (state, action) => {
            state.categorias = action.payload
        }),
        builder.addCase(getContas.fulfilled, (state, action) => {
            state.contas = action.payload
        })
    }
})

export const getTransacoes = createAsyncThunk(
    "teste/getTransacoes",
    async (thunkAPI) => {
        const transacoes: Transacao[] = await getDBTransacoes()

        return transacoes
    }
)

export const getCategorias = createAsyncThunk(
    "teste/getCategorias",
    async (thunkAPI) => {
        const categorias: Categoria[] = await getDBCategorias()

        return categorias
    }
)

export const getContas = createAsyncThunk(
    "teste/getContas",
    async (thunkAPI) => {
        const contas: Conta[] = await getDBContas()

        return contas
    }
)

export const { increment, decrement, addTransacao } = stock.actions
export const stockReducer = stock.reducer