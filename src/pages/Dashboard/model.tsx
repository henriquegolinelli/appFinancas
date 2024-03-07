import { Conta } from "../../model/conta"

export interface PropsModal {
    setModal: (boolean) => void
    isModal: boolean
    update: () => void
}