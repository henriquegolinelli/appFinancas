
export interface ModalDeleteProps {
    open: boolean
    setOpen: (bool)=>void

    modalTitle: string
    idRemover: number
    nomeRemover?: string

    operacao: number
    update: () => void
    after?: () => void
}