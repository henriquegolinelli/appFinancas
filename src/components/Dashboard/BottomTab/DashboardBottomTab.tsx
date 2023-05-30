import { View } from "react-native"

import {Text, Button, Layout} from '@ui-kitten/components'


export const DashboardBottomTab = () => {

    return (
        <View style={{backgroundColor: '#fff', height: 70, elevation: 10, borderTopStartRadius: 10, borderTopEndRadius: 10, padding: 5, borderWidth: 0.3, borderBottomWidth: 0.1}}>
            <Layout style={{flex: 1, flexDirection: 'row', justifyContent: 'space-evenly'}}>
                <Button status="danger" size="small"><Text style={{textAlign: 'center'}}>Adicionar Despesa</Text></Button>
                <Button style={{backgroundColor: 'black', borderWidth: 0, alignContent: 'center', alignItems: 'center', justifyContent: 'center'}} size="small"><Text style={{textAlign: 'center'}}>{`Fazer\nTransferência`}</Text></Button>
                <Button status="success" size="small"><Text style={{textAlign: 'center'}}>Adicionar Receita</Text></Button>
            </Layout>
        </View>
    )

}