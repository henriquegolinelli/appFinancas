import {View} from 'react-native'
import {List, ListItem, Icon, IconElement, IconProps, Text, Divider} from '@ui-kitten/components'

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
            <ListItem 
                style={{}}
                title={`${item.title} ${index + 1}`} 
                description={`${item.description}`}
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