import React, { useState } from 'react'
import { assets } from '../assets/assets_frontend/assets'

const Profile = () => {
  const [userData, setuserData] = useState({
    img:assets.profile_pic,
    name:'Rasmi',
    Email:'rsahoo2023@gift.edu.in',
    phone:9827317265,
    Address:{
      line1:'Gangapada , Jatani',
      line2:'Bhubaneswar Odisha 752054'
    },
    gender:'Male',
    birthday:'2005-10-17'
  })
  const [state, setstate] = useState('edit')
  return (

      <div className='max-w-lg flex flex-col gap-2 text-sm mt-5'>
        <img className='w-36 rounded' src={userData.img} alt="" />
        {state?
        <input className='bg-gray-100 text-3xl font-medium max-w-60 mt-4 p-0.5' onChange={e=> setuserData(prev=>({...prev,name:e.target.value}))} value={userData.name} />:
        <p className='text-3xl font-medium max-w-60 mt-4' >{userData.name}</p>
        }
        <hr className='text-gray-300'/>
        <div className='mt-3 '>
          <p className='underline text-gray-600'>CONTACT INFORMATION</p>
          <div className='grid grid-cols-[1fr_3fr] gap-y-2 mt-3 text-neutral-700'>
            <p className='font-medium'>Email id:</p>
            <p className='text-blue-500'>{userData.Email}</p>
            <p className='font-medium'>Phone:</p>
            {
              state?
              <input className='bg-gray-100  font-medium max-w-60 p-0.5' type="number" onChange={e=> setuserData(prev=>({...prev,phone:e.target.value})) } name="" id="" value={userData.phone}/>:
              <p className='text-blue-500'>{userData.phone}</p>
            }
            <p className='font-medium'>Address:</p>
            {state?
            <p>
              <input type="text"  onChange={e=> setuserData(prev=>({...prev.Address,line1:e.target.value})) } name="" id="" value={userData.Address.line1}  />
              <br />
              <input type="text"  onChange={e=> setuserData(prev=>({...prev.Address,line2:e.target.value})) } name="" id="" value={userData.Address.line2}  />
              
            </p>:
            <p>{userData.Address.line1}
            <br />
            {userData.Address.line2}
            </p>
          }
          </div>
          <div className='mt-3'>
            <p className='underline text-gray-600'>BASIC INFORMATION</p>
            <div className='grid grid-cols-[1fr_3fr] gap-y-2 mt-3 text-neutral-700'>
              <p>Gender:</p>
              {state?
              <select  onChange={e=> setuserData(prev=>({...prev,gender:e.target.value})) } value={userData.gender}>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>:
              <p>{userData.gender}</p>}
              <p>Birthday</p>
              {
                state?
                <input type='date' onChange={e=> setuserData(prev=>({...prev,birthday:e.target.value})) } value={userData.birthday}/>:
                <p>{userData.birthday}</p>
              }

            </div>
          </div>
          <div className='mt-12'>
            {
              state?
              <button className='border border-blue-600 rounded-full px-8 py-3 hover:bg-[#5F6FFF] hover:text-white' onClick={()=>setstate('')}>Save Info</button>:
              <button className='border border-blue-600 rounded-full px-8 py-3 hover:bg-[#5F6FFF] hover:text-white' onClick={()=>setstate('edit')}>Edit</button>
            }
          </div>
        </div>
      </div>

  )
}

export default  Profile