import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import  BookSlice  from './BookSlice';

const store = configureStore({
  
 reducer :{
          Books : BookSlice,
          auth  : authSlice,
 } 


})

export default store;