import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { ToDo } from "./ToDo";
import { ToDoAdd } from "./ToDoAdd";
import { db } from "../firebase";
import {

  doc,

  getDocs,

  deleteDoc,

  addDoc,

} from "firebase/firestore";

export const ToDos = () => {
  //const [todos, dispatchTodos] = useReducer(todoReducer, initialState,init);

  const { todos } = useSelector(state => state.todos)

  const todosCollectionRef = collection(db, "todos")

  const synchronize = async () => {

    // Obtenim tots els todos per adesprés esobrrar-los

    const dades = await getDocs(todosCollectionRef);

    // Esborrem tots els todos

    // aquest sistema no es recomana en entorn web,

    // però no hi ha un altra opció

    dades.docs.map((v) => {

      deleteDoc(doc(db, "todos", v.id));

    });

    // Afegim tots els todos de nou

    todos.map((p) => {

      addDoc(todosCollectionRef, {
        id: p.id,

        description: p.description,

        done: p.done,
      });

    });

  };

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  return (
    <>
      <h1>Llistat de Tascas</h1>
      <ToDoAdd />
      <table id='tablePlaceList'>
        <tbody>
          <tr id='tr1PlaceList'>
            <th>Id</th>
            <th>Descripción</th>
          </tr>
          <div>
            {todos.map((todo) => (
              <tr><ToDo key={todo.id} todo={todo} /></tr>

            ))}
          </div>
        </tbody>
      </table>
    </>
  )
}
export default ToDos
