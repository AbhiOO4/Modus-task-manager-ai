import { Sparkles } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'react-hot-toast'
import SubTaskItem from '../components/SubTaskItem';
import { useNavigate } from 'react-router';
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
  const [isBreaking, setIsBreaking] = useState(false)
  const [taskInfo, setTaskInfo] = useState(initialTaskState);
  const [subTask, setSubTask] = useState("")

  const handleChange = (e) => {
    const { name, value } = e.target

    if (name === "from" || name === "to") {
      setTaskInfo((prev) => ({
        ...prev,
        schedule: {
          ...prev.schedule,
          [name]: value, // Updates specifically inside schedule
        },
      }));
    } else {
      setTaskInfo((prev) => ({
        ...prev,
        [name]: value,
      }));
      console.log(taskInfo)
    }
  }

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setTaskInfo(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  const addSubTask = (e) => {
    e.preventDefault();

    if (!subTask || subTask.trim() === "") {
      return toast.error("Subtask field is empty");
    }

    setTaskInfo((prev) => ({
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
    setTaskInfo(prev => ({
      ...prev,
      subTasks: prev.subTasks.map((item, i) =>
        i === index ? { ...item, title: newValue } : item
      )
    }));
  };

  // Delete a subtask
  const handleSubTaskDelete = (index) => {
    setTaskInfo(prev => ({
      ...prev,
      subTasks: prev.subTasks.filter((_, i) => i !== index)
    }));
  };

  const taskBreakdown = async () => {
    const {task, desc} = taskInfo
    console.log(task, desc)
    // 1. Validation Checks
    if (!task.trim() || !desc.trim()) {
      return toast.error("Both task and description are required!");
    }
    if (task.length < 3) {
      return toast.error("Task must be at least 3 characters long.");
    }
    if (desc.length < 20) {
      return toast.error("Description must be at least 20 characters long.");
    }

    setIsBreaking(true);

    try {
      const response = await api.post('/tasks/ai/task-breakdown', { task, desc });
      console.log(response)
      if (Array.isArray(response.data)) {
        const newSubTasks = response.data.map(subtask => ({
          title: subtask,
          completed: false
        }));
        setTaskInfo(prev => ({
          ...prev,
          // Spreading the old subTasks and then adding the new ones from the AI
          subTasks: [...(prev.subTasks || []), ...newSubTasks]
        }));
        toast.success("Tasks broken down!");
      } else {
        throw new Error("Invalid response format from AI");
      }

    } catch (error) {
      // 4. Detailed Error Handling
      const message = error.response?.data?.message || "Something went wrong";
      toast.error(message);
      console.error("Breakdown Error:", error);
    } finally {
      setIsBreaking(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await api.post('/tasks', taskInfo);

      // Success handling
      toast.success("Task created successfully!");
      // Optional: resetTaskInfo() or navigate user
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
      <div className="card card-side bg-base-300 shadow-sm p-4">
        <div className="card-body">
          <form className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-2">

              {/* first col */}

              {/* task title */}
              <div className="p-4">
                <div className="mb-5 form-control">
                    <legend className="fieldset-legend">Task</legend>
                    <input type="text" className="input mt-2" placeholder="Type here" name='task' value={taskInfo.task} onChange={handleChange} />
                </div>

                {/* task desc */}

                <div className="form-control w-full max-w-xs mb-5">
                  <legend className="fieldset-legend">Task Description</legend>
                  <textarea className="textarea textarea-bordered h-24 max-w-full min-w-auto" name="desc" value={taskInfo.desc} onChange={handleChange} placeholder="Enter task description"></textarea>
                </div>

                {/* add subtasks */}

                <div className="space-y-4 mb-5">

                  <label className="pb-0">
                    <span className="label-text font-bold">Add Subtasks</span>
                  </label>

                  <div className="join w-full shadow-sm mt-2">
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

                  <button className="btn btn-secondary" type='button' disabled={isBreaking} onClick={taskBreakdown}>{isBreaking ?  <div><span className="loading loading-spinner"></span> <span>Breaking down</span></div> : <><Sparkles size={20} />Task-breakdown</> }</button>

                  <div className="space-y-2 max-h-48 overflow-y-auto pr-1">

                    {/* Editable Subtask Item */}
                    {taskInfo.subTasks.length > 0 && taskInfo.subTasks.map((subTask, index) => (
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
                    <legend className="fieldset-legend">From</legend>
                    <input type="datetime-local" className="input" name='from' value={taskInfo.schedule.from} onChange={handleChange} />
                    <legend className="fieldset-legend">To</legend>
                    <input type="datetime-local" className="input" name='to' value={taskInfo.schedule.to} onChange={handleChange} />
                </div>


                {/* second col */}


                {/* priority  */}
                <div className="mb-4 form-control">
                    <legend className="fieldset-legend">Select Priority</legend>
                    <input
                      type="number"
                      className="input validator"
                      placeholder="Priority level between 1 to 5"
                      min="1"
                      max="5"
                      title="Must be between 1 to 5"
                      name='priority'
                      value={taskInfo.priority}
                      onChange={handleChange}
                    />
                </div>



                {/* add people email id */}


                {/* category */}

                <div className="form-control mb-5">
                  <fieldset className="fieldset">
                    <legend className="fieldset-legend">Select Category</legend>

                    <select
                      className="select select-bordered w-full max-w-xs  select-sm"
                      name="category"
                      value={taskInfo.category}
                      onChange={handleChange}
                    >
                      {/* Default placeholder option */}
                      <option value="" disabled>Pick a category</option>

                      <option value="">Work</option>
                      <option value="studies">Studies</option>
                      <option value="hobbies">Hobbies</option>
                      <option value="personal">Personal</option>
                      <option value="social">Social</option>
                    </select>

                    <p className="label">Required for organization</p>
                  </fieldset>
                </div>


                {/* auto delete toggle button */}
                <div>
                  <legend className="fieldset-legend">Auto Delete on completion after Due date</legend>
                  <input type="checkbox" className="toggle toggle-error" name='autoDeleteAfterDue' checked={taskInfo.autoDeleteAfterDue} onChange={handleCheckboxChange} />
                </div>
              </div>

              <button className='btn btn-primary w-25' disabled={isSubmitting} onClick={handleSubmit}>
                {isSubmitting ? <div><span className="loading loading-spinner"></span> <span>Creating...</span></div> : "Create"}
              </button>
            </div>
          </form>
        </div>
      </div>

    </div>
  )
}

export default CreateTask


