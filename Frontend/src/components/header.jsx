import React from 'react'
import {assets} from '../assets/assets_frontend/assets'
const Header = () => {
  return (
    <div className='bg-[#5F6FFF] rounded-xl w-full flex flex-col md:flex-row  mt-5 px-6 md:px-20 text-white '>
        <div className='md:w-1/2 flex flex-col justify-center gap-4 py-10 md:py-[10vw] md:mb-[-30px]'>
            <p className='text-3xl lg:text-5xl md:text-4xl leading-tight  font-semibold  '>Book Appointment <br />With Trusted Doctors</p>
            <div className='flex flex-col md:flex-row items-center gap-3 text-sm font-light'>
                
            <img className='w-28' src={assets.group_profiles} alt="" />
            <p>Simply browse through our extensive list of trusted doctors,<br />
                schedule your appointment hassle-free.</p>
            </div>

            <a className='flex items-center gap-2 rounded-full px-8 py-3 w-50 bg-white hover:scale-105 transition-all duration-300 text-gray-600 text-sm' href="/">Book appointment <img className='w-3' src={assets.arrow_icon} alt="" srcset="" /> </a>

        </div>
        <div className='w-1/2 relative '>
            <img className='md:absolute bottom-0 w-full' src={assets.header_img} alt="" srcset="" />
        </div>

    </div>
  )
}

export default Header