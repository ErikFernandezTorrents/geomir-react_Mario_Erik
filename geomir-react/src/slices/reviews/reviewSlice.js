import { createSlice } from '@reduxjs/toolkit'
const initialState = {
    reviews: [],
    page: 0,
    isLoading: false,
    addreview: true,
    missatge: "",
}
export const reviewSlice = createSlice({
    name: "review",

    initialState,

    reducers: {

         startLoadingReviews: (state) => {

            //console.log("ABA")

            state.isLoading = true;

        },

        setReview: (state, action) => {

            state.reviews = action.payload

            console.log()

            state.isLoading = false
        },

        setAddreview: (state, action) => {

            state.add = action.payload

        },

        setMissatge: (state, action) => {

            state.error = action.payload

        },


    }
})

export const { startLoadingReviews,setReview, setAddreview, setMissatge } = reviewSlice.actions;

export default reviewSlice.reducer