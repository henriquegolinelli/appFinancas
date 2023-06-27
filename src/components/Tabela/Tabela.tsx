import { ListItem, List, Text, Divider } from "@ui-kitten/components"
import { StyleSheet, View } from "react-native"

interface DataProps {
    data: string
    categoria: string
    valor: number
    tipo: string
}

interface TabelaProps {
    data: Array<DataProps>
}

export const Tabela = (props:TabelaProps) => {
    const item = ({item, index}:{item:DataProps, index:number}) => (
        <>
            <ListItem>
                <View style={[styles.containerRow]}>
                    <View style={{width: '30%'}}>
                        <Text style={styles.textItem}>{item.data}</Text>
                    </View>
                    <View style={{width: '30%'}}>
                        <Text style={styles.textItem}>{item.categoria}</Text>
                    </View>
                    <View style={{width: '35%'}}>
                        <Text style={styles.textItem} status={item.tipo == 'D'?'danger':'success'}>R$ {item.valor.toFixed(2)}</Text>
                    </View>
                    <View style={{width: '5%'}}>
                        <Text style={styles.textItem} status={item.tipo == 'D'?'danger':'success'}>{item.tipo}</Text>
                    </View>
                </View>

            </ListItem>
            <Divider></Divider>
        </>
        
    )

    return (
        <View>
            <View style={[styles.containerRow, {paddingHorizontal: 10, justifyContent: 'space-between'}]}>
                <View style={{width: '30%'}}>
                    <Text style={{textAlign: 'center', fontWeight: 'bold'}}>Data</Text>
                </View>
                <View style={{width: '30%'}}>
                    <Text style={{textAlign: 'center', fontWeight: 'bold'}}>Categoria</Text>
                </View>
                <View style={{width: '30%'}}>
                    <Text style={{textAlign: 'center', fontWeight: 'bold'}}>Valor</Text>
                </View>
                <View>
                    <Text style={{textAlign: 'center', fontWeight: 'bold'}}>Tipo</Text>
                </View>
            </View>
            <Divider style={{borderWidth: 1}}></Divider>
            <List renderItem={item} data={props.data} scrollEnabled={false}></List>
        </View>
    )
}

const styles = StyleSheet.create({
    containerRow: {
        flex: 1,
        flexGrow: 1,
        flexDirection: 'row',
        alignContent: 'space-between',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        paddingVertical: 10
    },
    textItem: {
        textAlign: 'center', 
        fontSize: 14
    }
})