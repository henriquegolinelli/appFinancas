import {
  Layout,
  TopNavigation,
  Text,
  TopNavigationAction,
  IconProps,
  IconElement,
  Icon,
  Datepicker,
  Button,
  Card,
  IndexPath,
  Select,
  SelectItem,
  List,
  ListItem,
  ViewPager,
  Modal,
  Input,
  Divider,
} from "@ui-kitten/components";
import { useState } from "react";
import { ScrollView, StyleSheet, View, ViewProps } from "react-native";
import CurrencyInput from "react-native-currency-input";
import { SafeAreaView } from "react-native-safe-area-context";
import { ModalAddConta } from "./components/ModalAddConta";

import { Styles as styles } from "../../common/style/stylesheet";
import { storeStateType } from "../../redux";
import { useDispatch, useSelector } from "react-redux";
import { Transacao } from "../../model/transacao";
import { Conta } from "../../model/conta";
import { getContas } from "../../redux/Redux.store";
import { TipoReceita } from "../../model/tipoReceita";
import { ModalDelete } from "../../components/ModalDelete/ModalDelete";

interface ListItemProps {
  nome: string;
  tipo: string;
  saldo: number;
}

const MenuIcon = (props: IconProps): IconElement => (
  <Icon {...props} name="menu" />
);

const BackIcon = (props: IconProps): IconElement => (
  <Icon {...props} name="arrow-back" />
);

/**
 * Datas
 */
const dataContas = new Array(2).fill({
  nome: "Principal",
  tipo: "Corrente",
  saldo: 5689,
});

export const ContasView = ({ navigation }) => {
  //
  const stock = useSelector((state: storeStateType) => state.stock);

  let transacoes: Transacao[] = stock.transacoes;

  let contas: Conta[] = stock.contas;

  let contaTransacoes: Transacao[][] = [];

  for (let i: number = 0; i < contas.length; i++) {
    let contaTransacao: Transacao[] = [];
    let conta: Conta = contas[i];

    contaTransacao = transacoes.filter(
      (transacao) => transacao.contaId == conta.id
    );

    if (contaTransacao.length == 0) {
      contaTransacao = [
        {
          valor: 0,
          descricao: "",
          data: "",
          contaId: conta.id,
          tipo: TipoReceita.despesa,
          categoriaId: 0,
        },
      ];
    }

    contaTransacoes.push(contaTransacao);
  }

  //
  const dispatch = useDispatch<any>();

  const updateContas = () => {
    dispatch(getContas());
  };

  /**
   * States da página e formulário
   */
  const [modalAddConta, setModalAddConta] = useState<boolean>(false);
  const [modalDeleteConta, setModalDeleteConta] = useState<boolean>(false);

  const [selectedID, setSelectedID] = useState<number>(0);
  const [selectedName, setSelectedName] = useState<string>();

  /**
   * Funções
   */

  const deleteConta = (contaID: number, nomeConta?: string) => {
    console.log(`ID CONTA: ${contaID}, NOME: ${nomeConta}`);
    setSelectedID(contaID);
    setSelectedName(nomeConta);
    setModalDeleteConta(true);
  };

  /**
   * Renders
   */
  const renderDrawerAction = () => (
    <TopNavigationAction
      icon={MenuIcon}
      onPress={() => {
        navigation.openDrawer();
      }}
    />
  );
  const renderBackAction = () => (
    <TopNavigationAction
      icon={BackIcon}
      onPress={() => {
        navigation.goBack();
      }}
    />
  );

  const renderListItem = ({
    item,
    index,
  }: {
    item: Transacao[];
    index: number;
  }) => {
    let valor: number = 0;
    let conta: string =
      contas.find((conta) => conta.id == item[0]?.contaId)?.nome ?? "";
    let tipo: string =
      contas.find((conta) => conta.id == item[0]?.contaId)?.tipo ?? "";

    let contaID = contas.find((conta) => conta.id == item[0]?.contaId);

    item.forEach((transacao) => {
      valor += transacao.valor;
    });

    return (
      <>
        <ListItem
          style={{ width: "100%" }}
          onPress={() => deleteConta(contaID.id, contaID.nome)}
        >
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <View style={{ width: "33%" }}>
              <Text style={{ fontSize: 14, textAlign: "left" }}>{conta}</Text>
            </View>
            <View style={{ width: "33%" }}>
              <Text style={{ fontSize: 14, textAlign: "center" }}>{tipo}</Text>
            </View>
            <View style={{ width: "34%" }}>
              <Text
                status={valor < 0 ? "danger" : "success"}
                style={{ fontSize: 14, textAlign: "right" }}
              >
                R$ {valor.toLocaleString("pt-br", { minimumFractionDigits: 2 })}
              </Text>
            </View>
          </View>
        </ListItem>
        <Divider></Divider>
      </>
    );
  };

  /**
   * Card header / footer
   */
  const headerCardContas = (props: ViewProps) => (
    <View {...props}>
      <Text category="h5" style={{ textAlign: "center" }}>
        Lista de Contas
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, styles.greenBackground]}>
      <Layout style={styles.container}>
        <TopNavigation
          accessoryLeft={renderBackAction}
          accessoryRight={renderDrawerAction}
          alignment="center"
          title={(props) => (
            <Text {...props} style={{ color: "white", fontSize: 18 }}>
              CONTAS
            </Text>
          )}
          style={styles.greenBackground}
        />
        <Layout style={styles.container}>
          <ScrollView contentContainerStyle={styles.scrollViewContainer}>
            <View style={[styles.container, { width: "100%" }]}>
              <Card
                header={headerCardContas}
                style={[styles.container, { width: "100%", elevation: 10 }]}
              >
                <View
                  style={{
                    width: "100%",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    paddingHorizontal: 8,
                  }}
                >
                  <Text style={{ fontWeight: "bold" }}>Nome</Text>
                  <Text style={{ fontWeight: "bold" }}>Tipo</Text>
                  <Text style={{ fontWeight: "bold" }}>Saldo</Text>
                </View>
                <Divider style={{ marginVertical: 5, borderWidth: 1 }} />
                <List
                  scrollEnabled={false}
                  renderItem={renderListItem}
                  data={contaTransacoes}
                ></List>
              </Card>
            </View>
          </ScrollView>
          <View
            style={{
              backgroundColor: "#fff",
              height: 70,
              elevation: 10,
              borderTopStartRadius: 10,
              borderTopEndRadius: 10,
              padding: 5,
              borderWidth: 0.3,
              borderBottomWidth: 0.1,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button
              style={{
                backgroundColor: "black",
                borderColor: null,
                width: 140,
                height: 50,
                borderRadius: 10,
              }}
              onPress={() => {
                setModalAddConta(true);
              }}
            >
              Criar Conta
            </Button>
          </View>
          {/* Modal */}
          <ModalAddConta
            open={modalAddConta}
            setOpen={(open) => setModalAddConta(open)}
            update={() => {
              updateContas();
            }}
          />
          <ModalDelete
            open={modalDeleteConta}
            setOpen={(open) => setModalDeleteConta(open)}
            modalTitle="Excluir Conta"
            idRemover={selectedID}
            nomeRemover={selectedName}
            operacao={1}
            update={()=>{updateContas()}}
            after={()=>{setModalDeleteConta(false)}}
          />
        </Layout>
      </Layout>
    </SafeAreaView>
  );
};
