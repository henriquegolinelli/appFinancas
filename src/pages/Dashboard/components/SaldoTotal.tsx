import { Button, Card, Divider, Layout, Text } from "@ui-kitten/components"
import { useState } from "react"
import { View, ViewProps } from "react-native"
import { Styles } from "../../../common/style/stylesheet"
import { useSelector } from "react-redux"
import { storeStateType } from "../../../redux"
import { Transacao } from "../../../model/transacao"
import { TipoReceita } from "../../../model/tipoReceita"
import { isAtualMes } from "../../../common/util/dateUtils"
import { getContaText, getTransacoesbyConta } from "../../../common/util/dbUtils"
import { Conta } from "../../../model/conta"

export const SaldoTotal = () => {
    //
    const stock = useSelector((state: storeStateType) => state.stock)
    const transacoes: Transacao[] = stock.transacoes
    const contas: Conta[] = stock.contas

    //
    const [details, setDetail] = useState(false)

    //
    let receita: number = 0
    let despesa: number = 0
    let receitaMensal: number = 0
    let despesaMensal: number = 0


    //
    for (let i: number = 0; i < transacoes.length; i++) {
        let transacao: Transacao = transacoes[i]

        // Checar o mês
        let date: string[] = transacao.data.split("/")

        if (transacao.tipo == TipoReceita.despesa) {
            despesa += transacao.valor

            if (!isAtualMes(date[1])) continue

            despesaMensal += transacao.valor

            continue
        }

        receita += transacao.valor

        if (!isAtualMes(date[1])) continue

        receitaMensal += transacao.valor
    }

    const saldo: number = receita + despesa
    const saldoString: string = saldo.toLocaleString('pt-br', { minimumFractionDigits: 2 })

    //Mensal
    const saldoMensal: number = receitaMensal + despesaMensal
    const saldoMensalString: string = saldoMensal.toLocaleString('pt-br', { minimumFractionDigits: 2 })
    const receitaString: string = receitaMensal.toLocaleString('pt-br', { minimumFractionDigits: 2 })
    const despesaString: string = despesaMensal.toLocaleString('pt-br', { minimumFractionDigits: 2 })

    // Transacoes por conta
    const contaTransacoes: Transacao[][] = getTransacoesbyConta(transacoes, contas)

    //
    const headerSaldoTotal = (props: ViewProps) => {
        let cor: string = saldo > 0 ? '#616161' : '#630505'

        return <View {...props}>
            <Text category='h5' style={{ textAlign: 'center' }}>Saldo Total</Text>
            <Text category='h5' status={saldo > 0 ? "success" : "danger"} style={{ textAlign: 'center', fontWeight: 'normal', marginTop: 10 }}>R$ {saldoString}</Text>
        </View>
    }

    // footer Saldo Total
    const footerSaldoTotal = (props: ViewProps) => (
        <View {...props}>
            <Button status='danger' onPress={toggleDetails}><Text>{details ? 'Ocultar' : 'Ver'} Detalhes</Text></Button>
        </View>
    )

    // Detail
    const toggleDetails = () => {
        details ? setDetail(false) : setDetail(true);
    }

    //
    const renderTitle = (trancoes: Transacao[]) => {
        let total: number = 0
        let conta: Conta = contas.find((conta) => conta.id == trancoes[0].contaId) ?? {nome: "", tipo: "", id: 0}

        for (let i: number = 0; i < trancoes.length; i++) {
            total += trancoes[i].valor
        }

        let cor: string = total == 0 ? "#ffffff" : "#2f9e41"
        cor = total < 0 ? "#cd191e" : cor

        return <Text style={{ textAlign: 'center', color: cor }} key={conta.id}>{getContaText(conta)}: R$ {total.toLocaleString('pt-br', { minimumFractionDigits: 2 })}</Text>
    }

    return <Card header={headerSaldoTotal} style={Styles.cardContainer} footer={footerSaldoTotal}>
        <Layout>
            {contaTransacoes.map(renderTitle)}
        </Layout>
        <Layout style={{ display: details ? 'flex' : 'none' }}>
            <Divider style={{ marginTop: 15 }} />
            <Layout style={{ marginTop: 10 }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold', textAlign: 'center', color: '#555' }}>RESUMO DO MÊS</Text>
                <Layout style={{ marginTop: 15, gap: 5 }}>
                    <Layout style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 16, color: '#555' }}>Receita Mensal:</Text>
                        <Text status='success'>R$ {receitaString}</Text>
                    </Layout>
                    <Layout style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 16, color: '#555' }}>Despesa Mensal:</Text>
                        <Text status='danger'>R$ {despesaString}</Text>
                    </Layout>
                    <Layout style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 16, color: '#555' }}>Saldo Mensal:</Text>
                        <Text style={{ color: '#555' }}>R$ {saldoMensalString}</Text>
                    </Layout>
                </Layout>
            </Layout>
        </Layout>

    </Card>
}