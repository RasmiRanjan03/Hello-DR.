import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import {AppContext} from '../context/AppContextProvider'
import {toast} from "react-toastify"
const Login = () => {
  const [name, setname] = useState('')
  const [state, setstate] = useState('signup')
  const [gmail, setgmail] = useState('')
  const [password, setpassword] = useState('')
const navigate=useNavigate()
  const{backendurl}=useContext(AppContext)
  const onSubmitHandler = async (event) => {
    event.preventDefault()
    if(state=='signup'){
      try{
        const {data}=await axios.post(backendurl+"/user/signupuser",{gmail,name,password},{withCredentials:true})
        if(data.success){
          
          navigate('/')
          window.location.reload(); 
        }
        else{
          toast.error(data.message)
        }
      }
      catch(err){
        console.log(err)
        toast.error(err)
      }
     
    }
    else{
      try{
        const {data}=await axios.post(backendurl+"/user/loginuser",{gmail,password},{withCredentials:true})
        if(data.success){
          navigate('/')
          window.location.reload();
        }
        else{
          toast.error(data.message)
        }
      }
      catch(err){
        console.log(err)
        toast.error(err)
      }
    }

  }

  return (
    <>
      <form onSubmit={onSubmitHandler} className='flex min-h-[80vh] items-center'>
        <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] border text-sm border-gray-300 rounded-xl text-zinc-600 shadow-lg'>
          <h1 className='text-2xl font-semibold'>{state === 'signup' ? 'Create Account' : 'Login'}</h1>
          <p className=''>{state === 'signup' ? 'Please sign up to book appointment' : 'Please log in to book appointment'}</p>
          <p className={`${state === 'login' ? 'hidden' : ''}`}>Full Name</p>
          <input
            className={`${state === 'login' ? 'hidden' : ''} border border-zinc-200 rounded p-2 w-full`}
            onChange={(e) => setname(e.target.value)}
            type='text'
            name='name'
            value={name}
          />
          <p>Email</p>
          <input className='border border-zinc-200 rounded p-2 w-full' onChange={(e) => setgmail(e.target.value)} type='email' value={gmail} />
          <p>Password</p>
          <input className='border border-zinc-200 rounded p-2 w-full' onChange={(e) => setpassword(e.target.value)} type='password' value={password} />
          <br />
          <button className='flex items-center justify-center bg-[#5F6FFF] text-white w-full p-2 rounded-lg' type='submit'>{state === 'signup' ? 'Create Account' : 'Login'}</button>
          <p>
            {state === 'signup' ? 'Already have an account?' : "Don't have an account?"}{' '}
            <span className='text-blue-500 cursor-pointer underline' onClick={() => setstate(state === 'signup' ? 'login' : 'signup')}>
              {state === 'signup' ? 'Login here' : 'Create account'}
            </span>
          </p>

        </div>
      </form>
    </>

  )
}

export default Login