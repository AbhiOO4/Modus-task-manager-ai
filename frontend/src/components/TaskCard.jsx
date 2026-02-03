import React from "react";

function TaskCard({ taskTitle, id, priority, category, createdAt, completed }) {
    const priorityMap = {
        1: "bg-red-600",
        2: "bg-orange-700",
        3: "bg-blue-700",
        4: "bg-yellow-700",
        5: "bg-green-700"
    };
    return (
        <div className="card w-96 shadow-2xl border-2 border-secondary bg-base-300">
            <div className="card-body">
                <h2 className="card-title">
                    {taskTitle}
                    <div className={`badge rounded-circle ${priorityMap[priority]}`}></div>
                </h2>
                <p>Feb 4th 2026 </p>
                <div className='card-actions justify-start'>{completed ? <><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-check-big-icon lucide-circle-check-big text-green-400"><path d="M21.801 10A10 10 0 1 1 17 3.335" /><path d="m9 11 3 3L22 4" /></svg> <span>Done</span></> : <div className=""></div>}</div>
                <div className="card-actions justify-end">
                    <div className="badge badge-outline px-3">{category}</div>
                </div>
            </div>
        </div>
    )
}

export default TaskCard
