import type { UserEntity } from "@/types/entities/userEntitiy";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface userDataState {
    data: Omit<UserEntity, 'password'>;
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
    }
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<userDataState['data']>) {
            state.data = action.payload
        },
        removeUser(state) {
            state.data = initialState.data
        }
    }
})

export const { setUser, removeUser } = userSlice.actions;
export default userSlice.reducer;