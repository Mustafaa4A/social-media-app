import { NavLink } from "react-router-dom";
import { HiHome } from 'react-icons/hi';
import { FaUserFriends } from 'react-icons/fa';
import { IoMdNotifications } from 'react-icons/io';
import { FaUserCircle } from 'react-icons/fa';

import { selectUser } from '../store/auth/authSelector'
import { useSelector} from 'react-redux';

const Menubar = () => {
  const user = useSelector(selectUser);
  
  const navStyle = ({ isActive }) => "menu-item " + (isActive && "current");
  return (
    <div className="menu flex justify-around pt-3 md:gap-7">
      <NavLink to='/' className={navStyle}>
        <HiHome size={30} />
      </NavLink>
      <NavLink to='/friends' className={navStyle}>
        <FaUserFriends size={30}/>
      </NavLink>
      <NavLink to={`/profile/${user?.username}`} className={navStyle}>
        <FaUserCircle size={30}/>
      </NavLink>
      <NavLink to='/notifications' className={navStyle}>
        <IoMdNotifications size={30}/>
      </NavLink>
    </div>
    
  )
}

export default Menubar;