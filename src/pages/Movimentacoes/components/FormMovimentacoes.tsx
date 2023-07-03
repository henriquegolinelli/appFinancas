import {
  Button,
  IndexPath,
  Layout,
  Select,
  SelectItem,
  Text,
} from "@ui-kitten/components";
import { Styles as styles } from "../../../common/style/stylesheet";
import { FormSetContaProps } from "../model";
import { useSelector } from "react-redux";
import { storeStateType } from "../../../redux";
import { Conta } from "../../../model/conta";

// Dados que irão aparecer como opções no SELECT
// TODO: Pegar as contas do banco de dados
const dataSelectContas = ["Principal (Corrente)", "Secundária (Poupança)"];

export const FormMovimentacoes = (props:FormSetContaProps) => {

  const stock = useSelector((state: storeStateType) => state.stock);
  let contas: Conta[] = stock.contas;

  

  /**
   * Funções
   */
  const displayValueContas = contas[props.conta.row];

  /**
   * Renders
   */
  const renderSelectOptionsContas = (conta: Conta) => (
    <SelectItem title={conta.nome + " (" + conta.tipo + ")"} key={conta.id} />
  );

  return (
    <Layout
      style={[styles.container, { width: "100%", paddingHorizontal: 30 }]}
    >
      <Text style={styles.label}>Conta</Text>
      <Select
        selectedIndex={props.conta}
        onSelect={(index: IndexPath) => props.setConta(index)}
        value={displayValueContas.nome + " (" + displayValueContas.tipo + ")"}
      >
        {contas.map(renderSelectOptionsContas)}
      </Select>
      <Button style={{ marginTop: 10}} onPress={props.buttonPress}>Consultar</Button>
    </Layout>
  );
};
