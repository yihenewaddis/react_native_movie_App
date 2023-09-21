import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    access: null,
    refresh: null,
    isAuthenticated: false,
    user: null,
    DarkTheme:true,
    language:"en",
    type:null
};
export const userSlice = createSlice({
    name: "counter",
    initialState,
    reducers: {
    Login_ok: (state) => {
        state.isAuthenticated=true
    },
    Load_user: (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
    },
    Logout: (state) => {
        state.isAuthenticated = false;
    },
    refresh_token: (state, action) => {
        state.access = action.payload;
    },
    changeTheme: (state) => {
        state.DarkTheme = !state.DarkTheme ;
    },
    setLanguage: (state,action) => {
        state.language = action.payload;
    },
    setType:(state,action)=>{
        state.type=action.payload
    }
    },
});

export const { Login_ok, Logout, Load_user,refresh_token,changeTheme,setLanguage,setType } =userSlice.actions;

export default userSlice.reducer;
