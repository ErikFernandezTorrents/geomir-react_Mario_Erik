import './App.css'
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
import { PlaceEdit } from './places/PlaceEdit';
import { PlaceAdd } from './places/PlaceAdd';
import { PlacesGrid } from './places/PlacesGrid';
import { PlacesList } from './places/PlacesList';
import { PlacesMenu } from './places/PlacesMenu';

const App = () => {
  let [authToken, setAuthToken] = useState("");
  let [usuari, setUsuari] = useState("");
  return (
    <>
      <UserContext.Provider value={{  usuari, setUsuari,authToken, setAuthToken }}  >
        {authToken ? (
            <>
              <Header/>
              <Routes>
                <Route path='/about'element={<About/>}/>
                <Route path='/notfound'element={<NotFound/>}/>
                <Route path="/places/list" element={ <><PlacesMenu/><PlacesList/> </> } />
                <Route path="/places/add" element={ <><PlacesMenu/><PlaceAdd/></> } /> 
                <Route path="/places/edit/:id" element={ <><PlacesMenu/><PlaceEdit/></> } /> 
                <Route path="/places/grid" element={ <><PlacesMenu/><PlacesGrid/></> } /> 
                <Route path="/places/:id" element={ <><PlacesMenu/><Place/></> } />
                <Route path='/posts'element={<Post/>}/>
              </Routes>
            </>
          ) : (
            <LoginRegister />
          )}
      </UserContext.Provider>
    </>
  );
  
}

export default App

