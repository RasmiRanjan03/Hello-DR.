import React, { useContext } from 'react'
import { AppContext } from '../context/AppContextProvider'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({ children }) => {
  const { token, isChecking } = useContext(AppContext)
  
  if (isChecking) {
    return <div className='flex items-center justify-center h-screen'>Loading...</div>
  }
  
  return token ? children : <Navigate to="/login" />
}

export default ProtectedRoute
