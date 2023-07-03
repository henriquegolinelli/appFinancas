import { Button, Card, Divider, Layout, Text } from "@ui-kitten/components"
import { useState } from "react"
import { View, ViewProps } from "react-native"
import { Styles } from "../../../common/style/stylesheet"
import { useSelector } from "react-redux"
import { storeStateType } from "../../../redux"
import { Transacao } from "../../../model/transacao"
import { TipoReceita } from "../../../model/tipoReceita"

export const SaldoTotal = () => {
    //
    const stock = useSelector((state: storeStateType) => state.stock)
    const transacoes: Transacao[] = stock.transacoes

    //
    const [details, setDetail] = useState(false)

    //
    let receita: number = 0
    let despesa: number = 0

    //
    for (let i: number = 0; i < transacoes.length; i++) {
        let transacao: Transacao = transacoes[i]

        if (transacao.tipo == TipoReceita.despesa) {
            despesa += transacao.valor

            continue
        }

        receita += transacao.valor
    }

    const saldo: number = receita + despesa
    const saldoString: string = saldo.toLocaleString('pt-br', { minimumFractionDigits: 2 })
    const receitaString: string = receita.toLocaleString('pt-br', { minimumFractionDigits: 2 })
    const despesaString: string = despesa.toLocaleString('pt-br', { minimumFractionDigits: 2 })

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

    return <Card header={headerSaldoTotal} style={Styles.cardContainer} footer={footerSaldoTotal}>
        <Layout>
            <Text style={{ textAlign: 'center', color: '#777' }}>Principal (corrente): R$ {saldoString}</Text>
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
                        <Text style={{ color: '#555' }}>R$ {saldoString}</Text>
                    </Layout>
                </Layout>
            </Layout>
        </Layout>

    </Card>
}