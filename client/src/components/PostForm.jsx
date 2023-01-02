import DropzoneInput from './DropzoneInput';
import { BiArrowBack } from 'react-icons/bi';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SAVE_POST } from '../store/post/postReducer';
import { selectToken, selectUser } from '../store/auth/authSelector';
const form = {
  description: '',
  picture:''
}

const PostForm = ({ clickAction }) => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser)
  const token = useSelector(selectToken)
  const [ fields, setFields ] = useState(form);
  const { description, picture } = fields;

  const changeHnadler = (e) => {
    const { name, value } = e.target;
    return setFields(prev => {
      return {...prev, [name]:value}
    })
  }

  const onDropFile = (acceptFiles) => {
    console.log(fields);
    setFields(prev => {
      return { ...prev, picture: acceptFiles[0] };
    })
  }

  const submit = async(e) => {
    e.preventDefault();
    const post = {
      userId: user._id,
      description: description
    }
    const formData = new FormData();
    for (let value in post) {
      formData.append(value, post[value])
    }
    
    formData.append('picturePath', picture.name);
    
    dispatch(SAVE_POST({post:formData, token}));
    restForm();
    clickAction();
  } 

  const restForm = () => setFields(form);
  
  return (
    <div className="modal md:lg">
      <div className='new-post md:lg'>
        <div className='flex gap-5 items-center border-b-[1px] border-[#824] p-5'>
          <div onClick={clickAction} className='cursor-pointer'>
            <BiArrowBack size={25} />
          </div>
          <h1 className='text-xl font-bold'>Create post</h1>
        </div>
        <form method='post' onSubmit={submit} className='mt-5'>
          <textarea cols="40" rows="50" name='description' value={ description} className='text-input my-3 md:m-0 md:h-[150px]' placeholder="What's new?" onChange={changeHnadler}/>  
          <DropzoneInput onDrop={onDropFile} fields={fields} />
          <button type='submit' className={`w-[100%] p-2 text-white text-bold rounded-sm mt-4  ${(description || picture)?'bg-blue-500':'bg-slate-300'}`} disabled={!(description || picture)}>Share</button>
        </form>
      </div>
    </div>
  )
}

export default PostForm;