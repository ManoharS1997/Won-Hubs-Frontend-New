
import { Navigate, Outlet } from 'react-router-dom'
import Cookies from 'js-cookie'

const MFAProtectedRoute = () => {
    const stateOnePAssed = Cookies.get('loginStageOne')

    if (!stateOnePAssed) {
        return <Navigate to="/" replace />
    }

    return <Outlet />
}

export default MFAProtectedRoute