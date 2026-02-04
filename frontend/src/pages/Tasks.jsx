import { useEffect, useState } from "react"
import TaskCard from "../components/taskCard"
import api from "../lib/axios"
import toast from "react-hot-toast"
import Loading from "../components/Loading"
import EmptyTasks from "../components/EmptyTasks"
import TasksHeader from "../components/TasksHeader"
import CategorySelector from "../components/CategorySelector"

function Tasks() {
  const [isLoading, setIsLoading] = useState(false)
  const [tasks, setTasks] = useState([])
  const [activeCat, setActiveCat] = useState(null)
  const [sortBy, setSortBy] = useState('latest')

  useEffect(() => {
    setIsLoading(true)
    const fetchTasks = async () => {
      try {
        const res = await api.get('/tasks', {params: {
          category: activeCat,
          sort: sortBy
        }})
        setTasks(res.data)
      } catch (error) {
        toast.error('Error fetching notes')
        console.log(error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchTasks()
  }, [activeCat, sortBy])

  const onClear = () => {
    setActiveCat(null)
    setSortBy('latest')
  }

  return (
    <div className="min-h-screen pe-3">
      <TasksHeader sortBy={sortBy} setSortBy={setSortBy} onClear={onClear}/>
      <CategorySelector activeCat={activeCat} setActiveCat={setActiveCat} />
      {isLoading && <Loading/>}
      {tasks.length == 0 && <EmptyTasks/>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {tasks.length>0 && tasks.map((task) => {
          return (<TaskCard key={task._id} task={task} setTasks={setTasks} setActiveCat={setActiveCat} />)
        })}
      </div>
    </div>
  )
}

export default Tasks
