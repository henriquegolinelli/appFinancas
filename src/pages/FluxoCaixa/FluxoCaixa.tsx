import { Layout, TopNavigation, Text, TopNavigationAction, IconProps, IconElement, Icon, Datepicker, Button, Card } from "@ui-kitten/components"
import { useState } from "react"
import { ScrollView, StyleSheet, View, ViewProps } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Tabela } from "../../components/Tabela/Tabela"

const MenuIcon = (props:IconProps): IconElement => (
    <Icon {...props} name='menu' />
)

const BackIcon = (props:IconProps): IconElement => (
    <Icon {...props} name="arrow-back"/>
)

const data = [
    {data: '03/12/2022', categoria: 'Alimentação', valor: 150.99, tipo: 'D'},
    {data: '04/12/2022', categoria: 'Cuidados Pessoais', valor: 160.99, tipo: 'D'},
    {data: '05/12/2022', categoria: 'Empréstimo', valor: 600.00, tipo: 'R'},
]

export const FluxoCaixaView = ({navigation}) => {

    /**
     * States do formulário
     */
    const [dateInicio, setDateInicio] = useState<Date>(new Date())
    const [dateFinal, setDateFinal] = useState<Date>(new Date())

    /**
     * Renders
     */
    const renderDrawerAction = () => (
        <TopNavigationAction icon={MenuIcon} onPress={()=>{navigation.openDrawer()}}/>
    )
    const renderBackAction = () => (
        <TopNavigationAction icon={BackIcon} onPress={()=>{navigation.goBack()}}/>
    )


    /**
     * Card header / footer
     */
    const headerCardLancamentos = (props:ViewProps) => (
        <View {...props}>
            <Text category="h5" style={{textAlign: 'center'}}>Últimos Lançamentos</Text>
        </View>
    )

    return (
        <SafeAreaView style={[styles.container, styles.greenBackground]}>
            <Layout style={styles.container}>
                <TopNavigation accessoryLeft={renderBackAction} accessoryRight={renderDrawerAction} alignment="center" title={props => <Text {...props} style={{color: 'white', fontSize: 18}}>FLUXO DE CAIXA</Text>} style={styles.greenBackground}/>
                <Layout style={styles.container}>
                    <ScrollView contentContainerStyle={styles.scrollViewContainer} horizontal={false}>
                        {/* Formulário */}
                        <Layout style={[styles.container, {width: '100%', paddingHorizontal: 30}]}>
                            <Text style={styles.label}>Data de Início</Text>
                            <Datepicker date={dateInicio} onSelect={nextDate => setDateInicio(nextDate)} style={styles.datepickerSpacing}></Datepicker>
                            <Text style={styles.label}>Data Final</Text>
                            <Datepicker date={dateFinal} onSelect={nextDate => setDateFinal(nextDate)} style={styles.datepickerSpacing}></Datepicker>

                            <Button>Consultar</Button>
                        </Layout>
                        <Layout style={[styles.container, {width:'100%'}]}>
                            <Card style={styles.card} header={headerCardLancamentos}>
                                
                                {/* Tabela de Fluxo de Caixa */}
                                <Tabela data={data}/>

                            </Card>
                        </Layout>
                    </ScrollView>
                </Layout>
            </Layout>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    greenBackground: {
        backgroundColor: '#2f9e41'
    },
    scrollViewContainer: {
        alignItems: 'center', 
        padding: 20, 
        gap: 20
    },
    label: {
        marginVertical: 3
    },
    datepickerSpacing: {
        marginBottom: 10
    },
    card: {
        elevation: 8
    }
})