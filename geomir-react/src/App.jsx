import React, { useState } from 'react';
import { LoginRegister } from './auth/LoginRegister';
import { UserContext } from "./userContext";
import { Header } from './layout/Header';
import { Footer } from './layout/Footer';
import {About} from './About'
import { Routes, Route } from "react-router-dom";
import { NotFound } from './NotFound';
import { Place } from './places/Place';
import { Post } from './posts/Post';

const App = () => {
  let [authToken, setAuthToken] = useState("");
  return (
    <>
      <UserContext.Provider value={{ authToken, setAuthToken }}  >
        {authToken ? (
            <>
              <Header/>
              <Routes>
                <Route path='/about'element={<About/>}/>
                <Route path='*'element={<NotFound/>}/>
                <Route path='/places'element={<Place/>}/>
                <Route path='/posts'element={<Post/>}/>
              </Routes>
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

