import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user:null,
  isAuthenticated:false
};


const authSlice = createSlice({
  name:"authslice",
  initialState,
  reducers:{
    userLoggedIn:(state,acton) => {
      state.user = acton.payload.user;
      state.isAuthenticated = true;
    },
    userLoggedOut:(state) => {
      state.user = null;
      state.isAuthenticated = false;
    }
  },
});

export const {userLoggedIn,userLoggedOut} = authSlice.actions;
export default authSlice.reducer;