import { configureStore } from "@reduxjs/toolkit";
import langSlice from './slices/lang/langSlice';
import userTokenSlice from './slices/user/userTokenSlice';


export const store = configureStore({
    reducer: {
        lang: langSlice,
        userToken: userTokenSlice
    }
})

// type of root state
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;