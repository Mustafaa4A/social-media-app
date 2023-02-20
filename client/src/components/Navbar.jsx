import {   Mail, Notifications } from "@mui/icons-material";
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  InputBase,
  Menu,
  MenuItem,
  styled,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { Fragment, useState } from "react";
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import Menubar from "./Menubar";
import { Outlet, useNavigate } from "react-router-dom";
import UserAvator from './UserAvator';
import { useDispatch, useSelector } from 'react-redux';
import { LOGOUT } from '../store/auth/authReducer';
import { selectUser } from '../store/auth/authSelector';


const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
});

const Facebook = styled(Box)(({theme})=>({
      color:"white",
      borderRadius: "10px",
      marginRight:"30px"
}));
const Search=styled(Box)(({theme})=>({
      backgroundColor:"white",
      padding:"0 10px",
      borderRadius: "15px",
      width:"70%",
      display:"flex"

}))
const Icons = styled(Box)(({ theme }) => ({
  display: "none",
  alignItems: "center",
  gap: "20px",
  [theme.breakpoints.up("sm")]: {
    display: "flex",
  },
}));

const UserBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "10px",
  [theme.breakpoints.up("sm")]: {
    display: "none",
  },
}));

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const navigate = useNavigate();

  const logout = () => {
    dispatch(LOGOUT());
  }

  return (
    <Fragment>
      <AppBar position="sticky">
      <StyledToolbar>
        <Box sx={{ display: "flex" }} >
          <Facebook>
              <FacebookOutlinedIcon/>
          </Facebook>
          <Search><InputBase placeholder="search" /></Search>  
        </Box>
        <Box>
          <Menubar />
        </Box>
        <Icons>
          <Badge badgeContent={4} color="error">
            <Mail />
          </Badge>
          <Badge badgeContent={2} color="error">
            <Notifications />
          </Badge>
          {/* <Avatar
            sx={{ width: 30, height: 30 }}
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHViGfE9kzwDehCPiY7yQheC7Uwa_age3sdg&usqp=CAU"
            onClick={(e) => setOpen(true)}
          /> */}
            <UserAvator img={user?.picturePath} size={30} onClick={(e) => setOpen(true)} />
        </Icons>
          <UserBox onClick={(e) => setOpen(true)}>
            
          <UserAvator img={user?.picturePath} size={30} onClick={(e) => setOpen(true)} />
          <Typography variant="span">{user?.username}</Typography>
        </UserBox>
      </StyledToolbar>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        open={open}
        onClose={(e) => setOpen(false)}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem onClick={()=>navigate(`profile/${user.username}`)}>Profile</MenuItem>
        <MenuItem onClick={logout}>Logout</MenuItem>
      </Menu>
      </AppBar>
      <Outlet />
    </Fragment>
  );
};

export default Navbar;


// import { Fragment } from "react";
// import { Outlet } from "react-router-dom";
// import Head from "./Head";
// import Menu from "./Menu";

// const Navbar = () => {
//   return (
//     <Fragment>
//       <div className="navbar pt-3 md:pt-0 flex flex-col md:flex-row md:h-[60px] md:gap-20 md:border-b-0">
//         <Head />
//         <Menu />
//       </div>
//       <Outlet />
//     </Fragment>
//   );
// }

// export default Navbar;