import { Layout, TopNavigation, Text, TopNavigationAction, IconProps, IconElement, Icon, Datepicker, Button, Card, IndexPath, Select, SelectItem, List, ListItem, ViewPager, Modal, Input } from "@ui-kitten/components"
import { useState } from "react"
import { ScrollView, StyleSheet, View, ViewProps } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { ModalAddCategoria } from "./components/ModalAddCategoria"
import { useDispatch, useSelector } from "react-redux"
import { storeStateType } from "../../redux"
import { addCategoria, getCategorias, getContas, getTransacoes } from "../../redux/Redux.store"
import { ModalDelete } from "../../components/ModalDelete/ModalDelete"
import { Categoria } from "../../model/categoria"
import { IconEnum } from "../../model/iconEnum"

interface ListItemProps {
    nome: string
    icon: IconElement
}

const MenuIcon = (props: IconProps): IconElement => (
    <Icon {...props} name='menu' />
)

const BackIcon = (props: IconProps): IconElement => (
    <Icon {...props} name="arrow-back" />
)

export const Categorias = ({ navigation }) => {
    //
    const stock = useSelector((state: storeStateType) => state.stock)

    //
    const dispatch = useDispatch<any>()

    //
    const updateCategoria = () => {
        dispatch(getCategorias())
    }

    //
    let categorias: Categoria[] = stock.categorias

    let catDespesas: Categoria[] = []
    let catReceitas: Categoria[] = []

    for (let i: number = 0; i < categorias.length; i++) {
        let categoria = categorias[i]

        if (categoria.tipo === "receita") {
            catReceitas.push(categoria)

            continue
        }

        catDespesas.push(categoria)
    }
    /**
     * States da página e formulário
     */
    const [indexPage, setIndexPage] = useState(0)

    const [modalOpen, setModalOpen] = useState<boolean>(false)

    const [selectedID, setSelectedID] = useState<number>(0);
    const [selectedName, setSelectedName] = useState<string>();

    const [modalDeleteCategoria, setModalDeleteCategori] = useState<boolean>(false);


    /**
    * Funções
    */
    const deleteCategoria = (categoriaID: number, nomeCategoria?: string) => {
        console.log(`ID CATEGORIA: ${categoriaID}, NOME: ${nomeCategoria}`);
        setSelectedID(categoriaID);
        setSelectedName(nomeCategoria);
        setModalDeleteCategori(true);
    };


    /**
     * Renders
     */
    const renderDrawerAction = () => (
        <TopNavigationAction icon={MenuIcon} onPress={() => { navigation.openDrawer() }} />
    )
    const renderBackAction = () => (
        <TopNavigationAction icon={BackIcon} onPress={() => { navigation.goBack() }} />
    )

    const IconGood = ({props, category}:{props?:IconProps; category:IconEnum}): IconElement => (
        <Icon {...props} name={category} style={{ tintColor: "black", width: 30, height: 30 }}></Icon>
    )

    const renderItemLista = ({ item, index }: { item: Categoria; index: number;}) => {

        // let categoria: string = categorias.find((categoria) => categoria.id == item.id)?.nome ?? "";
        // let cor: string = categorias.find((categoria) => categoria.id == item.id)?.cor ?? "";

        let categoriaID = categorias.find((categoria) => categoria.id == item.id);

        return (
            <>
                <ListItem accessoryLeft={<IconGood category={categoriaID.icone}/>} title={item.nome} onPress={()=>{deleteCategoria(categoriaID.id, categoriaID.nome)}}/>
            </>
        )

    }

    /**
     * Card header / footer
     */
    const headerCardDespesas = (props: ViewProps) => (
        <View {...props}>
            <Text category="h5" style={{ textAlign: 'center' }}>Despesas</Text>
        </View>
    )
    const headerCardReceitas = (props: ViewProps) => (
        <View {...props}>
            <Text category="h5" style={{ textAlign: 'center' }}>Receitas</Text>
        </View>
    )

    return (
        <SafeAreaView style={[styles.container, styles.greenBackground]}>
            <Layout style={styles.container}>
                <TopNavigation accessoryLeft={renderBackAction} accessoryRight={renderDrawerAction} alignment="center" title={props => <Text {...props} style={{ color: 'white', fontSize: 18 }}>CATEGORIAS</Text>} style={styles.greenBackground} />
                <Layout style={styles.container}>
                    <ViewPager selectedIndex={indexPage} onSelect={index => setIndexPage(index)} style={styles.container} >
                        <ScrollView contentContainerStyle={styles.scrollViewContainer} horizontal={false}>
                            <Card header={headerCardDespesas} style={[{ width: '100%', elevation: 10 }]}>
                                <List renderItem={renderItemLista} data={catDespesas} scrollEnabled={false}>

                                </List>
                            </Card>
                        </ScrollView>
                        <ScrollView contentContainerStyle={styles.scrollViewContainer} horizontal={false}>
                            <Card header={headerCardReceitas} style={[{ width: '100%', elevation: 10 }]}>
                                <List renderItem={renderItemLista} data={catReceitas} scrollEnabled={false}>

                                </List>
                            </Card>
                        </ScrollView>
                    </ViewPager>
                    <View style={[{ padding: 10, flexDirection: 'row', justifyContent: 'center', gap: 5 }]}>
                        <View style={{ borderColor: 'black', borderWidth: 2, borderRadius: 100, width: 15, height: 15, justifyContent: 'center', alignItems: 'center' }}>
                            {indexPage == 0 ? <View style={[styles.greenBackground, { width: 8, height: 8, borderRadius: 50 }]}></View> : ''}
                        </View>

                        <View style={{ borderColor: 'black', borderWidth: 2, borderRadius: 100, width: 15, height: 15, justifyContent: 'center', alignItems: 'center' }}>
                            {indexPage == 1 ? <View style={[styles.greenBackground, { width: 8, height: 8, borderRadius: 50 }]}></View> : ''}
                        </View>
                    </View>
                    <View style={{ backgroundColor: '#fff', height: 70, elevation: 10, borderTopStartRadius: 10, borderTopEndRadius: 10, padding: 5, borderWidth: 0.3, borderBottomWidth: 0.1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <Button style={{ backgroundColor: 'black', borderColor: null, width: 140, height: 50, borderRadius: 10 }} onPress={() => setModalOpen(true)}>Criar Categoria</Button>
                    </View>
                    {/* Modal Add Categoria */}
                    <ModalAddCategoria open={modalOpen} setOpen={open => setModalOpen(open)} update={() => {updateCategoria()}}/>
                    <ModalDelete
                        open={modalDeleteCategoria}
                        setOpen={(open) => setModalDeleteCategori(open)}
                        modalTitle="Excluir Categoria"
                        idRemover={selectedID}
                        nomeRemover={selectedName}
                        operacao={2}
                        update={()=>{updateCategoria()}}
                        after={()=>{setModalDeleteCategori(false)}}
                    />
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