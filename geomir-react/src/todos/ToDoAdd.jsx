import React, { useReducer } from 'react'
import todoReducer from './todoReducer';
import { useForm } from '../hooks/useForm';

const initialState = [];
const init = ()=> {

    return JSON.parse(localStorage.getItem("todos")) || []
    
}

export const ToDoAdd = () => {
    const [todos, dispatchTodos] = useReducer(todoReducer, initialState,init);

    const NewTodo = (todos) =>{
        dispatchTodos({
            type: 'Add Todo',
            payload: todos
        })
    }

  return (
    <>
        <div className='ReviewForm'>
          <form id="formAddReview" className='ReviewForm2'>
            <div className='labelReviewContainer'>
                <label htmlFor="todo">Afeigeix una Tasca</label>
            </div>
            <div className='containerTextarea'>
              <textarea id="description" name="description" placeholder="Escriu la teva tasca aquí.." value = { todos } />
            </div>
            <button className="addReviewButton"
                  onClick={(e) => {
                    e.preventDefault();
                    NewTodo(todos)
                  }}>
                  Desa la Tasca
            </button>
          </form>
        </div>
    </>
  )
}

export default ToDoAdd