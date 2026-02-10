import { formatDate } from "../lib/utils";
import { Link } from 'react-router'
import { CircleCheck, SquarePen, Trash } from "lucide-react";
import toast from "react-hot-toast";
import api from "../lib/axios";


function TaskCard({ task, setTasks, setActiveCat }) {
    const priorityMap = {
        1: "#dc2626", // bg-red-600
        2: "#c2410c", // bg-orange-700
        3: "#1d4ed8", // bg-blue-700
        4: "#a16207", // bg-yellow-700
        5: "#15803d"  // bg-green-700
    };

    const now = new Date();
    now.setHours(0,0,0,0)
    const dueDate = new Date(task.schedule.to);
    dueDate.setHours(0,0,0,0)
    const diffInMs = dueDate - now;
    const diffInDays = diffInMs / (1000 * 60 * 60 * 24);

    const getDaysLeftStatus = () => {
        if (diffInDays === 0) return { text: 'Due Today', color: 'text-warning' };
        if (diffInDays < 0){
            if (diffInDays === -1){
                return { text: `1 day overdue`, color: 'text-error font-bold' };
            }
            return { text: `${Math.abs(diffInDays)} days overdue`, color: 'text-error font-bold' };
        }
        if (diffInDays === 1){
            return { text: `1 day left`, color: 'text-success' };
        }
        return { text: `${diffInDays} days left`, color: 'text-success' };
    };

    const status = getDaysLeftStatus();

    const completedCount = task.subTasks.filter(task => task.completed).length;

    const handleDelete = async (e, id) => {
        e.preventDefault()
        if (!window.confirm("Are you sure you want to delete this task ?")) {
            return
        }
        try {
            await api.delete(`/tasks/${id}`)
            setTasks((prev) => prev.filter((i) => i._id !== id))
            toast.success("task deleted successfully")
        } catch (error) {
            toast.error("Failed to delete the node")
            console.log(error)
        }
    }

    const changeCategory = (e, category) => {
        e.preventDefault()
        setActiveCat(category)
    }
    return (
        <div className="card w-96 shadow-xl border border-secondary/20 bg-base-300 hover:shadow-2xl transition-all duration-300 group">
            <Link to={`/Task/${task._id}`}>
                <div className="card-body p-6">
                    {/* Header: Title & Priority */}
                    <div className="flex justify-between items-start gap-2">
                        <h2 className="card-title text-xl font-bold line-clamp-1">{task.task}</h2>
                        <div 
                            className="badge badge-sm border-none text-white font-bold py-3 px-3"
                            style={{ backgroundColor: priorityMap[task.priority] || '#6b7280' }}
                        >
                            {/* Priority Labels */}
                            {task.priority === 1 ? "Critical" : task.priority === 2 ? "High" : task.priority === 3 ? "Medium" : task.priority === 4 ? "Low" : "Stable"}
                        </div>
                    </div>

                    {/* Timeline & Countdown Section */}
                    <div className="flex flex-col gap-2 my-4 p-3 bg-base-200/50 rounded-lg text-xs">
                        <div className="flex items-center justify-between">
                            <span className="opacity-60 uppercase tracking-wider font-semibold">Timeline</span>
                            <span className="font-medium italic">{formatDate(new Date(task.schedule.from))} → {formatDate(dueDate)}</span>
                        </div>
                        {/* THE COUNTDOWN DISPLAY */}
                        <div className="flex items-center justify-between border-t border-base-content/10 pt-2 mt-1">
                            <span className="opacity-60 uppercase tracking-wider font-semibold">Status</span>
                            <span className={status.color}>{status.text}</span>
                        </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="space-y-2 mb-4">
                        <div className="flex justify-between items-center text-xs">
                            <span className="opacity-70 font-medium">Task Completion</span>
                            {task.completed && <span className="text-success flex items-center gap-1 font-bold"><CircleCheck size={14} /> Done</span>}
                        </div>
                        <progress 
                            className={`progress w-full h-2 ${task.completed ? 'progress-success' : 'progress-primary'}`} 
                            value={(task.completed && task.subTasks.length === 0) ? 1 : completedCount} 
                            max={task.subTasks?.length || 1}
                        ></progress>
                    </div>

                    {/* Footer Actions */}
                    <div className="card-actions justify-between items-center mt-auto pt-4 border-t border-base-content/10">
                        <div className='flex items-center gap-4'>
                            <Link to={`/edit/${task._id}`} onClick={(e) => e.stopPropagation()} className="text-base-content/50 hover:text-primary transition-colors">
                                <SquarePen size={20} />
                            </Link>
                            <button className='text-base-content/50 hover:text-error transition-colors' onClick={(e) => { e.preventDefault(); handleDelete(e, task._id); }}>
                                <Trash size={20} />
                            </button>
                        </div>
                        <button className="btn btn-xs btn-outline btn-secondary px-4" onClick={(e) => { e.preventDefault(); changeCategory(e, task.category); }}>
                            {task.category}
                        </button>
                    </div>
                </div>
            </Link>
        </div>

    )
}

export default TaskCard
