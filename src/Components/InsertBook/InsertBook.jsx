import React, {useRef } from 'react'
import { useDispatch , useSelector } from 'react-redux/es/exports';
import { insertBook } from '../../redux/BookSlice';

export default function InsertBook() {

  const dispatch = useDispatch();
  const {isLogIn}= useSelector(state=>state.auth)
 const name = useRef(null);
 const prise = useRef(null);
 const Desc = useRef(null);

    const addBook =(e)=>{
        e.preventDefault();
        console.log('submit');
        const data ={
          name : name.current.value ,
          prise : prise.current.value ,
          Desc : Desc.current.value ,
        }
        name.current.value =null;
        prise.current.value =null;
        Desc.current.value =null;
        dispatch(insertBook(data))
    }
  return (
    <>
    
      <div className="content w-50 mx-auto py-2">
      <h4>Insert Book</h4>
           <form onSubmit={addBook}>

               <div className="form-group">
                <label htmlFor="title">title</label>
                <input ref={name} type="text" className='form-control my-2' id='title'  name='formTitle'/>
               </div>

               <div className="form-group">
                <label htmlFor="price">price</label>
                <input ref={prise} type="number" className='form-control my-2' id='price'  name='formprice'/>
               </div>

               <div className="form-group">
                <label htmlFor="desc">Description </label>
                <textarea ref={Desc} className='form-control my-2' id='desc'  name='formdesc'></textarea>
               </div>

               <button  type='submit' className='btn btn-outline-info my-2'>Submit</button>
 

           </form>
 


      </div>
    </>
  )
}
