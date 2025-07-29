import type { UserEntity } from "@/types/entities/userEntitiy";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface userDataState {
    data: Omit<UserEntity, 'password'>
    isLogin: boolean
}

const initialState: userDataState = {
    data: {
        email: '',
        fullname: '',
        phone: '',
        profileImage: '',
        hostStatus: "disabled",
        isAdmin: false,
        isBlocked: false,
    },
    isLogin: false
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<userDataState['data']>) {
            state.data = action.payload;
            state.isLogin = true;
        },
        removeUser(state) {
            state.data = initialState.data;
            state.isLogin = false;
        }
    }
})

export const { setUser, removeUser } = userSlice.actions;
export default userSlice.reducer;