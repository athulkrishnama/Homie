import {createSlice, type PayloadAction} from '@reduxjs/toolkit'

export interface langState {
    lang:string | null
}

const initialState:langState = {
    lang:null
}

const langSlice = createSlice({
    name:"lang",
    initialState,
    reducers:{
        setLanguage:(state, action:PayloadAction<string>)=>{
            state.lang = action.payload
        }
    }
})

export const {setLanguage} = langSlice.actions;


export default langSlice.reducer;