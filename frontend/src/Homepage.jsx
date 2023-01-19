import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import CompaniesTable from './CompaniesTable';

function Homepage() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const name = useSelector((state) => state.auth.name);
  const email = useSelector((state) => state.auth.email);
  const navigate = useNavigate();
  useEffect(() => {
    if(!isLoggedIn)
      {
        alert("No access");
        navigate("/")
      }
  }, [isLoggedIn])
  return (
    <div>
      
      <div style = {{display:'flex', flexDirection:"column", justifyContent:'center', alignItems:'center', fontSize:'30px'}}>
         <div> <span style = {{fontWeight:'bold'}}> User:</span> <span>{name}</span></div> 
         <div> <span style = {{fontWeight:'bold'}}>Email:</span> <span>{email}</span></div>
      </div>
      {isLoggedIn ?  <CompaniesTable /> : <></>}
    </div>
  )
}

export default Homepage