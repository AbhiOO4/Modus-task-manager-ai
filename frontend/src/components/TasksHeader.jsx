import React from 'react'
import Priority from './Priority'

function TasksHeader() {
    return (
        <div className="navbar bg-base-100 px-5">
            <div className="flex-1">
                <span className='font-semibold'><Priority/></span>
            </div>
            <div className="flex-none ">
                <ul className="menu menu-horizontal px-1">
                    <li><button className='btn btn-ghost'>Clear</button></li>
                    <li>
                        <select defaultValue="Pick a font" className="select select-ghost">
                            <option disabled={true}>Sort By</option>
                            <option >Latest</option>
                            <option>Oldest</option>
                            <option>Completed</option>
                            <option>Priority</option>
                        </select>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default TasksHeader
