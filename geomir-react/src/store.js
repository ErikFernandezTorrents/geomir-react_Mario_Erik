import { configureStore } from '@reduxjs/toolkit'
import { postsReducer } from './slices/marksPostsSlice'

export const store = configureStore({
  reducer: {
    markposts: postsReducer

  }
})