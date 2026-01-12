import {React,useState,useContext} from 'react'
import { AdminContext } from '../../context/AdminContext'
import axios from 'axios'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { DoctorContext } from '../../context/DoctorContext';
import { AppContext } from '../../context/AppContext';
const Login = () => {
  const navigate=useNavigate()
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')
  const {state,setstate}=useContext(AppContext)
  const {setatoken,backendurl}=useContext(AdminContext)
  const {setdtoken,dtoken,doclogin}=useContext(DoctorContext)
  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try{
      if(state==='Admin'){
        const {data}=await axios.post(backendurl+"/api/admin/login-admin",{email,password},{withCredentials:true})
        if(data.success){
          
          setatoken(data.token)
          console.log("Admin logged in successfully");
          
          toast("Admin logged in successfully",{type:'success'})
          

        }
        else{
          toast(data.message,{type:'error'})
          console.log("Admin login failed");
        }
    }
    else{
      const response=await axios.post(backendurl+'/api/doctor/doctor-login',{email,password},{withCredentials:true});
            if(response.data.success){
                setdtoken(true);
                toast.success(response.data.message)  
            }
            else{
                toast.error(response.data.message)
            }

    }
  }
  catch(error){
    console.log("ERROR");
    
    console.log(error);

  }


  }
  return (
    <>
    <form onSubmit={onSubmitHandler} className='flex min-h-[80vh] items-center'>
        <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-90 border text-sm border-gray-300 rounded-xl text-zinc-600 shadow-lg'>
          
          <div className='flex justify-center items-center w-full'>
            <h1 className='text-2xl  font-semibold text-blue-500'>{state === 'Admin' ? 'Admin' : 'Doctor'}<span className='text-zinc-600'> Login</span></h1>
            </div>
          <p>Email</p>
          <input className='border border-zinc-200 rounded p-2 w-full' onChange={(e) => setemail(e.target.value)} type='email' value={email} />
          <p>Password</p>
          <input className='border border-zinc-200 rounded p-2 w-full' onChange={(e) => setpassword(e.target.value)} type='password' value={password} />
          <button className='flex items-center justify-center bg-[#5F6FFF] text-white w-full p-2 rounded-lg' type='submit'>Login</button>
          <p>
            {state === 'Admin' ? 'Doctor login?' : "Admin login?"}
            <span className='text-blue-500 cursor-pointer underline ml-1.5' onClick={() => setstate(state === 'Doctor' ? 'Admin' : 'Doctor')}>
              Click here
            </span>
          </p>

        </div>
      </form>
    </>
  )
}

export default Login