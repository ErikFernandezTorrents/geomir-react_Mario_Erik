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

    const handleNewToDo = (newTodo) => {
      console.log({ newTodo });
  
      const action = {
        type: "Add Todo",
        payload: newTodo
      };
      dispatchTodos(action);
    };

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
        <ToDoAdd handleNewToDo={handleNewToDo}/>
        <table id='tablePlaceList'>
          <tbody>
            <tr id='tr1PlaceList'>
              <th>Id</th>
              <th>Descripción</th>
            </tr>
            <div>  
                {todos.map((todo) => (
                <tr><ToDo key={todo.id} todo={todo} DelTodo={DelTodo} ToggleTodo={ToggleTodo}/></tr>
              
                ))}
            </div>
          </tbody>
        </table>
      </>
  )
}
export default ToDos
