import React, { useState } from 'react'
import { assets } from '../assets/assets_frontend/assets'
import { NavLink, useNavigate } from 'react-router-dom'
const Navbar = () => {
  const Navigate=useNavigate();
  const [ShowMenu, setShowMenu] = useState(false)
  const [token, settoken] = useState(true)
  return (
    <div className='flex justify-between items-center py-4 border-b border-b-gray-400'>
      <div className='flex items-center gap-2 '>
  <img src={assets.logo} alt=""  />
  <p className='text-blue-950 text-3xl font-medium'>Hello DR.</p>
      </div>
      <ul className='flex items-center font-medium text-sm gap-8'>
        <NavLink to='/'>
          <li>HOME</li>
          <hr className='h-0.5 w-3/5 bg-[#5f6FFF] m-auto rounded hidden' />
        </NavLink>
        <NavLink to='/doctors'>
          <li>ALL DOCTORS</li>
          <hr className='h-0.5 w-3/5 bg-[#5f6FFF] m-auto rounded hidden' />
        </NavLink>
        <NavLink to='/about'>
          <li>ABOUT</li>
          <hr className='h-0.5 w-3/5 bg-[#5f6FFF] m-auto rounded hidden' />
        </NavLink>
        <NavLink to='contact'>
          <li>CONTACT</li>
          <hr className='h-0.5 w-3/5 bg-[#5f6FFF] m-auto rounded hidden' />
        </NavLink>
      </ul>
      {
        token?
          <div className='flex justify-center items-center gap-2 cursor-pointer group relative'>
            <img src={assets.profile_pic} className='w-8 rounded-full' alt="" />
            <img src={assets.dropdown_icon} className='w-2.5' alt="" />
            <div className='absolute top-0 right-0 pt-16 text-base font-medium text-gary-600 z-20 hidden group-hover:block '>
              <div className='bg-stone-100 p-3 rounded min-w-48 flex flex-col justify-center'>
                <p onClick={()=>Navigate('/profile')} className=' text-gray-600 hover:text-black'>My Profile</p>
                <p onClick={()=>Navigate('/My_appointment')} className=' text-gray-600 hover:text-black'>My appointments</p>
                <p onClick={()=>settoken(false)} className=' text-gray-600 hover:text-black'>Logout</p>
              </div>
            </div>
          </div>
        :<button onClick={()=>Navigate('/login')}  className='bg-indigo-400 rounded-3xl px-6 py-3 text-white text-sm'>Create account</button>
      }
    </div>
  )
}

export default Navbar