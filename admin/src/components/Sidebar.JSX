import React from 'react'
import { useContext } from 'react'
import { AdminContext } from '../context/AdminContext.jsx'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets_admin/assets'

const Sidebar = () => {
    const atoken=useContext(AdminContext)
  return (
    <div className=' w-2xs bg-white  min-h-[90vh] border-r border-gray-200' >
        {
            atoken && <ul className='text-gray-600 mt-5'>
                <NavLink to="/admin_dashboard" className={({isActive})=> isActive ? 'flex items-center gap-4 bg-[#dde9ff] py-3 px-5 border-r-4 border-indigo-400' : 'flex items-center gap-4 py-3 px-5'}>
                <img src={assets.home_icon} alt="" />
                    <p>Dashboard</p>
                </NavLink>
                <NavLink to="/all_appointments" className={({isActive})=> isActive ? 'flex items-center gap-4 bg-[#dde9ff] py-3 px-5 border-r-4 border-indigo-400' : 'flex items-center gap-4 py-3 px-5'}>
                <img src={assets.appointment_icon} alt="" />
                    <p>Appointments</p>
                </NavLink>
                <NavLink to="/add_doctor" className={({isActive})=> isActive ? 'flex items-center gap-4 bg-[#dde9ff] py-3 px-5 border-r-4 border-indigo-400' : 'flex items-center gap-4 py-3 px-5'}>
                <img src={assets.add_icon} alt="" />
                    <p>Add Doctor</p>
                </NavLink>
                <NavLink to="/doctor_list" className={({isActive})=> isActive ? 'flex items-center gap-4 bg-[#dde9ff] py-3 px-5 border-r-4 border-indigo-400' : 'flex items-center gap-4 py-3 px-5'}>
                <img src={assets.people_icon} alt="" />
                    <p>Doctor List</p>
                </NavLink>
                
            </ul>
        }
    </div>
  )
}

export default Sidebar