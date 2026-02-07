import React from 'react'
import Priority from './Priority'

function TasksHeader({ sortBy, setSortBy, showTask, setShowTask, onClear }) {
    const handleSortChange = (e) => {
        setSortBy(e.target.value);
    };

    const handleShowTasks = (e) => {
        setShowTask(e.target.value)
    }
    return (
        <div className="navbar bg-base-100 border-b border-base-content/5 px-4 md:px-6 py-2">
            <div className="flex flex-col md:flex-row w-full gap-3 md:gap-0 items-center">
                <div className="flex-1 flex items-center justify-between w-full md:w-auto">
                    <span className="font-semibold tracking-tight text-sm">
                        <Priority />
                    </span>

                    <button
                        className="btn btn-ghost btn-xs md:hidden opacity-50 font-normal hover:bg-transparent"
                        onClick={onClear}
                    >
                        Reset
                    </button>
                </div>

                <div className="flex-none w-full md:w-auto">
                    <div className="flex items-center justify-center md:justify-end gap-1 md:gap-2">

                        <button
                            className="btn btn-ghost btn-sm hidden md:flex font-normal opacity-50 hover:bg-transparent hover:opacity-100"
                            onClick={onClear}
                        >
                            Reset
                        </button>

                        <div className="w-[1px] h-4 bg-base-content/10 hidden md:block mx-3" />

                        <select
                            onChange={handleShowTasks}
                            value={showTask}
                            className="select select-sm select-ghost font-normal text-sm 
                       w-full md:w-auto md:min-w-[130px] px-3
                       focus:outline-none focus:bg-transparent focus:ring-0 
                       active:bg-transparent border-none"
                        >
                            <option disabled value="">Show tasks</option>
                            <option value='all'>All Tasks</option>
                            <option value='today'>Today</option>
                            <option value='upcoming'>Upcoming</option>
                            <option value='overdue'>Overdue</option>
                        </select>

                        <select
                            onChange={handleSortChange}
                            value={sortBy}
                            className="select select-sm select-ghost font-normal text-sm 
                       w-full md:w-auto md:min-w-[120px] px-3
                       focus:outline-none focus:bg-transparent focus:ring-0 
                       active:bg-transparent border-none"
                        >
                            <option disabled value="">Sort By</option>
                            <option value='latest'>Latest</option>
                            <option value='oldest'>Oldest</option>
                            <option value='completion'>Completed</option>
                            <option value='priority'>Priority</option>
                        </select>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default TasksHeader
