import { Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Friends from "./pages/Friends";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Notifications from "./pages/Notifications";
import { useSelector } from "react-redux";
import { selectIsLogin, selectUser } from "./store/auth/authSelector";

const App = () => {
  const user = useSelector(selectUser);
  const isLoggedIn = useSelector(selectIsLogin);
  
  // console.log(isLoggedIn);
  return (
    <div  className="app">
      <Routes>
        <Route path="/login" element={
          !isLoggedIn ? (<Login />) : (<Navigate replace to={'/'} />)}
        />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Navbar />}>
          <Route index={true} element={
            isLoggedIn ? (<Home />) : (<Navigate replace to={'/login'} />)}
          />
          <Route path="/friends" element={
            isLoggedIn ? (<Friends />) : (<Navigate replace to={'/login'} />)}
          />
          <Route path="/notifications" element={
            isLoggedIn ? (<Notifications />) : (<Navigate replace to={'/login'} />)}
          />
          <Route path="/profile/:username" element={
            isLoggedIn ? (<Profile />) : (<Navigate replace to={'/login'} />)}  
          />
        </Route>
        <Route path="*" element={<h1 className="text-6xl">404</h1>} />
      </Routes>
    </div>
  );
}

export default App;