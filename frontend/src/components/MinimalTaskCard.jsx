import { Link } from 'react-router';
import { CircleCheck } from "lucide-react";

function MinimalTaskCard({ task }) {
    const priorityMap = {
        1: "bg-red-600",
        2: "bg-orange-700",
        3: "bg-blue-700",
        4: "bg-yellow-700",
        5: "bg-green-700"
    };

    // Progress Calculation
    const subTasksCount = task.subTasks?.length || 0;
    const completedCount = task.subTasks?.filter(t => t.completed).length || 0;
    const progressValue = task.completed ? 100 : (subTasksCount > 0 ? (completedCount / subTasksCount) * 100 : 0);

    return (
        <Link to={`/Task/${task._id}`} className="block">
            <div className="card w-full bg-base-200 shadow-sm border border-base-300 hover:border-primary/30 transition-all p-4 mb-3">
                
                {/* Top Row: Title & Priority Dot */}
                <div className="flex justify-between items-center mb-3">
                    <div className="flex items-center gap-2">
                        {/* Status Icon */}
                        {task.completed ? (
                            <CircleCheck size={16} className="text-success" />
                        ) : (
                            <div className={`w-2 h-2 rounded-full animate-pulse ${priorityMap[task.priority] || 'bg-slate-500'}`} />
                        )}
                        <h2 className="text-sm font-bold truncate max-w-[180px]">
                            {task.task}
                        </h2>
                    </div>
                    
                    {/* Simplified Completion Text */}
                    <span className="text-[10px] font-mono opacity-60 uppercase tracking-tighter">
                        {task.completed ? "Done" : `${completedCount}/${subTasksCount} Tasks`}
                    </span>
                </div>

                {/* Bottom Row: Progress Bar */}
                <div className="flex items-center gap-3">
                    <progress 
                        className={`progress h-1.5 w-full ${task.completed ? 'progress-success' : 'progress-primary'}`} 
                        value={task.completed ? 100 : progressValue} 
                        max="100"
                    ></progress>
                    
                    {/* Simple Percentage label */}
                    <span className="text-[10px] font-bold opacity-70 w-8 text-right">
                        {Math.round(progressValue)}%
                    </span>
                </div>

            </div>
        </Link>
    );
}

export default MinimalTaskCard;