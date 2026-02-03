

function SubTaskItem({subTask, index, onUpdate, onDelete}) {
    return (
        <div className="flex items-center justify-between p-2 bg-base-200/50 hover:bg-base-200 rounded-lg group transition-all border border-transparent focus-within:border-primary/30 focus-within:bg-base-100">

            <div className="flex-1 flex items-center">
                {/* The "Edit Icon" hint that only shows on hover */}
                <div className="pl-2 text-base-content/30 group-hover:text-primary transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                </div>

                {/* The Editable Input */}
                <input
                    type="text"
                    value={subTask.title || ""}
                    onChange={(e) => onUpdate(index, e.target.value)}
                    className="bg-transparent border-none focus:ring-0 w-full text-sm font-medium px-3 py-1 outline-none"
                    placeholder="Subtask name cannot be empty"
                />
            </div>


            {/* Delete Button */}
            <button type="button" onClick={() => onDelete(index)} className="btn btn-circle btn-ghost btn-xs text-error hover:bg-error/10">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>
    )
}

export default SubTaskItem
