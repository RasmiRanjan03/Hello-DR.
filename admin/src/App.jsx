import React, { use } from 'react'
import Login from './pages/Admin/Login.jsx'
import { Route,Routes } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import { AdminContext } from './context/AdminContext.jsx'
import Navbar from './components/Navbar.jsx';
import Sidebar from './components/Sidebar.jsx';
import Dashboard from './pages/Admin/Dashboard.jsx';
import Appointment from './pages/Admin/Appointment.jsx';
import Add_doctor from './pages/Admin/Add_doctor.jsx';
import Doctor_list from './pages/Admin/Doctorlist.jsx';
import { DoctorContext } from './context/DoctorContext.jsx';
import Dashboard_doc from './pages/Doctor/Dashboard_doc.jsx';
import Appointment_doc from './pages/Doctor/Appointment_doc.jsx';
import Profile_doc from './pages/Doctor/Profile_doc.jsx';


const App = () => {
  const {atoken,setatoken}=React.useContext(AdminContext)
  const {dtoken }=React.useContext(DoctorContext)
  
  return atoken || dtoken ? (
    <div className='bg-[#F8F9FD]'>
      
      <ToastContainer/>
      <Navbar/>
      <div className='flex items-start'>
      <Sidebar/>
        <Routes>
          <Route path='/' element={<Dashboard/>}/>
          <Route path='/all_appointments' element={<Appointment/>}/>
          <Route path='/add_doctor' element={<Add_doctor/>}/>
          <Route path='/doctor_list' element={<Doctor_list/>}/>


          <Route path='/doc' element={<Dashboard_doc/>}/>
          <Route path='/appointments' element={<Appointment_doc/>}/>
          <Route path='/profile' element={<Profile_doc/>}/>

        </Routes>
      </div>
    </div>
  ) : <Login/>
}

export default App