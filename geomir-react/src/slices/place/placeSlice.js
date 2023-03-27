import { createSlice } from '@reduxjs/toolkit'
const initialState = {
    places: [],
    place: {
        file: {filepath:""},
        author:{name:""},
        name:"",
        description:"",
        latitude:0,
        longitude:0,
        visibility:""
    },
    page: 1,
    pages: [],
    isLoading: true,
    addreview: true,
    missatge: "",
    favourite: false,
    favorites_count:0,
    filtreDesc: "",
}
export const placeSlice = createSlice({
name: "place",

 initialState,

 reducers: {

    startLoadingPlaces: (state) => {

        //console.log("ABA")

        state.isLoading = true;

    },

    setPlaces: (state, action) => {

        state.places = action.payload


        state.isLoading = false
    },

    setPlace: (state, action) => {

        state.place = action.payload


        state.isLoading = false
    },
    setAddreview: (state, action) => {

        state.addreview = action.payload

    },

    setMissatge: (state, action) => {

        state.error = action.payload

    },
    setFavourite: (state,action) => {

        //console.log("ABA")

        state.favourite = action.payload

    },
    setFavouriteCount: (state,action) => {

        //console.log("ABA")

        state.favorites_count = action.payload

    },
    setPage: (state,action) => {

        state.page = action.payload
        
    },
    setPages: (state,action) => {

        state.pages = action.payload
        
    },
    setFiltreDesc: (state,action) => {

        state.filtreDesc = action.payload
        
    }

 }
})

// Action creators are generated for each case reducer function
export const { startLoadingPlaces,setPlaces, setPlace, setAddreview, setMissatge, delPlace,setFavourite,setFavouriteCount,setPage ,setPages,setFiltreDesc} = placeSlice.actions

export default placeSlice.reducer