import React, { useContext, useEffect,useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { AppContext } from '../context/AppContextProvider'

const My_appointment = () => {
  const {doctors,backendurl,userdata,getappointments,fetchDoctors}=useContext(AppContext)
  const [first, setfirst] = useState(0)
  const [appointments, setappointments] = useState([])
  useEffect(() => {
    const fetchAppointments = async () => {
      const result = await getappointments();
      setappointments(result.reverse());
      fetchDoctors();

    };
    fetchAppointments();
  }, [first])
  console.log(appointments)
  const cancelappointment=async(appointmentId)=>{
    try{
      const {data}=await axios.post(backendurl+"/user/cancelappointment",{userId:userdata._id,appointmentId},{withCredentials:true })
      if(data.success){
        toast.success(data.message);
        setfirst(first+1)
      }
      else{
        toast.error(data.message);
      }
    }catch(err){
      console.log(err)
      toast.error(err)
    }
  
  }
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
              <p>{item.cancelled}</p>
              <p className='mt-1 '><span className='font-medium text-zinc-700'>Date & Time:</span> {item.slotDate} | {item.slotTime}</p>
            </div>
            <div className='flex flex-col gap-2 justify-end text-sm'>
              {!item.cancelled && <button className='hover:bg-[#5F6FFF] hover:text-white transition-all duration-300 px-8 py-2 rounded border border-gray-300'>Pay Online</button>}
             {!item.cancelled && <button onClick={async()=>{await cancelappointment(item._id)}} className='hover:bg-[#ff0000] hover:text-white transition-all duration-300 px-8 py-2 rounded border border-gray-300'>Cancel appointment</button>}
             {item.cancelled && <button disabled className='bg-white text-red-700 px-8 py-2 rounded border border-red-600 cursor-not-allowed'>Appointment Cancelled</button>}
             </div>

        </div>
      )))
    }
    </div>
  )
}

export default My_appointment