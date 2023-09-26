import {ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
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
  getTransacaoByDate,
  getTransacoes,
} from "../../redux/Redux.store";
import { useDispatch } from "react-redux";
import { UltimosLancamentos } from "./components/UltimosLancamentos";
import { GastoMes } from "./components/GastoMes";
import { ModalDespesa } from "./components/ModalDespesas";
import { ModalTranferencia } from "./components/ModalTransferencia";
import { ModalReceita } from "./components/ModalReceita";
import { ModalReceitaDespesa } from "./components/ModalReceitaDespesa";

export const DashBoard = ({ navigation }: any) => {
  /**
   * Iniciar DB e carregar
   */
  const dispatch = useDispatch<any>();

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    await initDB();

    dispatch(getTransacoes());
    dispatch(getTransacaoByDate({inicio: "0", fim: "0"}));
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
  // const [visibleModalAddDespesa, setVisibleModalAddDespesa] =
  //   useState<boolean>(false);
  const [visibleModalAddTransferencia, setVisibleModalAddTransferencia] =
    useState<boolean>(false);
  // const [visibleModalAddReceita, setVisibleModalAddReceita] =
  //   useState<boolean>(false);
  const [visibleModalAddDespesaReceita, setVisibleModalAddDespesaReceita] = useState<boolean>(false);

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
        borderRadius: 10,
        padding: 5,
        elevation: 10,
        width: "33%",
      }}
      status="success"
    >
      Adicionar
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
        {/* <View style={[{ flex: 1, flexDirection: "row", flexGrow: 1, flexShrink: 1, width: '100%' }]}>
          <Button
            style={{
              backgroundColor: "black",
              borderColor: "black",
              // position: "absolute",
              // bottom: 10,
              // left: 20,
              borderRadius: 10,
              width: "33%",
            }}
            onPress={() => {
              setVisiblePopover(false);
              setVisibleModalAddTransferencia(true);
            }}
          >
            Transferir
          </Button>
          <Popover
            anchor={renderPopoverMenu}
            visible={visiblePopover}
            placement={"top"}
            onBackdropPress={() => {
              setVisiblePopover(false);
            }}
          >
            <View style={{ padding: 5, gap: 5, borderRadius: 5 }}>
              <Button
                status="success"
                onPress={() => {
                  setVisiblePopover(false);
                  setVisibleModalAddReceita(true);
                }}
              >
                Receita
              </Button>
              <Button
                status="danger"
                onPress={() => {
                  setVisiblePopover(false);
                  setVisibleModalAddDespesa(true);
                }}
              >
                Despesa
              </Button>
            </View>
          </Popover>
        </View> */}

        {/* BottomTab Buttons */}
        {/* <View style={{ backgroundColor: '#fff', height: 70, elevation: 10, borderTopStartRadius: 10, borderTopEndRadius: 10, padding: 5, borderWidth: 0.3, borderBottomWidth: 0.1 }}>
          <Layout style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-evenly' }}>
              <Button status="danger" size="small" onPress={() => setVisibleModalAddDespesa(true)}><Text style={{ textAlign: 'center' }}>+ Despesa</Text></Button>
              <Button style={{ backgroundColor: 'black', borderWidth: 0 }} size="small" onPress={() => setVisibleModalAddTransferencia(true)}><Text style={{ flex: 1, flexWrap: 'wrap', textAlign: 'center' }}>{`Transferir`}</Text></Button>
              <Button status="success" size="small" onPress={() => setVisibleModalAddReceita(true)}><Text style={{ textAlign: 'center' }}>+ Receita</Text></Button>
          </Layout>
        </View> */}

        <View style={{ backgroundColor: '#fff', height: 60, elevation: 10, borderTopStartRadius: 10, borderTopEndRadius: 10, padding: 5, borderWidth: 0.3, borderBottomWidth: 0.1 }}>
          <Layout style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-evenly' }}>
              <Button style={{ backgroundColor: 'black', borderWidth: 0, borderRadius: 15, width:'45%' }} onPress={() => setVisibleModalAddTransferencia(true)}><Text style={{ flex: 1, flexWrap: 'wrap', textAlign: 'center' }}>{`Transferir`}</Text></Button>
              <Button style={{borderRadius: 15, width:'45%'}} status="success" onPress={() => setVisibleModalAddDespesaReceita(true)}><Text style={{ textAlign: 'center' }}>Adicionar</Text></Button>
          </Layout>
        </View>

      </Layout>
      {/* <ModalDespesa
        isModal={visibleModalAddDespesa}
        setModal={(isVisible) => {
          setVisibleModalAddDespesa(isVisible);
        }}
        update={() => {
          updateTransacoes();
        }}
      /> */}
      <ModalReceitaDespesa 
        isModal={visibleModalAddDespesaReceita}
        setModal={visible=>{setVisibleModalAddDespesaReceita(visible)}}
        update={()=>{updateTransacoes()}}
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
      {/* <ModalReceita
        isModal={visibleModalAddReceita}
        setModal={(isVisible) => {
          setVisibleModalAddReceita(isVisible);
        }}
        update={() => {
          updateTransacoes();
        }}
      /> */}
    </SafeAreaView>
  );
};
