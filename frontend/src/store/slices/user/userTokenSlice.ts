import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

export interface userTokenState {
    token: string | null
}

const initialState: userTokenState = {
    token: null
}

const userTokenSlice = createSlice({
    name: "userToken",
    initialState,
    reducers: {
        setToken: (state, action: PayloadAction<string>) => {
            state.token = action.payload;
        },
        deleteToken: (state) => {
            state.token = null;
        }
    }
})

export const { deleteToken, setToken } = userTokenSlice.actions;

export default userTokenSlice.reducer;