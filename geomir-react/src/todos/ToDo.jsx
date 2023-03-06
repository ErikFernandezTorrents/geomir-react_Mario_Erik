import React from 'react'
import '../App.css'
import { useDispatch } from 'react-redux';
import { deltodo, toggletodo } from "../slices/todosSlice";

export const ToDo = ({todo}) => {

  const dispatch = useDispatch();
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
      {!todo.done?
      <button 
          onClick={(e) => {
            e.preventDefault();
            dispatch(toggletodo(todo.id)); 
          }}>
            FET
      </button>
      :
      <button 
          onClick={(e) => {
            e.preventDefault();
            dispatch(toggletodo(todo.id)); 
          }}>
            NO FET
      </button>
        }
      <button className='deleteButton'
          onClick={(e) => {
            e.preventDefault();
            dispatch(deltodo(todo.id)); 
          }}><i className="bi bi-trash3"></i>
      </button>
    </>
  )
}
