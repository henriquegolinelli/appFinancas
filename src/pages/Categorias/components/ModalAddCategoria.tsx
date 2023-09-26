import {
  Modal,
  Card,
  Input,
  Text,
  Select,
  SelectItem,
  Button,
  IndexPath,
  Icon,
  IconProps,
  IconElement,
} from "@ui-kitten/components";

import { Styles as styles } from "../../../common/style/stylesheet";
import { useState } from "react";
import { ViewProps, View } from "react-native";
import { ModalProps } from "../model";
import { TipoReceita } from "../../../model/tipoReceita";
import { createCategoria } from "../../../configs/database";
import { Categoria } from "../../../model/categoria";
import { IconEnum } from "../../../model/iconEnum";

export const ModalAddCategoria = (props: ModalProps) => {
  //
  let tipoEnum: string[] = [];

  let iconeEnum: string[] = [];

  for (let enumV in IconEnum) {
    iconeEnum.push(enumV.toLowerCase());
  }

  for (let enumV in TipoReceita) {
    tipoEnum.push(enumV.toUpperCase());
  }

  const isActive: boolean = props.open;
  const setModal = (isActive: boolean) => {
    props.setOpen(isActive);
  };

  //
  const [inputNomeCategoria, setInputNomeCategoria] = useState<string>("");
  const [selectIndexTipo, setSelectIndexTipo] = useState<IndexPath>(
    new IndexPath(0)
  );
  const [selectIcone, setSelectIcone] = useState<IndexPath>(new IndexPath(0));

  const tiposDisplay = tipoEnum[selectIndexTipo.row];

  const iconesDisplay = iconeEnum[selectIcone.row];

  let iconNames: string[] = Object.values(IconEnum).map(iconName=>iconName);

  const RenderIconSelect = (
    iconName: string,
    props?: IconProps
  ): IconElement => <Icon {...props} name={iconName} />;

  const RenderIconCube = (props: IconProps): IconElement => (
    <Icon {...props} name={"cube"} />
  );

  const renderItemSelect = (title) => <SelectItem title={title} key={title} />;

  const renderIconsSelect = (value: string, iconName: string) => (
    <SelectItem
      title={value.toUpperCase()}
      key={value}
      accessoryLeft={props => <Icon {...props} name={iconName}/>}
    />
    // <SelectItem title={iconName} key={iconName} accessoryLeft={RenderIconCube}/>
  );

  const renderIconSelected = (props: IconProps): IconElement => (
    <Icon {...props} name={iconNames[selectIcone.row]}/>
  )

  const headerModalCardAdd = (props: ViewProps) => (
    <View {...props}>
      <Text category="h5" style={{ textAlign: "center" }}>
        Criar Categoria
      </Text>
    </View>
  );

  //
  const handleAdd = async () => {
    let nome: string = inputNomeCategoria;
    let tipo: string = tiposDisplay;
    let tipoCategoria: "despesa" | "receita";
    let iconeNome: string = iconNames[selectIcone.row]

    if (nome == "") return;

    if (tipo == "DESPESA") tipoCategoria = "despesa";

    if (tipo == "RECEITA") tipoCategoria = "receita";

    if (!tipoCategoria) return;

    let categoria: Categoria = {
      nome: nome,
      tipo: tipoCategoria,
      icone: IconEnum[Object.keys(IconEnum)[selectIcone.row]], // TODO
    };

    await createCategoria(categoria);
    props.update();

    setInputNomeCategoria("");
  };

  return (
    <Modal
      visible={isActive}
      backdropStyle={styles.backdrop}
      onBackdropPress={() => setModal(false)}
      style={{ width: "85%" }}
    >
      <Card header={headerModalCardAdd}>
        <Text style={[styles.label]}>Nome da Categoria</Text>
        <Input
          placeholder="Ex.: Alimentação"
          style={{ marginBottom: 10 }}
          value={inputNomeCategoria}
          onChangeText={setInputNomeCategoria}
        ></Input>

        <Text style={styles.label}>Tipo</Text>
        <Select
          selectedIndex={selectIndexTipo}
          onSelect={(index: IndexPath) => setSelectIndexTipo(index)}
          value={tiposDisplay}
          style={{ marginBottom: 10 }}
        >
          {tipoEnum.map(renderItemSelect)}
        </Select>
        <Text style={styles.label}>Ícone</Text>
        <Select
          selectedIndex={selectIcone}
          accessoryLeft={renderIconSelected}
          onSelect={(i: IndexPath) => setSelectIcone(i)}
          value={iconesDisplay}
          style={{ marginBottom: 10 }}
        >
          {Object.values(IconEnum).map((iconName, index)=> renderIconsSelect(iconName, iconName))}
        </Select>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Button
            status="danger"
            style={{ width: "45%" }}
            onPress={() => {
              setModal(false);
            }}
          >
            Cancelar
          </Button>
          <Button
            status="success"
            style={{ width: "45%" }}
            onPress={async () => {
              await handleAdd();
            }}
          >
            Cadastrar
          </Button>
        </View>
      </Card>
    </Modal>
  );
};
