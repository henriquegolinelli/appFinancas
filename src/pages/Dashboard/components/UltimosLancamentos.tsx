import { Card, Divider, Icon, IconProps, List, ListItem, Text } from "@ui-kitten/components"
import React from "react"
import { View, ViewProps } from "react-native"
import { StyleSheet } from "react-native"
import { useSelector } from "react-redux"
import { storeStateType } from "../../../redux"
import { Transacao } from "../../../model/transacao"

export const UltimosLancamentos = ({ navigation }: any) => {
    //
    const stock = useSelector((state: storeStateType) => state.stock)

    const data: Transacao[] = stock.transacoes

    // Header ultimos lançamentos
    const headerUltimosLancamentos = (props: ViewProps) => (
        <View {...props}>
            <Text category='h5' style={{ textAlign: 'center' }}>Últimos Lançamentos</Text>
        </View>
    )

    //
    const BoxIcon = (props: IconProps): React.ReactElement => (
        <Icon {...props} name='cube' fill='black' style={{ width: 30, height: 30 }}></Icon>
    )

    //
    const renderItem = ({ item, index }: { item: Transacao, index: number }) => (
        <>
            <ListItem>
                <View style={styles.listItemContainer}>
                    <View style={{ gap: 5 }}>
                        <View style={styles.container}>
                            <Text>{item.data}</Text>
                            <Text> - </Text>
                            <Text style={{ fontWeight: 'bold' }}>{item.descricao}</Text>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                            <BoxIcon></BoxIcon>
                            <Text> {item.descricao}</Text>
                        </View>

                    </View>
                    <View>
                        <Text status='danger' style={styles.itemPrice}>R$ {item.valor.toLocaleString("pt-br", {minimumFractionDigits: 2})}</Text>
                    </View>
                </View>
            </ListItem>
            <Divider></Divider>
        </>

    )

    return <Card header={headerUltimosLancamentos} style={styles.cardContainer}>
        <View>
            <List
                data={data}
                renderItem={renderItem}
                scrollEnabled={false}
            />
        </View>
    </Card>
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        flexDirection: 'row'
    },

    listItemContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    itemPrice: {
        fontSize: 18,
        fontWeight: 'bold'
    },

    cardContainer: {
        width: '100%',
        borderRadius: 10,
        elevation: 10,
    },
})