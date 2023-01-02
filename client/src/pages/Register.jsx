import { useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import DropzoneInput from "../components/DropzoneInput";
import { register } from "../requests/auth";
import Message from '../components/Message';
import * as yup from 'yup';

const userSchema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().email().required(),
  username: yup.string().required(),
  password: yup.string().min(5).required()
})

const form = {
  firstName:'',
  lastName:'',
  username:'',
  email:'',
  password:'',
  picture:''
}

const Register = () => {
  const [fields, setFields] = useState(form);
  const { firstName, lastName, username, email, password, picture } = fields;
  const [message, setMessage] = useState('');
  const navigate = useNavigate();


  const changeHnadler = (e) => {
    const { name, value } = e.target;
    setMessage('');
    return setFields(prev => {
      return {...prev, [name]:value}
    })
  }

  const onDropFile = (acceptFiles) => {
    setFields(prev => {
      return { ...prev, picture: acceptFiles[0] };
    })
  }

  

  const submitForm = async (e) => {
    e.preventDefault();
    const isValid = await userSchema.isValid(fields);
    if (!isValid) {
      setMessage('Pleae Fill the requiremtnts')
      return;
    }
    const formData = new FormData();
    for (let field in fields) {
      formData.append(field, fields[field])
    }
    if (!picture.name)
      formData.append('picturePath', picture.name);
    
    console.log(fields);
    const res = await register(formData);
    
    if (await res.status !== 201) {
      setMessage("Something went wrong, please try again")
    } else {
      resetForm();
      navigate('/login');
    }
    
  }

  const resetForm = () => setFields(form);

  return (
    <div className="login-page">
      <div className=""></div>
      <div className="login w-[95%] rounded-sm md:w-[600px]">
        <h2 className="text-lg font-bold text-center">Register Now</h2>
        {message && <Message message={message}/>}
        <form method="post" onSubmit={submitForm} className="w-[100%] px-2">
          <input type="text" name="firstName" value={firstName} className="form-input" placeholder="first Name" onChange={changeHnadler} />
          <input type="text" name="lastName" value={lastName} className="form-input" placeholder="Last Name" onChange={changeHnadler} />
          <input type="text" name="username" value={username} className="form-input" placeholder="Username" onChange={changeHnadler} />
          <input type="email" name="email" value={email} className="form-input" placeholder="Email" onChange={changeHnadler} />
          <input type="password" name="password" value={password} className="form-input" placeholder="Password" onChange={changeHnadler} />
          <DropzoneInput onDrop={onDropFile} fields={fields} />
          <button type="submit" className="w-[100%] bg-blue-500 p-2 text-white text-bold rounded-lg my-4">Sign Up</button>
          <Link to='/login' className="mt-5 text-blue-900 text-center">Already have an account</Link>
        </form>
      </div>
    </div>
  )
}

export default Register

//  {!values.picture ? (<p>Add Picture</p>) : (<FaEdit size={20}/>
                  