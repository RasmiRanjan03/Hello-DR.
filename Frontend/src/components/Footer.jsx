import React from 'react'
import { assets } from '../assets/assets_frontend/assets'

const Footer = () => {
  return (
    <>
    <div className='flex justify-between mx-10 mt-32 text-gray-600'>
        <div className='flex  flex-col w-1/2 pr-30 '>
            <div className='flex  items-center gap-1.5 mb-6'>
            <img className='w-8' src={assets.logo} alt="" />
        <p className='text-blue-900 text-2xl font-bold'>Hello DR.</p>
        </div>
        <p className='text-sm leading-relaxed'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
        </div>
        <div className='flex justify-between gap-20 items-start '>
            <div className=''>
                <h4 className='mb-6 text-xl text-black'>COMPANY</h4>
                <ul>
                    <li className='my-1.5 text-sm'>Home</li>
                    <li className='my-1.5 text-sm'>About us</li>
                    <li className='my-1.5 text-sm'>Delivery</li>
                    <li className='my-1.5 text-sm'>Privacy policy</li>
                </ul>
            </div>
            <div>
                <h4 className=' mb-6 text-xl text-black'>GET IN TOUCH</h4>
                <ul>
                    <li className='my-1.5 text-sm'>9827317265</li>
                    <li className='my-1.5 text-sm'>rsahoo2023@gift.edu.in</li>
                </ul>
            </div>
        </div>
    </div>
    <hr className='text-gray-600 mt-9 ml-10' />
    <p className='text-center my-3 text-sm font-normal'>Copyright 2025 @ RasmiRanjan - All Right Reserved.</p>
    </>
  )
}

export default Footer