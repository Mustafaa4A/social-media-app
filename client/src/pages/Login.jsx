import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import Message from "../components/Message";
import { useDispatch, useSelector } from 'react-redux';
import { LOGIN_START } from "../store/auth/authReducer";
import { selectIsLogin, selectMessage } from "../store/auth/authSelector";

const form = {
    username: '',
    password: ''
}
  

const Login = () => {
  const [fields, setFields] = useState(form);
  const { username, password } = fields;
  const navigate = useNavigate();


  const dispatch = useDispatch();
  const message = useSelector(selectMessage);
  const isLoggedIn = useSelector(selectIsLogin);

  const changeHnadler = (e) => {
    const { name, value } = e.target;
    return setFields(prev => {
      return {...prev, [name]:value}
    })
  }

  const submit = async (e) => {
    e.preventDefault();
    dispatch(LOGIN_START({ username, password }));
  } 


  const style = {
    BorderBottom: '2px red',
    bacgroundColor:'red'
  }

  return (
    <div className="login-page">
      <div className="login md:w-[400px]">
        <h1 className="text-3xl text-center mb-7">Login</h1>
        <h3 className="text-lg text-center">Welcome to SOCIO</h3>
        {message && <Message message={message} />}
        <form method="post" onSubmit={submit} className="mt-3 flex flex-col items-center px-3">
          <input type="text" name="username" value={username} style={style} className="form-input " placeholder="Username" onChange={changeHnadler}  />
          <input type="Password" name="password" value={ password }  className="form-input" placeholder="Password" onChange={changeHnadler}/>
          <button type="submit" className="w-[100%] bg-blue-500 p-2 text-white text-bold rounded-lg my-4">Login</button>
          <Link to='/register' className="mt-5 text-blue-900">Create new account</Link>
        </form>
      </div>
    </div>
  )
}

export default Login;
