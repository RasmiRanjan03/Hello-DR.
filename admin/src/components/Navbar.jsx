import React,{useContext} from 'react'
import { assets } from '../assets/assets_admin/assets'
import { AdminContext } from '../context/AdminContext'

const Navbar = () => {

  const {atoken,setatoken}=useContext(AdminContext)
  const logout=()=>{
    atoken && setatoken('');
    atoken && localStorage.removeItem('atoken')
    console.log("Admin logged out successfully");
  }
  return (
    <div className='flex justify-between items-center py-4 border-b border-b-gray-400 px-4 sm:px-10'>
            <div className='flex gap-3 items-center '>
                <div className='flex items-center gap-2'>
                    <img src={assets.admin_logo} className='w-8' alt='logo' />
                    <p className='text-blue-950 text-3xl font-medium'>Hello DR.</p>


                  </div>
                  <p className='rounded-full border border-gray-500 px-5 py-1.5 text-sm'>{atoken ? "Admin" : "Doctor"}</p>
                  
                </div> 
                <button onClick={()=>logout()} className='crusor px-5 py-1.5 bg-indigo-400 text-white rounded-xl flex items-center text-sm'>Logout</button>
    </div>
  )
}

export default Navbar