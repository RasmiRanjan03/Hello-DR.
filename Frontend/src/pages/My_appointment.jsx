import React, { useContext, useEffect,useState } from 'react'
import { AppContext } from '../context/AppContextProvider'

const My_appointment = () => {
  const {doctors,userdata,getappointments}=useContext(AppContext)
  const [appointments, setappointments] = useState([])
  useEffect(() => {
    const fetchAppointments = async () => {
      const result = await getappointments();
      setappointments(result);

    };
    fetchAppointments();
  }, [])
  return (
    <div className='mt-12'>
      <h1 className='my-3 text-zinc-700 text-lg'>My appointments</h1>
      <hr />
    {
      appointments.map(((item,index)=>(
        <div className='grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-4 border-b  '>
          <div>

          <img className='w-36 bg-indigo-50' src={item.docData.image} alt="" />
          </div>

            <div className='flex-1 text-sm text-zinc-600'>
              <p className='font-semibold text-zinc-800 mb-1'>{item.docData.name}</p>
              <p>{item.docData.speciality}</p>
              <p className='font-medium mt-1 text-zinc-700 '>Address:</p>
              <p>{item.docData.address.line1}</p>
              <p>{item.docData.address.line2}</p>
              <p className='mt-1 '><span className='font-medium text-zinc-700'>Date & Time:</span> {item.slotDate} | {item.slotTime}</p>
            </div>
            <div className='flex flex-col gap-2 justify-end text-sm'>
              <button className='hover:bg-[#5F6FFF] hover:text-white transition-all duration-300 px-8 py-2 rounded border border-gray-300'>Pay Online</button>
              <button className='hover:bg-[#ff0000] hover:text-white transition-all duration-300 px-8 py-2 rounded border border-gray-300'>Cancel appointment</button>
            </div>

        </div>
      )))
    }
    </div>
  )
}

export default My_appointment