import { createSelector } from "@reduxjs/toolkit";

const authReducer = (state) => state.auth;

export const selectUser = createSelector(
  [authReducer], 
  (auth)=>auth.user
)

export const selectToken = createSelector(
  [authReducer], 
  (auth)=>auth.token
)

export const selectIsLogin = createSelector(
  [authReducer], 
  (auth)=>auth.isLogin
)

export const selectMessage = createSelector(
  [authReducer], 
  (auth)=>auth.message
)

export const selectSendedRequests = createSelector(
  [authReducer], 
  (auth)=>auth.sendedRequests
)

export const selectRecievedRequests = createSelector(
  [authReducer], 
  (auth)=>auth.recievedRequests
)

export const selectFriends = createSelector(
  [authReducer], 
  (auth)=>auth.friends
)