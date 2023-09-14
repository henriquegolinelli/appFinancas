import { Layout, TopNavigation, Text, TopNavigationAction, IconProps, IconElement, Icon, Datepicker, Button, Card } from "@ui-kitten/components"
import { useState } from "react"
import { ScrollView, View, ViewProps } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Tabela } from "../../components/Tabela/Tabela"
import { Form } from "./components/Form"
import { Styles as styles } from "../../common/style/stylesheet"
import { useSelector } from "react-redux"
import { storeStateType } from "../../redux"
import { Transacao } from "../../model/transacao"
import { ModalDelete } from "../../components/ModalDelete/ModalDelete"

const MenuIcon = (props:IconProps): IconElement => (
    <Icon {...props} name='menu' />
)

const BackIcon = (props:IconProps): IconElement => (
    <Icon {...props} name="arrow-back"/>
)

// const data = [
//     {data: '03/12/2022', categoria: 'Alimentação', valor: 150.99, tipo: 'D'},
//     {data: '04/12/2022', categoria: 'Cuidados Pessoais', valor: 160.99, tipo: 'D'},
//     {data: '05/12/2022', categoria: 'Empréstimo', valor: 600.00, tipo: 'R'},
// ]

export const FluxoCaixaView = ({navigation}) => {

    const stock = useSelector((state: storeStateType) => state.stock);

    let transacao: Transacao[] = stock.transacoes;

    /*
    *  States
    */
    

    /*
    *  Funções
    */
    

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
                        <Form />
                        <Layout style={[styles.container, {width:'100%'}]}>
                            <Card style={styles.card} header={headerCardLancamentos}>
                                
                                {/* Tabela de Fluxo de Caixa */}
                                <Tabela data={transacao}/>

                            </Card>
                        </Layout>
                    </ScrollView>
                </Layout>
            </Layout>
        </SafeAreaView>
    )
}