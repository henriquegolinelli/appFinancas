import {
  Button,
  IndexPath,
  Layout,
  Select,
  SelectItem,
  Text,
} from "@ui-kitten/components";
import { Styles as styles } from "../../../common/style/stylesheet";
import { useState } from "react";

// Dados que irão aparecer como opções no SELECT
const dataSelectContas = ["Principal (Corrente)", "Secundária (Poupança)"];

export const FormMovimentacoes = () => {
  /**
   * States do formulário
   */
  const [selectConta, setSelectConta] = useState<IndexPath>(new IndexPath(0));

  /**
   * Funções
   */
  const displayValueContas = dataSelectContas[selectConta.row];

  /**
   * Renders
   */
  const renderSelectOptionsContas = (title) => (
    <SelectItem title={title} key={title} />
  );

  return (
    <Layout
      style={[styles.container, { width: "100%", paddingHorizontal: 30 }]}
    >
      <Text style={styles.label}>Conta</Text>
      <Select
        selectedIndex={selectConta}
        onSelect={(index: IndexPath) => setSelectConta(index)}
        value={displayValueContas}
      >
        {dataSelectContas.map(renderSelectOptionsContas)}
      </Select>

      <Button style={{ marginTop: 10 }}>Consultar</Button>
    </Layout>
  );
};
