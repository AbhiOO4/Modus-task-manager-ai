import { Outlet, Navigate } from "react-router"


function ProtectedRoutes() {
    const user = localStorage.getItem('username')
    return user ? <Outlet/> : <Navigate to={"/login"} />
}

export default ProtectedRoutes