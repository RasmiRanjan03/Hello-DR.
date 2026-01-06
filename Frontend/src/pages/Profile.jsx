import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../assets/assets_frontend/assets'
import axios from 'axios'
import { AppContext } from '../context/AppContextProvider'
import { toast } from 'react-toastify'

const Profile = () => {
  const {backendurl,getuserdata,userdata,setuserdata}=useContext(AppContext)
  
  useEffect(()=>{getuserdata()},[])

  const [state, setstate] = useState('')
  const [image, setimage] = useState(false)
  
  const onSubmitHandler=async(event)=>{
    if(event && event.preventDefault) event.preventDefault();
    const formdata=new FormData();
    formdata.append('name',userdata.name)

    formdata.append('phone',userdata.phone)
    formdata.append('address',JSON.stringify(userdata.address))
    formdata.append('gender',userdata.gender)
    formdata.append('dob',userdata.dob)
    image && formdata.append('image',image) 
    try{
      const {data}=await axios.post(backendurl+'/user/updateprofile',formdata,{withCredentials:true})
      if(data.success){
        toast.success('Profile updated successfully') 
        setstate('')
        setuserdata(data.user)
      }
      else{
        toast.error(data.message)
      }
    }catch(err){
      console.log('update error',err)
      toast.error('Update failed')
    }
  }

  return userdata && (

      <div className='max-w-lg flex flex-col gap-2 text-sm mt-5'>
        {
          state?
          <label htmlFor="image">
          <div className='inline-block relative cursor-pointer'>
        <img className='w-36 rounded opacity-85' src={image? URL.createObjectURL(image): userdata.image} alt="" />
        <img className='w-10 absolute bottom-12 right-12' src={image ? "":assets.upload_icon} alt="" />
          </div>
          <input onChange={(e)=>{setimage(e.target.files[0])}} type="file" id='image' hidden />

        </label>:
        <img className='w-36 rounded ' src={userdata.image} alt="" />
        }
    
        
        {state?
        <input className='bg-gray-100 text-3xl font-medium max-w-60 mt-4 p-0.5' onChange={e=> setuserdata(prev=>({...prev,name:e.target.value}))} value={userdata.name} />:
        <p className='text-3xl font-medium max-w-60 mt-4' >{userdata.name}</p>
        }
        <hr className='text-gray-300'/>
        <div className='mt-3 '>
          <p className='underline text-gray-600'>CONTACT INFORMATION</p>
          <div className='grid grid-cols-[1fr_3fr] gap-y-2 mt-3 text-neutral-700'>
            <p className='font-medium'>Email id:</p>
            <p className='text-blue-500'>{userdata.email}</p>
            <p className='font-medium'>Phone:</p>
            {
              state?
              <input className='bg-gray-100  font-medium max-w-60 p-0.5' type="number" onChange={e=> setuserdata(prev=>({...prev,phone:e.target.value})) } name="" id="" value={userdata.phone}/>:
              <p className='text-blue-500'>{userdata.phone}</p>
            }
            <p className='font-medium'>address:</p>
            {state?
            <p>
              <input type="text"  onChange={e=> setuserdata(prev=> ({ ...prev, address: { ...prev.address, line1: e.target.value } })) } name="" id="" value={userdata.address.line1}  />
              <br />
              <input type="text"  onChange={e=> setuserdata(prev=> ({ ...prev, address: { ...prev.address, line2: e.target.value } })) } name="" id="" value={userdata.address.line2}  />
              
            </p>:
            <p>{userdata.address.line1}
            <br />
            {userdata.address.line2}
            </p>
          }
          </div>
          <div className='mt-3'>
            <p className='underline text-gray-600'>BASIC INFORMATION</p>
            <div className='grid grid-cols-[1fr_3fr] gap-y-2 mt-3 text-neutral-700'>
              <p>Gender:</p>
              {state?
              <select  onChange={e=> setuserdata(prev=>({...prev,gender:e.target.value})) } value={userdata.gender}>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>:
              <p>{userdata.gender}</p>}
              <p>Birthday</p>
              {
                state?
                <input type='date' onChange={e=> setuserdata(prev=>({...prev,dob:e.target.value})) } value={userdata.dob}/>:
                <p>{userdata.dob}</p>
              }

            </div>
          </div>
          <div className='mt-12'>
            {
              state?
              <button className='border border-blue-600 rounded-full px-8 py-3 hover:bg-[#5F6FFF] hover:text-white' onClick={onSubmitHandler}>Save Info</button>:
              <button className='border border-blue-600 rounded-full px-8 py-3 hover:bg-[#5F6FFF] hover:text-white' onClick={()=>setstate('edit')}>Edit</button>
            }
          </div>
        </div>
      </div>

  )
}

export default  Profile