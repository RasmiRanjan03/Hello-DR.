import React, { useState, useContext } from 'react'
import { assets } from '../assets/assets_frontend/assets'
import { NavLink, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { AppContext } from '../context/AppContextProvider'

const Navbar = () => {
  const { backendurl,token,settoken,userdata } = useContext(AppContext)
  const Navigate = useNavigate();
  const [ShowMenu, setShowMenu] = useState(false)
  const logout = async () => {
  await axios.post(
    backendurl + "/user/logout",
    {},
    { withCredentials: true }
  );
  settoken(false);
  Navigate("/login");
};




  const closeMenu = () => setShowMenu(false)

  return (
    <div className='flex justify-between items-center py-4 border-b border-b-gray-400 px-4 sm:px-10'>
      <div className='flex items-center gap-2'>
        <img src={assets.logo} alt='logo' />
        <p className='text-blue-950 text-3xl font-medium'>Hello DR.</p>
      </div>
      <ul className='items-center font-medium text-sm gap-8 hidden md:flex'>
        <NavLink to='/' className={({ isActive }) => isActive ? 'text-[#5f6FFF]' : ''}>
          <li>HOME</li>
        </NavLink>
        <NavLink to='/doctors' className={({ isActive }) => isActive ? 'text-[#5f6FFF]' : ''}>
          <li>ALL DOCTORS</li>
        </NavLink>
        <NavLink to='/about' className={({ isActive }) => isActive ? 'text-[#5f6FFF]' : ''}>
          <li>ABOUT</li>
        </NavLink>
        <NavLink to='/contact' className={({ isActive }) => isActive ? 'text-[#5f6FFF]' : ''}>
          <li>CONTACT</li>
        </NavLink>
      </ul>
      <div className='flex items-center gap-4'>
        {token && userdata ? (
          <div className='hidden md:flex justify-center items-center gap-2 cursor-pointer group relative'>
            <img src={userdata.image} className='w-8 rounded-full h-8' alt='profile' />
            <img src={assets.dropdown_icon} className='w-2.5' alt='dropdown' />
            <div className='absolute top-0 right-0 pt-16 text-base font-medium text-gray-600 z-20 hidden group-hover:block'>
              <div className='bg-stone-100 p-3 rounded min-w-48 flex flex-col justify-center'>
                <p onClick={() => { Navigate('/profile'); closeMenu(); }} className='text-gray-600 hover:text-black cursor-pointer'>My Profile</p>
                <p onClick={() => { Navigate('/My_appointment'); closeMenu(); }} className='text-gray-600 hover:text-black cursor-pointer'>My appointments</p>
                <p onClick={() => logout()} className='text-gray-600 hover:text-black cursor-pointer'>Logout</p>
              </div>
            </div>
          </div>
        ) : (
          <button onClick={() => Navigate('/login')} className='hidden md:block bg-indigo-400 rounded-3xl px-6 py-3 text-white text-sm hover:bg-indigo-500'>Create account</button>
        )}
        <img className='md:hidden w-6 cursor-pointer' onClick={() => setShowMenu(true)} src={assets.menu_icon} alt='menu' />
      </div>
      {/* Mobile Menu */}
      <div className={`${ShowMenu ? 'fixed w-full' : 'h-0 w-0'
        } md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all duration-300`}>
        <div className='flex justify-between items-center p-4 border-b border-b-gray-400'>
          <img src={assets.logo} alt='logo' className='w-8' />
          <img className='w-7 cursor-pointer' onClick={closeMenu} src={assets.cross_icon} alt='close' />
        </div>
        <ul className='flex flex-col gap-4 p-4'>
          <NavLink to='/' onClick={closeMenu} className='text-lg font-medium hover:text-blue-600'>
            Home
          </NavLink>
          <NavLink to='/doctors' onClick={closeMenu} className='text-lg font-medium hover:text-blue-600'>
            All Doctors
          </NavLink>
          <NavLink to='/about' onClick={closeMenu} className='text-lg font-medium hover:text-blue-600'>
            About
          </NavLink>
          <NavLink to='/contact' onClick={closeMenu} className='text-lg font-medium hover:text-blue-600'>
            Contact
          </NavLink>
          {!token && (
            <button onClick={() => { Navigate('/login'); closeMenu(); }} className='bg-indigo-400 rounded-3xl px-6 py-3 text-white text-sm hover:bg-indigo-500 w-full'>
              Create account
            </button>
          )}
        </ul>
      </div>

    </div>
  )
}

export default Navbar