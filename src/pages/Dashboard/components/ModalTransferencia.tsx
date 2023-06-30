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

export const ModalTranferencia = (props: PropsModal) => {
    // Props
    const isActive: boolean = props.isModal
    const setModal = (isActive: boolean) => {
        props.setModal(isActive)
    }

    // Card header fazer transferencia
    const headerCardModalTransferencia = (props: ViewProps) => (
        <View {...props}>
            <Text style={{ fontWeight: 'bold', fontSize: 22, textAlign: 'center' }}>Fazer Transferência</Text>
        </View>
    )

    /**
     * States do formulario Fazer Transferencia
     */
    const [dateTransf, setDateTransf] = useState<Date>(new Date())
    const [inputValorTransf, setInputValorTransf] = useState<string>("")
    const [selectContaOrigem, setSelectContaOrigem] = useState<IndexPath>(new IndexPath(0))
    const [selectContaDestino, setSelectContaDestino] = useState<IndexPath>(new IndexPath(0))

    // Select Options Contas
    const renderOptionsContas = (title) => (
        <SelectItem title={title} key={title} />
    )

    //
    const displayValueContaOrigem = dataSelectContas[selectContaOrigem.row];
    const displayValueContaDestino = dataSelectContas[selectContaDestino.row];

    return <Modal visible={isActive} backdropStyle={styles.backdrop} onBackdropPress={() => setModal(false)} style={{ width: '85%' }}>
    <Card header={headerCardModalTransferencia}>
        <Text>Data</Text>
        <Datepicker date={dateTransf} onSelect={nextDate => setDateTransf(nextDate)}></Datepicker>

        <Text style={styles.labelForm}>Valor (R$)</Text>
        <Input placeholder='Ex.: 450.95' value={inputValorTransf} onChangeText={text => setInputValorTransf(text)} keyboardType='numeric'></Input>

        <Text style={styles.labelForm}>Conta Origem</Text>
        <Select selectedIndex={selectContaOrigem} onSelect={(index: IndexPath) => setSelectContaOrigem(index)} value={displayValueContaOrigem}>
            {dataSelectContas.map(renderOptionsContas)}
        </Select>

        <Text style={styles.labelForm}>Conta Destino</Text>
        <Select selectedIndex={selectContaDestino} onSelect={(index: IndexPath) => setSelectContaDestino(index)} value={displayValueContaDestino}>
            {dataSelectContas.map(renderOptionsContas)}
        </Select>

        <Divider style={styles.divider} />

        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Button status='danger' onPress={() => setModal(false)}>CANCELAR</Button>
            <Button status='success' onPress={() => console.log('Adicionar Pressionado!!')}>TRANSFERIR</Button>
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