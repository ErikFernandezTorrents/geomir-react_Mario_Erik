import React from 'react'

export const ToDo = (todo,DelTodo,ToggleTodo) => {



  return (
    <>
        <table>
        <td>{todo.id}</td>
        <td>{todo.description}</td>
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
        </table>
    </>
  )
}
