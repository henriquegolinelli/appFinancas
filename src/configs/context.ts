import { makeObservable, action, observable } from "mobx"
import { createContext, useContext } from "react"

class Mobx {
    count: number = 0

    constructor() {
        makeObservable(this, {
            count: observable,
            increment: action.bound,
            decrement: action.bound
        })
    }

    increment() {
        this.count += 1
    }

    decrement() {
        this.count -= 1
    }
}

const mobx = new Mobx()

export const MobxContext = createContext(mobx)
export const useMobxContext = () => useContext(MobxContext)