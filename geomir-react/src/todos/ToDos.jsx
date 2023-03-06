import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { ToDo } from "./ToDo";
import { ToDoAdd } from "./ToDoAdd";

export const ToDos = () => {
    //const [todos, dispatchTodos] = useReducer(todoReducer, initialState,init);
    const { todos } = useSelector(state => state.todos)

    useEffect ( ()=>{
      localStorage.setItem('todos',JSON.stringify(todos))
      },[todos])

  return (
      <>
        <h1>Llistat de Tascas</h1>
        <ToDoAdd/>
        <table id='tablePlaceList'>
          <tbody>
            <tr id='tr1PlaceList'>
              <th>Id</th>
              <th>Descripción</th>
            </tr>
            <div>  
                {todos.map((todo) => (
                <tr><ToDo key={todo.id} todo={todo}/></tr>
              
                ))}
            </div>
          </tbody>
        </table>
      </>
  )
}
export default ToDos
