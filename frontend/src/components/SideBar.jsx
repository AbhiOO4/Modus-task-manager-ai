import { NavLink, Outlet, useNavigate } from "react-router"
import {LayoutDashboard, ListChecks, Plus, LogOut} from 'lucide-react'
import { useAuthStore } from "../store/authStore"
import toast from "react-hot-toast"
import Loading from "./Loading"


const SideBar = ({ isChecked, setIsChecked }) => {
    const navigate = useNavigate()
    const {logout, isLoading} = useAuthStore()

    const handleLogout = async () => {
        if (!window.confirm("Are you sure you want to logout ?")) {
            return
        }
        try{
            await logout()
            navigate('/')
            toast.success("Logged out successfully")
        }catch(error){
            console.log(error)
            toast.error(error)
        }
    }

    if (isLoading) return <Loading/>

    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
                {/* Navbar */}
                <nav className="navbar w-full bg-base-300 sticky top-0 z-50 shadow-sm">
                    <div className="navbar-start">
                    <label htmlFor="my-drawer-4" aria-label="open sidebar" className="btn btn-square btn-ghost">
                        {/* Sidebar toggle icon */}
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-5"><path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path><path d="M9 4v16"></path><path d="M14 10l2 2l-2 2"></path></svg>
                    </label>
                    <div className="px-2 font-bold text-lg font-sans">MODUS</div>
                    </div>
                    <div className="navbar-end">
                    <div className="p-4 w-1xl">
                            <label className="toggle text-base-content">
                                <input type="checkbox" checked={isChecked} onChange={(e) => setIsChecked(e.target.checked)} className="theme-controller" />
                                <svg aria-label="sun" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="m4.93 4.93 1.41 1.41"></path><path d="m17.66 17.66 1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="m6.34 17.66-1.41 1.41"></path><path d="m19.07 4.93-1.41 1.41"></path></g></svg>
                                <svg aria-label="moon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path></g></svg>
                            </label>
                    </div>
                    </div>
                </nav>
                {/* Page content here */}
                <div className="p-4"><Outlet/></div>
            </div>

            <div className="drawer-side is-drawer-close:overflow-visible">
                <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay "></label>
                <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
                    {/* Sidebar content here */}
                    <ul className="menu w-full grow flex flex-col justify-center gap-2">
                        {/* List item */}
                        <li>
                            <NavLink to={'/DashBoard'}
                                className={({ isActive }) =>
                                    `is-drawer-close:tooltip is-drawer-close:tooltip-right ${isActive ? "font-bold" : ""}`
                                } data-tip="dashboard">
                                {({ isActive }) => (
                                    <>
                                        <LayoutDashboard size={isActive ? 25 : 20} />
                                        <span className="is-drawer-close:hidden">DashBoard</span>
                                    </>
                                )}
                            </NavLink>
                        </li>

                        <li>
                            <NavLink className={({ isActive }) =>
                                    `is-drawer-close:tooltip is-drawer-close:tooltip-right ${isActive ? "font-bold" : ""}`
                                } to={'/Tasks'} data-tip="tasks">
                                {({ isActive }) => (
                                    <>
                                        {/* Icon size logic: 25 if active, 20 if not */}
                                        <ListChecks size={isActive ? 25 : 20} />

                                        <span className="is-drawer-close:hidden">Tasks</span>
                                    </>
                                )}
                            </NavLink>
                        </li>

                         <li>
                            <NavLink className={({ isActive }) =>
                                    `is-drawer-close:tooltip is-drawer-close:tooltip-right ${isActive ? "font-bold" : ""}`
                                } to={'/Create'} data-tip="addTask">
                                {({ isActive }) => (
                                    <>
                                        {/* Icon size logic: 25 if active, 20 if not */}
                                        <Plus size={isActive ? 25 : 20} />

                                        <span className="is-drawer-close:hidden">Add Task</span>
                                    </>
                                )}
                            </NavLink>
                        </li>

                        <li>
                            <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right" type="button" onClick={handleLogout} data-tip="Logout">
                                <LogOut  size={20}/>
                                <span className="is-drawer-close:hidden"> Logout</span>
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default SideBar
