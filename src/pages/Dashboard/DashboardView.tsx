import { SafeAreaView } from 'react-native-safe-area-context'
import {TopNavigation, TopNavigationAction, Layout, Text, Icon, IconProps, IconElement, Card, Button, Divider, Modal, Input, Datepicker, Select, IndexPath, SelectItem} from '@ui-kitten/components'
import { ScrollView, StyleSheet, View, ViewProps } from 'react-native'

import { CardItemLancamento } from '../../components/CardItemLancamento/CardItemLancamento'
import { CardItemGastoDoMes } from '../../components/CardItemGastoDoMes/CardItemGastoDoMes'

import { useState } from 'react'

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

const MenuIcon = (props:IconProps): IconElement => (
    <Icon {...props} name='menu' />
)

export const DashboardView = ({navigation}) => {

    /**
     * State para definir se o campo Ver Detalhes está ativo ou não
     */
    const [details, setDetail] = useState(false)

    /**
     * Controle de visibilidade dos modais
     * setState
     */
    const [visibleModalAddDespesa, setVisibleModalAddDespesa] = useState<boolean>(false);
    const [visibleModalAddTransferencia, setVisibleModalAddTransferencia] = useState<boolean>(false);
    const [visibleModalAddReceita, setVisibleModalAddReceita] = useState<boolean>(false);

    /**
     * States do formulario Add Despesa
     */
    const [dateDespesa, setDateDespesa] = useState<Date>(new Date())
    const [inputValorDespesa, setInputValorDespesa] = useState<string>("")
    const [selectCategoriaDespesa, setSelectCategoriaDespesa] = useState<IndexPath>(new IndexPath(0));
    const [selectContaDespesa, setSelectContaDespesa] = useState<IndexPath>(new IndexPath(0))
    const [inputObsDespesa, setInputObsDespesa] = useState<string>("")

    /**
     * States do formulario Fazer Transferencia
     */
    const [dateTransf, setDateTransf] = useState<Date>(new Date())
    const [inputValorTransf, setInputValorTransf] = useState<string>("")
    const [selectContaOrigem, setSelectContaOrigem] = useState<IndexPath>(new IndexPath(0))
    const [selectContaDestino, setSelectContaDestino] = useState<IndexPath>(new IndexPath(0))

    /**
     * States do formulario Add Despesa
     */
    const [dateReceita, setDateReceita] = useState<Date>(new Date())
    const [inputValorReceita, setInputValorReceita] = useState<string>("")
    const [selectCategoriaReceita, setSelectCategoriaReceita] = useState<IndexPath>(new IndexPath(0))
    const [selectContaReceita, setSelectContaReceita] = useState<IndexPath>(new IndexPath(0))
    const [inputObsReceita, setInputObsReceita] = useState("")

    /**
     * Funções
     */

    const toggleDetails = () => {
        details?setDetail(false):setDetail(true);
    }

    const displayValueCategorias = dataSelectCategoria[selectCategoriaDespesa.row];
    const displayValueContas = dataSelectContas[selectContaDespesa.row];

    const displayValueContaOrigem = dataSelectContas[selectContaOrigem.row];
    const displayValueContaDestino = dataSelectContas[selectContaDestino.row];

    const displayValuesCategoriasReceita = dataSelectCategoria[selectCategoriaReceita.row];
    const displayValueContasReceita = dataSelectContas[selectContaReceita.row];

    /**
     * Renders
     */

    // Select Options Categorias
    const renderOptionsCategorias = (title) => (
        <SelectItem title={title} key={title}/>
    )
    
    // Select Options Contas
    const renderOptionsContas = (title) => (
        <SelectItem title={title} key={title}/>
    )

    // Botão Superior Menu
    const renderDrawerAction = () => (
        <TopNavigationAction icon={MenuIcon} onPress={()=>{navigation.openDrawer()}}/>
    )

    // CARD SALDO TOTAL
    // Header Card Saldo Total
    const headerSaldoTotal = (props:ViewProps) => (
        <View {...props}>
            <Text category='h5' style={{textAlign: 'center'}}>Saldo Total</Text>
            <Text category='h5' style={{textAlign: 'center', fontWeight: 'normal', color: '#555', marginTop: 10}}>R$ {(50000).toLocaleString('pt-br', {minimumFractionDigits: 2})}</Text>
        </View>
    )

    // footer Saldo Total
    const footerSaldoTotal = (props: ViewProps) => (
        <View {...props}>
            <Button status='danger' onPress={toggleDetails}><Text>{details?'Ocultar':'Ver'} Detalhes</Text></Button>
        </View>
    )

    // CARD ULTIMOS LANCAMENTOS
    // Header ultimos lançamentos
    const headerUltimosLancamentos = (props:ViewProps) => (
        <View {...props}>
            <Text category='h5' style={{textAlign: 'center'}}>Últimos Lançamentos</Text>
        </View>
    )

    // CARD GASTOS DO MES
    // header Gastos do mes
    const headerGastosDoMes = (props:ViewProps) => (
        <View {...props}>
            <Text category='h5' style={{textAlign: 'center'}}>Gastos do Mês</Text>
        </View>
    )

    // MODAL
    // Card header Add Despesa
    const headerCardModalAddDespesa = (props: ViewProps) => (
        <View {...props}>
            <Text style={{fontWeight: 'bold', fontSize: 22, textAlign: 'center'}}>Adicionar Despesa</Text>
        </View>
    )
    // Card header fazer transferencia
    const headerCardModalTransferencia = (props: ViewProps) => (
        <View {...props}>
            <Text style={{fontWeight: 'bold', fontSize: 22, textAlign: 'center'}}>Fazer Transferência</Text>
        </View>
    )

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: '#2f9e41'}}>
            <Layout style={styles.container}>
                <TopNavigation accessoryRight={renderDrawerAction} alignment='center' title={props => <Text {...props} style={{color: 'white', fontSize: 18}}>DASHBOARD</Text>} style={{backgroundColor: '#2f9e41'}}/>
                <Layout style={styles.container}>
                    <ScrollView contentContainerStyle={styles.scrollViewContainer} horizontal={false}>
                        
                        {/* Saldo Total */}
                        <Card header={headerSaldoTotal} style={styles.cardContainer} footer={footerSaldoTotal}>
                            <Layout>
                                <Text style={{textAlign: 'center', color: '#777'}}>Principal (corrente): R$ {(50000).toLocaleString('pt-br', {minimumFractionDigits: 2})}</Text>
                            </Layout>
                            <Layout style={{display: details?'flex':'none'}}>
                                <Divider style={{marginTop: 15}}/>
                                <Layout style={{marginTop: 10}}>
                                    <Text style={{fontSize: 18, fontWeight: 'bold', textAlign: 'center', color: '#555'}}>RESUMO DO MÊS</Text>
                                    <Layout style={{marginTop: 15, gap: 5}}>
                                        <Layout style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
                                            <Text style={{fontWeight: 'bold', fontSize: 16, color: '#555'}}>Receita Mensal:</Text>
                                            <Text status='success'>R$ {(51000).toLocaleString('pt-br', {minimumFractionDigits: 2})}</Text>
                                        </Layout>
                                        <Layout style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
                                            <Text style={{fontWeight: 'bold', fontSize: 16, color: '#555'}}>Despesa Mensal:</Text>
                                            <Text status='danger'>R$ {(768).toLocaleString('pt-br', {minimumFractionDigits: 2})}</Text>
                                        </Layout>
                                        <Layout style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
                                            <Text style={{fontWeight: 'bold', fontSize: 16, color: '#555'}}>Saldo Mensal:</Text>
                                            <Text style={{color: '#555'}}>R$ {(51000).toLocaleString('pt-br', {minimumFractionDigits: 2})}</Text>
                                        </Layout>
                                    </Layout>
                                </Layout>
                            </Layout>
                            
                        </Card>

                        {/* Últimos Lançamentos */}
                        <Card header={headerUltimosLancamentos} style={styles.cardContainer}>
                            <CardItemLancamento></CardItemLancamento>
                        </Card>

                        {/* Gastos do Mês */}
                        <Card header={headerGastosDoMes} style={styles.cardContainer}>
                            <CardItemGastoDoMes></CardItemGastoDoMes>
                        </Card>

                    </ScrollView>

                    {/* BottomTab Buttons */}
                    <View style={{backgroundColor: '#fff', height: 70, elevation: 10, borderTopStartRadius: 10, borderTopEndRadius: 10, padding: 5, borderWidth: 0.3, borderBottomWidth: 0.1}}>
                        <Layout style={{flex: 1, flexDirection: 'row', justifyContent: 'space-evenly'}}>
                            <Button status="danger" size="small" onPress={() => setVisibleModalAddDespesa(true)}><Text style={{textAlign: 'center'}}>Adicionar Despesa</Text></Button>
                            <Button style={{backgroundColor: 'black', borderWidth: 0}} size="small" onPress={()=>setVisibleModalAddTransferencia(true)}><Text style={{flex: 1, flexWrap: 'wrap', textAlign: 'center'}}>{`Fazer\nTransferência`}</Text></Button>
                            <Button status="success" size="small" onPress={()=>setVisibleModalAddReceita(true)}><Text style={{textAlign: 'center'}}>Adicionar Receita</Text></Button>
                        </Layout>
                    </View>

                </Layout>

                {/* Modal Para adicionar despesa */}
                <Modal visible={visibleModalAddDespesa} backdropStyle={styles.backdrop} onBackdropPress={()=>setVisibleModalAddDespesa(false)} style={{width: '85%'}}>
                    <Card header={headerCardModalAddDespesa}>
                        <Text>Data</Text>
                        <Datepicker date={dateDespesa} onSelect={nextDate => setDateDespesa(nextDate)}></Datepicker>

                        <Text style={styles.labelForm}>Valor (R$)</Text>
                        <Input placeholder='Ex.: 450.95' value={inputValorDespesa} onChangeText={text => setInputValorDespesa(text)} keyboardType='numeric'></Input>

                        <Text style={styles.labelForm}>Categoria</Text>
                        <Select selectedIndex={selectCategoriaDespesa} onSelect={(index:IndexPath) => setSelectCategoriaDespesa(index)} value={displayValueCategorias}>
                            {dataSelectCategoria.map(renderOptionsCategorias)}
                        </Select>

                        <Text style={styles.labelForm}>Conta</Text>
                        <Select selectedIndex={selectContaDespesa} onSelect={(index:IndexPath)=>setSelectContaDespesa(index)} value={displayValueContas}>
                            {dataSelectContas.map(renderOptionsContas)}
                        </Select>

                        <Text style={styles.labelForm}>Observação</Text>
                        <Input placeholder='Ex: Pastel' value={inputObsDespesa} onChangeText={text => setInputObsDespesa(text)}></Input>

                        <Divider style={styles.divider}/>

                        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                            <Button status='danger' onPress={()=>setVisibleModalAddDespesa(false)}>CANCELAR</Button>
                            <Button status='success' onPress={()=>console.log('Adicionar Pressionado!!')}>ADICIONAR</Button>
                        </View>

                    </Card>
                </Modal>
                
                {/* Modal Para fazer transferencias */}
                <Modal visible={visibleModalAddTransferencia} backdropStyle={styles.backdrop} onBackdropPress={()=>setVisibleModalAddTransferencia(false)} style={{width: '85%'}}>
                    <Card header={headerCardModalTransferencia}>
                        <Text>Data</Text>
                        <Datepicker date={dateTransf} onSelect={nextDate => setDateTransf(nextDate)}></Datepicker>

                        <Text style={styles.labelForm}>Valor (R$)</Text>
                        <Input placeholder='Ex.: 450.95' value={inputValorTransf} onChangeText={text => setInputValorTransf(text)} keyboardType='numeric'></Input>

                        <Text style={styles.labelForm}>Conta Origem</Text>
                        <Select selectedIndex={selectContaOrigem} onSelect={(index:IndexPath)=>setSelectContaOrigem(index)} value={displayValueContaOrigem}>
                            {dataSelectContas.map(renderOptionsContas)}
                        </Select>

                        <Text style={styles.labelForm}>Conta Destino</Text>
                        <Select selectedIndex={selectContaDestino} onSelect={(index:IndexPath)=>setSelectContaDestino(index)} value={displayValueContaDestino}>
                            {dataSelectContas.map(renderOptionsContas)}
                        </Select>

                        <Divider style={styles.divider}/>

                        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                            <Button status='danger' onPress={()=>setVisibleModalAddTransferencia(false)}>CANCELAR</Button>
                            <Button status='success' onPress={()=>console.log('Adicionar Pressionado!!')}>TRANSFERIR</Button>
                        </View>

                    </Card>
                </Modal>

                {/* Modal Para adicionar receita */}
                <Modal visible={visibleModalAddReceita} backdropStyle={styles.backdrop} onBackdropPress={()=>setVisibleModalAddReceita(false)} style={{width: '85%'}}>
                    <Card header={headerCardModalAddDespesa}>
                        <Text>Data</Text>
                        <Datepicker date={dateReceita} onSelect={nextDate => setDateReceita(nextDate)}></Datepicker>

                        <Text style={styles.labelForm}>Valor (R$)</Text>
                        <Input placeholder='Ex.: 450.95' value={inputValorReceita} onChangeText={text => setInputValorReceita(text)} keyboardType='numeric'></Input>

                        <Text style={styles.labelForm}>Categoria</Text>
                        <Select selectedIndex={selectCategoriaReceita} onSelect={(index:IndexPath) => setSelectCategoriaReceita(index)} value={displayValuesCategoriasReceita}>
                            {dataSelectCategoria.map(renderOptionsCategorias)}
                        </Select>

                        <Text style={styles.labelForm}>Conta</Text>
                        <Select selectedIndex={selectContaReceita} onSelect={(index:IndexPath)=>setSelectContaReceita(index)} value={displayValueContasReceita}>
                            {dataSelectContas.map(renderOptionsContas)}
                        </Select>

                        <Text style={styles.labelForm}>Observação</Text>
                        <Input placeholder='Ex: Pastel' value={inputObsReceita} onChangeText={text => setInputObsReceita(text)}></Input>

                        <Divider style={styles.divider}/>

                        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                            <Button status='danger' onPress={()=>setVisibleModalAddReceita(false)}>CANCELAR</Button>
                            <Button status='success' onPress={()=>console.log('Adicionar Pressionado!!')}>ADICIONAR</Button>
                        </View>

                    </Card>
                </Modal>

            </Layout>
            
        </SafeAreaView>
    )

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