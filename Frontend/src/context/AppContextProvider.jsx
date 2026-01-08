import React, { createContext,useState,useEffect } from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';
export const AppContext=createContext();
const backendurl=import.meta.env.VITE_BACKEND_URL
const AppContextProvider = (props) => {

const currencySymbol='$'
const [token, settoken] = useState(false)
const [doctors, setdoctors] = useState([])
const [isChecking, setIsChecking] = useState(true)
const [userdata, setuserdata] = useState()

const fetchDoctors = async () => {
  try {
    const { data } = await axios.get(backendurl + "/api/doctor/get-doctors");
    if(data.success)
    setdoctors(data.doctors);
  else{
    navigate('/login');
    toast.error(data.message)
  }
  } catch (error) {
    console.log(error);
  }
};
  const getuserdata=async()=>{
    try{
      const {data}=await axios.get(backendurl+"/user/profile",{withCredentials:true})
      if(data.success){
        setuserdata(data.user)
      }
      else{
        toast.error(data.message)
      }
    }
    catch(err){
      toast.error(err)
    }
  }

  const checkAuth = async () => {
      try {
        const { data } = await axios.get(backendurl + "/user/authuser",
          { withCredentials: true }
        );
        settoken(data.success);
        if(data.success) {
          await getuserdata();
        }
      } catch (err) {
        settoken(false);
      } finally {
        setIsChecking(false);
      }
    };
    const getappointments=async()=>{
      try{
        const {data}=await axios.post(backendurl+"/user/getappointments",{userId:userdata._id},{withCredentials:true})
        if(!data.success){
          toast.error(data.message)}
        else{
          return data.appointments;
        }
        }
        catch(err){
          toast.error(err)
        }}
    useEffect(() => {
      fetchDoctors(); 
      checkAuth();
    }, [])
    
    useEffect(() => {
      if(token) {
        getuserdata();
      }
    }, [token])

const value={
  doctors,currencySymbol,backendurl,token,isChecking,settoken,getuserdata,userdata,setuserdata,fetchDoctors,getappointments
}
  return (
    <AppContext.Provider value={value}>
        {props.children}
    </AppContext.Provider>
  )
}

export default AppContextProvider