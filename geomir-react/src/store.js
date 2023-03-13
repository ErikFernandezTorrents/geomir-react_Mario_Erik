import { configureStore } from '@reduxjs/toolkit'
import { placesReducer } from './slices/marksPlacesSlice'
import { todosReducer } from './slices/todosSlice'
import { postsReducer } from './slices/marksPostsSlice'

export const store = configureStore({
  reducer: {
    markposts: postsReducer,
    todos: todosReducer,
    markplaces: placesReducer
  }
})