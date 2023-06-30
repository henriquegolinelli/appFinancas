import { Button, Card, Divider, Layout, Text } from "@ui-kitten/components"
import { useState } from "react"
import { View, ViewProps } from "react-native"
import { Styles } from "../../../common/style/stylesheet"

export const SaldoTotal = ({ navigation }: any) => {
    //
    const [details, setDetail] = useState(false)

    //
    const headerSaldoTotal = (props: ViewProps) => (
        <View {...props}>
            <Text category='h5' style={{ textAlign: 'center' }}>Saldo Total</Text>
            <Text category='h5' style={{ textAlign: 'center', fontWeight: 'normal', color: '#555', marginTop: 10 }}>R$ 50.000,00</Text>
        </View>
    )

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
            <Text style={{ textAlign: 'center', color: '#777' }}>Principal (corrente): R$ 50.000,00</Text>
        </Layout>
        <Layout style={{ display: details ? 'flex' : 'none' }}>
            <Divider style={{ marginTop: 15 }} />
            <Layout style={{ marginTop: 10 }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold', textAlign: 'center', color: '#555' }}>RESUMO DO MÊS</Text>
                <Layout style={{ marginTop: 15, gap: 5 }}>
                    <Layout style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 16, color: '#555' }}>Receita Mensal:</Text>
                        <Text status='success'>R$ 51.000,00</Text>
                    </Layout>
                    <Layout style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 16, color: '#555' }}>Despesa Mensal:</Text>
                        <Text status='danger'>R$ 768,01</Text>
                    </Layout>
                    <Layout style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 16, color: '#555' }}>Saldo Mensal:</Text>
                        <Text style={{ color: '#555' }}>R$ 51.000,00</Text>
                    </Layout>
                </Layout>
            </Layout>
        </Layout>

    </Card>
}