import UserAvator from './UserAvator';
import { GrAttachment } from 'react-icons/gr';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {selectUser} from '../store/auth/authSelector';

const AddPost = ({ clickAction }) => {
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  return (
    <div className="post-form md:rounded-xl m-auto md:w-[500px] px-5"
    >
      <UserAvator img={user.picturePath} size={35} onClick={ ()=>navigate(`profile/${user.username}`)} />
      <input type="text" className="post-input md:w-[350px] cursor-pointer" placeholder='New Post' onClick={clickAction} />
      <GrAttachment size={25} className="cursor-pointer" onClick={clickAction}/>
    </div>
  )
}

export default AddPost