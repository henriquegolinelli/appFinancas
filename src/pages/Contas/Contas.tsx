import { Layout, TopNavigation, Text, TopNavigationAction, IconProps, IconElement, Icon, Datepicker, Button, Card, IndexPath, Select, SelectItem, List, ListItem, ViewPager, Modal, Input, Divider } from "@ui-kitten/components"
import { useState } from "react"
import { ScrollView, StyleSheet, View, ViewProps } from "react-native"
import CurrencyInput from "react-native-currency-input"
import { SafeAreaView } from "react-native-safe-area-context"

interface ListItemProps {
    nome: string
    tipo: string
    saldo: number
}

const MenuIcon = (props:IconProps): IconElement => (
    <Icon {...props} name='menu' />
)

const BackIcon = (props:IconProps): IconElement => (
    <Icon {...props} name="arrow-back"/>
)

/**
 * Datas
 */
const dataContas = new Array(2).fill({
    nome: 'Principal',
    tipo: 'Corrente',
    saldo: 5689
})


export const ContasView = ({navigation}) => {

    /**
     * States da página e formulário
     */
    const [modalAddConta ,setModalAddConta] = useState<boolean>(false)

    const [nomeConta, setNomeConta] = useState<string>('')
    const [tipoConta, setTipoConta] = useState<string>('')
    const [saldoConta, setSaldoConta] = useState<number>(0)

    /**
    * Funções
    */


    /**
     * Renders
     */
    const renderDrawerAction = () => (
        <TopNavigationAction icon={MenuIcon} onPress={()=>{navigation.openDrawer()}}/>
    )
    const renderBackAction = () => (
        <TopNavigationAction icon={BackIcon} onPress={()=>{navigation.goBack()}}/>
    )

    const renderListItem = ({item, index}: {item:ListItemProps, index:number}) => (
        <>
            <ListItem style={{width: '100%'}}>
                <View style={{width: '100%', flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Text style={{textAlign: 'left', fontSize: 14}}>{item.nome}</Text>
                    <Text style={{textAlign: 'center', fontSize: 14}}>{item.tipo}</Text>
                    <Text style={{textAlign: 'right', fontSize: 14}}>R$ {item.saldo.toLocaleString('pt-br', {minimumFractionDigits: 2})}</Text>
                </View>
            </ListItem>
            <Divider></Divider>
        </>
    )

    /**
     * Card header / footer
     */
    const headerCardContas = (props:ViewProps) => (
        <View {...props}>
            <Text category="h5" style={{textAlign: 'center'}}>Lista de Contas</Text>
        </View>
    )

    const headerModalCardAdd = (props:ViewProps) => (
        <View {...props}>
            <Text category="h5" style={{textAlign: 'center'}}>Criar Conta</Text>
        </View>
    )

    return (
        <SafeAreaView style={[styles.container, styles.greenBackground]}>
            <Layout style={styles.container}>
                <TopNavigation accessoryLeft={renderBackAction} accessoryRight={renderDrawerAction} alignment="center" title={props => <Text {...props} style={{color: 'white', fontSize: 18}}>CONTAS</Text>} style={styles.greenBackground}/>
                <Layout style={styles.container}>
                    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
                        <View style={[styles.container, {width: '100%'}]}>
                            <Card header={headerCardContas} style={[styles.container, {width: '100%', elevation: 10}]}>
                                <View style={{width: '100%', flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 8}}>

                                    <Text style={{fontWeight: 'bold'}}>Nome</Text>
                                    <Text style={{fontWeight: 'bold'}}>Tipo</Text>
                                    <Text style={{fontWeight: 'bold'}}>Saldo</Text>

                                </View>
                                <Divider style={{marginVertical: 5, borderWidth: 1}}/>
                                <List scrollEnabled={false} renderItem={renderListItem} data={dataContas}>

                                </List>
                            </Card>
                        </View>
                    </ScrollView>
                    <View style={{backgroundColor: '#fff', height: 70, elevation: 10, borderTopStartRadius: 10, borderTopEndRadius: 10, padding: 5, borderWidth: 0.3, borderBottomWidth: 0.1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                        <Button style={{backgroundColor: 'black', borderColor: null, width: 140, height: 50, borderRadius: 10}} onPress={()=>{setModalAddConta(true)}}>Criar Conta</Button>
                    </View>
                    <Modal backdropStyle={styles.backdrop} visible={modalAddConta} onBackdropPress={()=>setModalAddConta(false)} style={{width: '85%'}}>
                        <Card header={headerModalCardAdd} style={{width: '100%'}}>
                            <Text style={styles.label}>Nome da Conta</Text>
                            <Input placeholder="Ex.: Cartão Banco" value={nomeConta} onChangeText={text => setNomeConta(text)} style={{marginBottom: 10}}/>

                            <Text style={styles.label}>Tipo</Text>
                            <Input placeholder="Ex.: Corrente" value={tipoConta} onChangeText={text => setTipoConta(text)} style={{marginBottom: 10}}/>
                            

                            <Text style={styles.label}>Saldo</Text>
                            {/* <Input placeholder="Ex.: 10000" value={saldoConta.toFixed(2)} onChangeText={(text) => setSaldoConta(parseFloat(text))} keyboardType="numeric"/> */}
                            <CurrencyInput style={{marginBottom: 10}} value={saldoConta} onChangeValue={setSaldoConta} prefix="R$" delimiter="." separator="," precision={2} minValue={0} placeholder="Ex.: 10.000,00" renderTextInput={textInputProps => <Input {...textInputProps}></Input>}/>
                            
                            <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '100%'}}>
                                <Button status="danger" style={{width: '45%'}} onPress={()=>{setModalAddConta(false)}}>Cancelar</Button>
                                <Button status="success" style={{width: '45%'}}>Cadastrar</Button>
                            </View>
                        </Card>
                    </Modal>
                </Layout>
            </Layout>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    greenBackground: {
        backgroundColor: '#2f9e41'
    },
    scrollViewContainer: {
        alignItems: 'center', 
        padding: 20, 
        gap: 20
    },
    label: {
        marginVertical: 3
    },
    datepickerSpacing: {
        marginBottom: 10
    },
    card: {
        elevation: 8
    },
    backdrop: {
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
})