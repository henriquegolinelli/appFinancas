import { Card, Divider, Icon, IconElement, IconProps, List, ListItem, Text } from "@ui-kitten/components"
import { View, ViewProps } from "react-native"
import { StyleSheet } from "react-native"

interface CardItemGastoDoMesProps {
    title: string
    description: number
}

const data = new Array(4).fill({
    title: 'Alimentação',
    description: 500
})

export const GastoMes = () => {
    // header Gastos do mes
    const headerGastosDoMes = (props: ViewProps) => (
        <View {...props}>
            <Text category='h5' style={{ textAlign: 'center' }}>Gastos do Mês</Text>
        </View>
    )

    //
    const renderIconLeft = (props: IconProps): IconElement => (
        <Icon {...props} name='cube'></Icon>
    )

    const renderItem = ({ item, index }: { item: CardItemGastoDoMesProps; index: number }) => (
        <>
            <ListItem>
                <View style={styles.container}>
                    <View style={styles.flexRowView}>
                        <Icon name='smiling-face-outline' style={styles.iconLeft}></Icon>
                        <Text style={{ marginLeft: 20 }}>{item.title}</Text>
                        <Text style={{ marginLeft: 'auto' }} status='danger'>R$ {item.description.toFixed(2)}</Text>
                    </View>
                </View>
            </ListItem>
            <Divider></Divider>
        </>

    )

    return <Card header={headerGastosDoMes} style={styles.cardContainer}>
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
        flex: 1
    },

    flexRowView: {
        flexDirection: 'row',
        alignItems: 'center'
    },

    iconLeft: {
        width: 35,
        height: 35,
        tintColor: 'black'
    },
    cardContainer: {
        width: '100%',
        borderRadius: 10,
        elevation: 10,
    },
})