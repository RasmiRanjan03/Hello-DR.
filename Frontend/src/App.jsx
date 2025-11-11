import React from 'react'
import {assets} from './assets/assets_frontend/assets'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Doctors from './pages/Doctors'
import Login from './pages/Login'
import My_appointment from './pages/My_appointment'
import Profile from './pages/Profile'
import Signup from './pages/Signup'
import Appoontment from './pages/Appoontment'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

const App = () => {
  return (
    <div className='mx-4 sm:mx-[10%]' >
      <Navbar/>

    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/contact' element={<Contact/>}/>
      <Route path='/doctors/:specialize' element={<Doctors/>}/>
      <Route path='/doctors' element={<Doctors/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/My_appointment' element={<My_appointment/>}/> 
      <Route path='/profile' element={<Profile/>}/> 
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/appointment/:docId' element={<Appoontment/>}/>

    </Routes>
    <Footer/>
    
    </div>
  )
}

export default App