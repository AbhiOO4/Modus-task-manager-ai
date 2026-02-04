import { NavLink, Outlet, useNavigate } from "react-router"
import {LayoutDashboard, ListChecks, Plus, LogOut} from 'lucide-react'


const SideBar = ({ theme, setTheme }) => {
    const themes = ["light", "lofi","winter", "dark", "halloween", "forest", "dracula", "business", "night"];
    const navigate = useNavigate()
    const handleLogout = () => {
        if (!window.confirm("Are you sure you want to delete this Note ?")) {
            return
        }
        localStorage.removeItem('token')
        localStorage.removeItem('username')
        navigate('/')
        toast.success("Logged out successfully")
    }

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
                    <div className="px-4 font-mono">BrainCache</div>
                    </div>
                    <div className="navbar-end">
                    <div className="p-4 w-1xl">
                        <select 
                            className="select select-bordered w-full rounded-3xl" 
                            value={theme}
                            onChange={(e) => setTheme(e.target.value)}
                        >
                            <option disabled>Pick a theme</option>
                            {themes.map((t) => (
                                <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>
                            ))}
                        </select>
                    </div>
                    </div>
                </nav>
                {/* Page content here */}
                <div className="p-4"><Outlet/></div>
            </div>

            <div className="drawer-side is-drawer-close:overflow-visible">
                <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
                <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
                    {/* Sidebar content here */}
                    <ul className="menu w-full grow flex flex-col justify-center gap-2">
                        {/* List item */}
                        <li>
                            <NavLink to={'/DashBoard'}
                                className={({ isActive }) =>
                                    `is-drawer-close:tooltip is-drawer-close:tooltip-right ${isActive ? "font-bold" : ""}`
                                } data-tip="dashboard">
                                <LayoutDashboard size={20} />
                                <span className="is-drawer-close:hidden">DashBoard</span>
                            </NavLink>
                        </li>

                        <li>
                            <NavLink className={({ isActive }) =>
                                    `is-drawer-close:tooltip is-drawer-close:tooltip-right ${isActive ? "font-bold" : ""}`
                                } to={'/Tasks'} data-tip="tasks">
                                <ListChecks  size={20} />
                                <span className="is-drawer-close:hidden">Tasks</span>
                            </NavLink>
                        </li>

                         <li>
                            <NavLink className={({ isActive }) =>
                                    `is-drawer-close:tooltip is-drawer-close:tooltip-right ${isActive ? "font-bold" : ""}`
                                } to={'/Create'} data-tip="addTask">
                                <Plus  size={20}/>
                                <span className="is-drawer-close:hidden">Add Task</span>
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
