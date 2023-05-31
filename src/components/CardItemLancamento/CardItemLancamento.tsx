import {View, StyleSheet} from 'react-native'
import {List, ListItem, Icon, IconElement, IconProps, Text, Divider, Button} from '@ui-kitten/components'

interface CardItemLancamentoProps {
    title: string
    description: string
}

const data = new Array(4).fill({
    title: '15/10/2023 - Coxinha',
    description: 'Alimentação'
})

export const CardItemLancamento = () => {

    const renderIconLeft = (props:IconProps): IconElement => (
        <Icon {...props} name='cube'></Icon>
    )

    const renderItem = ({item, index}: {item: CardItemLancamentoProps; index: number}) => (
        <>
            <ListItem>
                <View style={styles.listItemContainer}>
                    <Button style={styles.buttonIcon} accessoryLeft={renderIconLeft} status='danger'></Button>
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

    listItemContainer: {
        flex: 1
    },

    buttonIcon: {
        width: 50,
        height: 50,
    }
})