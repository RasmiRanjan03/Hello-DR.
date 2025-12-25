import React, { use } from 'react'
import Login from './pages/Login.jsx'
import { Route,Routes } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import { AdminContext } from './context/AdminContext.jsx'
import Navbar from './components/Navbar.jsx';
import Sidebar from './components/Sidebar.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Appointment from './pages/Appointment.jsx';
import Add_doctor from './pages/Add_doctor.jsx';
import Doctor_list from './pages/Doctorlist.jsx';


const App = () => {
  const {atoken,setatoken}=React.useContext(AdminContext)
  console.log("hello");
  
  return atoken ? (
    <div className='bg-[#F8F9FD]'>
      
      <ToastContainer/>
      <Navbar/>
      <div className='flex items-start'>
      <Sidebar/>
        <Routes>
          <Route path='/' element={<>HII</>}/>
          <Route path='/admin_dashboard' element={<Dashboard/>}/>
          <Route path='/all_appointments' element={<Appointment/>}/>
          <Route path='/add_doctor' element={<Add_doctor/>}/>
          <Route path='/doctor_list' element={<Doctor_list/>}/>
          
        </Routes>
      </div>
    </div>
  ) : <Login/>
}

export default App