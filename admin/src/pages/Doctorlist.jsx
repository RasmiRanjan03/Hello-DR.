import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../context/AdminContext'
const Doctorlist = () => {
  const {atoken,doctors,getdoctor,changeavailability}=useContext(AdminContext)
  useEffect(() => {
    if(atoken){
      getdoctor();
    }
  }, [atoken])
  return (
    <div className='m-8 text-gray-700'>
      <p className='mb-8 font-medium text-xl'>All Doctors</p>
      <div className=' flex items-center justify-start ml-8 flex-wrap gap-4 pt-5 gap-y-6 px-3 sm:px-0'>
          {doctors.map((item) => (
  <div
    key={item._id}   
    className="cursor-pointer rounded-2xl border border-blue-200 w-54 overflow-hidden hover:-translate-y-2.5 transition-all duration-400"
  >
    <div>
      <img className="bg-blue-50  hover:bg-indigo-500 w-full" src={item.image} alt={item.name} />
    </div>

    <div className="m-4">
     

      <p className="text-lg font-medium">{item.name}</p>
      <h4 className="text-sm font-normal text-gray-500">
        {item.speciality}
      </h4>
       <div className="flex items-center gap-1">
        <input onChange={() => changeavailability(item._id)} type="checkbox" name="available" id="" checked={item.available}  />  
        <p>Available</p>
      </div>
    </div>
  </div>
))}

        </div>
    </div>
  )
}

export default Doctorlist