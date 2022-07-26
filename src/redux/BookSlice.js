

import { createSlice , createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export  const getBooks = createAsyncThunk("Books/getBooks",async(_,thunkAPI)=>{
  const {rejectWithValue} = thunkAPI;
  try{

    let {data} =await axios.get('http://localhost:3009/Books')
    return data ;  
    }
  catch(error)
  {
    return rejectWithValue(error.message);  
  }
   
})

export const insertBook =createAsyncThunk("Books/inserBooks",async(dataBook ,thunkAPI )=>{
        const  {rejectWithValue,getState} = thunkAPI;
        try{
          dataBook.userName =getState().auth.user
          let res = await fetch('http://localhost:3009/Books',{
                        method:'POST',
                        body:JSON.stringify(dataBook),
                        headers:{'content-type':'application/json;charset=UTF-8'} })
          const data = await res.json();
          return data;
        


         }catch(error){
              return rejectWithValue(error.message);
        }
 }

)

export const DeleteBook = createAsyncThunk("Books/deleteBooks",async(id ,thunkAPI )=>{
  const  {rejectWithValue} = thunkAPI;
  try{
    await fetch(`http://localhost:3009/Books/${id}`,{
                  method:'DELETE',
                  headers:{'content-type':'application/json;charset=UTF-8'},
                 })

    return id;
   }catch(error){
        return rejectWithValue(error.message);
  }
}

)




  const BookSlice = createSlice({
 name:'Books',
 initialState: {
    Books:[] , 
    isload :false,
    error:false,
    BookSelected:null,
 },
 reducers :{
   selectBook:(state,action) => {
    state.BookSelected = action.payload ;
   }
  


 },
 extraReducers:{
   [getBooks.pending]:(state , action)=>{ 
     state.isload = true
     state.error=false
   },
   [getBooks.fulfilled]:(state , action)=>{
      console.log(action.payload);
       state.Books = action.payload;
       state.isload = false
   },
   [getBooks.rejected]:(state , action)=>{ 
      state.isload =false
      state.error=action.payload
    },

    //insertBook
    [insertBook.pending]:(state,action)=>{
      state.isload = true
      state.error=false
    },
    [insertBook.fulfilled]:(state,action)=>{
      console.log(action.payload);
      state.Books.push(action.payload);
      state.isload = false
    },
    [insertBook.rejected]:(state,action)=>{
      state.isload =false
      state.error=action.payload
    },
    //delete 
    [DeleteBook.pending]:(state)=>{
      state.isload = true
      state.error=false
    },
    [DeleteBook.fulfilled]:(state,action)=>{
      console.log(action.payload);
      state.Books = state.Books.filter((ele)=> ele.id !== action.payload);
      state.isload = false
    },
    [DeleteBook.rejected]:(state,action)=>{
      state.isload =false
      state.error=action.payload
    },
 }
})

export default BookSlice.reducer; 
 export const {selectBook} = BookSlice.actions



