import { Button, Datepicker, Layout, Text } from "@ui-kitten/components";
import { Styles } from "../../../common/style/stylesheet";
import { useState } from "react";
import { toDateString } from "../../../common/util/dateUtils";

export const Form = (props: { update: (inicio: string, fim: string) => void, dateInicio: Date, dateFinal: Date, setDateInicio: React.Dispatch<React.SetStateAction<Date>>, setDateFinal: React.Dispatch<React.SetStateAction<Date>> }) => {



  const updateTransacao = () => {
    let inicio: string = toDateString(props.dateInicio)
    let fim: string = toDateString(props.dateFinal)

    //
    props.update(inicio, fim)
  }

  const allTransacao = () => {
    props.setDateInicio(new Date())
    props.setDateFinal(new Date())

    //
    props.update("0", "0")
  }


  return (
    <Layout
      style={[Styles.container, { width: "100%", paddingHorizontal: 30 }]}
    >
      <Text style={Styles.label}>Data de Início</Text>
      <Datepicker
        date={props.dateInicio}
        onSelect={(nextDate) => props.setDateInicio(nextDate)}
        style={Styles.datepickerSpacing}
      ></Datepicker>
      <Text style={Styles.label}>Data Final</Text>
      <Datepicker
        date={props.dateFinal}
        onSelect={(nextDate) => props.setDateFinal(nextDate)}
        style={Styles.datepickerSpacing}
      ></Datepicker>

      <Button onPress={() => { updateTransacao() }}>Consultar</Button>
      <Button style={{
        marginTop: 5
      }}
        status="danger"
        onPress={() => { allTransacao() }}> Mostrar Todas </Button>
    </Layout>
  );
};
