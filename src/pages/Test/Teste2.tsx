import { SafeAreaView } from 'react-native-safe-area-context'
import {Text, Button, TopNavigation, TopNavigationAction, Icon, IconElement, IconProps, Divider} from '@ui-kitten/components'

import {View, StyleSheet} from 'react-native'
import { observer } from 'mobx-react-lite'
import { useMobxContext } from '../../configs/context'

const MenuIcon = (props:IconProps): IconElement => (
    <Icon {...props} name='menu'/>
)

export const TestView2 = observer(({navigation}: any) => {
    const {increment, decrement, count} = useMobxContext()

    const renderMenuIcon = () => (
        <TopNavigationAction icon={MenuIcon} onPress={()=>{navigation.openDrawer()}}/>
    )

    return (    
        <SafeAreaView style={styles.container}>
            <TopNavigation title={'Teste'} alignment='center' accessoryRight={renderMenuIcon}/>
            <Divider></Divider>

            <View style={styles.container}>  
                <Text style={{marginTop: 50}}>Label 1</Text>
                <Text>Label {count} 2</Text>

                <Button status='success' onPress={() => {increment()}}>Botão 1</Button>
                <Button status='danger' onPress={() => {decrement()}}>Botão 2</Button>
            </View>
        </SafeAreaView>
    )
})

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})