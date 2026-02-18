import { Outlet, Navigate } from "react-router"
import { useAuthStore } from "../store/authStore"


function ProtectedRoutes() {
    const { isAuthenticated, user } = useAuthStore()
    if (!isAuthenticated){
        return <Navigate to={"/login"} replace />
    } 
    if (!user.isVerified){
        return <Navigate to={"/verify-email"} replace />
    } 
    return <Outlet/>
}

export default ProtectedRoutes