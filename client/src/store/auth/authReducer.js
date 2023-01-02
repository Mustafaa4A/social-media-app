import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  isLogin:false,
  user: null,
  token: null,
  friends: [],
  sendedRequests: [],
  recievedRequests:[],
  requests: [],
  message: '',
  loading:false,
}

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    LOGIN_START: (state,) => {
      return { ...state, loading: true };
    },
    LOGIN_SUCCESS: (state, { payload }) => {
      return {
        ...state,
        loading:false,
        user: payload.user,
        token: payload.token,
        message: '',
        isLogin: true
      }
    },
    LOGIN_FAILED: (state, { payload }) => {
      return { ...state, loading: false, message: payload, isLogin: false };
    },
    LOGOUT: (state) => {
      return {...state, ...initialState};
    },
    LOAD_FRIENDS: (state) => {
      return { ...state, loading: true };
    },
    SET_FRIENDS: (state, { payload }) => {
      return {
        ...state,
        loading: false,
        friends: payload.friends,
        sendedRequests: payload.sendedRequests,
        recievedRequests: payload.recievedRequests
      }
    },
    SEND_REQUEST: (state) => {
      return {
        ...state,
      }
    },
    ECCEPT_REQUEST: (state) => {
      return{...state}
    },
    DELETE_REQUEST: (state) => {
      return {...state, }
    }


  }
  
});

export const {
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGOUT,
  LOAD_FRIENDS,
  SET_FRIENDS,
  SEND_REQUEST,
  ECCEPT_REQUEST,
  DELETE_REQUEST
} = authSlice.actions

export default authSlice.reducer;