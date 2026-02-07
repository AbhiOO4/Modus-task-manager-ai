import React, { useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router'
import api from '../lib/axios'
import { MoveLeft, Calendar, Circle, Check, SquarePen, X, Tag, ListChecks, Info, Trash } from 'lucide-react'
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
  const navigate = useNavigate()

  const priorityMap = {
    1: "#dc2626", 2: "#c2410c", 3: "#1d4ed8", 4: "#a16207", 5: "#15803d"
  };

  // Dynamic colors for Category
  const categoryColors = {
    work: "badge-primary",
    studies: "badge-secondary",
    personal: "badge-accent",
    hobbies: "badge-info",
    social: "badge-ghost"
  }

  useEffect(() => {
    const fetchTask = async () => {
      setLoading(true)
      try {
        const res = await api.get(`/tasks/${id}`);
        const data = res.data
        const allFinished = data.subTasks.length > 0 && data.subTasks.every(sub => sub.completed);
        setTask({...data, completed: allFinished})
        await api.patch(`/tasks/${id}`, { completed: allFinished });
      } catch (error) {
        toast.error("failed to load the task")
      } finally {
        setLoading(false)
      }
    }
    fetchTask()
    
  }, [id])

  const handleDelete = async () => {
    const id = task._id
        if (!window.confirm("Are you sure you want to delete this task ?")){
            return 
        }
        try{
            await api.delete(`/tasks/${id}`)
            toast.success("task deleted successfully")
            navigate('/Tasks')
        }catch(error){
            toast.error("Failed to delete the node")
            console.log(error)
        }
    }

  const handleToggleSubTask = (index) => {
    const updatedSubTasks = [...task.subTasks];
    updatedSubTasks[index] = {
      ...updatedSubTasks[index],
      completed: !updatedSubTasks[index].completed
    };
    setTask({ ...task, subTasks: updatedSubTasks });
  };

  const checkAll = () => {
    const allCompleted = task.subTasks.map((subTask) => ({ ...subTask, completed: true }))
    setOpen(false)
    setTask({...task, subTasks: allCompleted, completed: true})
  }

  const unCheckAll = () => {
    const allUnChecked = task.subTasks.map((subTask) => ({ ...subTask, completed: false }))
    setOpen2(false)
    setTask({...task, subTasks: allUnChecked, completed: false})
  }

  const saveSubTasks = async () => {
    const allFinished = task.subTasks.length > 0 && task.subTasks.every(sub => sub.completed);
    if (allFinished){
      toast.success("Congrats you have completed the task !!")
    }

    setTask({...task, completed: allFinished})
  
    setSaving(true)
    try {
      await api.patch(`/tasks/${id}`, { subTasks : task.subTasks });
      toast.success("Saved Changes")
    } catch (error) {
      toast.error("Failed to save changes");
    } finally { setSaving(false) }
  }

  const handleCompletedToggle = async () => {
    const newStatus = !task.completed;
    setTask(prev => ({ ...prev, completed: newStatus }));
    setIsToggling(true);
    try {
      await api.patch(`/tasks/${id}`, { completed: newStatus });
      toast.success(newStatus ? "Task Completed!" : "Task Re-opened");
    } catch (error) {
      setTask(prev => ({ ...prev, completed: !newStatus }));
      toast.error("Failed to update status");
    } finally { setIsToggling(false); }
  };

  if (loading) return <Loading/>
  if (!task || !task.task) return <div className="p-10 text-center text-lg font-bold">Task not found.</div>

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6 lg:p-8 animate-in fade-in duration-500">
      {/* Top Navigation */}
      <div className="flex items-center justify-between mb-8">
        <Link className='btn btn-ghost hover:bg-base-300 gap-2' to={'/Tasks'}>
          <MoveLeft size={20} /> Back to Dashboard
        </Link>
        <div className="flex gap-2">
            <button className='btn btn-error' onClick={handleDelete}><Trash/>Delete</button>
           <Link className='btn btn-outline btn-info border-2 gap-2' to={`/edit/${task._id}`}>
              <SquarePen size={18} /> Edit Task
           </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Task Details & Subtasks */}
        <div className="lg:col-span-2 space-y-6">
          <div className="card bg-base-100 border border-base-300 shadow-xl overflow-hidden">
            <div className="h-2 bg-primary w-full opacity-70"></div>
            <div className="card-body p-6 md:p-10">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className={`badge ${categoryColors[task.category?.toLowerCase()] || 'badge-ghost'} badge-lg capitalize py-4 px-4 font-bold`}>
                  <Tag size={14} className="mr-2" /> {task.category || 'Uncategorized'}
                </span>
                {task.completed && <span className="badge badge-success badge-lg py-4 px-4 text-white font-bold">Completed</span>}
              </div>
              
              <h1 className="text-4xl font-extrabold text-base-content leading-tight mb-4">
                {task.task}
              </h1>
              
              <div className="divider opacity-50"></div>
              
              <div className="space-y-4 text-base-content/80">
                <h3 className="text-sm font-bold uppercase tracking-widest text-primary flex items-center gap-2">
                  <Info size={16} /> Description
                </h3>
                <p className="text-xl leading-relaxed whitespace-pre-line bg-base-200/50 p-6 rounded-2xl italic border-l-4 border-primary">
                  "{task.desc}"
                </p>
              </div>
            </div>
          </div>

          {/* Subtasks Section */}
          {task.subTasks?.length > 0 && (
            <div className="card bg-base-100 border border-base-300 shadow-xl">
              <div className="card-body p-6 md:p-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                  <h2 className="text-2xl font-bold flex items-center gap-3">
                    <ListChecks className="text-secondary" /> Sub Tasks
                  </h2>
                  <div className="flex gap-2">
                    <button className='btn btn-sm btn-soft btn-accent' onClick={() => setOpen(true)}><Check size={16} /> Mark All</button>
                    <button className='btn btn-sm btn-soft btn-error' onClick={() => setOpen2(true)}><X size={16} /> Reset All</button>
                  </div>
                </div>

                <div className="space-y-3">
                  {task.subTasks.map((subTask, index) => (
                    <label 
                      key={index} 
                      className={`flex items-center gap-4 p-4 rounded-xl border-2 transition-all cursor-pointer hover:shadow-md ${subTask.completed ? 'bg-success/5 border-success/20 opacity-70' : 'bg-base-200 border-transparent hover:border-base-300'}`}
                    >
                      <input
                        type="checkbox"
                        checked={subTask.completed}
                        onChange={() => handleToggleSubTask(index)}
                        className="checkbox checkbox-primary"
                      />
                      <span className={`text-lg transition-all ${subTask.completed ? 'line-through text-base-content/50' : 'font-semibold text-base-content'}`}>
                        {subTask.title}
                      </span>
                    </label>
                  ))}
                </div>

                <div className="mt-8 pt-6 border-t border-base-300 flex justify-end">
                   <button
                    className='btn btn-primary btn-lg rounded-2xl px-10 shadow-lg shadow-primary/20'
                    type='button'
                    onClick={saveSubTasks}
                    disabled={saving}
                  >
                    {saving ? <span className="loading loading-spinner"></span> : 'Save Progress'}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Metadata Sidebar */}
        <div className="space-y-6">
          <div className="card bg-base-300/50 border border-base-300 shadow-md">
            <div className="card-body p-6 space-y-6">
              
              {/* Timeline Info */}
              <div className="space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-widest text-base-content/50 flex items-center gap-2">
                  <Calendar size={14} /> Schedule Timeline
                </h4>
                <div className="space-y-3">
                  <div className="bg-base-100 p-4 rounded-xl border border-base-300 shadow-sm">
                    <span className="text-xs text-primary font-bold block mb-1">STARTS</span>
                    <span className="text-sm md:text-md font-medium">{formatDateTime(task.schedule?.from)}</span>
                  </div>
                  <div className="bg-base-100 p-4 rounded-xl border border-base-300 shadow-sm">
                    <span className="text-xs text-error font-bold block mb-1">DUE DATE</span>
                    <span className="text-sm md:text-md font-medium">{formatDateTime(task.schedule?.to)}</span>
                  </div>
                </div>
              </div>

              <div className="divider m-0"></div>

              {/* Priority Info */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-widest text-base-content/50">Urgency Level</h4>
                <div className="flex items-center gap-4 bg-base-100 p-4 rounded-xl border border-base-300">
                  <Circle
                    size={28}
                    fill={priorityMap[task.priority]}
                    stroke="none"
                    className="drop-shadow-sm"
                  />
                  <div>
                    <span className="text-lg font-bold block leading-none">Level {task.priority}</span>
                    <span className="text-xs text-base-content/60 italic">Priority Status</span>
                  </div>
                </div>
              </div>

              {/* Action for tasks without subtasks */}
              {(!task.subTasks || task.subTasks.length === 0) && (
                <div className="pt-4">
                  <button
                    className={`btn w-full btn-lg rounded-2xl ${task.completed ? 'btn-outline btn-success' : 'btn-secondary shadow-lg shadow-secondary/20'}`}
                    onClick={handleCompletedToggle}
                    disabled={isToggling}
                  >
                    {isToggling ? <span className="loading loading-spinner"></span> : task.completed ? 'Re-open Task' : 'Complete Task'}
                  </button>
                </div>
              )}
            </div>
          </div>
          
          {/* Tip/Info Card */}
          <div className="alert bg-info/10 border-info/20 rounded-2xl">
            <Info size={20} />
            <span className="text-sm">Don't forget to save your progress after checking subtasks!</span>
          </div>
        </div>
      </div>

      {/* Modals - Unchanged logic, just small style tweaks */}
      <Modal open={open} onClose={() => setOpen(false)}>
        <div className='p-6 text-center space-y-4'>
          <div className="bg-success/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
            <Check size={32} className="text-success" />
          </div>
          <h3 className='text-xl font-bold'>Complete All Tasks?</h3>
          <p className='text-base-content/70'>This will mark every subtask as finished.</p>
          <div className='flex gap-3 mt-6'>
            <button className='btn btn-success flex-1 text-white' onClick={checkAll}>Yes, check all</button>
            <button className='btn btn-ghost flex-1' onClick={() => setOpen(false)}>Cancel</button>
          </div>
        </div>
      </Modal>

      <Modal open={open2} onClose={() => setOpen2(false)}>
        <div className='p-6 text-center space-y-4'>
          <div className="bg-error/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
            <X size={32} className="text-error" />
          </div>
          <h3 className='text-xl font-bold'>Reset Subtasks?</h3>
          <p className='text-base-content/70'>Are you sure you want to uncheck all subtasks?</p>
          <div className='flex gap-3 mt-6'>
            <button className='btn btn-error flex-1 text-white' onClick={unCheckAll}>Reset All</button>
            <button className='btn btn-ghost flex-1' onClick={() => setOpen2(false)}>Cancel</button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default ViewTask