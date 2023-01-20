import React, { useState } from 'react'
import { LoginRegister } from './auth/LoginRegister'
import { UserContext } from "./userContext";
const App = () => {
  let [authToken, setAuthToken] = useState("");
  return (
    <>
      <UserContext.Provider value={{ authToken, setAuthToken }}  >
        {authToken ? (
            <>
              <div></div>
            </>
          ) : (
            <LoginRegister />
          )}
      </UserContext.Provider>
    </>
  );
  
}

export default App

