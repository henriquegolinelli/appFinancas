import { Card, Datepicker, Divider, Input, Select, Text, Button, Modal, IndexPath, SelectItem } from "@ui-kitten/components"
import { useState } from "react";
import { View, ViewProps } from "react-native"
import { StyleSheet } from "react-native"
import { PropsModal } from "../model";
import { useDispatch, useSelector } from "react-redux";
import { storeStateType } from "../../../redux";
import { Transacao } from "../../../model/transacao";
import { TipoReceita } from "../../../model/tipoReceita";
import { createTransacao } from "../../../configs/database";
import { getCategorias, getTransacoes } from "../../../redux/Redux.store";
import { Conta } from "../../../model/conta";
import { Cores } from "../../../model/cores";

export const ModalDespesa = (props: PropsModal) => {
    //
    const stock = useSelector((state: storeStateType) => state.stock)

    //
    let categorias: Categoria[] = stock.categorias
    
    categorias = categorias.filter(categoria => categoria.cor == Cores.vermelho)

    const contas: Conta[] = stock.contas

    // Props
    const isActive: boolean = props.isModal
    const setModal = (isActive: boolean) => {
        props.setModal(isActive)
    }

    // Card header Add Despesa
    const headerCardModalAddDespesa = (props: ViewProps) => (
        <View {...props}>
            <Text style={{ fontWeight: 'bold', fontSize: 22, textAlign: 'center' }}>Adicionar Despesa</Text>
        </View>
    )

    /**
     * States do formulario Add Despesa
     */
    const [dateDespesa, setDateDespesa] = useState<Date>(new Date())
    const [inputValorDespesa, setInputValorDespesa] = useState<string>("")
    const [selectCategoriaDespesa, setSelectCategoriaDespesa] = useState<IndexPath>(new IndexPath(0));
    const [selectContaDespesa, setSelectContaDespesa] = useState<IndexPath>(new IndexPath(0))
    const [inputObsDespesa, setInputObsDespesa] = useState<string>("")

    //
    const categoriaSelecionada = categorias[selectCategoriaDespesa.row] ?? { id: 0, nome: "", cor: "" };
    const contaSelecionada = contas[selectContaDespesa.row] ?? {id: 0, nome: "", tipo: ""};

    // Select Options Categorias
    const renderOptionsCategorias = (categoria: Categoria) => (
        <SelectItem title={categoria.nome} key={categoria.id} />
    )

    // Select Options Contas
    const renderOptionsContas = (contas: Conta) => (
        <SelectItem title={contas.nome + " (" + contas.tipo + ")"} key={contas.id} />
    )

    //
    const handleAdicionar = async () => {
        //
        let valor: number = Number(inputValorDespesa)

        valor = -valor

        let obs: string = inputObsDespesa

        if (valor == 0) return
        if (obs == "") return

        //
        let data: any = dateDespesa

        let dia: number = data.getDate()
        let mes: number = data.getMonth() + 1
        let ano: number = data.getFullYear()

        data = ("0" + dia).slice(-2) + "/" + ("0" + mes).slice(-2) + "/" + ano

        //
        let transacao: Transacao = {
            descricao: obs,
            valor: valor,
            data: data,
            categoriaId: categoriaSelecionada.id,
            contaId: contaSelecionada.id,
            tipo: TipoReceita.despesa
        }

        await createTransacao(transacao)
        props.update()

        setInputObsDespesa("")
        setInputValorDespesa("")
    }

    return <Modal visible={isActive} backdropStyle={styles.backdrop} onBackdropPress={() => setModal(false)} style={{ width: '85%' }}>
        <Card header={headerCardModalAddDespesa}>
            <Text>Data</Text>
            <Datepicker date={dateDespesa} onSelect={nextDate => setDateDespesa(nextDate)}></Datepicker>

            <Text style={styles.labelForm}>Valor (R$)</Text>
            <Input placeholder='Ex.: 450.95' value={inputValorDespesa} onChangeText={text => setInputValorDespesa(text)} keyboardType='numeric'></Input>

            <Text style={styles.labelForm}>Categoria</Text>
            <Select selectedIndex={selectCategoriaDespesa} onSelect={(index: IndexPath) => setSelectCategoriaDespesa(index)} value={categoriaSelecionada.nome}>
                {categorias.map(renderOptionsCategorias)}
            </Select>

            <Text style={styles.labelForm}>Conta</Text>
            <Select selectedIndex={selectContaDespesa} onSelect={(index: IndexPath) => setSelectContaDespesa(index)} value={contaSelecionada.nome + " (" + contaSelecionada.tipo + ")"}>
                {contas.map(renderOptionsContas)}
            </Select>

            <Text style={styles.labelForm}>Observação</Text>
            <Input placeholder='Ex: Pastel' value={inputObsDespesa} onChangeText={text => setInputObsDespesa(text)}></Input>

            <Divider style={styles.divider} />

            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Button status='danger' onPress={() => setModal(false)}>CANCELAR</Button>
                <Button status='success' onPress={async () => {await handleAdicionar() }}>ADICIONAR</Button>
            </View>

        </Card>
    </Modal>
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },

    scrollViewContainer: {
        flexGrow: 1,
        alignItems: 'center',
        padding: 20,
        gap: 20
    },

    cardContainer: {
        width: '100%',
        borderRadius: 10,
        elevation: 10,
    },

    backdrop: {
        backgroundColor: 'rgba(0,0,0,0.5)'
    },

    labelForm: {
        marginTop: 15
    },

    divider: {
        marginTop: 10,
        marginBottom: 20
    }
})