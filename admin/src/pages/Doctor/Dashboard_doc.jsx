import {useContext,useState,useEffect} from 'react'
import {DoctorContext} from '../../context/DoctorContext'
import { assets } from '../../assets/assets_admin/assets'
const Dashboard_doc = () => {
  const{getdashboard,dashdata,dtoken,cancelappointment,completeappointment}=useContext(DoctorContext)
  useEffect(() => {
    if(dtoken)
    getdashboard()
  }, [])
  
  return dtoken && (
     <div className='m-8'>
          <div className='flex items-center justify-start gap-5'>
            <div className='bg-white border border-gray-200 flex p-4 gap-3 rounded min-w-60 items-center cursor-pointer hover:scale-105 transition-all'>
              <img src={assets.earning_icon} alt="" />
              <div>
    
                <p className='text-2xl font-semibold'>{dashdata?.earning}</p>
                <p className='text-sm text-gray-600'>Earning</p>
              </div>
            </div>
            <div className='bg-white border border-gray-200 flex p-4 gap-3 rounded min-w-60 items-center cursor-pointer hover:scale-105 transition-all'>
              <img className='w-14' src={assets.appointments_icon} alt="" />
              <div>
    
                <p className='text-2xl font-semibold'>{dashdata?.appointment}</p>
                <p className='text-sm text-gray-600'>Appointments</p>
              </div>
            </div>
            <div className='bg-white border border-gray-200 flex p-4 gap-3 rounded min-w-60 items-center cursor-pointer hover:scale-105 transition-all'>
              <img src={assets.patients_icon} alt="" />
              <div>
    
                <p className='text-2xl font-semibold'>{dashdata?.patients}</p>
                <p className='text-sm text-gray-600'>Patients</p>
              </div>
            </div>
          </div>
          <div className='mt-8  bg-white border border-gray-200 rounded'>
            <div className='flex p-4 items-center gap-3.5 border-b border-gray-200'>
              <img src={assets.list_icon} alt="" />
              <p className='font-semibold'>Latest Appointment</p>
            </div>
            {dashdata?.latest_appointment && dashdata.latest_appointment.map((item, index) => (
              <div key={index} className='p-4 flex items-center justify-between hover:bg-gray-50  '>
                
                  <div className='flex items-center gap-2'>
    
                  <img className='h-10 w-10 rounded-full' src={item?.userData.image} alt="" />
                  <div>
                    <p className='font-semibold'>{item?.userData.name}</p>
                    <p className='text-sm text-gray-600'>Booking on {item?.slotDate}</p>
                  </div>
                  </div>
                  {
                item.cancelled?<p className='text-red-500 font-medium'>Cancelled</p>:
                item.iscompleted?<p className='text-green-600 font-medium' >Completed </p>:
                <div className='flex gap-2 items-center justify-start'>
                <img onClick={()=>cancelappointment(item._id)} className='cursor-pointer w-10' src={assets.cancel_icon} alt="" />
                <img onClick={()=>completeappointment(item._id)}className='cursor-pointer w-10' src={assets.tick_icon} alt="" />
              </div>
              }
                
    
              </div>
            ))}
          </div>
        </div>
  )
}

export default Dashboard_doc