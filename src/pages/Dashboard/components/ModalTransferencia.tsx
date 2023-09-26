import { Card, Datepicker, Divider, Input, Select, Text, Button, Modal, IndexPath, SelectItem } from "@ui-kitten/components"
import { useState } from "react";
import { View, ViewProps } from "react-native"
import { StyleSheet } from "react-native"
import { PropsModal } from "../model";
import { Conta } from "../../../model/conta";
import { useSelector } from "react-redux";
import { storeStateType } from "../../../redux";
import CurrencyInput from "react-native-currency-input";
import { Transacao } from "../../../model/transacao";
import { getContaText, getTransacoesbyConta } from "../../../common/util/dbUtils";

export const ModalTranferencia = (props: PropsModal) => {

    const stock = useSelector((state: storeStateType) => state.stock)

    const contasGeral: Conta[] = stock.contas
    const transacoesGeral: Transacao[] = stock.transacoes

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
    const [inputValorTransf, setInputValorTransf] = useState<number>()
    const [selectContaOrigem, setSelectContaOrigem] = useState<IndexPath>(new IndexPath(0))
    const [selectContaDestino, setSelectContaDestino] = useState<IndexPath>(new IndexPath(0))

    const [saldoContas, setSaldoContas] = useState<number[]>()


    /**
     * Funções
     */
    const getSaldoContaByIndex = (index: number) => {
        const conta = contasGeral[index]
        let total = 0

        // Get transações da conta selecionada
        const transacoes: Transacao[] = conta ? transacoesGeral.filter(item => conta.id == item.contaId) : [];

        // soma o total das transações
        transacoes.forEach(item => total += item.valor)

        return total

    }

    // Select Options Contas
    const renderOptionsContas = (title) => (
        <SelectItem title={title} key={title} />
    )

    //
    const displayValueContaOrigem = contasGeral[selectContaOrigem.row];
    const displayValueContaDestino = contasGeral[selectContaDestino.row];

    return <Modal visible={isActive} backdropStyle={styles.backdrop} onBackdropPress={() => setModal(false)} style={{ width: '85%' }}>
    <Card header={headerCardModalTransferencia}>
        <Text>Data</Text>
        <Datepicker date={dateTransf} onSelect={nextDate => setDateTransf(nextDate)}></Datepicker>

        <Text style={styles.labelForm}>Valor (R$)</Text>
        {/* <Input placeholder='Ex.: 450.95' value={inputValorTransf} onChangeText={text => setInputValorTransf(text)} keyboardType='numeric'></Input> */}
        <CurrencyInput style={{marginBottom: 10}} value={inputValorTransf} onChangeValue={setInputValorTransf} prefix="R$" delimiter="." separator="," precision={2} minValue={0} placeholder="Ex.: 50,00" renderTextInput={textInputProps => <Input {...textInputProps}></Input>}/>


        <Text style={styles.labelForm}>Conta Origem</Text>
        <Select selectedIndex={selectContaOrigem} onSelect={(index: IndexPath) => setSelectContaOrigem(index)} value={`${displayValueContaOrigem ? displayValueContaOrigem.nome: 'Adicione uma conta...'} (${displayValueContaOrigem ? displayValueContaOrigem.tipo : 'Carregando...'})`}>
            {contasGeral.map(item => renderOptionsContas(`${item.nome} (${item.tipo})`))}
        </Select>
        <Text style={{marginTop: 3}} status={getSaldoContaByIndex(selectContaOrigem.row) > 0 ? 'success' : 'danger'}>{`Saldo: R$ ${getSaldoContaByIndex(selectContaOrigem.row).toLocaleString('pt-br', {minimumFractionDigits: 2})}`}</Text>

        <Text style={styles.labelForm}>Conta Destino</Text>
        <Select selectedIndex={selectContaDestino} onSelect={(index: IndexPath) => setSelectContaDestino(index)} value={`${displayValueContaDestino ? displayValueContaDestino.nome: 'Adicione uma conta...'} (${displayValueContaDestino ? displayValueContaDestino.tipo : 'Carregando...'})`}>
            {contasGeral.map(item => renderOptionsContas(`${item.nome} (${item.tipo})`))}
        </Select>
        <Text style={{marginTop: 3}} status={getSaldoContaByIndex(selectContaDestino.row) >= 0 ? 'success' : 'danger'}>{`Saldo: R$ ${getSaldoContaByIndex(selectContaDestino.row).toLocaleString('pt-br', {minimumFractionDigits: 2})}`}</Text>

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