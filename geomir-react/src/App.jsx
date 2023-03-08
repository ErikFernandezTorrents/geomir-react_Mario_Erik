import './App.css'
import React, { useEffect, useState } from 'react';
import { LoginRegister } from './auth/LoginRegister';
import { UserContext } from "./userContext";
import { Header } from './layout/Header';
import { About } from './About'
import { Routes, Route } from "react-router-dom";
import { NotFound } from './NotFound';
import { Place } from './places/Place';
import { Post } from './posts/Post';

import { PostEdit } from './posts/PostEdit';
import { PostAdd } from './posts/PostAdd';
import { PostsGrid } from './posts/PostsGrid';
import { PostsList } from './posts/PostsList';
import { PostsMenu } from './posts/PostsMenu';

import { PlaceEdit } from './places/PlaceEdit';
import { PlaceAdd } from './places/PlaceAdd';
import { PlacesGrid } from './places/PlacesGrid';
import { PlacesList } from './places/PlacesList';
import { PlacesMenu } from './places/PlacesMenu';
import { ToDos } from './todos/ToDos';
import './styles.css'
import PlaceMarks from './places/PlaceMarks';
import { db } from "./firebase";
import {

  collection,

  getDocs,

} from "firebase/firestore";

const App = () => {
  let [authToken, setAuthToken] = useState("");
  let [usuari, setUsuari] = useState("");
  const todosCollectionRef = collection(db, "todos")
  const getTodos = async () => {

    const dades = await getDocs(todosCollectionRef);

    const desar = [];

    dades.docs.map((v) => {

      desar.push(v.data());

    });
    console.log(desar)

    localStorage.setItem("todos",JSON.stringify(desar))

  };

  useEffect(() => {

    getTodos();
    
    }, [authToken]);
  return (
    <>
      <UserContext.Provider value={{ usuari, setUsuari, authToken, setAuthToken }}  >
        {authToken ? (
          <>
            <Header />
            <div className='divPrincipal'>
              <Routes>
                <Route path='/about' element={<About />} />
                <Route path='/notfound' element={<NotFound />} />
                <Route path="/posts/list" element={<><PostsMenu /><PostsList /> </>} />
                <Route path="/posts/add" element={<><PostsMenu /><PostAdd /></>} />
                <Route path="/posts/edit/:id" element={<><PostsMenu /><PostEdit /></>} />
                <Route path="/posts/grid" element={<><PostsMenu /><PostsGrid /></>} />
                <Route path="/posts/:id" element={<><PostsMenu /><Post /></>} />
                <Route path='/posts' element={<Post />} />

                <Route path='/about' element={<About />} />
                <Route path='/notfound' element={<NotFound />} />
                <Route path="/places/list" element={<><PlacesMenu /><PlacesList /> </>} />
                <Route path="/places/add" element={<><PlacesMenu /><PlaceAdd /></>} />
                <Route path="/places/edit/:id" element={<><PlacesMenu /><PlaceEdit /></>} />
                <Route path="/places/grid" element={<><PlacesMenu /><PlacesGrid /></>} />
                <Route path="/places/:id" element={<><PlacesMenu /><Place /></>} />
                <Route path='/todos' element={<ToDos />} />
                <Route path='/places/marks' element={<PlaceMarks />} />
              </Routes>
            </div>
          </>
        ) : (
          <LoginRegister />
        )}
      </UserContext.Provider>
    </>
  );

}

export default App