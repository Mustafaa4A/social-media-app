import UserAvator from './UserAvator'
import { MdSend } from 'react-icons/md';
import { useState } from 'react';
import { useEffect, useRef } from 'react';

const form = {
  commentText : '',
}

const CommentInput = ({postId, userId, addComment}) => {
  const [ fields, setFields ] = useState(form);
  const { commentText } = fields;
  const inputRef = useRef(null);

  const changeHnadler = (e) => {
    const { name, value } = e.target;
    return setFields(prev => {
      return {...prev, [name]:value}
    })
  }

  const submit = (e) => {
    e.preventDefault();
    if (commentText !== '') {
      addComment(postId, userId, commentText);
      resetForm();
    }
  }

  useEffect(() => {
    inputRef.current.focus();
  }, [])
  
  const resetForm = () => setFields(form);

  return (
    <div className='flex gap-2 my-3 w-[100%] mx-2' >
      <UserAvator size={35} />
      <form method='post' onSubmit={submit} className='w-[100%] max-w-[400px] relative'>
        <input type="text" className='rounded-[40px] p-2 px-3 outline-none w-[100%] placeholder:text-gray-400 bg-gray-100' placeholder='Write your comment...'
          value={commentText}
          name="commentText"
          onChange={changeHnadler}
          ref={inputRef}
          autoFocus
        />
        <button className='absolute top-2 right-4 cursor-pointer' disabled={true}>
          <MdSend type='submit' size={25} color={commentText ?'blue':'gray'}  onClick={submit} />
        </button>
      </form>
       
      
    </div>
  )
}

export default CommentInput