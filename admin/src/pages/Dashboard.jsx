import { useContext, useEffect } from 'react'
import { AdminContext } from '../context/AdminContext.jsx';
import { assets } from '../assets/assets_admin/assets';


const Dashboard = () => {
  const { dashboarddata, dashdata, atoken,cancelappointment } = useContext(AdminContext);

  useEffect(() => {
    if (atoken)
      dashboarddata();
  }, []);

  return atoken && (
    <div className='m-8'>
      <div className='flex items-center justify-start gap-5'>
        <div className='bg-white border border-gray-200 flex p-4 gap-3 rounded min-w-60 items-center cursor-pointer hover:scale-105 transition-all'>
          <img src={assets.doctor_icon} alt="" />
          <div>

            <p className='text-2xl font-semibold'>{dashdata?.totaldoctors}</p>
            <p className='text-sm text-gray-600'>Doctors</p>
          </div>
        </div>
        <div className='bg-white border border-gray-200 flex p-4 gap-3 rounded min-w-60 items-center cursor-pointer hover:scale-105 transition-all'>
          <img className='w-14' src={assets.appointments_icon} alt="" />
          <div>

            <p className='text-2xl font-semibold'>{dashdata?.totalappointments}</p>
            <p className='text-sm text-gray-600'>Appointments</p>
          </div>
        </div>
        <div className='bg-white border border-gray-200 flex p-4 gap-3 rounded min-w-60 items-center cursor-pointer hover:scale-105 transition-all'>
          <img src={assets.patients_icon} alt="" />
          <div>

            <p className='text-2xl font-semibold'>{dashdata?.totalpatients}</p>
            <p className='text-sm text-gray-600'>Patients</p>
          </div>
        </div>
      </div>
      <div className='mt-8  bg-white border border-gray-200 rounded'>
        <div className='flex p-4 items-center gap-3.5 border-b border-gray-200'>
          <img src={assets.list_icon} alt="" />
          <p className='font-semibold'>Latest Appointment</p>
        </div>
        {dashdata?.lastappointments && dashdata.lastappointments.map((item, index) => (
          <div key={index} className='p-4 flex items-center justify-between hover:bg-gray-50  '>
            
              <div className='flex items-center gap-2'>

              <img className='h-10 w-10 rounded-full' src={item?.docData.image} alt="" />
              <div>
                <p className='font-semibold'>{item?.docData.name}</p>
                <p className='text-sm text-gray-600'>Booking on {item?.slotDate}</p>
              </div>
              </div>
              {
              item.cancelled?<p className='text-red-500 font-medium'>Cancelled</p>:<img onClick={()=>cancelappointment(item._id)} className='cursor-pointer w-10' src={assets.cancel_icon} alt="" />
            }
            

          </div>
        ))}
      </div>
    </div>
  )
}

export default Dashboard