import { SafeAreaView } from 'react-native-safe-area-context'
import {TopNavigation, TopNavigationAction, Layout, Text, Icon, IconProps, IconElement, Card, Button, Divider} from '@ui-kitten/components'
import { ScrollView, StyleSheet, View, ViewProps } from 'react-native'

import { CardItemLancamento } from '../../components/CardItemLancamento/CardItemLancamento'
import { CardItemGastoDoMes } from '../../components/CardItemGastoDoMes/CardItemGastoDoMes'

import { DashboardBottomTab } from '../../components/Dashboard/BottomTab/DashboardBottomTab'
import { useState } from 'react'

const MenuIcon = (props:IconProps): IconElement => (
    <Icon {...props} name='menu' />
)

export const DashboardView = ({navigation}) => {

    const [details, setDetail] = useState(false)

    const toggleDetails = () => {
        details?setDetail(false):setDetail(true);
    }

    // Botão Superior Menu
    const renderDrawerAction = () => (
        <TopNavigationAction icon={MenuIcon} onPress={()=>{navigation.openDrawer()}}/>
    )

    // CARD SALDO TOTAL
    // Header Card Saldo Total
    const headerSaldoTotal = (props:ViewProps) => (
        <View {...props}>
            <Text category='h5' style={{textAlign: 'center'}}>Saldo Total</Text>
            <Text category='h5' style={{textAlign: 'center', fontWeight: 'normal', color: '#555', marginTop: 10}}>R$ 50.000,00</Text>
        </View>
    )

    // footer Saldo Total
    const footerSaldoTotal = (props: ViewProps) => (
        <View {...props}>
            <Button status='danger' onPress={toggleDetails}><Text>{details?'Ocultar':'Ver'} Detalhes</Text></Button>
        </View>
    )

    // CARD ULTIMOS LANCAMENTOS
    // Header ultimos lançamentos
    const headerUltimosLancamentos = (props:ViewProps) => (
        <View {...props}>
            <Text category='h5' style={{textAlign: 'center'}}>Últimos Lançamentos</Text>
        </View>
    )

    // CARD GASTOS DO MES
    // header Gastos do mes
    const headerGastosDoMes = (props:ViewProps) => (
        <View {...props}>
            <Text category='h5' style={{textAlign: 'center'}}>Gastos do Mês</Text>
        </View>
    )

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: '#2f9e41'}}>
            <Layout style={styles.container}>
                <TopNavigation accessoryRight={renderDrawerAction} alignment='center' title={props => <Text {...props} style={{color: 'white', fontSize: 18}}>DASHBOARD</Text>} style={{backgroundColor: '#2f9e41'}}/>
                <Layout style={styles.container}>
                    <ScrollView contentContainerStyle={styles.scrollViewContainer} horizontal={false}>
                        
                        {/* Saldo Total */}
                        <Card header={headerSaldoTotal} style={styles.cardContainer} footer={footerSaldoTotal}>
                            <Layout>
                                <Text style={{textAlign: 'center', color: '#777'}}>Principal (corrente): R$ 50.000,00</Text>
                            </Layout>
                            <Layout style={{display: details?'flex':'none'}}>
                                <Divider style={{marginTop: 15}}/>
                                <Layout style={{marginTop: 10}}>
                                    <Text style={{fontSize: 18, fontWeight: 'bold', textAlign: 'center', color: '#555'}}>RESUMO DO MÊS</Text>
                                    <Layout style={{marginTop: 15, gap: 5}}>
                                        <Layout style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
                                            <Text style={{fontWeight: 'bold', fontSize: 16, color: '#555'}}>Receita Mensal:</Text>
                                            <Text status='success'>R$ 51.000,00</Text>
                                        </Layout>
                                        <Layout style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
                                            <Text style={{fontWeight: 'bold', fontSize: 16, color: '#555'}}>Despesa Mensal:</Text>
                                            <Text status='danger'>R$ 768,01</Text>
                                        </Layout>
                                        <Layout style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
                                            <Text style={{fontWeight: 'bold', fontSize: 16, color: '#555'}}>Saldo Mensal:</Text>
                                            <Text style={{color: '#555'}}>R$ 51.000,00</Text>
                                        </Layout>
                                    </Layout>
                                </Layout>
                            </Layout>
                            
                        </Card>

                        {/* Últimos Lançamentos */}
                        <Card header={headerUltimosLancamentos} style={styles.cardContainer}>
                            <CardItemLancamento></CardItemLancamento>
                        </Card>

                        {/* Gastos do Mês */}
                        <Card header={headerGastosDoMes} style={styles.cardContainer}>
                            <CardItemGastoDoMes></CardItemGastoDoMes>
                        </Card>

                    </ScrollView>
                    <DashboardBottomTab />
                </Layout>
                
            </Layout>
            
        </SafeAreaView>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },

    scrollViewContainer: {
        flexGrow: 1, 
        alignItems: 
        'center', 
        padding: 20, 
        gap: 20
    },

    cardContainer: {
        width: '100%', 
        borderRadius: 10, 
        elevation: 10,
    }
})