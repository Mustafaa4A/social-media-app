import { Fragment, useState } from 'react';
import AddPost from '../components/AddPost';
import Post from '../components/Post';
import PostForm from '../components/PostForm';
import { useDispatch, useSelector} from 'react-redux';
import { useEffect } from 'react';
import { LOAD_POST_START } from '../store/post/postReducer';
import { selectPosts } from '../store/post/postSelector';
import Sidebar from '../components/Sidebar';
import { selectToken } from '../store/auth/authSelector';

const Home = () => {
  const [formShow, setFormShow] = useState(false);
  const posts = useSelector(selectPosts);
  const token = useSelector(selectToken);
  const dispatch = useDispatch();


  const addToggle = ()  => {
    setFormShow(!formShow);
  };

  useEffect(() => {
    dispatch(LOAD_POST_START({ token }));
  }, [dispatch, token]);

  return (
    <Fragment>
      <div className="flex md:px-[20px] px-[3%]">
        <div className="hidden md:block mt-5 h-[80vh] w-[200px] bg-white rounded-lg shadow-md">
            <Sidebar />
        </div>
      <div className="md:mt-5 grow relative min-w-[500px]">
          <AddPost clickAction={addToggle} />
          <div className='mt-5'>
            {
              posts?.map((post) => <Post key={post._id} post={post} />)
            }
        </div>
      </div>
        <div className="hidden  mt-2 md:blocik bg-slate-400 p-5 rounded-lg max-h-[85vh] shadow-lg">
          
       
      </div>
    </div>
      {formShow && <PostForm clickAction={addToggle} />}
    </Fragment>
  )
}

export default Home;