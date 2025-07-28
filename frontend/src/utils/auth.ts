import { store } from "@/store/store"

export const isAuthenticated = (): boolean => {
    return store.getState().token.token === null
}