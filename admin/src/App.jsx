import React from 'react'
import Login from './pages/Login.jsx'
import { Route,Routes } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import { AdminContext } from './context/AdminContext.jsx'
import Navbar from './components/Navbar.jsx';
const App = () => {
  const {atoken}=React.useContext(AdminContext)
  return atoken ? (
    <div>
      <ToastContainer/>
      <Navbar/>
      
    </div>
  ):(<>
    <Login/>
    <ToastContainer/>
  </>
  )
}

export default App