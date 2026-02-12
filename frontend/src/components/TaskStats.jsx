import { useMemo } from 'react';

function TaskStats({ tasks, dailyActivity }) {
    const completedTasks = tasks.filter((task) => task.completed).length;
    const totalTasks = tasks.length;
    const pendingTasks = totalTasks - completedTasks;
    const percentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

    const totals = useMemo(() => {
        const now = new Date();
        const currentMonth = now.getMonth(); // 0-11
        const currentYear = now.getFullYear();
        console.log(dailyActivity)

        return dailyActivity.reduce((acc, activity) => {

            const activityDate = new Date(activity.date);
            const isYearMatch = activityDate.getFullYear() === currentYear;
            const isMonthMatch = activityDate.getMonth() === currentMonth;

            if (isYearMatch) {
                acc.yearTotal += activity.count || 0;
                if (isMonthMatch) {
                    acc.monthTotal += activity.count || 0;
                }
            }

            return acc;
        }, { monthTotal: 0, yearTotal: 0 });
    }, [dailyActivity]); // Only recalculates when your data changes

    const streakCounter = (values) => {
        if (!values || values.length === 0) return 0;

        let streak = 0;

        let expectedDate = new Date();
        expectedDate.setHours(0, 0, 0, 0);

        for (let i = values.length - 1; i >= 0; i--) {
            const entryDate = new Date(values[i].date);
            entryDate.setHours(0, 0, 0, 0);

            if (entryDate.getTime() === expectedDate.getTime()) {

                // 2. If it matches, check if they actually did something
                if (values[i].count > 0) {
                    streak++;
                    // Move the "expected date" back by exactly one day for the next iteration
                    expectedDate.setDate(expectedDate.getDate() - 1);
                } else {
                    // Count was 0, streak broken
                    break;
                }
            } else if (entryDate.getTime() < expectedDate.getTime()) {
                // 3. If the date in our data is OLDER than the expected date, 
                // it means the expected date was missing from the array entirely.
                break;
            }
            // Note: if entryDate > expectedDate, it's a future date; we just ignore it.
        }

        return streak;
    };

    const streak = streakCounter(dailyActivity)

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
                <div className="stat-value text-secondary tracking-tight">{totals.monthTotal}</div>
                <div className="stat-desc flex items-center gap-1 text-success font-bold">
                    <span>{totals.yearTotal} completed </span>
                    <span className="text-base-content/50 font-normal">in {new Date().getFullYear()}</span>
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
                <div className="stat-value text-accent tracking-tight">{streak} Days</div>
                <div className="stat-desc font-medium italic text-accent/80 animate-pulse">
                {streak >= 3? "You're on fire! 🔥":"Build your streak"} 
                </div>
            </div>

        </div>
    );
}

export default TaskStats;