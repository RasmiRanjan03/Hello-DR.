import React from 'react'
import {assets} from './assets/assets_frontend/assets'
import { Route, Routes } from 'react-router-dom'
import { ToastContainer,toast } from 'react-toastify'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Doctors from './pages/Doctors'
import Login from './pages/Login'
import My_appointment from './pages/My_appointment'
import Profile from './pages/Profile'
import Appoontment from './pages/Appoontment'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ProtectedRoute from './components/ProtectedRoute'

const App = () => {
  return (
    <div className='mx-4 sm:mx-[10%]' >
      <ToastContainer/>
      <Navbar/>

    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/contact' element={<Contact/>}/>
      <Route path='/doctors/:specialize' element={<Doctors/>}/>
      <Route path='/doctors' element={<Doctors/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/My_appointment' element={<ProtectedRoute><My_appointment/></ProtectedRoute>}/> 
      <Route path='/profile' element={<ProtectedRoute><Profile/></ProtectedRoute>}/> 
      <Route path='/appointment/:docId' element={<ProtectedRoute><Appoontment/></ProtectedRoute>}/>

    </Routes>
    <Footer/>
    
    </div>
  )
}

export default App