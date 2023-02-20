import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { BiDotsVertical } from 'react-icons/bi';
import UserAvator from "./UserAvator";
import { AiOutlineLike, AiFillLike, AiOutlineComment,AiOutlineShareAlt } from 'react-icons/ai';
import Comment from "./Comment";
import { ADD_COMMENT, DELETE_POST, LIKE_POST, LOAD_POST_START } from "../store/post/postReducer";
import { selectToken, selectUser} from '../store/auth/authSelector';
import CommentInput from './CommentInput';
import { useState } from 'react';
import { commentPost, getComments } from '../requests/post';
import { useEffect } from 'react';
import Comments from './Comments';

const Post = ({ post }) => {
  const { _id, user, description, picturePath, likes, comments } = post;
  const [detailedComments, setDetailedComments] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loggedInUser = useSelector(selectUser);
  const token = useSelector(selectToken);
  const [isview, setIsView] = useState(false);


  const loadComments = async () => {
    const response = await getComments({postId:_id, token});
    const data = await response.json();
    setDetailedComments(data);
  }

  const toggle = async () => {
    setIsView(!isview);
    loadComments();
  }
  

  const like = async () => {
    const userId = loggedInUser._id;
    const postId = _id;
    dispatch(LIKE_POST({ userId, postId,  token}));
    
  }

  const deletePost = (id) => {
    dispatch(DELETE_POST(id));
  }

  const comment = (postId, userId, comment) => {
    dispatch(ADD_COMMENT({ postId, userId, comment, token }));
    loadComments();
  }

  return (
    <div className="bg-[white] rounded-xl md:w-[500px] mx-auto my-5 shadow-md">
      <div className="post-head p-3 flex items-center justify-between">
        <div className="flex items-center">
          <UserAvator img={user.picturePath} size={ 35 } onClick={ ()=>navigate(`profile/${user.username}`)} />
          <div className="ml-2 leading-4">
            <h1 className="font-bold cursor-pointer" onClick={() => navigate(`profile/${user.username}`)}>
              {`${user.firstName} ${user.lastName}`}</h1>
            <h3 className="text-sm">{ user.username}</h3>
          </div>
        </div>
        <BiDotsVertical size={25} className="cursor-pointer" onClick={()=>deletePost(_id)} />
      </div>
      <hr />
      <div className="post-body p-3 my-2">
        <p>{ description }</p>
      </div>
      <div className="image">
        {picturePath && <img src={picturePath} alt="" />}
      </div>
      <hr />
      <div className="footer flex justify-around bg-gray-100">
        <div className="action" onClick={like}>
          {likes.liked.includes(loggedInUser._id) ? (
            <AiFillLike size={23} color='blue' />
          ): (
              <AiOutlineLike size={23} />
          )} 
          <p>{ likes.count }</p>
        </div>
        <div className="action" onClick={toggle}>
          <AiOutlineComment size={23} />
          <p>{comments.count} </p>
        </div>
        {/* <div className="action">
          <AiOutlineShareAlt size={23} />
          <p>1.2k</p>
        </div> */}
      </div>
      <hr />
      {
        isview &&
        <div className='comments flex flex-col m-auto p-2 max-h-[200px] overflow-x-hidden'>
          <Comments post={post}/>
          <CommentInput postId={ _id} userId={loggedInUser._id} addComment={comment} />
          <Link to='/comments' className='block ml-auto mr-11'>See All Comments</Link>
        </div>
      }
    </div>
  )
}

export default Post;