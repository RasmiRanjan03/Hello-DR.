import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";


export const AdminContext = createContext();

const backendurl = import.meta.env.VITE_BACKEND_URL

const AdminContextProvider = (props) => {
  const [doctors, setdoctors] = useState([])
  const [atoken, setatoken] = useState(false);
  const [appointments, setappointments] = useState([])
  const [dashdata, setdashdata] = useState(null)

  const getdoctor = async () => {
    try {
      const { data } = await axios.post(backendurl + '/api/admin/all-doctors', {}, { withCredentials: true })
      if (data.success) {
        setdoctors(data.doctors)
      } else {
        toast.error(data.message)
      }
    } catch (e) {
      toast.error(e.message || String(e))
    }
  }

  const logoutAdmin = async () => {
    try {
      await axios.post(backendurl + "/api/admin/logout-admin", {}, { withCredentials: true })
      setatoken(false);
      console.log("Admin logged out successfully");

    } catch (err) {
      console.log(err);
      toast.error(err.message || 'Logout failed')
    }
  };

  const checkAuth = async () => {
    try {
      const { data } = await axios.get(backendurl + "/api/admin/check-auth", {
        withCredentials: true,
      });
      if (!data.success) {
        setatoken(false);
        console.log("Admin not authenticated");
      } else {
        setatoken(true);
        console.log("Admin authenticated");
      }
    } catch (err) {
      console.log(err);
      setatoken(false);
    }
  };

  const changeavailability = async (doctorId) => {
    try {
      const { data } = await axios.post(backendurl + '/api/admin/change-availability', { doctorId }, { withCredentials: true })
      if (data.success) {
        toast.success(data.message);
        getdoctor();
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  }
  const getappointments = async () => {
    try{
      const {data}=await axios.get(backendurl+'/api/admin/all-appointments',{withCredentials:true})
      if(data.success){
        setappointments(data.appointments)
    }else{
      toast.error(data.message)
    }
  }catch(err){
    toast.error(err.message||String(err))
  }}
  const cancelappointment = async(appointmentId)=>{
    try{
      const {data}=await axios.post(backendurl+'/api/admin/cancel-appointment',{appointmentId},{withCredentials:true})
      if(data.success){
        toast.success(data.message);
        getappointments();
        dashboarddata();
      }else{
        toast.error(data.message);
      }
    }catch(err){
      console.log(err);
      toast.error(err.message);
    }
  }
  const dashboarddata=async()=>{
    try{
      const {data}=await axios.get(backendurl+'/api/admin/dashboarddata',{withCredentials:true})
      if(data.success){
        setdashdata(data.data);
      }else{
        toast.error(data.message)
      }}
      catch(err){
        toast.error(err.message||String(err))
      }}

  useEffect(() => {
    checkAuth();
  }, [atoken])

  const value = {
    atoken, setatoken, backendurl, logoutAdmin, doctors, getdoctor, changeavailability,setappointments,appointments,getappointments,cancelappointment,dashboarddata,dashdata
  }

  return (
    <AdminContext.Provider value={value}>
      {props.children}
    </AdminContext.Provider>
  )
}
export default AdminContextProvider