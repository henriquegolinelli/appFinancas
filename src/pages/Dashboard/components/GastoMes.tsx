import { Card, Divider, Icon, IconElement, IconProps, List, ListItem, Text } from "@ui-kitten/components"
import { View, ViewProps } from "react-native"
import { StyleSheet } from "react-native"
import { useSelector } from "react-redux"
import { storeStateType } from "../../../redux"
import { Transacao } from "../../../model/transacao"
import { TipoReceita } from "../../../model/tipoReceita"
import { isAtualMes } from "../../../common/util/dateUtils"
import { Categoria } from "../../../model/categoria"
import { IconEnum } from "../../../model/iconEnum"

interface CardItemGastoDoMesProps {
    categoria: number
    valor: number
}

export const GastoMes = () => {
    //
    const stock = useSelector((state: storeStateType) => state.stock)

    //
    const transacoes: Transacao[] = stock.transacoes

    //
    let gastos: Transacao[] = [];

    for (let i: number = 0; i < transacoes.length; i++) {
        let transacao = transacoes[i]

        if (transacao.tipo == TipoReceita.receita) continue

        let date: string[] = transacao.data.split("/")

        if (!isAtualMes(date[1])) continue

        gastos.push(transacao)
    }

    //
    let cardItemGastoDoMesProps: CardItemGastoDoMesProps[] = []

    for (let i: number = 0; i < gastos.length; i++) {
        let id = gastos[i].categoriaId
        let valor = gastos[i].valor

        let result = cardItemGastoDoMesProps.find(value => value.categoria == id)

        if (result == null) {
            cardItemGastoDoMesProps.push({ categoria: id, valor: valor })

            continue
        }

        let index = cardItemGastoDoMesProps.indexOf(result)

        result.valor += valor

        cardItemGastoDoMesProps[index] = result
    }

    // header Gastos do mes
    const headerGastosDoMes = (props: ViewProps) => (
        <View {...props}>
            <Text category='h5' style={{ textAlign: 'center' }}>Gastos do Mês</Text>
        </View>
    )

    //
    const IconGood = ({props, category}:{props?:IconProps; category:IconEnum | 'swap-outline'}): IconElement => (
        <Icon {...props} name={category} fill="black" style={{ width: 30, height: 30 }}></Icon>
    )

    const renderItem = ({ item, index }: { item: CardItemGastoDoMesProps; index: number }) => {
        let categoria: Categoria = stock.categorias.find(value => value.id == item.categoria) ?? { nome: "", tipo: "", icone: IconEnum.HIGIENE }

        return <>
            <ListItem>
                <View style={styles.container}>
                    <View style={styles.flexRowView}>
                        <IconGood category={categoria.icone}></IconGood>
                        <Text style={{ marginLeft: 20 }}>{categoria.nome}</Text>
                        <Text style={{ marginLeft: 'auto' }} status='danger'>R$ {item.valor.toFixed(2)}</Text>
                    </View>
                </View>
            </ListItem>
            <Divider></Divider>
        </>

    }

    return <Card header={headerGastosDoMes} style={styles.cardContainer}>
        <View>
            <List
                data={cardItemGastoDoMesProps}
                renderItem={renderItem}
                scrollEnabled={false}
            />
        </View>
    </Card>
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },

    flexRowView: {
        flexDirection: 'row',
        alignItems: 'center'
    },

    iconLeft: {
        width: 35,
        height: 35,
        tintColor: 'black'
    },
    cardContainer: {
        width: '100%',
        borderRadius: 10,
        elevation: 10,
        // marginBottom: 50
    },
})