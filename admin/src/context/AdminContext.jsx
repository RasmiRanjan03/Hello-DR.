import { createContext } from "react";
import { useState } from "react";
export const AdminContext=createContext();

const backendurl=import.meta.env.VITE_BACKEND_URL
const AdminContextProvider=(props)=>{
    const [atoken, setatoken] = useState(localStorage.getItem('atoken') || '');
    const value={
        atoken,setatoken,backendurl  
      }
    return (
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    )
}
export default AdminContextProvider