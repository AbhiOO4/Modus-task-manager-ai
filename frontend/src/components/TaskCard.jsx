import React from "react";
import { formatDate } from "../lib/utils";
import { Link } from 'react-router'
import { SquarePen, Trash } from "lucide-react";
import toast from "react-hot-toast";
import api from "../lib/axios";
import { Circle } from "lucide-react";

function TaskCard({ task, setTasks, setActiveCat }) {
    const priorityMap = {
        1: "#dc2626", // bg-red-600
        2: "#c2410c", // bg-orange-700
        3: "#1d4ed8", // bg-blue-700
        4: "#a16207", // bg-yellow-700
        5: "#15803d"  // bg-green-700
    };

    const handleDelete = async (e, id) => {
        e.preventDefault()
        if (!window.confirm("Are you sure you want to delete this task ?")){
            return 
        }
        try{
            await api.delete(`/tasks/${id}`)
            setTasks((prev) => prev.filter((i) => i._id !== id))
            toast.success("task deleted successfully")
        }catch(error){
            toast.error("Failed to delete the node")
            console.log(error)
        }
    }

    const changeCategory = (e, category) => {
        e.preventDefault()
        setActiveCat(category)
    }
    return (
        
        <div className="card w-96 shadow-2xl border-2 border-secondary bg-base-300">
            <Link to={`/Task/${task._id}`}>
                <div className="card-body">
                    <h2 className="card-title">
                        {task.task}
                        <Circle color={priorityMap[task.priority]} /> 
                    </h2>
                    <p>{formatDate(new Date(task.createdAt))}</p>
                    <div className='card-actions justify-start'>{task.completed ? <><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-check-big-icon lucide-circle-check-big text-green-400"><path d="M21.801 10A10 10 0 1 1 17 3.335" /><path d="m9 11 3 3L22 4" /></svg> <span>Done</span></> : <div className=""></div>}</div>
                    <div className="card-actions justify-between items-center">
                         <div className='flex items-center gap-1'>
                            <Link to={`/Task/edit/${task._id}`} className=""><SquarePen /></Link>
                            <button className='btn btn-ghost btn-xs text-error' onClick={(e) => handleDelete(e, task._id)}><Trash /></button>
                        </div>
                        <button className="btn btn-soft btn-secondary" onClick={(e) => changeCategory(e, task.category)}>{task.category}</button>
                    </div>
                </div>
            </Link>
        </div>
        
    )
}

export default TaskCard
