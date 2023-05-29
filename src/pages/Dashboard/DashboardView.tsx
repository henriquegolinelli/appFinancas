import { SafeAreaView } from 'react-native-safe-area-context'
import {TopNavigation, TopNavigationAction, Layout, Text, Icon, IconProps, IconElement} from '@ui-kitten/components'

const MenuIcon = (props:IconProps): IconElement => (
    <Icon {...props} name='menu'/>
)

export const DashboardView = ({navigation}) => {

    const renderDrawerAction = () => (
        <TopNavigationAction icon={MenuIcon} onPress={()=>{navigation.openDrawer()}}/>
    )

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: '#2f9e41'}}>
            <TopNavigation accessoryRight={renderDrawerAction} alignment='center' title={props => <Text {...props} style={{color: 'white', fontSize: 18}}>DASHBOARD</Text>} style={{backgroundColor: '#2f9e41'}}/>
            <Layout style={{flex: 1}}>
                <Text>Dashboard</Text>
            </Layout>
        </SafeAreaView>
    )

}