import React from 'react'
import IMG from '../images/user.png'

const UserAvator = ({ img, size, ...other }) => {
  return (
    <div  {...other} >
      <div className="user-avator w-[]" style={{width:`${size}px`, height:`${size}px`, background: `url(${!img ? img:IMG})`, backgroundSize:'100%'}}/>
    </div>
  )
}

export default UserAvator;

// background: url(https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=600);