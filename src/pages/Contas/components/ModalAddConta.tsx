import { Button, Card, Input, Modal, Text } from "@ui-kitten/components"
import { View, ViewProps } from "react-native"
import CurrencyInput from "react-native-currency-input"

import { Styles as styles } from "../../../common/style/stylesheet"
import { ModalAddContaProps } from "../model"
import { useState } from "react"
import { createConta } from "../../../configs/database"
import { Conta } from "../../../model/conta"

export const ModalAddConta = (props:ModalAddContaProps) => {

    const isActive: boolean = props.open
    const setModal = (isActive: boolean) => {
        props.setOpen(isActive)
    }

    const [nomeConta, setNomeConta] = useState<string>('')
    const [tipoConta, setTipoConta] = useState<string>('')
    // const [saldoConta, setSaldoConta] = useState<number>(0)

    const headerModalCardAdd = (props:ViewProps) => (
        <View {...props}>
            <Text category="h5" style={{textAlign: 'center'}}>Criar Conta</Text>
        </View>
    )

    const handleAdd = async () => {
        let nome: string = nomeConta
        let tipo: string = tipoConta
        // let saldo: number = saldoConta

        if (nome == "") return
        if (tipo == "") return

        let conta: Conta = {nome: nome, tipo: tipo}

        await createConta(conta)
        props.update()

        setNomeConta("")
        setTipoConta("")
        // setSaldoConta(0)

        setModal(false)
    }

    return <Modal backdropStyle={styles.backdrop} visible={isActive} onBackdropPress={()=>setModal(false)} style={{width: '85%'}}>
    <Card header={headerModalCardAdd} style={{width: '100%'}}>
        <Text style={styles.label}>Nome da Conta</Text>
        <Input placeholder="Ex.: Cartão Banco" value={nomeConta} onChangeText={text => setNomeConta(text)} style={{marginBottom: 10}}/>

        <Text style={styles.label}>Tipo</Text>
        <Input placeholder="Ex.: Corrente" value={tipoConta} onChangeText={text => setTipoConta(text)} style={{marginBottom: 10}}/>
        

        {/* <Text style={styles.label}>Saldo</Text> */}
        {/* <Input placeholder="Ex.: 10000" value={saldoConta.toFixed(2)} onChangeText={(text) => setSaldoConta(parseFloat(text))} keyboardType="numeric"/> */}
        {/* <CurrencyInput style={{marginBottom: 10}} value={saldoConta} onChangeValue={setSaldoConta} prefix="R$" delimiter="." separator="," precision={2} minValue={0} placeholder="Ex.: 10.000,00" renderTextInput={textInputProps => <Input {...textInputProps}></Input>}/> */}
        
        <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '100%'}}>
            <Button status="danger" style={{width: '45%'}} onPress={()=>{setModal(false)}}>Cancelar</Button>
            <Button status="success" style={{width: '45%'}} onPress={async () => {await handleAdd()}}>Cadastrar</Button>
        </View>
    </Card>
</Modal>
}