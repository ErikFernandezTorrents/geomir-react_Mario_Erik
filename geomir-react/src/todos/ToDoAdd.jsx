import React, { useReducer } from 'react'
import { useForm } from '../hooks/useForm';
import { useDispatch } from 'react-redux';
import { addtodo } from '../slices/todosSlice';

export const ToDoAdd = () => {

    const dispatch = useDispatch();
    const { formState,handleChange } = useForm({
      todo: "",
    }); 
    
    const {todo} = formState

    const handleSubmit = (e)=> {

      e.preventDefault()

      const newTodo = {

        id: new Date().getTime(),
        done: false,
        description: todo

      }

      dispatch(addtodo(newTodo))
    }


  return (
    <>
        <div className='ReviewForm'>
          <form id="formAddReview" className='ReviewForm2'>
            <div className='labelReviewContainer'>
                <label htmlFor="todo">Afeigeix una Tasca</label>
            </div>
            <div className='containerTextarea'>
              <textarea id="description" name="todo" placeholder="Escriu la teva tasca aquí.." value = { todo } onChange={handleChange}/>
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