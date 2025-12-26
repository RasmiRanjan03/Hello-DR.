import React, { createContext,useState,useEffect } from 'react'
import { doctors } from '../assets/assets_frontend/assets';
import axios from 'axios';
export const AppContext=createContext();
const backendurl=import.meta.env.VITE_BACKEND_URL
const AppContextProvider = (props) => {

const currencySymbol='$'
const [token, settoken] = useState(false)

  const checkAuth = async () => {
      try {
        const { data } = await axios.get(backendurl + "/user/authuser",
          { withCredentials: true }
        );
        settoken(data.success);
      } catch (err) {
        settoken(false);
      }
    };
 checkAuth();

const value={
  doctors,currencySymbol,backendurl,token
}
  return (
    <AppContext.Provider value={value}>
        {props.children}
    </AppContext.Provider>
  )
}

export default AppContextProvider