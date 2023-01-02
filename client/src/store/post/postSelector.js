import { createSelector } from "@reduxjs/toolkit";

const postReducer = (state) => state.post;


export const selectPosts = createSelector(
  ([postReducer]),
  (post) => post.posts
) 
