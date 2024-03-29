import { Layout, TopNavigation, Text, TopNavigationAction, IconProps, IconElement, Icon, Datepicker, Button, Card } from "@ui-kitten/components"
import { useState } from "react"
import { ScrollView, View, ViewProps } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Tabela } from "../../components/Tabela/Tabela"
import { Form } from "./components/Form"
import { Styles as styles } from "../../common/style/stylesheet"
import { useDispatch, useSelector } from "react-redux"
import { storeStateType } from "../../redux"
import { Transacao } from "../../model/transacao"
import { ModalDelete } from "../../components/ModalDelete/ModalDelete"
import { getTransacaoByConta, getTransacaoByDate, getTransacoes } from "../../redux/Redux.store"
import { isDateEqual, toDateString } from "../../common/util/dateUtils"

const MenuIcon = (props: IconProps): IconElement => (
    <Icon {...props} name='menu' />
)

const BackIcon = (props: IconProps): IconElement => (
    <Icon {...props} name="arrow-back" />
)

// const data = [
//     {data: '03/12/2022', categoria: 'Alimentação', valor: 150.99, tipo: 'D'},
//     {data: '04/12/2022', categoria: 'Cuidados Pessoais', valor: 160.99, tipo: 'D'},
//     {data: '05/12/2022', categoria: 'Empréstimo', valor: 600.00, tipo: 'R'},
// ]

export const FluxoCaixaView = ({ navigation }) => {

    /**
    * States do formulário
    */
    const [dateInicio, setDateInicio] = useState<Date>(new Date())
    const [dateFinal, setDateFinal] = useState<Date>(new Date())

    const stock = useSelector((state: storeStateType) => state.stock);

    let transacao: Transacao[] = stock.tempTransacoes;

    const dispatch = useDispatch<any>()

    /*
    *  States
    */


    /*
    *  Funções
    */
    const updateFluxoCaixa = (inicio: string, fim: string) => {
        dispatch(getTransacaoByDate({ inicio: inicio, fim: fim }));
        dispatch(getTransacaoByConta({contaId: 0}))
        dispatch(getTransacoes());
    }

    /**
     * Renders
     */
    const renderDrawerAction = () => (
        <TopNavigationAction icon={MenuIcon} onPress={() => { navigation.openDrawer() }} />
    )
    const renderBackAction = () => (
        <TopNavigationAction icon={BackIcon} onPress={() => { navigation.goBack() }} />
    )


    /**
     * Card header / footer
     */
    const headerCardLancamentos = (props: ViewProps) => (
        <View {...props}>
            <Text category="h5" style={{ textAlign: 'center' }}>Últimos Lançamentos</Text>
        </View>
    )

    return (
        <SafeAreaView style={[styles.container, styles.greenBackground]}>
            <Layout style={styles.container}>
                <TopNavigation accessoryLeft={renderBackAction} accessoryRight={renderDrawerAction} alignment="center" title={props => <Text {...props} style={{ color: 'white', fontSize: 18 }}>FLUXO DE CAIXA</Text>} style={styles.greenBackground} />
                <Layout style={styles.container}>
                    <ScrollView contentContainerStyle={styles.scrollViewContainer} horizontal={false}>
                        <Form update={(inicio, fim) => { updateFluxoCaixa(inicio, fim) }} dateInicio={dateInicio} dateFinal={dateFinal} setDateFinal={setDateFinal} setDateInicio={setDateInicio} />
                        <Layout style={[styles.container, { width: '100%' }]}>
                            <Card style={styles.card} header={headerCardLancamentos}>

                                {/* Tabela de Fluxo de Caixa */}
                                <Tabela data={transacao} hasDelete={true} update={() => {
                                    let inicio: string = "0"
                                    let fim: string = "0"

                                    let today = new Date()

                                    if (!isDateEqual(dateInicio, today)) {
                                        inicio = toDateString(dateInicio)
                                        fim = toDateString(dateFinal)
                                    }

                                    updateFluxoCaixa(inicio, fim)
                                }} />

                            </Card>
                        </Layout>
                    </ScrollView>
                </Layout>
            </Layout>
        </SafeAreaView>
    )
}