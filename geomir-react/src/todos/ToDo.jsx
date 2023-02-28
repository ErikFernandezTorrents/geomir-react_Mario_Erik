import React from 'react'

export const ToDo = (todo,DelTodo,ToggleTodo) => {



  return (
    <>
        <table>
        <td>{todo.id}</td>
        <td>{todo.description}</td>
            <button className='deleteButton'
                onClick={(e) => {
                DelTodo(todo.id); 
                }}><i className="bi bi-trash3"></i>
            </button>
        </table>
    </>
  )
}
