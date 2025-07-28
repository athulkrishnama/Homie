import { configureStore } from "@reduxjs/toolkit";
import langSlice from './slices/lang/langSlice';
import tokenSlice from './slices/user/tokenSlice';
import userSlice from './slices/user/userDataSlice';


export const store = configureStore({
    reducer: {
        lang: langSlice,
        token: tokenSlice,
        user: userSlice
    }
})

// type of root state
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;