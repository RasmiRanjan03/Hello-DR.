import React from 'react'
import {specialityData} from '../assets/assets_frontend/assets'
import { Link } from 'react-router-dom'

const Speciality = () => {
    console.log(specialityData)
  return (
    <div className='flex flex-col pt-16 justify-center items-center gap-3 '>
        <h1 className='text-3xl font-medium '>Find by Speciality</h1>
        <p className='   '>Simply browse through our extensive list of trusted doctors, schedule your appointment hassle-free.</p>
        <div className='flex flex-col md:flex-row justify-center items-center gap-4 mt-5'>{specialityData.map((items,index)=>{
          return( <Link className='flex flex-col justify-center items-center hover:-translate-y-2.5 transition-all duration-500' key={index} to={`doctors/${items.speciality}`}>
            <img className='w-16 sm:w-24 mb-2' src={items.image} alt="Hello" />
            <p className='text-xs font-normal'>{items.speciality}</p>
           </Link>)
        })}
        </div>
    </div>
  )
}

export default Speciality