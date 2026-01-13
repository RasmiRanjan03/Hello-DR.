import React, { useContext, useEffect, useState } from 'react'
import {AppContext} from '../context/AppContextProvider'
import { Link, useNavigate, useParams } from 'react-router-dom';

const Doctors = () => {
  const {specialize}=useParams();
  const [docfilter, setdocfilter] = useState([])
  const {doctors}=useContext(AppContext);
  const navigate=useNavigate();
  
  
  const applyfilter=()=>{
    if (specialize){
      setdocfilter(doctors.filter(doc =>doc.speciality==specialize))
      
      console.log(docfilter)
    }
    else{
      setdocfilter(doctors)
    }
  }
  useEffect(() => {
    applyfilter();
    console.log('hi');
    
    
  
    
  }, [doctors,specialize])

  return (
    <div className='mt-5'>
      <p className='text-gray-700'>Browse through the doctors specialist.</p>
      <div className='flex flex-col md:flex-row '>
        <div className='w-1/6 pt-5 gap-y-6 px-3 sm:px-0'>
          <ul className='text-sm flex flex-col gap-5'>
            <li onClick={()=>specialize==='General physician'?navigate('/doctors'):navigate('/doctors/General physician')} className={` m-auto md:m-0 cursor-pointer px-2.5 py-1.5 items-center rounded border border-gray-300 text-gray-600 ${specialize==='General physician'?'bg-blue-50': ''}`}>General physician</li>
            <li onClick={()=>specialize==='Gynecologist'?navigate('/doctors'):navigate('/doctors/Gynecologist')} className={`m-auto md:m-0 cursor-pointer px-2.5 py-1.5 items-center rounded border border-gray-300 text-gray-600 ${specialize==='Gynecologist'?'bg-blue-50':''} `}>Gynecologist</li>
            <li onClick={()=>specialize==='Dermatologist'?navigate('/doctors'):navigate('/doctors/Dermatologist')} className={`m-auto md:m-0 cursor-pointer px-2.5 py-1.5 items-center rounded border border-gray-300 text-gray-600 ${specialize==='Dermatologist'?'bg-blue-50':''}` }>Dermatologist</li>
            <li onClick={()=>specialize==='Pediatricians'?navigate('/doctors'):navigate('/doctors/Pediatricians')} className={`m-auto md:m-0 cursor-pointer px-2.5 py-1.5 items-center rounded border border-gray-300 text-gray-600 ${specialize==='Pediatricians'?'bg-blue-50':''}`}>Pediatricians</li>
            <li onClick={()=>specialize==='Neurologist'?navigate('/doctors'):navigate('/doctors/Neurologist')} className={`m-auto md:m-0 cursor-pointer px-2.5 py-1.5 items-center rounded border border-gray-300 text-gray-600 ${specialize==='Neurologist'?'bg-blue-50':''}`}>Neurologist</li>
            <li onClick={()=>specialize==='Gastroenterologist'?navigate('/doctors'):navigate('/doctors/Gastroenterologist')} className={`m-auto md:m-0 cursor-pointer px-2.5 py-1.5 items-center rounded border border-gray-300 text-gray-600 ${specialize==='Gastroenterologist'?'bg-blue-50':''}`}>Gastroenterologist</li>
          </ul>
        </div>
        <div className='w-5/6 flex items-center justify-start ml-8 flex-wrap gap-4 pt-5 gap-y-6 px-3 sm:px-0'>
          {docfilter.map((item,index)=>(
             <Link 
                  key={item._id} 
                  to={`/appointment/${item._id}`}
                  className='cursor-pointer rounded-2xl border border-blue-200 w-54 overflow-hidden hover:-translate-y-2.5 transition-all duration-400'
                >
                  <div><img className='bg-blue-50 w-full' src={item.image} alt={item.name} /></div>
                  <div className='m-4'>
                    <div className='flex items-center gap-4 text-green-500'>
                      {item.available?<p className='bg-green-500 w-2 h-2 rounded-full'></p>:<p className='bg-red-500 w-2 h-2 rounded-full'></p>}
                      
                      {item.available?
                    <p className=''>Available</p>:<p className='text-red-600'>Not Available</p>  
                    }
                    </div>
                    <p className='text-lg font-medium'>{item.name}</p>
                    <h4 className='text-sm font-normal text-gray-500'>{item.speciality} </h4>
                  </div>
                </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Doctors