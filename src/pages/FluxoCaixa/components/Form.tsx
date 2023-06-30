import { Button, Datepicker, Layout, Text } from "@ui-kitten/components";
import { Styles } from "../../../common/style/stylesheet";
import { useState } from "react";

export const Form = () => {

     /**
     * States do formulário
     */
     const [dateInicio, setDateInicio] = useState<Date>(new Date())
     const [dateFinal, setDateFinal] = useState<Date>(new Date())

     
  return (
    <Layout
      style={[Styles.container, { width: "100%", paddingHorizontal: 30 }]}
    >
      <Text style={Styles.label}>Data de Início</Text>
      <Datepicker
        date={dateInicio}
        onSelect={(nextDate) => setDateInicio(nextDate)}
        style={Styles.datepickerSpacing}
      ></Datepicker>
      <Text style={Styles.label}>Data Final</Text>
      <Datepicker
        date={dateFinal}
        onSelect={(nextDate) => setDateFinal(nextDate)}
        style={Styles.datepickerSpacing}
      ></Datepicker>

      <Button>Consultar</Button>
    </Layout>
  );
};
