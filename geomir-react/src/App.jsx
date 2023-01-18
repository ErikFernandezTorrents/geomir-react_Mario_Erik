import React from 'react'
import { useState } from "react";
import { Login } from './auth/Login'
import { Register } from './auth/Register'

const App = () => {
  let [login, setLogin] = useState(true);
  return (
    <>
      <div className="App">
        {login ? <Login setCanvi={setLogin} /> : <Register setCanvi={setLogin} />}
      </div>
    </>
  );
  
}

export default App

