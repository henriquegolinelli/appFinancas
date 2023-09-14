import { Button, Card, Input, Modal, Text } from "@ui-kitten/components"
import { ModalDeleteProps } from "./model"
import { View, ViewProps } from "react-native"

import { Styles as styles } from "../../common/style/stylesheet"
import { deleteCategoria, deleteConta, deleteTransacao } from "../../configs/database"


export const ModalDelete = (props:ModalDeleteProps) => {


    const isActive: boolean = props.open
    const setModal = (isActive: boolean) => {
        props.setOpen(isActive)
    }

    const headerModalCardAdd = (viewprops:ViewProps) => (
        <View {...viewprops}>
            <Text category="h5" style={{textAlign: 'center'}}>{props.modalTitle}</Text>
        </View>
    )

    let handleDelete = (id:number) => null;

    switch (props.operacao) {
        case 1: // Remover Conta
            handleDelete = async (idDelete:number) => {
                console.log(`(Contas) removendo ${idDelete}`)
                
                await deleteConta(idDelete);
                props.update();
            }
            break;

        case 2: // Remover Categoria
            handleDelete = async (idDelete:number) => {
                console.log(`(Categorias) removendo ${idDelete}`)

                await deleteCategoria(idDelete);
                props.update();
            }
            break;

        case 3: // Remover Transação
            handleDelete = async (idDelete:number) => {
                console.log(`(Transação) removendo ${idDelete}`)

                await deleteTransacao(idDelete);
                props.update()
            }
            break;
    
        default:
            handleDelete = () => {
                console.log("Por favor, especifique o que irá remover")
            }
            break;
    }

    

    return <Modal backdropStyle={styles.backdrop} visible={isActive} onBackdropPress={()=>setModal(false)} style={{width: '85%'}}>
    <Card header={headerModalCardAdd} style={{width: '100%'}}>
        <Text style={{textAlign: 'center', marginBottom: 30}}>Tem certeza que deseja excluir {props.nomeRemover}?</Text>
        
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Button status="primary" onPress={()=>setModal(false)} style={{width: '40%'}}>Cancelar</Button>
            <Button status="danger" onPress={()=>handleDelete(props.idRemover)} style={{width: '40%'}}>Excluir</Button>
        </View>
    </Card>
</Modal>

}