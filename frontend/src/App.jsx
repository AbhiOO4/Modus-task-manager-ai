import {Route, Routes} from 'react-router'
import LandingPage from './pages/LandingPage'
import DashBoard from './pages/DashBoard'
import Tasks from './pages/Tasks'
import CreateTask from './pages/CreateTask'
import SideBar from './components/SideBar'
import ViewTask from './pages/ViewTask'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import EditTask from './pages/EditTask'
import { useEffect, useState } from 'react'


const App = () => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || false);

  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme])

  return (
    <div data-theme={theme? `business` : `winter`}>
      <Routes>

        <Route path='/' element={<LandingPage />}></Route>
        <Route path='/login' element={<Login />} ></Route>
        <Route path='/signup' element={<SignUp />} ></Route>

        <Route element={<SideBar theme={theme} setTheme={setTheme} />}>
          <Route path='/DashBoard' element={<DashBoard />}></Route>
          <Route path='/Tasks' element={<Tasks />}></Route>
          <Route path='/Create' element={<CreateTask />}></Route>
          <Route path='/Task/:id' element={<ViewTask />}></Route>
          <Route path='/edit/:id' element={<EditTask />}></Route>
        </Route>
      </Routes>
    </div>
  )
}

export default App
