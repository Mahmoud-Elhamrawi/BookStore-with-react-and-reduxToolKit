import { createSlice } from '@reduxjs/toolkit';
const authSlice= createSlice({
  name:'auth',
  initialState:{
     user:null,
     isLogIn :false,
  },
  reducers:{
    logInOut:(state)=>{
        state.isLogIn =!state.isLogIn;
    },
    
  }


})



export default authSlice.reducer;
export const {logInOut} = authSlice.actions;

