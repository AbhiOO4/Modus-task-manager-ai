function TaskStats({ tasks }) {
    const completedTasks = tasks.filter((task) => task.completed).length;
    const totalTasks = tasks.length;
    const pendingTasks = totalTasks - completedTasks;
    const percentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

    return (
        <div className="stats stats-vertical lg:stats-horizontal shadow-lg bg-base-200/50 backdrop-blur-md border border-base-300 w-full">
            
            {/* Overall Progress Stat */}
            <div className="stat">
                <div className="stat-figure text-primary">
                    <div 
                        className="radial-progress bg-base-300 text-primary border-4 border-base-300 shadow-inner" 
                        style={{ "--value": percentage, "--size": "4rem", "--thickness": "4px" }} 
                        role="progressbar"
                    >
                        <span className="text-xs font-bold">{percentage}%</span>
                    </div>
                </div>
                <div className="stat-title font-semibold opacity-70">Total Progress</div>
                <div className="stat-value text-primary tracking-tight">{completedTasks}/{totalTasks}</div>
                <div className="stat-desc font-medium text-base-content/60">{pendingTasks} tasks to go</div>
            </div>

            {/* Monthly Completion - Now using real color logic */}
            <div className="stat">
                <div className="stat-figure text-secondary">
                    <div className="p-3 bg-secondary/10 rounded-2xl">
                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check-circle">
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                            <polyline points="22 4 12 14.01 9 11.01" />
                        </svg>
                    </div>
                </div>
                <div className="stat-title font-semibold opacity-70">Completed This Month</div>
                <div className="stat-value text-secondary tracking-tight">234</div>
                <div className="stat-desc flex items-center gap-1 text-success font-bold">
                    <span>↗︎ 21%</span>
                    <span className="text-base-content/50 font-normal">vs last month</span>
                </div>
            </div>

            {/* Streak Stat */}
            <div className="stat">
                <div className="stat-figure text-accent">
                    <div className="p-3 bg-accent/10 rounded-2xl">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block h-8 w-8 stroke-current">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                        </svg>
                    </div>
                </div>
                <div className="stat-title font-semibold opacity-70">Active Streak</div>
                <div className="stat-value text-accent tracking-tight">3 Days</div>
                <div className="stat-desc font-medium italic text-accent/80 animate-pulse">You're on fire! 🔥</div>
            </div>

        </div>
    );
}

export default TaskStats;