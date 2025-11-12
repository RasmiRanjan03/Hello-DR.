import React from 'react'
import { assets } from '../assets/assets_frontend/assets'

const Footer = () => {
  return (
    <>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mx-4 sm:mx-10 mt-32 text-gray-600'>
        {/* Logo and Description */}
        <div className='flex flex-col w-full lg:w-auto'>
          <div className='flex items-center gap-1.5 mb-6'>
            <img className='w-8' src={assets.logo} alt='logo' />
            <p className='text-blue-900 text-2xl font-bold'>Hello DR.</p>
          </div>
          <p className='text-sm leading-relaxed'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
        </div>

        {/* Company Links */}
        <div>
          <h4 className='mb-6 text-xl text-black font-semibold'>COMPANY</h4>
          <ul>
            <li className='my-1.5 text-sm hover:text-blue-600 cursor-pointer'>Home</li>
            <li className='my-1.5 text-sm hover:text-blue-600 cursor-pointer'>About us</li>
            <li className='my-1.5 text-sm hover:text-blue-600 cursor-pointer'>Delivery</li>
            <li className='my-1.5 text-sm hover:text-blue-600 cursor-pointer'>Privacy policy</li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className='mb-6 text-xl text-black font-semibold'>GET IN TOUCH</h4>
          <ul>
            <li className='my-1.5 text-sm'>📞 9827317265</li>
            <li className='my-1.5 text-sm'>📧 rsahoo2023@gift.edu.in</li>
          </ul>
        </div>
      </div>

      <hr className='text-gray-600 mt-9 mx-4 sm:mx-10' />
      <p className='text-center my-3 text-sm font-normal text-gray-600'>Copyright 2025 @ RasmiRanjan - All Right Reserved.</p>
    </>
  )
}

export default Footer