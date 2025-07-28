import { Outlet } from "@tanstack/react-router";
import { createRootRoute } from "@tanstack/react-router"
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools"
import { useEffect } from "react";
import { setLanguage } from "@/store/slices/lang/langSlice";
import i18next from "i18next";
import { Provider } from 'react-redux'
import { persistor, store } from '@/store/store'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from "@/components/ui/sonner";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { PersistGate } from "redux-persist/integration/react";

export const Route = createRootRoute({
    component: RootComponent,
})


export default function RootComponent() {

    const queryClient = new QueryClient()


    // setting default language on load
    useEffect(() => {
        let lang = store.getState().lang.lang
        if (!lang) {
            lang = navigator?.language;
            store.dispatch(setLanguage(lang))
            i18next.changeLanguage(lang)
        }
        document.documentElement.setAttribute('lang', lang)
    }, [])

    return (
        <>
            <QueryClientProvider client={queryClient}>
                <Provider store={store}>
                    <PersistGate persistor={persistor} >
                        <Outlet />
                        <TanStackRouterDevtools />
                        <ReactQueryDevtools />
                    </PersistGate>
                </Provider>
            </QueryClientProvider>
            <Toaster position="top-right" />
        </>
    )
}
