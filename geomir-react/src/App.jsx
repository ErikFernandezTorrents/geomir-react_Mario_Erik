import React, { useState } from 'react';
import { LoginRegister } from './auth/LoginRegister';
import { UserContext } from "./userContext";
import {About} from './About'

const App = () => {
  let [authToken, setAuthToken] = useState("");
  return (
    <>
      <UserContext.Provider value={{ authToken, setAuthToken }}  >
        {authToken ? (
            <>
              <About/>
              <Header/>
              <Footer/>
            </>
          ) : (
            <LoginRegister />
          )}
      </UserContext.Provider>
    </>
  );
  
}

export default App

