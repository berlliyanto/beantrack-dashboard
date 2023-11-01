import { createSlice } from "@reduxjs/toolkit";

type ActionType = {
    payload: any,
    type: string,
}

const authSlice = createSlice({
    name: 'auth',
    initialState: localStorage.getItem('token') || "",
    reducers: {
        saveTokenAfterLoginSuccess: (state: string, action: ActionType) => {
            localStorage.setItem('token', action.payload);
            state = action.payload;
            const newState = state;
            return newState;
        },

        clearTokenAfterLogout: (state: string) => {
            localStorage.removeItem('token');
            state = "";
            const newState = state;
            return newState;
        }
    }
});

export const { saveTokenAfterLoginSuccess, clearTokenAfterLogout } = authSlice.actions;
export default authSlice.reducer;