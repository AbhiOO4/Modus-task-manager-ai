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
import IsLoggedIn from './utils/isLoggedIn'
import ProtectedRoutes from './utils/ProtectedRoutes'


const App = () => {
  const [isChecked, setIsChecked] = useState(() => localStorage.getItem('isChecked')==='true');

  useEffect(() => {
    localStorage.setItem('isChecked', isChecked);
  }, [isChecked])

  return (
    <div data-theme={isChecked ? 'night': 'winter'}>
      <Routes>
        <Route element={<IsLoggedIn />}>
          <Route path='/' element={<LandingPage />}></Route>
          <Route path='/login' element={<Login />} ></Route>
          <Route path='/signup' element={<SignUp />} ></Route>
        </Route>

        <Route element={<ProtectedRoutes />}>
          <Route element={<SideBar isChecked={isChecked} setIsChecked={setIsChecked} />}>
            <Route path='/DashBoard' element={<DashBoard />}></Route>
            <Route path='/Tasks' element={<Tasks />}></Route>
            <Route path='/Create' element={<CreateTask />}></Route>
            <Route path='/Task/:id' element={<ViewTask />}></Route>
            <Route path='/edit/:id' element={<EditTask />}></Route>
          </Route>
        </Route>
      </Routes>
    </div>
  )
}

export default App
