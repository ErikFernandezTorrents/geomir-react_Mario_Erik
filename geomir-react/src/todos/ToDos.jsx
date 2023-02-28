import React, { useEffect, useReducer } from 'react'
import { ToDo } from "./ToDo";
import { ToDoAdd } from "./ToDoAdd";
import {todoReducer} from "./todoReducer";

const initialState = [];
const init = ()=> {

    return JSON.parse(localStorage.getItem("todos")) || []
    
}

export const ToDos = () => {
    const [todos, dispatchTodos] = useReducer(todoReducer, initialState,init);

    const ToggleTodo = (id) => {
        dispatchTodos({
          type: "Toggle Todo",
          payload: id
        });
      };

    const DelTodo = (id) => {
        dispatchTodos({ 
            type: 'Del Todo', 
            payload: id 
        })
    }

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
                <ToDo key={todo.id} todo={todo} DelTodo={DelTodo} ToggleTodo={ToggleTodo}
                />
                ))}
            </div>
        </tbody>
        </table>
      </>
  )
}
export default ToDos
