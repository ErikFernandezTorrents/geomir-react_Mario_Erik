import { configureStore } from '@reduxjs/toolkit'
import { placesReducer } from './slices/marksPlacesSlice'
import { todosReducer } from './slices/todosSlice'
import { postsReducer } from './slices/marksPostsSlice'
import reviewSlice from './slices/reviews/reviewSlice'
import placeSlice from './slices/place/placeSlice'

export const store = configureStore({
  reducer: {
    markposts: postsReducer,
    todos: todosReducer,
    markplaces: placesReducer,
    reviews: reviewSlice,
    places:placeSlice
  }
})