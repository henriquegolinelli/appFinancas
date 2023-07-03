import { Card, Datepicker, Divider, Input, Select, Text, Button, Modal, IndexPath, SelectItem } from "@ui-kitten/components"
import { useState } from "react";
import { View, ViewProps } from "react-native"
import { StyleSheet } from "react-native"
import { PropsModal } from "../model";

/**
 * Categorias
 */
const dataSelectCategoria = [
    'Alimentação',
    'Cuidados Pessoais',
    'Transporte',
    'Viagem',
    'Lazer'
]

/**
 * Contas
 */
const dataSelectContas = [
    'Principal (Corrente)',
    'Secundária (Poupança)'
]


export const ModalReceita = (props: PropsModal) => {
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
    const displayValuesCategoriasReceita = dataSelectCategoria[selectCategoriaReceita.row];
    const displayValueContasReceita = dataSelectContas[selectContaReceita.row];

    // Select Options Categorias
    const renderOptionsCategorias = (title) => (
        <SelectItem title={title} key={title} />
    )

    // Select Options Contas
    const renderOptionsContas = (title) => (
        <SelectItem title={title} key={title} />
    )

    return <Modal visible={isActive} backdropStyle={styles.backdrop} onBackdropPress={() => setModal(false)} style={{ width: '85%' }}>
    <Card header={headerCardModalAddReceita}>
        <Text>Data</Text>
        <Datepicker date={dateReceita} onSelect={nextDate => setDateReceita(nextDate)}></Datepicker>

        <Text style={styles.labelForm}>Valor (R$)</Text>
        <Input placeholder='Ex.: 450.95' value={inputValorReceita} onChangeText={text => setInputValorReceita(text)} keyboardType='numeric'></Input>

        <Text style={styles.labelForm}>Categoria</Text>
        <Select selectedIndex={selectCategoriaReceita} onSelect={(index: IndexPath) => setSelectCategoriaReceita(index)} value={displayValuesCategoriasReceita}>
            {dataSelectCategoria.map(renderOptionsCategorias)}
        </Select>

        <Text style={styles.labelForm}>Conta</Text>
        <Select selectedIndex={selectContaReceita} onSelect={(index: IndexPath) => setSelectContaReceita(index)} value={displayValueContasReceita}>
            {dataSelectContas.map(renderOptionsContas)}
        </Select>

        <Text style={styles.labelForm}>Observação</Text>
        <Input placeholder='Ex: Pastel' value={inputObsReceita} onChangeText={text => setInputObsReceita(text)}></Input>

        <Divider style={styles.divider} />

        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Button status='danger' onPress={() => setModal(false)}>CANCELAR</Button>
            <Button status='success' onPress={() => console.log('Adicionar Pressionado!!')}>ADICIONAR</Button>
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