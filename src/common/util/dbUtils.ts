import { Conta } from "../../model/conta";
import { TipoReceita } from "../../model/tipoReceita";
import { Transacao } from "../../model/transacao";

export const getTransacoesbyConta = (transacoes: Transacao[], contas: Conta[]): Transacao[][] => {
    let contaList: Conta[] = contas
    let transacaoList: Transacao[] = transacoes

    let contaTransacoes: Transacao[][] = [];

    for (let i: number = 0; i < contaList.length; i++) {
        let contaTransacao: Transacao[] = [];
        let conta: Conta = contaList[i];

        contaTransacao = transacaoList.filter(
            (transacaoList) => transacaoList.contaId == conta.id
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

    return contaTransacoes
}

export const getContaText = (conta: Conta): string => {
    let text: string = conta.id > 0 ? conta.nome + " (" + conta.tipo + ")" : "Adicione uma Conta"

    return text
}