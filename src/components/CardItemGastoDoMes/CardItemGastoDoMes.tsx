import {View, StyleSheet} from 'react-native'
import {List, ListItem, Icon, IconElement, IconProps, Text, Divider} from '@ui-kitten/components'

interface CardItemGastoDoMesProps {
    title: string
    description: number
}

const data = new Array(4).fill({
    title: 'Alimentação',
    description: 500
})

export const CardItemGastoDoMes = () => {

    const renderIconLeft = (props:IconProps): IconElement => (
        <Icon {...props} name='cube'></Icon>
    )

    const renderItem = ({item, index}: {item: CardItemGastoDoMesProps; index: number}) => (
        <>
            <ListItem>
                <View style={styles.container}>
                    <View style={styles.flexRowView}>
                        <Icon name='smiling-face-outline' style={styles.iconLeft}></Icon>
                        <Text style={{marginLeft: 20}}>{item.title}</Text>
                        <Text style={{marginLeft: 'auto'}} status='danger'>R$ {item.description.toLocaleString('pt-br', {minimumFractionDigits: 2})}</Text>
                    </View>
                </View>
            </ListItem>
            <Divider></Divider>
        </>
        
    )

    return (
        <View>
            <List 
                data={data}
                renderItem={renderItem}
                scrollEnabled={false}
            />
        </View>
    )
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
    }
})