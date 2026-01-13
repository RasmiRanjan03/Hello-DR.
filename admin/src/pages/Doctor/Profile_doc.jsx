import {useState,useEffect,useContext} from 'react'
import { AppContext } from '../../context/AppContext'
import { DoctorContext } from '../../context/DoctorContext'
import {toast} from 'react-toastify'
import axios from 'axios'
const Profile_doc = () => {
  const{getprofile,dtoken,setprofiledata,profiledata,backendurl}=useContext(DoctorContext)
  const [isedit, setisedit] = useState(false)
   const updateprofile=async(fees,available,address)=>{
        try{
            const {data}=await axios.post(backendurl+"/api/doctor/updateprofile",{fees,available,address},{withCredentials:true})
            if(data.success){
                getprofile();
                toast.success("Update Successfully")
                setisedit(false)
            }
            else{
                toast.error(data.message)
            }
        }catch(error){
            toast.error(error)
            console.log(error)
        }
    }
  useEffect(() => {
    if(dtoken){
      getprofile()
    }
  }, [])
  
  return profiledata&&(
    <div>
      <div className='flex flex-col gap-4 m-5'>
        <div className='bg-indigo-600 sm:max-w-64 rounded-lg'>
          <img src={profiledata.image} alt="" />
        </div>
        <div className='flex-1 border border-stone-100 rounded-lg p-8 py-7 bg-white'>
          <p className='flex items-center text-gray-800 gap-2 text-3xl font-medium'>{profiledata.name}</p>
          <div className='flex items-center text-gray-600 gap-2 mt-1'>
            <p>{profiledata.degree} - {profiledata.speciality}</p>
            <button className='py-0.5 px-2 text-xs rounded-full border'>{profiledata.experience} years</button>
          </div>
          <div>
            <p className='flex items-center gap-1 text-sm font-medium text-neutral-800 mt-3'>About:</p>
            <p className='text-sm max-w-3xl text-gray-600 mt-1'>{profiledata.about}</p>
          </div>
          <p className='mt-3 text-gray-700'>Appointment fees:<span className='text-black'>{isedit? <input type='number' onChange={(e)=>setprofiledata(prev=>({...prev,fees:e.target.value}))} value={profiledata.fees}/> 
          :profiledata.fees}</span></p>
          <div className='flex  py-2 gap-2'>
            <p>Address:</p>
            <p className='text-sm  gap-1.5'>
              {isedit?<input type='text' onChange={(e)=>setprofiledata(prev=>({...prev,address:{...prev.address,line1:e.target.value}}))} value={profiledata.address.line1} />:profiledata.address.line1}<br/>
              {isedit?<input type='text' onChange={(e)=>setprofiledata(prev=>({...prev,address:{...prev.address,line2:e.target.value}}))} value={profiledata.address.line2}/>:profiledata.address.line2}
            </p>
          </div>
          <div className='flex gap-1 pt-2'>
            <input type="checkbox" checked={profiledata.available} onChange={()=>isedit&& setprofiledata(prev=>({...prev,available:!prev.available}))} name="" id="" />
            <label htmlFor="">Availble</label>
          </div>
          {isedit?
          <button onClick={()=>updateprofile(profiledata.fees,profiledata.available,profiledata.address)} className='px-4 py-1 text-sm  border-indigo-600 border rounded-full mt-3'>Save</button>
          :<button onClick={()=>setisedit(true)} className='px-4 py-1 text-sm  border-indigo-600 border rounded-full mt-3'>Edit</button>
          
          
        }
        </div>
      </div>
    </div>
  )
}

export default Profile_doc