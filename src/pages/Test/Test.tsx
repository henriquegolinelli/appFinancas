import { SafeAreaView } from 'react-native-safe-area-context'
import {Text, Button, TopNavigation, TopNavigationAction, Icon, IconElement, IconProps, Divider} from '@ui-kitten/components'

import {View, StyleSheet} from 'react-native'

const MenuIcon = (props:IconProps): IconElement => (
    <Icon {...props} name='menu'/>
)

export const TestView = ({navigation}) => {

    const renderMenuIcon = () => (
        <TopNavigationAction icon={MenuIcon} onPress={()=>{navigation.openDrawer()}}/>
    )

    return (    
        <SafeAreaView style={styles.container}>
            <TopNavigation title={'Teste'} alignment='center' accessoryRight={renderMenuIcon}/>
            <Divider></Divider>

            <View style={styles.container}>  
                <Text style={{marginTop: 50}}>Label 1</Text>
                <Text>Label 2</Text>

                <Button status='success'>Botão 1</Button>
                <Button status='danger'>Botão 2</Button>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})