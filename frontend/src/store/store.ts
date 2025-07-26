import { configureStore } from "@reduxjs/toolkit";
import langSlice from './slices/lang/langSlice'
export const store = configureStore({
    reducer:{
        lang:langSlice
    }
})

// type of root state
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;