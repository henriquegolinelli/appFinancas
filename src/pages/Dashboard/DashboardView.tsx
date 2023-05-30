import { SafeAreaView } from 'react-native-safe-area-context'
import {TopNavigation, TopNavigationAction, Layout, Text, Icon, IconProps, IconElement, Card, Button, Divider} from '@ui-kitten/components'
import { ScrollView, View, ViewProps } from 'react-native'

import { CardItemLancamento } from '../../components/CardItemLancamento/CardItemLancamento'
import { CardItemGastoDoMes } from '../../components/CardItemGastoDoMes/CardItemGastoDoMes'

import { DashboardBottomTab } from '../../components/Dashboard/BottomTab/DashboardBottomTab'

const MenuIcon = (props:IconProps): IconElement => (
    <Icon {...props} name='menu' />
)

export const DashboardView = ({navigation}) => {

    // Botão Superior Menu
    const renderDrawerAction = () => (
        <TopNavigationAction icon={MenuIcon} onPress={()=>{navigation.openDrawer()}}/>
    )

    //Header Card Saldo Total
    const headerSaldoTotal = (props:ViewProps) => (
        <View {...props}>
            <Text category='h5' style={{textAlign: 'center'}}>Saldo Total</Text>
            <Text category='h5' style={{textAlign: 'center', fontWeight: 'normal', color: '#555', marginTop: 10}}>R$ 50.000,00</Text>
        </View>
    )

    // Header ultimos lançamentos
    const headerUltimosLancamentos = (props:ViewProps) => (
        <View {...props}>
            <Text category='h5' style={{textAlign: 'center'}}>Últimos Lançamentos</Text>
        </View>
    )

    // header Gastos do mes
    const headerGastosDoMes = (props:ViewProps) => (
        <View {...props}>
            <Text category='h5' style={{textAlign: 'center'}}>Gastos do Mês</Text>
        </View>
    )

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: '#2f9e41'}}>
            <Layout style={{flex: 1}}>
                <TopNavigation accessoryRight={renderDrawerAction} alignment='center' title={props => <Text {...props} style={{color: 'white', fontSize: 18}}>DASHBOARD</Text>} style={{backgroundColor: '#2f9e41'}}/>
                <Layout style={{flex: 1}}>
                    <ScrollView contentContainerStyle={{flexGrow: 1, alignItems: 'center', padding: 20, gap: 20}} horizontal={false}>
                        
                        {/* Saldo Total */}
                        <Card header={headerSaldoTotal} style={{width: '100%', borderRadius: 10, elevation: 10}}>
                            <Button status='danger'>Ver Detalhes</Button>
                        </Card>

                        {/* Últimos Lançamentos */}
                        <Card header={headerUltimosLancamentos} style={{width: '100%', borderRadius: 10, elevation: 10}}>
                            <CardItemLancamento></CardItemLancamento>
                        </Card>

                        {/* Gastos do Mês */}
                        <Card header={headerGastosDoMes} style={{width: '100%', borderRadius: 10, elevation: 10}}>
                            <CardItemGastoDoMes></CardItemGastoDoMes>
                        </Card>

                    </ScrollView>
                    <DashboardBottomTab />
                </Layout>
                
            </Layout>
            
        </SafeAreaView>
    )

}