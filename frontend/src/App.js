import React, { useEffect, useState } from 'react'
import LoginRegister from './LoginRegister'
import { BrowserRouter, Route, Routes, useNavigate} from 'react-router-dom';
import Homepage from './Homepage';
import './App.css';
import { useSelector } from 'react-redux';

function App() {

  return (
    <BrowserRouter>
        <Routes>
          <Route exact path="/"  element = {<LoginRegister />}/>
          <Route path = "/homepage" element = { <Homepage />}/>      
      </Routes>
      </BrowserRouter>
  )
}

export default App