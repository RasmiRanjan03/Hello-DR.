import {useContext,useEffect} from 'react'
import { AdminContext } from '../context/AdminContext.jsx';
import { AppContext } from '../context/AppContext.jsx';
import { assets } from '../assets/assets_admin/assets.js';

const Appointment = () => {
  const { appointments, getappointments,cancelappointment } = useContext(AdminContext);
  const { calculateage } = useContext(AppContext);
  useEffect(() => {
    getappointments();
  }, [])
  console.log(appointments);
  return (
    <div className='m-8 w-full text-gray-700'>
      <p className='mb-8 font-medium text-xl'>All Appointments</p>
      <div className='bg-white border-gray-300 border  rounded test-sm max-h-[74vh] min-h-[60vh]  overflow-y-scroll'>
        <div className='hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] grid-flow-col py-3 px-6 border-b border-gray-300 font-medium sticky top-0 bg-white'>
          <p>#</p>
          <p>Patient Name</p>
          <p>Age</p>
          <p>Date&Time</p>
          <p>Doctor</p>
          <p>Fees</p>
          <p>Action</p>
        </div>
        {appointments && appointments.reverse().map((appointment, index) => (
          <div key={appointment._id} className='hover:bg-gray-100 grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] grid-flow-col py-4 px-6 border-b border-gray-300 items-center'>
            <p>{index + 1}</p>
            <div className='flex gap-3'><img className='w-8 h-8 rounded-full ' src={appointment.userData.image} alt="" />
            <span><p>{appointment.userData.name}</p></span>
            </div>
            <p>{calculateage(appointment.userData.dob)}</p>
            <p>{appointment.slotDate} {appointment.slotTime}</p>
            <div className='flex gap-3'><img className='w-8 h-8 rounded-full ' src={appointment.docData.image} alt="" />
            <span><p>{appointment.docData.name}</p></span>
            </div>
            <p>₹{appointment.docData.fees}</p>
            {
              appointment.cancelled?<p className='text-red-500 font-medium'>Cancelled</p>:<img onClick={()=>cancelappointment(appointment._id)} className='cursor-pointer w-10' src={assets.cancel_icon} alt="" />
            }
          </div>))}
      </div>
    </div>
  )
}
export default Appointment