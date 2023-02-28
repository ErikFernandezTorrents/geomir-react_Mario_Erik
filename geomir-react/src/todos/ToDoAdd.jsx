import React, { useReducer } from 'react'
import { useForm } from '../hooks/useForm';

export const ToDoAdd = ({handleNewTodo}) => {

    const { formState,handleChange } = useForm({
      todo: "",
    }); 
    
    const {todo} = formState

    const handleSubmit = (e)=> {

      e.preventDefault()

      const newTodo = {

        id: new Date().getTime(),
        done: false,
        desription: todo

      }
      handleNewTodo(newTodo)
    }


  return (
    <>
        <div className='ReviewForm'>
          <form id="formAddReview" className='ReviewForm2'>
            <div className='labelReviewContainer'>
                <label htmlFor="todo">Afeigeix una Tasca</label>
            </div>
            <div className='containerTextarea'>
              <textarea id="description" name="description" placeholder="Escriu la teva tasca aquí.." value = { todo } onChange={handleChange}/>
            </div>
            <button className="addReviewButton"
                  onClick={(e) => { 
                    handleSubmit(e);
                  }}>
                  Desa la Tasca
            </button>
          </form>
        </div>
    </>
  )
}

export default ToDoAdd