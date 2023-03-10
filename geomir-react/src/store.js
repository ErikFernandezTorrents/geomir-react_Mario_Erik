import { configureStore } from '@reduxjs/toolkit'
import { placesReducer } from './slices/marksPlacesSlice'
import { todosReducer } from './slices/todosSlice'

export const store = configureStore({
  reducer: {
    todos: todosReducer,
    markplaces: placesReducer

  }
})