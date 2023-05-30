import {View} from 'react-native'
import {List, ListItem, Icon, IconElement, IconProps, Text, Divider} from '@ui-kitten/components'

interface CardItemGastoDoMesProps {
    title: string
    description: string
}

const data = new Array(4).fill({
    title: 'Alimentação',
})

export const CardItemGastoDoMes = () => {

    const renderIconLeft = (props:IconProps): IconElement => (
        <Icon {...props} name='cube'></Icon>
    )

    const renderItem = ({item, index}: {item: CardItemGastoDoMesProps; index: number}) => (
        <>
            <ListItem 
                style={{}}
                title={`${item.title} ${index + 1}`} 
                accessoryLeft={renderIconLeft}
                accessoryRight={<Text>R$150,00</Text>}   
            />
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