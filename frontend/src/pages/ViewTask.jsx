import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router'
import api from '../lib/axios'
import { MoveLeft, MoveRight, Circle } from 'lucide-react'
import { formatDateTime } from '../lib/utils'
import toast from 'react-hot-toast'

function ViewTask() {
  const [task, setTask] = useState({})
  const { id } = useParams()
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)

  const priorityMap = {
    1: "#dc2626", // bg-red-600
    2: "#c2410c", // bg-orange-700
    3: "#1d4ed8", // bg-blue-700
    4: "#a16207", // bg-yellow-700
    5: "#15803d"  // bg-green-700
  };

  useEffect(() => {
    const fetchTask = async () => {
      setLoading(true)
      try {
        const res = await api.get(`/tasks/${id}`);
        console.log(res.data)
        setTask(res.data)
      } catch (error) {
        toast.error("failed to load the task")
      } finally {
        setLoading(false)
      }
    }

    fetchTask()
  }, [id])

  const handleToggleSubTask = (index) => {
    
    const updatedSubTasks = [...task.subTasks];

    updatedSubTasks[index] = {
      ...updatedSubTasks[index],
      completed: !updatedSubTasks[index].completed
    };

    setTask({ ...task, subTasks: updatedSubTasks });

   
  };

  const saveSubTasks = async () => {
    setSaving(true)
    try {
      // 4. Send the whole updated task or just the subtasks to the backend
      await api.patch(`/tasks/${id}`, { subTasks : task.subTasks });
      toast.success("Saved Changes")
    } catch (error) {
      toast.error("Failed to save changes");
      // Ideally, re-fetch data here to revert UI on error
    }finally{
      setSaving(false)
    }
  }

  if (loading) return <div className="p-10">Loading task...</div>

  if (!task) return <div className="p-10">Task not found.</div>

  return (
    <div>
      <div className="card bg-base-200 w-auto shadow-sm p-4">
        <Link className='btn btn-outline rounded-2xl w-50' to={'/Tasks'}><MoveLeft />Go back</Link>
        <div className="card-body">
          <div className='bg-base-300 rounded-2xl p-4 mb-3'>
            <h2 className="card-title text-2xl">{task.task}</h2>
            <p className='mt-4 text-lg'>{task.desc}</p>
          </div>
          <div className='bg-base-300 rounded-2xl text-lg p-4 font-medium mb-3'>
            <div className="flex items-center gap-2 text-sm md:text-base lg:text-lg">
              <span>{formatDateTime(task.schedule?.from)}</span>
              <MoveRight className="w-4 h-4 text-gray-500" />
              <span>{formatDateTime(task.schedule?.to)}</span>
            </div>
            <p className="flex items-center gap-2">
              <Circle
                size={16}
                fill={priorityMap[task.priority]}
                color={priorityMap[task.priority]}
              />
              <span>Priority level - <span className="font-medium">{task.priority}</span></span>
            </p>
          </div>
          <div className='bg-base-300 rounded-2xl text-lg p-4'>
            {task.subTasks?.length > 0 && (
              <div>
                <h2 className="text-xl mb-4 font-medium">Sub tasks</h2>

                <ul className="steps steps-vertical w-full">
                  {task.subTasks.map((subTask, index) => (
                    <li
                      key={index}
                      className={`step ${subTask.completed ? 'step-primary' : ''}`}
                      data-content={subTask.completed ? "✓" : index + 1}
                    >
                      {/* Using a label as a container makes the whole area clickable */}
                      <label className="flex items-center gap-4 w-full cursor-pointer p-2 hover:bg-base-200 rounded-lg transition-all ml-4">
                        <input
                          type="checkbox"
                          checked={subTask.completed}
                          onChange={() => handleToggleSubTask(index)} // Function to handle API/State update
                          className="checkbox checkbox-primary checkbox-sm"
                        />
                        <div className="flex flex-col items-start">
                          <span className={`text-md text-start ${subTask.completed ? 'line-through opacity-50' : 'font-medium'}`}>
                            {subTask.title}
                          </span>
                        </div>
                      </label>
                    </li>
                  ))}
                </ul>
              </div>)}
          </div>
          <div className='mt-3 flex gap-4 justify-start'>
                <button className='btn btn-primary rounded-3xl px-5' type='button' onClick={saveSubTasks}>Save</button>
                <Link className='btn btn-info rounded-3xl px-5' to={`/edit/${task._id}`}>Edit</Link>
              </div>
        </div>

      </div>
    </div>
  )
}

export default ViewTask
