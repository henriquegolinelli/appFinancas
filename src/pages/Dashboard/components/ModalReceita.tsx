import { Card, Datepicker, Divider, Input, Select, Text, Button, Modal, IndexPath, SelectItem } from "@ui-kitten/components"
import { useState } from "react";
import { View, ViewProps } from "react-native"
import { StyleSheet } from "react-native"
import { PropsModal } from "../model";
import { Transacao } from "../../../model/transacao";
import { createTransacao } from "../../../configs/database";
import { Conta } from "../../../model/conta";
import { useSelector } from "react-redux";
import { storeStateType } from "../../../redux";
import { TipoReceita } from "../../../model/tipoReceita";
import { toDateString } from "../../../common/util/dateUtils";
import { getContaText } from "../../../common/util/dbUtils";
import { Categoria } from "../../../model/categoria";

export const ModalReceita = (props: PropsModal) => {
    //
    const stock = useSelector((state: storeStateType) => state.stock)
    
    //
    let categorias: Categoria[] = stock.categorias
    
    const newLocal = categorias = categorias.filter(categoria => categoria.tipo === "receita");

    const contas: Conta[] = stock.contas
    
    // Props
    const isActive: boolean = props.isModal
    const setModal = (isActive: boolean) => {
        props.setModal(isActive)
    }

    // Card header Add Receita
    const headerCardModalAddReceita = (props: ViewProps) => (
        <View {...props}>
            <Text style={{ fontWeight: 'bold', fontSize: 22, textAlign: 'center' }}>Adicionar Receita</Text>
        </View>
    )

    /**
     * States do formulario Add Receita
     */
    const [dateReceita, setDateReceita] = useState<Date>(new Date())
    const [inputValorReceita, setInputValorReceita] = useState<string>("")
    const [selectCategoriaReceita, setSelectCategoriaReceita] = useState<IndexPath>(new IndexPath(0))
    const [selectContaReceita, setSelectContaReceita] = useState<IndexPath>(new IndexPath(0))
    const [inputObsReceita, setInputObsReceita] = useState("")

    //
    const categoriaSelecionada = categorias[selectCategoriaReceita.row] ?? { id: 0, nome: "", tipo: "", icone: ""};
    const contaSelecionada = contas[selectContaReceita.row] ?? {id: 0, nome: "", tipo: ""};

    // Select Options Categorias
    const renderOptionsCategorias = (categoria: Categoria) => (
        <SelectItem title={categoria.nome} key={categoria.id} />
    )

    // Select Options Contas
    const renderOptionsContas = (conta: Conta) => (
        <SelectItem title={getContaText(conta)} key={conta.id} />
    )
    //
    const handleAdicionar = async () => {
        //
        let valor: number = Number(inputValorReceita)
        let obs: string = inputObsReceita

        if (valor == 0) return
        if (obs == "") return

        //
        let date: string = toDateString(dateReceita)

        //
        let transacao: Transacao = {
            descricao: obs,
            valor: valor,
            data: date,
            categoriaId: categoriaSelecionada.id,
            contaId: contaSelecionada.id,
            tipo: TipoReceita.receita
        }

        await createTransacao(transacao)
        props.update()

        setInputObsReceita("")
        setInputValorReceita("")
    }

    return <Modal visible={isActive} backdropStyle={styles.backdrop} onBackdropPress={() => setModal(false)} style={{ width: '85%' }}>
    <Card header={headerCardModalAddReceita}>
        <Text>Data</Text>
        <Datepicker date={dateReceita} onSelect={nextDate => setDateReceita(nextDate)}></Datepicker>

        <Text style={styles.labelForm}>Valor (R$)</Text>
        <Input placeholder='Ex.: 450.95' value={inputValorReceita} onChangeText={text => setInputValorReceita(text)} keyboardType='numeric'></Input>

        <Text style={styles.labelForm}>Categoria</Text>
        <Select selectedIndex={selectCategoriaReceita} onSelect={(index: IndexPath) => setSelectCategoriaReceita(index)} value={categoriaSelecionada.nome}>
            {categorias.map(renderOptionsCategorias)}
        </Select>

        <Text style={styles.labelForm}>Conta</Text>
        <Select selectedIndex={selectContaReceita} onSelect={(index: IndexPath) => setSelectContaReceita(index)} value={getContaText(contaSelecionada)}>
            {contas.map(renderOptionsContas)}
        </Select>

        <Text style={styles.labelForm}>Observação</Text>
        <Input placeholder='Ex: Pastel' value={inputObsReceita} onChangeText={text => setInputObsReceita(text)}></Input>

        <Divider style={styles.divider} />

        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Button status='danger' onPress={() => setModal(false)}>CANCELAR</Button>
            <Button status='success' onPress={async () => {await handleAdicionar()}}>ADICIONAR</Button>
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