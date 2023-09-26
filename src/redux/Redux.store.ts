import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getDBCategorias, getDBContas, getDBTransacoes, getDBTransacoesByDate } from "../configs/database";
import { Transacao } from "../model/transacao";
import { StateType } from "./Redux.model";
import { Conta } from "../model/conta";
import { Categoria } from "../model/categoria";

const INIT_STATE: StateType = {
    count: 0,
    transacoes: [],
    tempTransacoes: [],
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
        },
        addCategoria: (state, action) => {
            state.categorias.push(action.payload)
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
            }),
            builder.addCase(getTransacaoByDate.fulfilled, (state, action) => {
                state.tempTransacoes = action.payload
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

export const getTransacaoByDate = createAsyncThunk(
    "teste/getTransacaoByDate",
    async ({ inicio, fim }: { inicio: string, fim: string }) => {
        let transacoes: Transacao[] = []

        if (inicio === "0" && fim === "0") {
            transacoes = await getDBTransacoes()
        } else {
            transacoes = await getDBTransacoesByDate({ inicio: inicio, fim: fim })
        }

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

export const { increment, decrement, addTransacao, addCategoria } = stock.actions
export const stockReducer = stock.reducer