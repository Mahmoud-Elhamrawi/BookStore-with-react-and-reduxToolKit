import "./App.css";
import BookDetils from "./Components/BookDetails/BookDetils";
import BookList from "./Components/BookList/BookList";
import InsertBook from "./Components/InsertBook/InsertBook";
import Navbar from "./Components/Navbar/Navbar";
import {Routes, Route, Navigate,useNavigate } from "react-router-dom";
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import jwtDecode from "jwt-decode";
import { useState } from 'react';

function App() {
  const[token , setToken] = useState('')
  let navigate = useNavigate();
const getTokenUSer=()=>{
  let DecodeToken =  jwtDecode(localStorage.getItem('tokenUser'));
  setToken(DecodeToken)
  return DecodeToken

}

const logOUT=()=>{
  localStorage.removeItem('tokenUser');
  setToken(null) ;
  navigate('/login')

}



function ProtectedRoute( {children} )
{
  if(!localStorage.getItem('tokenUser'))
  {
    return <Navigate to='/login'/>
  }else{
    return children ;
  }

}
 
  return (
    <>
      <Navbar  token={token}   logOUT={logOUT}/>
      <div className="container">


      <Routes>
        <Route path="/" element={<Login  getTokenUSer={getTokenUSer} />}  />  
        <Route path="login" element={<Login  getTokenUSer={getTokenUSer}/> } />
        <Route
        
          path="BooKs"
          element={
            <>
              <div className="container">
                <div className="row">
                  <div className="col-md-6">
                    <ProtectedRoute>  <BookList />  </ProtectedRoute>
                     
                  </div>
                  <div className="col-md-1"> </div>
                  <div className="col-md-5">
                 <ProtectedRoute>  <BookDetils />   </ProtectedRoute>  
                  </div>
                </div>
              </div>
            </>
          }
        />

        <Route path="admin" element={ <ProtectedRoute><InsertBook /> </ProtectedRoute> }/>
        <Route path="register" element={ <Register />  } />
        <Route path="*" element={ <h2>not found page !!</h2>} />
      </Routes>

      </div>
    </>
  );
}

export default App;
