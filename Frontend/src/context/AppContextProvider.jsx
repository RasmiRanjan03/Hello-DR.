import React, { createContext } from 'react'
import { doctors } from '../assets/assets_frontend/assets';
export const AppContext=createContext();
const backendurl=import.meta.env.VITE_BACKEND_URL
const AppContextProvider = (props) => {

const currencySymbol='$'

const value={
  doctors,currencySymbol,backendurl
}
  return (
    <AppContext.Provider value={value}>
        {props.children}
    </AppContext.Provider>
  )
}

export default AppContextProvider