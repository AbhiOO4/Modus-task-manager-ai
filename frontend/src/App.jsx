import {Route, Routes} from 'react-router'
import LandingPage from './pages/LandingPage'
import DashBoard from './pages/DashBoard'
import Tasks from './pages/Tasks'
import CreateTask from './pages/CreateTask'
import SideBar from './components/SideBar'
import ViewTask from './pages/ViewTask'
import { useEffect, useState } from 'react'


const App = () => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme])

  return (
    <div data-theme={theme}>
      <Routes>

        <Route path='/' element={<LandingPage />}></Route>

        <Route element={<SideBar theme={theme} setTheme={setTheme} />}>
          <Route path='/DashBoard' element={<DashBoard />}></Route>
          <Route path='/Tasks' element={<Tasks />}></Route>
          <Route path='/Create' element={<CreateTask />}></Route>
          <Route path='/Task/:id' element={<ViewTask />}></Route>
        </Route>
      </Routes>
    </div>
  )
}

export default App
