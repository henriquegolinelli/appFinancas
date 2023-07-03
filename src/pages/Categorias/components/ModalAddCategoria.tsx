import {Modal, Card, Input, Text, Select, SelectItem, Button, IndexPath} from '@ui-kitten/components'

import { Styles as styles } from '../../../common/style/stylesheet';
import { useState } from 'react';
import { ViewProps, View } from 'react-native';
import { ModalProps } from '../model';
import { TipoReceita } from '../../../model/tipoReceita';
import { createCategoria } from '../../../configs/database';
import { Cores } from '../../../model/cores';

export const ModalAddCategoria = (props:ModalProps) => {
    //
    let tipoEnum: string[] = []

    for (let enumV in TipoReceita) {
      tipoEnum.push(enumV.toUpperCase())
    }

    const isActive: boolean = props.open
    const setModal = (isActive: boolean) => {
        props.setOpen(isActive)
    }

    //
    const [inputNomeCategoria, setInputNomeCategoria] = useState<string>('')
    const [selectIndexTipo, setSelectIndexTipo] = useState<IndexPath>(new IndexPath(0))

    const tiposDisplay = tipoEnum[selectIndexTipo.row]

    
    const renderItemSelect = (title) => (
        <SelectItem title={title} key={title}/>
    )

    const headerModalCardAdd = (props:ViewProps) => (
        <View {...props}>
            <Text category="h5" style={{textAlign: 'center'}}>Criar Categoria</Text>
        </View>
    )

  //
  const handleAdd = async () => {
    let nome: string = inputNomeCategoria
    let tipo: string = tiposDisplay
    let cor: Cores = Cores.preto

    if (nome == "") return

    if (tipo == "DESPESA") cor = Cores.vermelho

    if (tipo == "RECEITA") cor = Cores.verde

    if (cor == Cores.preto) return

    let categoria: Categoria = {
      nome: nome,
      cor: cor
    }

    await createCategoria(categoria)
    props.update()

    setInputNomeCategoria("")
  }
    
  return <Modal
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
          <Button status="success" style={{ width: "45%" }} onPress={async () => {await handleAdd()}}>
            Cadastrar
          </Button>
        </View>
      </Card>
    </Modal>
};
