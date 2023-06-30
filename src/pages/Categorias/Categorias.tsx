import { Layout, TopNavigation, Text, TopNavigationAction, IconProps, IconElement, Icon, Datepicker, Button, Card, IndexPath, Select, SelectItem, List, ListItem, ViewPager, Modal, Input } from "@ui-kitten/components"
import { useState } from "react"
import { ScrollView, StyleSheet, View, ViewProps } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

interface ListItemProps {
    nome: string
    icon: IconElement
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
const dataDespesas = new Array(6).fill({
    nome: 'Alimentação',
    icon: <Icon style={{tintColor: 'black', width: 30, height: 30}} name="menu"/>
})

const dataReceitas = new Array(4).fill({
    nome: 'Alimentação',
    icon: <Icon style={{tintColor: 'black', width: 30, height: 30}} name="menu"/>
})

const dataTipos = [
    'Despesas',
    'Receitas'
]

export const Categorias = ({navigation}) => {

    /**
     * States da página e formulário
     */
    const [indexPage, setIndexPage] = useState(0)

    const [modalAddCategoria, setModalAddCategoria] = useState<boolean>(false)

    const [inputNomeCategoria, setInputNomeCategoria] = useState<string>('')
    const [selectIndexTipo, setSelectIndexTipo] = useState<IndexPath>(new IndexPath(0))

    /**
    * Funções
    */
    const displayValueTipo = dataTipos[selectIndexTipo.row]

    /**
     * Renders
     */
    const renderDrawerAction = () => (
        <TopNavigationAction icon={MenuIcon} onPress={()=>{navigation.openDrawer()}}/>
    )
    const renderBackAction = () => (
        <TopNavigationAction icon={BackIcon} onPress={()=>{navigation.goBack()}}/>
    )

    const renderItemLista = ({item, index}: {item:ListItemProps, index:number}) => (
        <ListItem accessoryLeft={item.icon} title={item.nome}/>
    )

    const renderItemSelect = (title) => (
        <SelectItem title={title} key={title}/>
    )

    /**
     * Card header / footer
     */
    const headerCardDespesas = (props:ViewProps) => (
        <View {...props}>
            <Text category="h5" style={{textAlign: 'center'}}>Despesas</Text>
        </View>
    )
    const headerCardReceitas = (props:ViewProps) => (
        <View {...props}>
            <Text category="h5" style={{textAlign: 'center'}}>Receitas</Text>
        </View>
    )

    const headerModalCardAdd = (props:ViewProps) => (
        <View {...props}>
            <Text category="h5" style={{textAlign: 'center'}}>Criar Categoria</Text>
        </View>
    )

    return (
        <SafeAreaView style={[styles.container, styles.greenBackground]}>
            <Layout style={styles.container}>
                <TopNavigation accessoryLeft={renderBackAction} accessoryRight={renderDrawerAction} alignment="center" title={props => <Text {...props} style={{color: 'white', fontSize: 18}}>CATEGORIAS</Text>} style={styles.greenBackground}/>
                <Layout style={styles.container}>
                    <ViewPager selectedIndex={indexPage} onSelect={index => setIndexPage(index)} style={styles.container} >
                        <ScrollView contentContainerStyle={styles.scrollViewContainer} horizontal={false}>
                            <Card header={headerCardDespesas} style={[{width: '100%', elevation: 10}]}>
                                <List renderItem={renderItemLista} data={dataDespesas} scrollEnabled={false}>

                                </List>
                            </Card>
                        </ScrollView>
                        <ScrollView contentContainerStyle={styles.scrollViewContainer} horizontal={false}>
                            <Card header={headerCardReceitas} style={[{width: '100%', elevation: 10}]}>
                                <List renderItem={renderItemLista} data={dataReceitas} scrollEnabled={false}>

                                </List>
                            </Card>
                        </ScrollView>
                    </ViewPager>
                    <View style={[{padding: 10, flexDirection: 'row', justifyContent: 'center', gap: 5}]}>
                        <View style={{borderColor: 'black', borderWidth: 2, borderRadius: 100, width: 15, height: 15, justifyContent: 'center', alignItems: 'center'}}>
                            {indexPage==0?<View style={[styles.greenBackground, {width: 8, height: 8, borderRadius: 50}]}></View>:''}
                        </View>

                        <View style={{borderColor: 'black', borderWidth: 2, borderRadius: 100, width: 15, height: 15, justifyContent: 'center', alignItems: 'center'}}>
                            {indexPage==1?<View style={[styles.greenBackground, {width: 8, height: 8, borderRadius: 50}]}></View>:''}
                        </View>
                    </View>
                    <View style={{backgroundColor: '#fff', height: 70, elevation: 10, borderTopStartRadius: 10, borderTopEndRadius: 10, padding: 5, borderWidth: 0.3, borderBottomWidth: 0.1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                        <Button style={{backgroundColor: 'black', borderColor: null, width: 140, height: 50, borderRadius: 10}} onPress={()=>setModalAddCategoria(true)}>Criar Categoria</Button>
                    </View>
                    <Modal visible={modalAddCategoria} backdropStyle={styles.backdrop} onBackdropPress={()=>setModalAddCategoria(false)} style={{width: '85%'}}>
                        <Card header={headerModalCardAdd}>
                            <Text style={[styles.label]}>Nome da Categoria</Text>
                            <Input placeholder="Ex.: Alimentação" style={{marginBottom: 10}} value={inputNomeCategoria} onChangeText={setInputNomeCategoria}></Input>

                            <Text style={styles.label}>Tipo</Text>
                            <Select selectedIndex={selectIndexTipo} onSelect={(index:IndexPath) => setSelectIndexTipo(index)} value={displayValueTipo} style={{marginBottom: 10}}>
                                {dataTipos.map(renderItemSelect)}
                            </Select>
                            <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '100%'}}>
                                <Button status="danger" style={{width: '45%'}} onPress={()=>{setModalAddCategoria(false)}}>Cancelar</Button>
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