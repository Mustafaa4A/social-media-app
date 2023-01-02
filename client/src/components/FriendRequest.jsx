import React from 'react'
import UserAvator from './UserAvator';

const FriendRequest = ({ user }) => {
  const { firstName, lastName, username, picturePath } = user;
  return (
    <div className='w-[90%] flex gap-3 bg-white p-3  min-w-[250px] items-center shadow-lg rounded-md bg-slate-30 my-2'>
      <div>
        <UserAvator size={70} img={ picturePath && picturePath} />
      </div>
      <div className='ml-2 w-[100%]'>
        <h1 className='text-md font-bold'>{`${firstName} ${lastName}`}</h1>
        <h1 className='text-sm'>{username}</h1>
        <div className='mt-2 flex'>
          <button className='block px-3 py-1 rounded-md w-[50%] mx-1 ml-0 bg-[#5a5af1] text-white'>Confirm</button>
          <button className='block px-3 py-1 rounded-md w-[50%] mx-1 ml-0 bg-[#c3c3dd]'>Delete</button>
      </div>
      </div>
      
    </div>
  )
}

export default FriendRequest;