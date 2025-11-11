import React from 'react'
import { assets } from '../assets/assets_frontend/assets'

const Contact = () => {
  return (
    <div className='mt-14'>
      <div className='text-gray-500 text-2xl text-center '>CONTACT <span className='text-black font-semibold '>US</span></div>
      <div className='m-10 flex gap-10 justify-center  '>
        <img className='max-w-[320px] w-full' src={assets.contact_image} alt="" />
        <div className='flex flex-col  text-sm text-gray-500'>
          <h3 className='text-lg font-semibold my-3 text-gray-700'>OUR OFFICE</h3>
          <p className='my-3'>Gangapada,Bhubaneswar <br />Odisha 752090</p>
          <p className='my-3'>Tel:9827317265 <br />Email:rsahoo2023@gift.edu.in</p>
          <h1 className='text-lg font-semibold my-3 text-gray-700'>CAREERS AT HELLO DR.</h1>
          <p>Learn more about our teams and job openings.</p>
          <button className='px-5 py-4 border mt-4 text-black max-w-38'>Explore Jobs</button>

        </div>
      </div>
    </div>
  )
}

export default Contact