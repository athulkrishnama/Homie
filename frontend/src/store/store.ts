import { combineReducers, configureStore } from "@reduxjs/toolkit";
import langSlice from './slices/lang/langSlice';
import tokenSlice from './slices/user/tokenSlice';
import userSlice from './slices/user/userDataSlice';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig= {
    key: 'root',
    storage,
    whitelist:['lang', 'user']    
}

const rootReducer = combineReducers({
    lang: langSlice,
    token: tokenSlice,
    user: userSlice
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer
})

export const persistor = persistStore(store)

// type of root state
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;