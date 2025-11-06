import React, { useContext } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { AppContext } from '../context/AppContextProvider';
const TopDoctors = () => {
    const navigate=useNavigate();
    const doctors=useContext(AppContext)
  return (
    <div className='flex flex-col gap-4 text-gray-900 items-center justify-center my-32 md:mx-10'>
        <h1 className='text-3xl font-medium'>Top Doctors to Book </h1>
        <p className='text-sm font-normal w-1/3 text-center'> Simply browse through our extensive list of trusted doctors.</p>
        <div className='w-full flex items-center justify-center flex-wrap gap-4 pt-5 gap-y-6 px-3 sm:px-0'>
            {doctors.slice(0,10).map((item,index)=>(
                <Link 
                  key={item._id} 
                  to={`/appointment/${item._id}`}
                  className='cursor-pointer rounded-2xl border border-blue-200 w-54 overflow-hidden hover:-translate-y-2.5 transition-all duration-400'
                >
                  <div><img className='bg-blue-50 w-full' src={item.image} alt={item.name} /></div>
                  <div className='m-4'>
                    <div className='flex items-center gap-4 text-green-500'>
                      <p className='bg-green-500 w-2 h-2 rounded-full'></p>
                      <p>Available</p>
                    </div>
                    <p className='text-lg font-medium'>{item.name}</p>
                    <h4 className='text-sm font-normal text-gray-500'>{item.speciality}</h4>
                  </div>
                </Link>
                
            ))}
            <button onClick={()=>{
                navigate('/doctors');
                scrollTo(0,0);
            }} className='mt-8 px-8 py-3 bg-blue-100 text-gray-500 rounded-4xl'>more</button>
        </div>
    </div>
  )
}

export default TopDoctors