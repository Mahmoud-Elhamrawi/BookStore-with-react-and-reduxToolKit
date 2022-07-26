import axios from "axios";
import React, { useState } from "react";
import {useForm} from 'react-hook-form' ; 
import { useNavigate } from "react-router-dom";


export default function Register() {
    const {register , handleSubmit ,formState:{errors}} = useForm();
    const[errorApi , setErrorApi] = useState('');
    const[isLoad , setIsLoad] = useState(false);
    let navigate = useNavigate();

    const  sendData =async (mydata) => {
        console.log(mydata);
        setIsLoad(true)
        let {data} =await axios.post(`https://routeegypt.herokuapp.com/signup`,mydata);
        
          if(data.message === 'success')
             {
                setIsLoad(false);
                navigate('/login')
                console.log(data.message);

             }  else{
                setIsLoad(false)
                console.log(data.message);
               setErrorApi(data.message)

             }     








    }
  return (
    <>
        
    {errorApi && errorApi?<p className="alert alert-danger m-auto w-50 text-center"> {errorApi.split(':')[2]}</p>:''}
      <h2>Registeration now</h2>

      <form onSubmit={handleSubmit(sendData)} className="my-3 w-75 mx-auto border p-5 shadow">
        <div className="row">
            <div className="col-md-5">
            <div className="form-group my-2">
          <label htmlFor="fname">Frist Name :</label>
          <input {...register('first_name',{required:true , minLength:3})} type="text" name='first_name' className="form-control my-2" id="fname" />
       {
       (errors.first_name && errors.first_name.type === 'required'&&<p className="alert alert-danger">require</p>)
       }  

       {
       (errors.first_name && errors.first_name.type === 'minLength'&&<p className="alert alert-danger">minLength is 3</p>)
       } 
      </div>

            </div>
            <div className="col-md-1"></div>
            <div className="col-md-5">
            <div className="form-group my-2">
          <label htmlFor="lname">last Name :</label>
          <input  {...register('last_name',{required:true , minLength:3})} name='last_name'  type="text" className="form-control my-2" id="lname" />
          {
            (errors.last_name && errors.last_name.type === 'required'&&<p className="alert alert-danger">require</p>)
          }  

            {
                (errors.last_name && errors.last_name.type === 'minLength'&&<p className="alert alert-danger">minLength is 3</p>)
            } 
    
        </div>

            </div>
        </div>
     


<div className="row my-2 d-flex align-items-center">
    <div className="col-md-5">
    <div className="form-group">
          <label htmlFor="Age">Age :</label>
          <input {...register('age',{required:true , min:10 })} type="number" className="form-control my-2" id="Age" />
          {
            (errors.age && errors.age.type === 'required'&&<p className="alert alert-danger">require</p>)
          }  

            {
                (errors.age && errors.age.type === 'min'&&<p className="alert alert-danger">min is 10</p>)
            } 
      
      
        </div>
    </div>
    <div className="col-md-1"></div>
    <div className="col-md-5 border p-2">
       <div className="form-check">
  <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1"/>
  <label className="form-check-label" for="flexRadioDefault1">
    female
  </label>
        </div>
        <div className="form-check">
        <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2"/>
        <label className="form-check-label" for="flexRadioDefault2">
            male
        </label>
        </div>
    </div>
</div>


     

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
        <div className="row my-2">
          <div className="col-md-5">
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
          </div>
          <div className="col-md-1"></div>
          <div className="col-md-5">
            <div className="form-group">
              <label htmlFor="cpassword">Confrim password :</label>
              <input type="password" className="form-control my-2" id="cpassword" />
           
            </div>
          </div>
        </div>

        <button  type="submit" className="btn btn-info d-block mx-auto"> {isLoad && isLoad?  <i class="fa-solid fa-spinner fa-spin-pulse fa-spin-reverse"></i>
:'Register'}</button>
      </form>
    </>
  );
}
