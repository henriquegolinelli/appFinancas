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

export const ModalDespesa = (props: PropsModal) => {
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
    const displayValueCategorias = dataSelectCategoria[selectCategoriaDespesa.row];
    const displayValueContas = dataSelectContas[selectContaDespesa.row];

    // Select Options Categorias
    const renderOptionsCategorias = (title) => (
        <SelectItem title={title} key={title} />
    )

    // Select Options Contas
    const renderOptionsContas = (title) => (
        <SelectItem title={title} key={title} />
    )

    return <Modal visible={isActive} backdropStyle={styles.backdrop} onBackdropPress={() => setModal(false)} style={{ width: '85%' }}>
    <Card header={headerCardModalAddDespesa}>
        <Text>Data</Text>
        <Datepicker date={dateDespesa} onSelect={nextDate => setDateDespesa(nextDate)}></Datepicker>

        <Text style={styles.labelForm}>Valor (R$)</Text>
        <Input placeholder='Ex.: 450.95' value={inputValorDespesa} onChangeText={text => setInputValorDespesa(text)} keyboardType='numeric'></Input>

        <Text style={styles.labelForm}>Categoria</Text>
        <Select selectedIndex={selectCategoriaDespesa} onSelect={(index: IndexPath) => setSelectCategoriaDespesa(index)} value={displayValueCategorias}>
            {dataSelectCategoria.map(renderOptionsCategorias)}
        </Select>

        <Text style={styles.labelForm}>Conta</Text>
        <Select selectedIndex={selectContaDespesa} onSelect={(index: IndexPath) => setSelectContaDespesa(index)} value={displayValueContas}>
            {dataSelectContas.map(renderOptionsContas)}
        </Select>

        <Text style={styles.labelForm}>Observação</Text>
        <Input placeholder='Ex: Pastel' value={inputObsDespesa} onChangeText={text => setInputObsDespesa(text)}></Input>

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