import React from 'react';
import { useSelector , useDispatch} from 'react-redux/es/exports';
import {logInOut} from '../../redux/authSlice';
import {Link } from "react-router-dom";


export default function Navbar(props) {
  const dispatch = useDispatch();
  const {isLogIn} = useSelector((state)=>state.auth);

  return (
    <>
<nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-5">
  <div className="container">
    <Link to='/'  className="navbar-brand" >Book Store</Link>
    
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">

      <ul className="navbar-nav me-auto mb-2 mb-lg-0">


        {(props.token && props.token.email==='mahmoudelhamrawi2030@gmail.com') ?
        <>
       
        <li class="nav-item">
           <Link to="/BooKs" className="nav-link active" aria-current="page" > BooKs</Link>
        </li>

        <li className="nav-item">
          <Link to="/admin" className="nav-link">Admin</Link>
       </li> 
       
       </>
        :
   <>
      <li class="nav-item">
           <Link to="/BooKs" className="nav-link active" aria-current="page" > BooKs</Link>
        </li>
   </>
        }
        
      </ul>



      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        {
          props.token ?
          <>
          <li className="nav-item">
             <span className="nav-link" onClick={()=>{props.logOUT()}}>LOG OUT</span>
          </li>
          </>
          :
          <>
              <li className="nav-item">
             <Link to="/login" className="nav-link">Login</Link>
          </li>

          <li className="nav-item">
             <Link to="/register" className="nav-link">Register</Link>
          </li>

          
          </>
        }
      
    </ul>
   
    </div>
  </div>
</nav>







    
    
    </>
  )
}
