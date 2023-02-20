import { useEffect,useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {useNavigate, useParams} from 'react-router-dom'
import { BiArrowBack } from 'react-icons/bi';
import { ECCEPT_REQUEST, LOAD_FRIENDS, LOGOUT, SEND_REQUEST } from '../store/auth/authReducer';
import UserAvator from '../components/UserAvator';
import { getUser} from '../requests/user';
import { selectToken, selectUser} from '../store/auth/authSelector';

const Profile = () => {
  const { username } = useParams();
  const [user, setUser] = useState({});

  const loggedInUser = useSelector(selectUser);
  const token = useSelector(selectToken)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = () => {
    dispatch(LOGOUT());
  }

  const sendRequest = async (friendId) => {
    const userId = loggedInUser._id;
    dispatch(SEND_REQUEST({userId, friendId, token}));
  }

  const acceptRequest = async (friendId) => {
    const userId = loggedInUser._id;
    dispatch(ECCEPT_REQUEST({ userId, friendId, token }));
  }

  useEffect(() => { 
    const fetch = async () => {
      const response = await getUser({username,token});
      if (response.status === 200) {
        const user = await response.json();
        setUser(user);
      }
    };
    fetch();
  },[username, token])

  return (
    <div className="fixed top-0 w-[100%] md:relative md:mt-3">
      <div className='absolute top-2 left-3 cursor-pointer md:hidden' onClick={()=>navigate(-1)}> 
        <BiArrowBack size={25} />
      </div>
      <div className="w-[100%] bg-white p-1 py-11 flex flex-col md:w-[600px] m-auto">
        <div className='m-auto text-center'>
          <UserAvator img={loggedInUser.picturePath} size={150}/>
          <h1 className="text-2xl font-bold mt-2">{`${user?.firstName} ${user?.lastName}`}</h1>
          <h3 className='mb-3 text-md font-bold'>{ user?.username || "No Username"}</h3>
        </div>
        
          {
            loggedInUser?.username === user?.username &&
            <div className='my-3 flex'>
                <button className="bg-[tomato] profile-btn w-[100%] " onClick={logout}>Logout</button>
            </div>  
        }
        
        {
          (loggedInUser?.username === user?.username && !loggedInUser.friends?.includes(user._id)) &&
          <div className='mt-3 flex'>
            
          </div>
        }
        
        <div className='flex'>
          <button className="bg-[#6d6de7] w-[50%] profile-btn" onClick={()=>acceptRequest(user._id)}>Confirm Request</button>
          <button className="bg-[#999]  w-[50%] profile-btn">Delete Request</button>
        </div>
           
       
       
            
         
          
            <div className='mt-3 flex'>
              <button className="bg-[#6d6de7] block profile-btn  w-[100%]" onClick={()=>sendRequest(user._id)}>Send Request</button>
            </div>
         
        
      </div>
      <div>

      </div>
    </div>
  )
}

export default Profile;

//  <div className='mt-3 flex'>
//               <button className="bg-[#6d6de7] block profile-btn  w-[100%]" onClick={()=>sendRequest(user._id)}>Send Request</button>
//             </div>
            

/* <svg xmlns="http://www.w3.org/2000/svg" class="h-24 w-24" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
                </svg> */