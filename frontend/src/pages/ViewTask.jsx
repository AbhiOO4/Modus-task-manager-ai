import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router'
import api from '../lib/axios'
import { MoveLeft, MoveRight, Circle, Check, SquarePen, X } from 'lucide-react'
import { formatDateTime } from '../lib/utils'
import toast from 'react-hot-toast'
import Modal from '../components/Modal'
import Loading from '../components/Loading'

function ViewTask() {
  const [task, setTask] = useState({})
  const { id } = useParams()
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [open, setOpen] = useState(false)
  const [open2, setOpen2] = useState(false)
  const [isToggling, setIsToggling] = useState(false)

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

  const checkAll = () => {
    const allCompleted = task.subTasks.map((subTask) => ({
      ...subTask,
      completed: true
    }))
    setOpen(false)
    setTask({...task, subTasks: allCompleted, completed: true})
  }

  const unCheckAll = () => {
    const allUnChecked = task.subTasks.map((subTask) => ({
      ...subTask,
      completed: false
    }))
    setOpen2(false)
    setTask({...task, subTasks: allUnChecked, completed: false})
  }

  const saveSubTasks = async () => {
    const allFinished = task.subTasks.length > 0 && task.subTasks.every(sub => sub.completed);
    if (allFinished){
      toast.success("Congrats you have completed the task !!")
    }
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

  const handleCompletedToggle = async () => {
    const newStatus = !task.completed;

    // Optimistic Update
    setTask(prev => ({ ...prev, completed: newStatus }));
    setIsToggling(true);

    try {
      await api.patch(`/tasks/${id}`, { completed: newStatus });
      toast.success(newStatus ? "Task Completed!" : "Task Re-opened");
    } catch (error) {
      // Revert on error
      setTask(prev => ({ ...prev, completed: !newStatus }));
      toast.error("Failed to update status");
    }finally{
      setIsToggling(false);
    }
  };

  if (loading) return <Loading/>

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
            {task.subTasks?.length > 0 && (
              <div className='bg-base-300 rounded-2xl text-lg p-4'>
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
                <button className='btn btn-soft btn-primary mt-4' onClick={() => setOpen(true)}><Check />All Done</button>
                <button className='btn btn-soft btn-primary mt-4 ms-2' onClick={() => setOpen2(true)}><X />Undo All</button>
              </div>
              
            {/* check all confirmation modal */}
            <Modal open={open} onClose={() => setOpen(false)}>
              <div className='text-center w-70'>
                {/* <Check size={56} color='green' className='mx-auto' /> */}
                <div className='mx-auto my-4 w-48'>
                  <h3 className='tex-lg front-black'>Confirm Check All</h3>
                  <p className='text-sm'>
                    Are you you sure you want to check all subTasks ?
                  </p>
                </div>
                <div className='flex justify-between gap-4 mt-7'>
                  <button className='btn btn-soft btn-accent w-28' onClick={checkAll}><Check/></button>
                  <button className='btn btn-soft btn-info w-28' onClick={() => setOpen(false)}><X/></button>
                </div>
              </div>
            </Modal>

            {/*Un check all confirmation modal */}
             <Modal open={open2} onClose={() => setOpen2(false)}>
              <div className='text-center w-70'>
                {/* <Check size={56} color='green' className='mx-auto' /> */}
                <div className='mx-auto my-4 w-48'>
                  <h3 className='tex-lg front-black'>Confirm uncheck</h3>
                  <p className='text-sm'>
                    Are you you sure you want to un check all subTasks ?
                  </p>
                </div>
                <div className='flex justify-between gap-4 mt-7'>
                  <button className='btn btn-soft btn-accent w-28' onClick={unCheckAll}><Check/></button>
                  <button className='btn btn-soft btn-info w-28' onClick={() => setOpen2(false)}><X/></button>
                </div>
              </div>
            </Modal>

          </div>)}


          <div className='mt-3 flex gap-4 justify-start'>
            {task.subTasks?.length > 0 ? (
              /* 1. Show "Save Changes" if there ARE subtasks */
              <button
                className='btn btn-secondary rounded-3xl px-5'
                type='button'
                onClick={saveSubTasks}
                disabled={saving}
              >
                {saving ? (
                  <div className="flex items-center gap-2">
                    <span className="loading loading-spinner"></span>
                    <span>Saving</span>
                  </div>
                ) : ('Save Changes')}
              </button>
            ) : (
              <button
                className={`btn rounded-3xl px-5 ${task.completed ? 'btn-success text-white' : 'btn-secondary'}`}
                type='button'
                onClick={handleCompletedToggle}
                disabled={isToggling}
              >
                {isToggling ? (
                  <span className="loading loading-spinner"></span>
                ) : task.completed ? (
                  'Mark Incomplete'
                ) : (
                  'Mark as Done'
                )}
              </button>
            )}

            {/* Always show the Edit button */}
            <Link className='btn btn-soft btn-info rounded-3xl px-5 flex gap-2' to={`/edit/${task._id}`}>
              <SquarePen size={18} /> Edit
            </Link>
          </div>
        </div>

      </div>
    </div>
  )
}

export default ViewTask
