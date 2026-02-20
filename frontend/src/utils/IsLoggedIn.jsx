import { Outlet, Navigate, replace } from "react-router"
import { useAuthStore } from "../store/authStore"


function IsLoggedIn() {
    const { isAuthenticated, user } = useAuthStore()
    if (!isAuthenticated){
        return <Outlet />
    } 
    if (!user.isVerified){
        return <Navigate to={"/verify-email"} replace />
    } 
    return <Navigate to={"/DashBoard"} replace />
}

export default IsLoggedIn
