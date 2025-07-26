import { Outlet } from "@tanstack/react-router";
import { createRootRoute } from "@tanstack/react-router"
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools"
import { useEffect } from "react";
import { setLanguage } from "@/store/slices/lang/langSlice";
import i18next from "i18next";
import {Provider} from 'react-redux'
import {store} from '@/store/store'

export const Route = createRootRoute({
    component: RootComponent
})


export default function RootComponent() {

    // setting default language on load
    useEffect(() => {
        const lang = navigator?.language;
        store.dispatch(setLanguage(lang))
        i18next.changeLanguage(lang)
    }, [])

    return (
        <>
            <Provider store={store}>
                <Outlet />
                <TanStackRouterDevtools />
            </Provider>
        </>
    )
}
