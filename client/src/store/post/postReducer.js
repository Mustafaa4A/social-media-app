import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  posts: [],
  comments:[],
  loading:false,
  messagae: ''
}


const postScline = createSlice({
  name: 'post',

  initialState: initialState,
  reducers: {
    LOAD_POST_START: (state) => {
      return {...state, loading:true}
    },
    LOAD_POST_SUCCESS: (state, action) => {
      return {...state, loading:false, posts:action.payload}
    },
    LOAD_POST_FAILED: (state, action) => {
      return {...state, loading:false, messagae:action.payload}
    },
    SAVE_POST: (state, {payload}) => {
      return {...state, messagae:payload}
    },
    DELETE_POST: (state, { payload }) => {
      return {...state, messagae:payload}
    },
    LIKE_POST: (state, {payload}) => {
      return {...state, messagae:payload}
    },
    ADD_COMMENT: (state, { payload }) => {
      return {...state, messagae:payload}
    },
    GET_POST_COMMENTS: (state, payload) => {
      return {...state, }
    }
  }
})
export const {
  LOAD_POST_START, LOAD_POST_SUCCESS, LOAD_POST_FAILED,
  SAVE_POST, DELETE_POST,LIKE_POST, ADD_COMMENT, GET_POST_COMMENTS
} = postScline.actions;
export default postScline.reducer;