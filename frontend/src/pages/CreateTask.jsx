import { Sparkles } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'react-hot-toast'
import SubTaskItem from '../components/SubTaskItem';
import { useNavigate } from 'react-router-dom';
import api from '../lib/axios.js';

function CreateTask() {
  const initialTaskState = {
    task: "",
    desc: "",
    category: "",
    subTasks: [],
    schedule: {
      from: "",
      to: "",
    },
    priority: 5,
    completed: false,
    autoDeleteAfterDue: false,
  };

  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [task, setTask] = useState(initialTaskState);
  const [subTask, setSubTask] = useState("")

  const handleChange = (e) => {
    const { name, value } = e.target

    if (name === "from" || name === "to") {
      setTask((prev) => ({
        ...prev,
        schedule: {
          ...prev.schedule,
          [name]: value, // Updates specifically inside schedule
        },
      }));
    } else {
      setTask((prev) => ({
        ...prev,
        [name]: value,
      }));
      console.log(task)
    }
  }

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setTask(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  const addSubTask = (e) => {
    e.preventDefault();
    
    if (!subTask || subTask.trim() === "") {
      return toast.error("Subtask field is empty");
    }

    setTask((prev) => ({
      ...prev,
      subTasks: [
        ...prev.subTasks,
        { title: subTask, completed: false }
      ],
    }));

    setSubTask("");
  };

  // Update a subtask string
  const handleSubTaskUpdate = (index, newValue) => {
    setTask(prev => ({
      ...prev,
      subTasks: prev.subTasks.map((item, i) =>
        i === index ? { ...item, title: newValue } : item
      )
    }));
  };

  // Delete a subtask
  const handleSubTaskDelete = (index) => {
    setTask(prev => ({
      ...prev,
      subTasks: prev.subTasks.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await api.post('/tasks', task);

      // Success handling
      toast.success("Task created successfully!");
      // Optional: resetTask() or navigate user
      navigate('/Tasks');

    } catch (error) {
      // Handle Axios Errors
      if (error.response) {
        // Check if it's the 400 Bad Request from Joi
        if (error.response.status === 400) {
          // Your middleware returns { message: error.details[0].message }
          const errorMessage = error.response.data.message;
          toast.error(errorMessage);
        } else {
          toast.error("An unexpected server error occurred.");
        }
      } else {
        // Handle Network errors (server down, etc)
        toast.error("Check your internet connection or server status.");
      }
    } finally {
      setIsSubmitting(false); // Re-enable button if it fails
    }
  };


  return (
    <div>
      <div className="card card-side bg-base-300 shadow-sm p-5">
        <div className="card-body">
          <h2 className="card-title mb-5 text-2xl">Add Task</h2>
          <form className="">

            <div className="grid grid-cols-1 md:grid-cols-2">

              {/* first col */}

              {/* task title */}
              <div className="p-4">
                <div className="mb-5 form-control">
                  <fieldset className="fieldset">
                    <legend className="fieldset-legend">Task</legend>
                    <input type="text" className="input" placeholder="Type here" name='task' value={task.task} onChange={handleChange} />
                    <p className="label">important</p>
                  </fieldset>
                </div>
                {/* task desc */}

                <div className="form-control w-full max-w-xs mb-5">
                  <legend className="fieldset-legend">Task Description</legend>
                  <textarea className="textarea textarea-bordered h-24 max-w-full min-w-auto" name="desc" value={task.desc} onChange={handleChange} placeholder="Enter task description"></textarea>
                  <label className="label">
                    <span className="label-text-alt">Enter task description</span>
                  </label>
                </div>

                {/* add subtasks */}

                <div className="space-y-4 mb-5">

                  <label className="pb-0">
                    <span className="label-text font-bold ">Add Subtasks</span>
                  </label>

                  <div className="join w-full shadow-sm">
                    <input
                      type="text"
                      placeholder="Enter subtask name..."
                      className="input input-bordered join-item w-full focus:outline-none focus:border-primary"
                      name='subTask'
                      value={subTask}
                      onChange={(e) => setSubTask(e.target.value)}
                    />
                    <button className="btn btn-info join-item" onClick={addSubTask}>
                      Add
                    </button>
                  </div>

                  <button className="btn btn-secondary"><Sparkles size={20} />Task-breakdown</button>

                  <div className="space-y-2 max-h-48 overflow-y-auto pr-1">

                    {/* Editable Subtask Item */}
                    {task.subTasks.length > 0 && task.subTasks.map((subTask, index) => (
                      <SubTaskItem
                        key={index}
                        index={index}
                        subTask={subTask}
                        onUpdate={handleSubTaskUpdate}
                        onDelete={handleSubTaskDelete}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-4">
                {/* from to date  */}
                <div className="mb-5 form-control">
                  <fieldset className="fieldset">
                    <legend className="fieldset-legend">From</legend>
                    <input type="datetime-local" className="input" name='from' value={task.schedule.from} onChange={handleChange} />
                    <legend className="fieldset-legend">To</legend>
                    <input type="datetime-local" className="input" name='to' value={task.schedule.to} onChange={handleChange} />
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
                      name='priority'
                      value={task.priority}
                      onChange={handleChange}
                    />
                    <p className="label">Optional</p>
                  </fieldset>
                </div>



                {/* add people email id */}


                {/* category */}

                <div className="form-control mb-5">
                  <fieldset className="fieldset">
                    <legend className="fieldset-legend">Select Category</legend>
                    <input type="text" className="input" placeholder="Enter task category" list="browsers" name='category' value={task.category} onChange={handleChange} />
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
                  <input type="checkbox" className="toggle toggle-error" name='autoDeleteAfterDue' checked={task.autoDeleteAfterDue} onChange={handleCheckboxChange} />
                </div>
              </div>


            </div>
            <button className='btn btn-primary' disabled={isSubmitting} onClick={handleSubmit}>Add task</button>
          </form>
        </div>
      </div>

    </div>
  )
}

export default CreateTask


