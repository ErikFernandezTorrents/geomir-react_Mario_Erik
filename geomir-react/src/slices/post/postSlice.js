import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    posts: [],
    post: {
      author:{name:""},
      body:"",
      latitude:"",
      longitude:"",
      comments_count:"",
      visibility:"",
      file:{filepath:""}
    },
    page: 1,
    pages: [],
    isLoading: true,
    add: true,
    error: "",
    like: false,
    likes_count:0,
    filter: { body: "", author: ""}
}

export const postSlice = createSlice({
 name: 'post',
 initialState,  
 reducers: {

    startLoading: (state) => {
      //console.log("ABA")  
      state.isLoading = true;
    },
    
    stopLoading: (state) => {  
      state.isLoading = false;
    },

    setPosts: (state, action ) => {
      state.posts= action.payload
    },

    setPost: (state,action) => {
      state.post = action.payload
    },

    setAdd: (state,action) => {
      state.add = action.payload
    },

    setError: (state,action) => {
      state.error = action.payload
    },
    setPage: (state,action) => {
      state.page = action.payload
    },
    setPages: (state,action) => {
      state.pages = action.payload
    },

    setLike: (state,action) => {
      state.like = action.payload
    },

    setLikesCount: (state,action) => {
      state.likes_count = action.payload
    }, 

    setFilter: (state,action) => {
      state.filter = action.payload
    }
 }
});

export const { startLoading,setPosts,setPost,setAdd,setError,setPage,setPages,stopLoading,setLike,setLikesCount,setFilter } = postSlice.actions

export default postSlice.reducer