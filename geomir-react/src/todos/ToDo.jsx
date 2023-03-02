import React from 'react'
import '../App.css'
export const ToDo = ({todo,DelTodo,ToggleTodo}) => {


  console.log(todo)

  return (
    <>
      {todo.done?
        <div id="divTodoDoneTrue">
          <td>{todo.id}</td>
          <td>{todo.description}</td>
        </div>
        :
          <>
            <td>{todo.id}</td>
            <td>{todo.description}</td>
          </>
        }
      <button 
          onClick={(e) => {
            e.preventDefault();
            ToggleTodo(todo.id); 
          }}>
            FET
      </button>
      <button 
          onClick={(e) => {
            e.preventDefault();
            ToggleTodo(todo.id); 
          }}>
            NO FET
      </button>
      <button className='deleteButton'
          onClick={(e) => {
            e.preventDefault();
            DelTodo(todo.id); 
          }}><i className="bi bi-trash3"></i>
      </button>
    </>
  )
}
