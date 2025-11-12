import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContextProvider'
import { useNavigate, useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { assets } from '../assets/assets_frontend/assets'

const Appoontment = () => {
  const navigate=useNavigate()
  const {docId}=useParams()
  const {doctors,currencySymbol}=useContext(AppContext)  
  const dates=['SUN','MON','TUE','WED','THU','FRI','SAT']

  const [doc, setdoc] = useState(null)
  const [docSlots, setdocSlots] = useState([])
  const [slotIndex, setslotIndex] = useState(0)
  const [slotTime, setslotTime] = useState('')
  const getdocdata=async ()=>{
    const docInfo=doctors.find(doc=>doc._id==docId)
    console.log(docInfo)
    
    
    setdoc(docInfo)
  }

const getAvailableSlotes=()=>{
  setdocSlots([])
  let today=new Date()
  for (let i=0;i<7;i++){
    let currentDate=new Date(today)
    currentDate.setDate(today.getDate()+i)

    let endTime=new Date()
    endTime.setDate(today.getDate()+i)
    endTime.setHours(21,0,0,0)

    if(today.getDate() == currentDate.getDate()){
      currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() +1 :10)
      currentDate.setMinutes(currentDate.getMinutes()> 30? 0:30)
    }
    else{
      currentDate.setHours(10)
      currentDate.setMinutes(0)

    }
    let timeSlots=[]
    while(currentDate<endTime){
      let formartedTime= currentDate.toLocaleTimeString([],{hour : '2-digit', minute:'2-digit'})
      timeSlots.push({datetime:new Date(currentDate),
        time:formartedTime
      })

      currentDate.setMinutes(currentDate.getMinutes()+30)
    }
    setdocSlots(prev=> ([...prev ,timeSlots]))
  }
}


  useEffect(() => {
    getdocdata();
  
 
  }, [docId,doctors])

  useEffect(() => {
    getAvailableSlotes()
  }, [doctors])

  useEffect(()=>{
    console.log(docSlots)
  },[docSlots])


  
  
  return doc && (
    <div className='mt-5' >
      <div className='flex flex-col sm:flex-row gap-4'>
        <div className=''>
          <img className='w-72  bg-[#5F6FFF] sm:max-w-72 rounded-lg' src={doc.image} alt="" />
        </div>
        <div className='py-7 px-8 border border-gray-400 rounded-lg flex-1 '>
          <p className='text-3xl font-medium flex items-center gap-3'>{doc.name} <img className='w-5' src={assets.verified_icon} alt="" /></p>
          <div className='flex items-center gap-5 text-gray-600 '><p >{doc.degree} - {doc.speciality}</p>
          <button className='px-2 py-0.5 rounded-full text-xs border border-gray-300'>{doc.experience}</button>
          </div>
          <div className='mt-3' >
            <p className='flex items-center gap-1.5 text-sm font-medium mt-3'>About <img className='w-3' src={assets.info_icon} alt="" /></p>
            <p className='text-sm text-gray-500 max-w-[700px]'>{doc.about}</p>
          </div>
          <p className='mt-4 text-gray-600'>Appointment fee: <span className='text-black'>{currencySymbol}{doc.fees}</span></p>
        </div>
      </div>
      <div>

        <div className='sm:ml-72 sm:pl-4 mt-8 font-medium text-gray-700'>
          <p>Booking Slots</p>
          <div className='flex gap-3 items-center w-full overflow-x-scroll mt-4'>{
            docSlots.length && docSlots.map((item,index)=>(
              <div className={`text-center py-6 min-w-16 cursor-pointer rounded-full border border-gray-200 ${slotIndex==index ? 'bg-[#5F6FFF] text-white':''}`} key={index}
              onClick={()=>setslotIndex(index)}>
                <p>{item[0] && dates[item[0].datetime.getDay()]}</p>
                <p>{item[0] && item[0].datetime.getDate()}</p>
                </div>
            ))
            }</div>
           
           
              <div  className='flex items-center gap-2  flex-row w-full overflow-x-scroll mt-4'>
              {
                docSlots.length && docSlots[slotIndex].map((item,index)=>(
                    <p onClick={()=>{
                      setslotTime(item.time)
                    }} className={`cursor-pointer shrink-0 px-6 py-2 text-gray-400 font-light text-sm border border-gray-200 rounded-full  ${item.time==slotTime ? 'bg-[#5F6FFF] text-white':""}`}>{item.time.toLowerCase()}</p>
                    
                ))
              }
                </div>
            
            <button onClick={()=>{
              console.log('HI')
              navigate('/My_appointment')
            }} className='bg-[#5F6FFF] cursor-pointer text-white text-sm font-light mt-6 px-20 py-3 rounded-full'>Book an appointment</button>
        </div>
      </div>
      <div className='mt-20'>
        <h2 className='text-3xl font-medium text-center'>Related Doctors</h2>
        <p className='my-5 text-sm font-normal text-center '>Simply browse through our extensive list of trusted doctors.</p>
        <div className='w-full flex items-center  flex-wrap gap-4 pt-5 gap-y-6 px-3 sm:px-0'>
            {doctors.filter(x=>x.speciality==doc.speciality && x._id!=doc._id).map((item,index)=>(
                <Link 
                  key={item._id} onClick={() => window.scrollTo(0, 0)}
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
            
        </div>
      </div>
    </div>
  )
}

export default Appoontment