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

  const checkAuth = async () => {
      try {
        const { data } = await axios.get(backendurl + "/user/authuser",
          { withCredentials: true }
        );
        settoken(data.success);
      } catch (err) {
        settoken(false);
      } finally {
        setIsChecking(false);
      }
    };
    useEffect(() => {
      fetchDoctors(); 
      checkAuth();
    }, [])

const value={
  doctors,currencySymbol,backendurl,token,isChecking,settoken
}
  return (
    <AppContext.Provider value={value}>
        {props.children}
    </AppContext.Provider>
  )
}

export default AppContextProvider