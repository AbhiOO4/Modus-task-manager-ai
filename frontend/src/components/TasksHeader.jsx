import React from 'react'
import Priority from './Priority'

function TasksHeader({sortBy, setSortBy, onClear}) {
    const handleSortChange = (e) => {
        setSortBy(e.target.value);
    };
    return (
        <div className="navbar bg-base-100 px-5">
            <div className="flex-1">
                <span className='font-semibold'><Priority/></span>
            </div>
            <div className="flex-none ">
                <ul className="menu menu-horizontal px-1">
                    <li><button className='btn btn-ghost' onClick={onClear}>Clear</button></li>
                    <li>
                        <select defaultValue="Pick a font" onChange={handleSortChange} value={sortBy} className="select select-ghost">
                            <option disabled={true}>Sort By</option>
                            <option value='latest' >Latest</option>
                            <option value='oldest'>Oldest</option>
                            <option value='completion'>Completed</option>
                            <option value='priority'>Priority</option>
                        </select>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default TasksHeader
