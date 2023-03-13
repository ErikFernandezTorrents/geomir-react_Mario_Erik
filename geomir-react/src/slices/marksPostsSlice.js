import { createSlice } from '@reduxjs/toolkit'

const initialState = {

    marks: JSON.parse(localStorage.getItem("marks")) || [],
    isMarked: false

}

export const postsSlice = createSlice({
    name: 'marks',

    initialState,

    reducers: {

        addmark: (state,action) => {

            state.marks.push(action.payload)
            state.isMarked=true;
        },
        delmark: (state,action) => {
            state.marks = state.marks.filter(mark => mark.id !== action.payload)
        },
        ismarked: (state,action) => {
            state.isMarked = false
            state.marks.map((mark) => {
                if (mark.postId == action.payload){
                    state.isMarked = true;
                }  
            })
        }
    }
})

// Action creators are generated for each case reducer function
export const { addmark,delmark,ismarked } = postsSlice.actions

export const postsReducer = postsSlice.reducer