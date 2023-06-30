import { Layout, TopNavigation, Text, TopNavigationAction, IconProps, IconElement, Icon, Datepicker, Button, Card, IndexPath, Select, SelectItem } from "@ui-kitten/components"
import { useState } from "react"
import { ScrollView, StyleSheet, View, ViewProps } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Tabela } from "../../components/Tabela/Tabela"

import { Styles as styles } from "../../common/style/stylesheet"
import { FormMovimentacoes } from "./components/FormMovimentacoes"

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

export const Movimentacoes = ({navigation}) => {

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
    const headerCardMovimentacoes = (props:ViewProps) => (
        <View {...props}>
            <Text category="h5" style={{textAlign: 'center'}}>Últimos Lançamentos</Text>
        </View>
    )

    return (
        <SafeAreaView style={[styles.container, styles.greenBackground]}>
            <Layout style={styles.container}>
                <TopNavigation accessoryLeft={renderBackAction} accessoryRight={renderDrawerAction} alignment="center" title={props => <Text {...props} style={{color: 'white', fontSize: 18}}>MOVIMENTAÇÕES</Text>} style={styles.greenBackground}/>
                <Layout style={styles.container}>
                    <ScrollView contentContainerStyle={styles.scrollViewContainer} horizontal={false}>
                        {/* Formulário */}
                        <FormMovimentacoes />

                        <Layout style={[styles.container, {width:'100%'}]}>
                            <Card style={styles.card} header={headerCardMovimentacoes}>
                                
                                {/* Tabela de Movimentações */}
                                <Tabela data={data}/>

                            </Card>
                        </Layout>
                    </ScrollView>
                </Layout>
            </Layout>
        </SafeAreaView>
    )
}