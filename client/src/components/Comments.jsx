import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { getComments } from "../requests/post";
import { selectToken, selectUser } from "../store/auth/authSelector";
import Comment from "./Comment";

const Comments = ({ post }) => {
  const { _id, user, description, picturePath, likes, comments } = post;
  const [detailedComments, setDetailedComments] = useState([]);
  const loggedInUser = useSelector(selectUser);
  const token = useSelector(selectToken);

  const loadComments = async () => {
    const response = await getComments({postId:_id, token});
    const data = await response.json();
    setDetailedComments(data);
  }

  useEffect(() => {
    loadComments();
  },[post])

  return (
    <div>
      {
        !detailedComments ? (
          <p>Loading...</p>
        ): (
            detailedComments.map((comment) => {
              return <Comment  comment={comment} />
          })
        )
      }
    </div>
  )
}

export default Comments