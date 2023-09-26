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
import CurrencyInput from "react-native-currency-input";

export const ModalReceitaDespesa = (props: PropsModal) => {
    //
    const stock = useSelector((state: storeStateType) => state.stock)

    //
    const tipos = [
        'RECEITA',
        'DESPESA'
    ]
    
    //
    let categorias: Categoria[] = stock.categorias
    
    const categoriasReceita = categorias.filter(categoria => categoria.tipo === "receita");
    const categoriasDespesa = categorias.filter(categoria => categoria.tipo === "despesa");

    const contas: Conta[] = stock.contas
    
    // Props
    const isActive: boolean = props.isModal
    const setModal = (isActive: boolean) => {
        props.setModal(isActive)
    }

    // Card header Add Receita
    const headerCardModalAddReceita = (props: ViewProps) => (
        <View {...props}>
            <Text style={{ fontWeight: 'bold', fontSize: 22, textAlign: 'center' }}>Adicionar Transação</Text>
        </View>
    )

    /**
     * States do formulario Add Receita
     */
    const [dateReceita, setDateReceita] = useState<Date>(new Date())
    const [inputValorReceita, setInputValorReceita] = useState<number>()
    const [selectCategoriaReceita, setSelectCategoriaReceita] = useState<IndexPath>(new IndexPath(0))
    const [selectCategoriaDespesa, setSelectCategoriaDespesa] = useState<IndexPath>(new IndexPath(0))
    const [selectContaReceita, setSelectContaReceita] = useState<IndexPath>(new IndexPath(0))
    const [selectTipoTransacao, setSelectTipoTransacao] = useState<IndexPath>(new IndexPath(0))
    const [inputObsReceita, setInputObsReceita] = useState("")

    //
    const categoriaReceitaSelecionada = categoriasReceita[selectCategoriaReceita.row] ?? { id: 0, nome: "Adicione uma categoria...", tipo: "", icone: ""};
    const categoriaDespesaSelecionada = categoriasDespesa[selectCategoriaDespesa.row] ?? { id: 0, nome: "Adicione uma categoria...", tipo: "", icone: ""};
    const contaSelecionada = contas[selectContaReceita.row] ?? {id: 0, nome: "", tipo: ""};
    const tipoSelecionado = tipos[selectTipoTransacao.row];

    // Select tipo
    const renderOptionsTipos = (tipo) => (
        <SelectItem title={tipo} key={tipo}/>
    )

    // Select Options Categorias
    const renderOptionsCategorias = (categoria: Categoria) => (
        <SelectItem title={categoria.nome} key={categoria.id} />
    )

    // Select Options Contas
    const renderOptionsContas = (conta: Conta) => (
        <SelectItem title={getContaText(conta)} key={conta.id} />
    )

    const SelectCategoriaReceita = () => (
        <Select selectedIndex={selectCategoriaReceita} onSelect={(index: IndexPath) => setSelectCategoriaReceita(index)} value={categoriaReceitaSelecionada.nome}>
            {categoriasReceita.map(renderOptionsCategorias)}
            {/* {selectTipoTransacao.row == 1?categoriasDespesa.map(renderOptionsCategorias):categoriasReceita.map(renderOptionsCategorias)} */}
        </Select>
    )

    const SelectCategoriaDespesa = () => (
        <Select selectedIndex={selectCategoriaDespesa} onSelect={(index: IndexPath) => setSelectCategoriaDespesa(index)} value={categoriaDespesaSelecionada.nome}>
            {categoriasDespesa.map(renderOptionsCategorias)}
            {/* {selectTipoTransacao.row == 1?categoriasDespesa.map(renderOptionsCategorias):categoriasReceita.map(renderOptionsCategorias)} */}
        </Select>
    )

    //
    const handleAdicionar = async () => {

        if (selectTipoTransacao.row == 0) { // Receita
            //
            let valor: number = Number(inputValorReceita)
            let obs: string = inputObsReceita

            if (valor == 0) return
            if (obs == "") return

            //
            let date: string = toDateString(dateReceita)

            //
            if (categoriaDespesaSelecionada.id === undefined || categoriaDespesaSelecionada.id <= 0) return
            if (contaSelecionada.id === undefined || contaSelecionada.id <= 0) return

            //
            let transacao: Transacao = {
                descricao: obs,
                valor: valor,
                data: date,
                categoriaId: categoriaReceitaSelecionada.id,
                contaId: contaSelecionada.id,
                tipo: TipoReceita.receita
            }

            await createTransacao(transacao)
            props.update()

            setInputObsReceita("")
            setInputValorReceita(null)
        }

        if (selectTipoTransacao.row == 1) { // Despesa
            let valor: number = Number(inputValorReceita)

            valor = -valor

            let obs: string = inputObsReceita

            if (valor == 0) return
            if (obs == "") return

            //
            let date: string = toDateString(dateReceita)

            //
            if (categoriaDespesaSelecionada.id === undefined || categoriaDespesaSelecionada.id <= 0) return
            if (contaSelecionada.id === undefined || contaSelecionada.id <= 0) return

            //
            let transacao: Transacao = {
                descricao: obs,
                valor: valor,
                data: date,
                categoriaId: categoriaDespesaSelecionada.id,
                contaId: contaSelecionada.id,
                tipo: TipoReceita.despesa
            }

            await createTransacao(transacao)
            props.update()

            setInputObsReceita("")
            setInputValorReceita(null)
        }
        
    }

    return <Modal visible={isActive} backdropStyle={styles.backdrop} onBackdropPress={() => setModal(false)} style={{ width: '85%' }}>
    <Card header={headerCardModalAddReceita}>
        <Text>Tipo</Text>
        <Select
            placeholder={'Selecione uma opção...'}
            value={tipoSelecionado}
            selectedIndex={selectTipoTransacao}
            onSelect={(index:IndexPath)=> setSelectTipoTransacao(index)}
        >
            {tipos.map(renderOptionsTipos)}
        </Select>

        <Text style={styles.labelForm}>Data</Text>
        <Datepicker date={dateReceita} onSelect={nextDate => setDateReceita(nextDate)}></Datepicker>

        <Text style={styles.labelForm}>Valor (R$)</Text>
        {/* <Input placeholder='Ex.: 450.95' value={inputValorReceita} onChangeText={text => setInputValorReceita(text)} keyboardType='numeric'></Input> */}
        <CurrencyInput style={{marginBottom: 10}} value={inputValorReceita} onChangeValue={setInputValorReceita} prefix="R$" delimiter="." separator="," precision={2} minValue={0} placeholder="Ex.: 50,00" renderTextInput={textInputProps => <Input {...textInputProps}></Input>}/>

        <Text style={styles.labelForm}>Categoria</Text>
        {selectTipoTransacao.row == 0 ? <SelectCategoriaReceita/> : <SelectCategoriaDespesa/>}

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