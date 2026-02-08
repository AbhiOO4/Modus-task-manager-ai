import { Outlet, Navigate } from "react-router"


function IsLoggedIn() {
    const user = localStorage.getItem('username')
    return !user ? <Outlet/> : <Navigate to={"/DashBoard"} />
}

export default IsLoggedIn