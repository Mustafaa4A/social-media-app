import SearchInput from './SearchInput';
import UserAvator from './UserAvator';
import {FaUser, FaSignOutAlt} from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { selectUser } from '../store/auth/authSelector';




const Head = () => {
  const navigate = useNavigate();
  const user = useSelector(selectUser);

  return (
  <div className="main flex gap-3 items-center justify-between">
      <div className='flex gap-5'>
        <div className="logo">Socio</div>
        <SearchInput />
      </div>
      <div className='hidden absolute top-11 right-11 w-[150px] shadow-lg bg-zinc-200 p-2'>
        <div className='my-2 flex cursor-pointer p-2 hover:bg-white' onClick={()=>navigate('/login')}>
          <FaUser size={20} />
          <p className='ml-2'>Profile</p>
        </div>
      </div>
      <UserAvator size={35} className="md:absolute top-2 right-5" onClick={()=>navigate(`profile/${user.username}`)} />
    </div>
  )
}

export default Head;