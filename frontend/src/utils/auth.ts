import { store } from "@/store/store"

export const isAuthenticated = (): boolean => {
    return store.getState().user.data !== null && store.getState().user.data.isAdmin === false;
}