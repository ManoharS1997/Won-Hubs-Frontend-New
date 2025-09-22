// src/ProtectedRoute.js
import { Navigate, Outlet } from 'react-router-dom'
import Cookies from 'js-cookie'


const ProtectedRoute = () => {
  const jsToken = Cookies.get('accessToken')
  const mfaCompleted = Cookies.get('isMFACleared') && JSON.parse(Cookies.get('isMFACleared'))

  if (!jsToken && !mfaCompleted?.success) {
    console.log(!jsToken && !mfaCompleted?.success)
    return <Navigate to="/" replace />
  }

  return (
    <Outlet />
  )
}

export default ProtectedRoute