import { Sparkles } from 'lucide-react'

function CreateTask() {
  return (
    <div>
      <div className="card card-side bg-base-300 shadow-sm p-5">
        <div className="card-body">
          <h2 className="card-title mb-5 text-2xl">Add Task</h2>
          <form className="">

            <div class="grid grid-cols-1 md:grid-cols-2">

              {/* first col */}

              {/* task title */}
              <div class="p-4">
                <div className="mb-5 form-control">
                  <fieldset className="fieldset">
                    <legend className="fieldset-legend">Task</legend>
                    <input type="text" className="input" placeholder="Type here" />
                    <p className="label">important</p>
                  </fieldset>
                </div>
                {/* task desc */}

                <div class="form-control w-full max-w-xs mb-5">
                  <legend className="fieldset-legend">Task Description</legend>
                  <textarea class="textarea textarea-bordered h-24 max-w-full min-w-auto" placeholder="Enter task description"></textarea>
                  <label class="label">
                    <span class="label-text-alt">Enter task description</span>
                  </label>
                </div>

                {/* add subtasks */}

                <div class="space-y-4 mb-5">

                  <label class="pb-0">
                    <span class="label-text font-bold ">Add Subtasks</span>
                  </label>

                  <div class="join w-full shadow-sm">
                    <input
                      type="text"
                      placeholder="Enter subtask name..."
                      class="input input-bordered join-item w-full focus:outline-none focus:border-primary"
                    />
                    <button class="btn btn-info join-item">
                      Add
                    </button>
                  </div>

                  <button className="btn btn-secondary"><Sparkles size={20} />Task-breakdown</button>

                  <div className="space-y-2 max-h-48 overflow-y-auto pr-1">

                    {/* Editable Subtask Item */}
                    <div className="flex items-center justify-between p-2 bg-base-200/50 hover:bg-base-200 rounded-lg group transition-all border border-transparent focus-within:border-primary/30 focus-within:bg-base-100">

                      <div className="flex-1 flex items-center">
                        {/* The "Edit Icon" hint that only shows on hover */}
                        <div className="pl-2 text-base-content/30 group-hover:text-primary transition-colors">
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                        </div>

                        {/* The Editable Input */}
                        <input
                          type="text"
                          defaultValue="New sub task created"
                          className="bg-transparent border-none focus:ring-0 w-full text-sm font-medium px-3 py-1 outline-none"
                          placeholder="Subtask name cannot be empty"
                        />
                      </div>


                      {/* Delete Button */}
                      <button className="btn btn-circle btn-ghost btn-xs text-error hover:bg-error/10">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>


                    {/* Editable Subtask Item */}
                    <div className="flex items-center justify-between p-2 bg-base-200/50 hover:bg-base-200 rounded-lg group transition-all border border-transparent focus-within:border-primary/30 focus-within:bg-base-100">

                      <div className="flex-1 flex items-center">
                        {/* The "Edit Icon" hint that only shows on hover */}
                        <div className="pl-2 text-base-content/30 group-hover:text-primary transition-colors">
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                        </div>

                        {/* The Editable Input */}
                        <input
                          type="text"
                          defaultValue="New sub task created"
                          className="bg-transparent border-none focus:ring-0 w-full text-sm font-medium px-3 py-1 outline-none"
                          placeholder="Subtask name cannot be empty"
                        />
                      </div>


                      {/* Delete Button */}
                      <button className="btn btn-circle btn-ghost btn-xs text-error hover:bg-error/10">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>

                    {/* Editable Subtask Item */}
                    <div className="flex items-center justify-between p-2 bg-base-200/50 hover:bg-base-200 rounded-lg group transition-all border border-transparent focus-within:border-primary/30 focus-within:bg-base-100">

                      <div className="flex-1 flex items-center">
                        {/* The "Edit Icon" hint that only shows on hover */}
                        <div className="pl-2 text-base-content/30 group-hover:text-primary transition-colors">
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                        </div>

                        {/* The Editable Input */}
                        <input
                          type="text"
                          defaultValue="New sub task created"
                          className="bg-transparent border-none focus:ring-0 w-full text-sm font-medium px-3 py-1 outline-none"
                          placeholder="Subtask name cannot be empty"
                        />
                      </div>


                      {/* Delete Button */}
                      <button className="btn btn-circle btn-ghost btn-xs text-error hover:bg-error/10">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>

                    



                  </div>
                </div>
              </div>

              <div class="p-4">
                {/* from to date  */}
                <div className="mb-5 form-control">
                  <fieldset className="fieldset">
                    <legend className="fieldset-legend">From</legend>
                    <input type="datetime-local" className="input" />
                    <legend className="fieldset-legend">To</legend>
                    <input type="datetime-local" className="input" />
                  </fieldset>
                </div>


                {/* second col */}


                {/* priority  */}
                <div className="mb-4 form-control">
                  <fieldset className="fieldset">
                    <legend className="fieldset-legend">Select Priority</legend>
                    <input
                      type="number"
                      className="input validator"
                      placeholder="Priority level between 1 to 5"
                      min="1"
                      max="5"
                      title="Must be between 1 to 5"
                    />
                    <p className="label">Optional</p>
                  </fieldset>
                </div>



                {/* add people email id */}


                {/* category */}

                <div className="form-control mb-5">
                  <fieldset className="fieldset">
                    <legend className="fieldset-legend">Select Category</legend>
                    <input type="text" className="input" placeholder="Enter task category" list="browsers" />
                    <datalist id="browsers">
                      <option value="work"></option>
                      <option value="studies"></option>
                      <option value="hobbies"></option>
                      <option value="sports"></option>
                      <option value="chill"></option>
                    </datalist>
                    <p className="label">Optional</p>
                  </fieldset>
                </div>


                {/* auto delete toggle button */}
                <div>
                  <legend className="fieldset-legend">Auto Delete on completion after Due date</legend>
                  <input type="checkbox" className="toggle toggle-error" />
                </div>
              </div>


            </div>
            <button className='btn btn-primary'>Add task</button>
          </form>
        </div>
      </div>

    </div>
  )
}

export default CreateTask


