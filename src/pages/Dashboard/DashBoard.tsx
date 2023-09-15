import { SafeAreaView, ScrollView, View } from "react-native";
import { Styles } from "../../common/style/stylesheet";
import {
  Icon,
  IconElement,
  IconProps,
  Layout,
  TopNavigation,
  TopNavigationAction,
  Text,
  Button,
  Popover,
} from "@ui-kitten/components";
import { SaldoTotal } from "./components/SaldoTotal";
import { useEffect, useState } from "react";
import { initDB } from "../../configs/database";
import {
  getCategorias,
  getContas,
  getTransacoes,
} from "../../redux/Redux.store";
import { useDispatch } from "react-redux";
import { UltimosLancamentos } from "./components/UltimosLancamentos";
import { GastoMes } from "./components/GastoMes";
import { ModalDespesa } from "./components/ModalDespesas";
import { ModalTranferencia } from "./components/ModalTransferencia";
import { ModalReceita } from "./components/ModalReceita";

export const DashBoard = ({ navigation }: any) => {
  /**
   * Iniciar DB e carregar
   */
  const dispatch = useDispatch<any>();

  useEffect(() => {
    console.log("teste");

    init();
  }, []);

  const init = async () => {
    await initDB();

    dispatch(getTransacoes());
    dispatch(getCategorias());
    dispatch(getContas());
  };

  const updateTransacoes = () => {
    dispatch(getTransacoes());
  };

  /**
   * Controle de visibilidade dos modais
   * setState
   */
  const [visibleModalAddDespesa, setVisibleModalAddDespesa] =
    useState<boolean>(false);
  const [visibleModalAddTransferencia, setVisibleModalAddTransferencia] =
    useState<boolean>(false);
  const [visibleModalAddReceita, setVisibleModalAddReceita] =
    useState<boolean>(false);

  const [visiblePopover, setVisiblePopover] = useState<boolean>(false);

  // Botão Superior Menu
  const renderDrawerAction = () => (
    <TopNavigationAction
      icon={MenuIcon}
      onPress={() => {
        navigation.openDrawer();
      }}
    />
  );

  //
  const MenuIcon = (props: IconProps): IconElement => (
    <Icon {...props} name="menu" />
  );

  /**
   * Renders
   */
  const renderPopoverMenu = () => (
    <Button
      onPress={() => {
        setVisiblePopover(true);
      }}
      style={{
        width: 60,
        height: 60,
        borderRadius: 100,
        padding: 5,
        elevation: 10,
        position: 'absolute',
        bottom: 20,
        right: 20
      }}
      status="success"
    >
      +
    </Button>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#2f9e41" }}>
      <Layout style={Styles.container}>
        <TopNavigation
          accessoryRight={renderDrawerAction}
          alignment="center"
          title={(props) => (
            <Text {...props} style={{ color: "white", fontSize: 18 }}>
              DASHBOARD
            </Text>
          )}
          style={{ backgroundColor: "#2f9e41" }}
        />
        <ScrollView
          contentContainerStyle={Styles.scrollViewContainer}
          horizontal={false}
        >
          <SaldoTotal />
          <UltimosLancamentos />
          <GastoMes />
        </ScrollView>
        <Popover
          anchor={renderPopoverMenu}
          visible={visiblePopover}
          placement={"top end"}
          onBackdropPress={() => {
            setVisiblePopover(false);
          }}
        >
          <View style={{padding: 5, gap: 5, borderRadius: 5}}>
            <Button 
                status="danger" 
                onPress={()=>{
                    setVisiblePopover(false);
                    setVisibleModalAddDespesa(true);
                }}>
                    Adicionar Despesa
            </Button>
            <Button 
                style={{backgroundColor: 'black', borderColor: 'black'}}
                onPress={()=>{
                    setVisiblePopover(false);
                    setVisibleModalAddTransferencia(true);
                }}
                >
                    Fazer Transferência
            </Button>
            <Button 
            status="success"
            onPress={()=>{
                setVisiblePopover(false);
                setVisibleModalAddReceita(true);
            }}
            >
                Adicionar Receita
            </Button>
          </View>
        </Popover>
        {/* BottomTab Buttons */}
        {/* <View style={{ backgroundColor: '#fff', height: 70, elevation: 10, borderTopStartRadius: 10, borderTopEndRadius: 10, padding: 5, borderWidth: 0.3, borderBottomWidth: 0.1 }}>
                <Layout style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-evenly' }}>
                    <Button status="danger" size="small" onPress={() => setVisibleModalAddDespesa(true)}><Text style={{ textAlign: 'center' }}>+ Despesa</Text></Button>
                    <Button style={{ backgroundColor: 'black', borderWidth: 0 }} size="small" onPress={() => setVisibleModalAddTransferencia(true)}><Text style={{ flex: 1, flexWrap: 'wrap', textAlign: 'center' }}>{`Transferir`}</Text></Button>
                    <Button status="success" size="small" onPress={() => setVisibleModalAddReceita(true)}><Text style={{ textAlign: 'center' }}>+ Receita</Text></Button>
                </Layout>
            </View> */}
      </Layout>
      <ModalDespesa
        isModal={visibleModalAddDespesa}
        setModal={(isVisible) => {
          setVisibleModalAddDespesa(isVisible);
        }}
        update={() => {
          updateTransacoes();
        }}
      />
      <ModalTranferencia
        isModal={visibleModalAddTransferencia}
        setModal={(isVisible) => {
          setVisibleModalAddTransferencia(isVisible);
        }}
        update={() => {
          updateTransacoes();
        }}
      />
      <ModalReceita
        isModal={visibleModalAddReceita}
        setModal={(isVisible) => {
          setVisibleModalAddReceita(isVisible);
        }}
        update={() => {
          updateTransacoes();
        }}
      />
    </SafeAreaView>
  );
};
