import { Outlet, Navigate, replace } from "react-router"
import { useAuthStore } from "../store/authStore"


function IsVerified() {
    const { isAuthenticated, user } = useAuthStore()
    if (isAuthenticated && !user.isVerified){
        return <Outlet />
    } 
    else if (isAuthenticated && user.isVerified){
        return <Navigate to={"/DashBoard"} replace />
    } 
    return <Navigate to={"/"} replace />
}

export default IsVerified