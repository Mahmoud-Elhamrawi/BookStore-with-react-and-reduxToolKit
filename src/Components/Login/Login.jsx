import React from 'react';
import {useForm} from 'react-hook-form' ; 
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import axios from 'axios';

export default function Login(props) {



  const {register , handleSubmit ,formState:{errors}} = useForm();
  const[errorApi , setErrorApi] = useState('');
  const[isLoad , setIsLoad] = useState(false);
  let navigate = useNavigate();

const  handleLogin=async(mydata)=>{

  setIsLoad(true)
  let {data} = await axios.post(`https://routeegypt.herokuapp.com/signin`,mydata)
   
   if(data.message ==='success')
   { 
    localStorage.setItem('tokenUser', data.token);
    let dataAfterDecode =  props.getTokenUSer();

    setIsLoad(false);
     navigate('/BooKs')
    
   }else{
    setIsLoad(false);
    setErrorApi(data.message)
    }

}



  return (
    <>
       <h2>Login now</h2>
       {errorApi && errorApi?<p className="alert alert-danger m-auto w-50 text-center"> {errorApi}</p>:''}
      <form onSubmit={handleSubmit(handleLogin)} className="my-3 w-75 mx-auto border p-5 shadow">
  
      <div className="form-group my-2">
          <label htmlFor="email">Email :</label>
          <input {...register('email',{required:true,pattern:/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/})}  type="email" className="form-control my-2" id="email" />
        {
            (errors.email && errors.email.type === 'required' && <p className="alert alert-danger">email is required</p>)
        }
       
       {
        (errors.email && errors.email.type === 'pattern' && <p className="alert alert-danger">
            Matches	: asmith@mactec.com | foo12@foo.edu | bob.smith@foo.tv
            Non-Matches	:  joe | @foo.com | a@a</p>
        )
       }
       
      
        </div>
         

        <div className="form-group">
              <label htmlFor="password">password :</label>
              <input {...register('password',{required:true , min:5 })} name='password' type="password" className="form-control my-2" id="password" />
           
              {
                (errors.password && errors.password.type === 'required' && <p className="alert alert-danger">password is required</p>)
              }
           
           {
                (errors.password && errors.password.type === 'min' && <p className="alert alert-danger">min is 5</p>)
              }
            </div>


            <button  type="submit" className="btn btn-info d-block mx-auto"> {isLoad && isLoad?  <i class="fa-solid fa-spinner fa-spin-pulse fa-spin-reverse"></i>
:'Login'}</button>      </form>
    
    
    
    
    
    
    
    
    </>
  )
}
