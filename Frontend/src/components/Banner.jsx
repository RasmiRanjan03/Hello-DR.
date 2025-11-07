import React from 'react'
import { assets } from '../assets/assets_frontend/assets'
import { useNavigate } from 'react-router-dom'

const Banner = () => {
    const navigate=useNavigate();
  return (
    <div className='bg-[#5F6FFF] rounded-xl w-[95%] flex flex-col md:flex-row  mt-5 px-6 md:px-14 md:ml-10 md:mr-10 mb-5 text-white'>
        <div className='w-3/5 flex flex-col justify-center gap-3 py-8 sm:py-10 lg:py-24'>
            <p className='text-5xl font-semibold leading-tight'>Book Appointment <br /> With 100+ Trusted Doctors</p>
            <div onClick={()=>navigate('/login')} className='cursor-pointer bg-white w-fit px-8 py-3 text-gray-500 rounded-full '>Create account</div>
        </div>
        <div className='hidden md:block w-2/5 relative'>
            <img className='w-[85%] absolute bottom-0 right-0 ' src={assets.appointment_img} alt="" />
        </div>
    </div>
  )
}

export default Banner