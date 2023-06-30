import { SafeAreaView } from 'react-native-safe-area-context'
import { Text, Button, TopNavigation, TopNavigationAction, Icon, IconElement, IconProps, Divider } from '@ui-kitten/components'

import { View, StyleSheet } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { storeStateType } from '../../redux'

import { decrement, getTransacoes, increment } from '../../redux/Redux.store'
import { useEffect } from 'react'
import { initDB } from '../../configs/database'

const MenuIcon = (props: IconProps): IconElement => (
    <Icon {...props} name='menu' />
)

export const TestView = ({ navigation }: any) => {
    const dispatch = useDispatch<any>()
    const stock = useSelector((state: storeStateType) => state.stock)

    useEffect(() => {
        console.log("teste")

        init()
    }, [])

    const init = async () => {
        await initDB()

        dispatch(getTransacoes(1))
    }

    const renderMenuIcon = () => (
        <TopNavigationAction icon={MenuIcon} onPress={() => { navigation.openDrawer() }} />
    )

    return (
        <SafeAreaView style={styles.container}>
            <TopNavigation title={'Teste Redux'} alignment='center' accessoryRight={renderMenuIcon} />
            <Divider></Divider>

            <View style={styles.container}>
                <Text style={{ marginTop: 50 }}>--------</Text>
                <Text>Count: {stock.count}</Text>

                {stock.transacoes.map((transacao, index) => {
                    return <Text key={transacao.id}> {transacao.descricao} </Text>
                })}

                <Button status='success' onPress={() => { dispatch(increment()) }}>+</Button>
                <Button status='danger' onPress={() => { dispatch(decrement()) }}>-</Button>
                <Button status='danger' onPress={() => { dispatch(getTransacoes(12)) }}>-</Button>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})