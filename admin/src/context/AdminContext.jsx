import { createContext } from "react";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AdminContext=createContext();

const backendurl=import.meta.env.VITE_BACKEND_URL


    const AdminContextProvider=(props)=>{
      const [doctors, setdoctors] = useState([])
        const getdoctor=async()=>{
          try{
            const {data}=await axios.post(backendurl+'/api/admin/all-doctors',{},{withCredentials:true})
            if(data.success){
              setdoctors(data.doctors)
            }
            else{
              toast.error(data.message)
            }
          }
          catch(e){
            toast.error(e)
        }}
       
        const logoutAdmin = async () => {
            try {
                await axios.post("http://localhost:3000/api/admin/logout-admin",{},{withCredentials:true})
                setatoken(false);
                console.log("Admin logged out successfully");

            } catch (err) {
                console.log(err);}
            };
        const [atoken, setatoken] = useState(true);
        const checkAuth = async () => {
      try {
        const { data } = await axios.get("http://localhost:3000/api/admin/check-auth", {
          withCredentials: true,
        });
        if (!data.success) {
          setatoken(false);
          console.log("Admin not authenticated");
        }
      } catch (err) {
        console.log(err);
        setatoken(false);
      }
    };
    const changeavailability=async(doctorId)=>{
      try{
        const {data}=await axios.post(backendurl+'/api/admin/change-availability',{doctorId},{withCredentials:true})
        if(data.success){
          toast.success(data.message);
          getdoctor();
        }
        else{
          toast.error(data.message);
        }
      }catch(err){
        console.log(err);
        toast.error(err.message);
      }}
    
        checkAuth();
    const value={
        atoken,setatoken,backendurl,logoutAdmin,doctors,getdoctor,changeavailability
      }

    return (
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    )
}
export default AdminContextProvider