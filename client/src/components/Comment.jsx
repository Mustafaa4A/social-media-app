import { useNavigate } from 'react-router-dom';
import UserAvator from '../components/UserAvator'

const Comment = ({ comment, ...probs }) => {
  const navigate = useNavigate();
  const { user, comment:text } = comment;
  return (
    <div className="p-3 py-2 min-w-[300px] mt-2" {...probs}>
      <div className="flex flex-row">
        <UserAvator size={35} img={user?.picturePath} onClick={ ()=>navigate(`profile/${user.username}`)} />
        <div className="flex flex-col ml-2 bg-gray-100 p-2 rounded-lg">
          <h4 className="text-md font-semibold text-left" onClick={ ()=>navigate(`profile/${user.username}`)}>{`${user?.firstName} ${user?.lastName}`}</h4>
          <p className="dark:text-gray-600">{text}</p>
        </div>
      </div>
    </div>
  );
}

export default Comment;