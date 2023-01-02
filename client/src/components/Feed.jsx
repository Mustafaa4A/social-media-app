import { Box, Stack, Skeleton } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LOAD_POST_START } from "../store/post/postReducer";
import { selectPosts } from "../store/post/postSelector";
import AddPost from "./Add";
import Post from "./Post";

const Feed = () => {
  const [loading, setLoading] = useState(true);
  const [formShow, setFormShow] = useState(false);
  const posts = useSelector(selectPosts);
  const dispatch = useDispatch();


  const addToggle = ()  => {
    setFormShow(!formShow);
  };



  useEffect(() => {
    dispatch(LOAD_POST_START());
  }, [dispatch]);

  setTimeout(() => {
    setLoading(false);
  }, [3000]);

  return (
    <Box p={{ xs: 0, md: 2 }} width={50}>
      {loading ? (
        <Stack spacing={1}>
          <Skeleton variant="text" height={100} />
          <Skeleton variant="text" height={20} />
          <Skeleton variant="text" height={20} />
          <Skeleton variant="rectangular" height={300} />
        </Stack>
      ) : (
          <>
            <AddPost clickAction={addToggle} />
        {posts?.map((post) => <Post key={post._id} post={post} />)}
        </>
      )}
    </Box>
  );
};

export default Feed;