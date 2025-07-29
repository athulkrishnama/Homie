import { store } from "@/store/store"

export const isAuthenticated = (): boolean => {
    return store.getState().user.isLogin && store.getState().user.data.isAdmin === false;
}

export const isAdmin = (): boolean => {
    return store.getState().user.isLogin && store.getState().user.data.isAdmin === true;
}