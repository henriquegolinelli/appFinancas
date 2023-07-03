import { ListItem, List, Text, Divider } from "@ui-kitten/components"
import { StyleSheet, View } from "react-native"
import { Transacao } from "../../model/transacao"
import { TipoReceita } from "../../model/tipoReceita"
import { useSelector } from "react-redux"
import { storeStateType } from "../../redux"

interface DataProps {
    id?: number
    descricao: string
    tipo: string
    valor: number
    data: string
    categoria: string
}

interface TabelaProps {
    data: Transacao[]
}

export const Tabela = (props:TabelaProps) => {

    const stock = useSelector((state: storeStateType) => state.stock);


    const item = ({item, index}:{item:Transacao, index:number}) => {
        
        let categoria: Categoria = stock.categorias.find(value => value.id == item.categoriaId) ?? {nome: "", cor: ""}


        return <>
            <ListItem>
                <View style={[styles.containerRow]}>
                    <View style={{width: '30%'}}>
                        <Text style={styles.textItem}>{item.data}</Text>
                    </View>
                    <View style={{width: '30%'}}>
                        <Text style={styles.textItem}>{categoria.nome}</Text>
                    </View>
                    <View style={{width: '35%'}}>
                        <Text style={styles.textItem} status={item.tipo == 'DESPESA'?'danger':'success'}>R$ {item.valor.toLocaleString('pt-br', {minimumFractionDigits: 2})}</Text>
                    </View>
                    <View style={{width: '5%'}}>
                        <Text style={styles.textItem} status={item.tipo == 'DESPESA'?'danger':'success'}>{item.tipo == 'DESPESA'?'D':'R'}</Text>
                    </View>
                </View>

            </ListItem>
            <Divider></Divider>
        </>
        
    }

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