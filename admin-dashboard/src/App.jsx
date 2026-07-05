import React from 'react';
import Login from './login/Login.jsx';
import { BrowserRouter, Route ,Routes } from 'react-router';

function App() {


  return (
    <> 
    <BrowserRouter>
    <Routes>
       <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
    </Routes>
     
    </BrowserRouter>
    </>
  );
}

export default App;
