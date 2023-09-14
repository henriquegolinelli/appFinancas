import { ListItem, List, Text, Divider } from "@ui-kitten/components"
import { StyleSheet, View } from "react-native"
import { Transacao } from "../../model/transacao"
import { TipoReceita } from "../../model/tipoReceita"
import { useSelector } from "react-redux"
import { storeStateType } from "../../redux"
import { ModalDelete } from "../ModalDelete/ModalDelete"
import { useState } from "react"

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
    update: () => void
}

export const Tabela = (props:TabelaProps) => {

    const stock = useSelector((state: storeStateType) => state.stock);

    /**
     * States
     */

    const [transacaoTipo, setTransacaoTipo] = useState<string>("");
    const [transacaoId, setTransacaoId] = useState<number>(0);

    const [modalDeleteTransacao, setModalDeleteTransacao] = useState<boolean>(false);

    /**
     * Funções
     */

    const deleteTransacao = (t_id: number, t_tipo?: string) => {
        console.log(`ID TRASAÇÃO: ${t_id}, TIPO: ${t_tipo}`);
        setTransacaoId(t_id);
        setTransacaoTipo(t_tipo);
        setModalDeleteTransacao(true);
    };

    /**
     * Renders
     */


    const item = ({item, index}:{item:Transacao, index:number}) => {
        
        let categoria: Categoria = stock.categorias.find(value => value.id == item.categoriaId) ?? {nome: "", cor: ""}

        let transacaoID: Transacao = stock.transacoes.find(tra => tra.id == item.id);

        return <>
            <ListItem onPress={()=>{deleteTransacao(transacaoID.id, transacaoID.tipo)}}>
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
            <ModalDelete
                open={modalDeleteTransacao}
                setOpen={(open) => setModalDeleteTransacao(open)}
                modalTitle="Excluir Transação"
                idRemover={transacaoId}
                nomeRemover={transacaoTipo}
                operacao={3}
                update={()=>{props.update()}}
            />
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