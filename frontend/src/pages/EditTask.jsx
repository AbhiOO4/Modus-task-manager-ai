

import { Sparkles, Info } from 'lucide-react'
import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import SubTaskItem from '../components/SubTaskItem';
import { useNavigate, useParams } from 'react-router';
import api from '../lib/axios.js';

function EditTask() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isBreaking, setIsBreaking] = useState(false)
  const [taskInfo, setTaskInfo] = useState({});
  const [subTask, setSubTask] = useState("")
  const { id } = useParams()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchTask = async () => {
      setLoading(true)
      try {
        const res = await api.get(`/tasks/${id}`);
        const data = res.data;

        // Helper to format date for datetime-local input
        const formatDate = (dateStr) => {
          if (!dateStr) return "";
          // Slice to get only YYYY-MM-DDTHH:mm
          return new Date(dateStr).toISOString().slice(0, 16);
        };

        // Pre-format the schedule dates
        if (data.schedule) {
          data.schedule.from = formatDate(data.schedule.from);
          data.schedule.to = formatDate(data.schedule.to);
        }

        setTaskInfo(data);
      } catch (error) {
        toast.error("failed to load the task")
      } finally {
        setLoading(false)
      }
    }

    fetchTask()
  }, [id])

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
    const { task, desc } = taskInfo
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
      const response = await api.put(`/tasks/${id}`, taskInfo);
      toast.success("Task updated successfully!");
      navigate(`/Task/${id}`);

    } catch (error) {
      if (error.response) {
        if (error.response.status === 400) {
          const errorMessage = error.response.data.message;
          toast.error(errorMessage);
        } else {
          toast.error("An unexpected server error occurred.");
        }
      } else {
        toast.error("Check your internet connection or server status.");
      }
    } finally {
      setIsSubmitting(false); 
    }
  };


  return (
  <div className="max-w-6xl mx-auto p-4 md:p-8 animate-in fade-in duration-500">
    {/* Header */}
    <div className="mb-8">
      <h1 className="text-3xl font-extrabold flex items-center gap-3">
        <div className="bg-primary p-2 rounded-lg text-primary-content">
          <Sparkles size={24} />
        </div>
        Update Task
      </h1>
      <p className="text-base-content/60 mt-1">Organize your day and boost your productivity.</p>
    </div>

    {/* Using items-start ensures columns don't stretch and mess up alignment */}
    <form className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
      
      {/* LEFT COLUMN: Main Info */}
      <div className="lg:col-span-2 flex flex-col gap-6">
        <div className="card bg-base-100 border border-base-300 shadow-sm">
          <div className="card-body p-6 md:p-8 gap-6">
            <div className="form-control w-full">
              <label className="label font-bold text-sm uppercase tracking-wider text-base-content/70">Task Title</label>
              <input 
                type="text" 
                className="input input-bordered input-lg focus:input-primary font-medium w-full" 
                placeholder="What needs to be done?" 
                name='task' 
                value={taskInfo.task} 
                onChange={handleChange} 
              />
            </div>

            <div className="form-control w-full">
              <label className="label font-bold text-sm uppercase tracking-wider text-base-content/70">Description</label>
              <textarea 
                className="textarea textarea-bordered h-32 text-base leading-relaxed focus:textarea-primary w-full" 
                name="desc" 
                value={taskInfo.desc} 
                onChange={handleChange} 
                placeholder="Add some details about this task..."
              ></textarea>
            </div>
          </div>
        </div>

        {/* Subtasks Section */}
        <div className="card bg-base-100 border border-base-300 shadow-sm">
          <div className="card-body p-6 md:p-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
              <label className="label font-bold text-sm uppercase tracking-wider text-base-content/70 p-0">
                Subtasks
              </label>
              <button 
                className="btn btn-sm btn-outline btn-secondary gap-2" 
                type='button' 
                disabled={isBreaking} 
                onClick={taskBreakdown}
              >
                {isBreaking ? <span className="loading loading-spinner loading-xs"></span> : <Sparkles size={16} />}
                AI Breakdown
              </button>
            </div>

            <div className="join w-full mb-6">
              <input
                type="text"
                placeholder="Add a step..."
                className="input input-bordered join-item w-full focus:outline-none"
                name='subTask'
                value={subTask}
                onChange={(e) => setSubTask(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSubTask(e))}
              />
              <button className="btn btn-neutral join-item px-6" onClick={addSubTask} type="button">
                Add
              </button>
            </div>

            <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
              {taskInfo.subTasks?.length > 0 ? (
                taskInfo.subTasks.map((st, index) => (
                  <SubTaskItem
                    key={index}
                    index={index}
                    subTask={st}
                    onUpdate={handleSubTaskUpdate}
                    onDelete={handleSubTaskDelete}
                  />
                ))
              ) : (
                <div className="text-center py-10 bg-base-200/50 rounded-xl border-2 border-dashed border-base-300 text-base-content/40">
                  No subtasks added yet. Try the AI Breakdown!
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN: Settings Sidebar */}
      <div className="flex flex-col gap-6 lg:sticky lg:top-8">
        <div className="card bg-base-200 border border-base-300 shadow-sm overflow-visible">
          <div className="card-body p-6 space-y-6">
            
            {/* Category */}
            <div className="form-control">
              <label className="label font-bold text-xs uppercase tracking-widest text-base-content/50">Category</label>
              <select
                className="select select-bordered w-full mt-1"
                name="category"
                value={taskInfo.category}
                onChange={handleChange}
              >
                <option value="" disabled>Pick a category</option>
                <option value="work">Work</option>
                <option value="studies">Studies</option>
                <option value="hobbies">Hobbies</option>
                <option value="personal">Personal</option>
                <option value="social">Social</option>
              </select>
            </div>

            {/* Priority */}
            <div className="form-control">
              <label className="label font-bold text-xs uppercase tracking-widest text-base-content/50">Priority Level</label>
              <input
                type="range"
                min="1"
                max="5"
                className="range range-primary range-sm mt-2"
                name='priority'
                value={taskInfo.priority}
                onChange={handleChange}
              />
              <div className="flex justify-between text-xs px-1 mt-2 font-bold opacity-70">
                <span>1</span><span>2</span><span>3</span><span>4</span><span>5</span>
              </div>
            </div>

            <div className="divider opacity-50 m-0"></div>

            {/* Schedule */}
            <div className="space-y-4">
              <label className="label font-bold text-xs uppercase tracking-widest text-base-content/50 p-0">Schedule</label>
              <div className="bg-base-100 p-4 rounded-xl border border-base-300 space-y-4">
                <div className="form-control">
                  <span className="text-[10px] font-bold text-primary uppercase">From</span>
                  <input type="datetime-local" className="input input-sm input-ghost w-full p-0 h-auto mt-1 focus:bg-transparent" name='from' value={taskInfo.schedule?.from} onChange={handleChange} />
                </div>
                <div className="form-control">
                  <span className="text-[10px] font-bold text-error uppercase">To</span>
                  <input type="datetime-local" className="input input-sm input-ghost w-full p-0 h-auto mt-1 focus:bg-transparent" name='to' value={taskInfo.schedule?.to} onChange={handleChange} />
                </div>
              </div>
            </div>

            {/* Toggle */}
            <div className="form-control">
              <label className="label cursor-pointer bg-base-100 p-3 rounded-xl border border-base-300 flex justify-between gap-2">
                <span className="label-text font-medium text-[11px] leading-tight">Auto-delete on completion</span>
                <input 
                  type="checkbox" 
                  className="toggle toggle-error toggle-sm shrink-0" 
                  name='autoDeleteAfterDue' 
                  checked={taskInfo.autoDeleteAfterDue} 
                  onChange={handleCheckboxChange} 
                />
              </label>
            </div>

            {/* Submit Button */}
            <button 
              className='btn btn-primary btn-block btn-lg rounded-2xl shadow-lg shadow-primary/20 mt-4' 
              disabled={isSubmitting} 
              onClick={handleSubmit}
              type="button"
            >
              {isSubmitting ? <span className="loading loading-spinner"></span> : "Save Changes"}
            </button>
          </div>
        </div>

        {/* Info/Alert Message - Now correctly spaced below the sidebar card */}
        <div className="alert bg-info/10 border-info/20 rounded-2xl flex items-start gap-3 p-4 shadow-sm">
          <Info size={18} className="text-info shrink-0 mt-0.5" />
          <div className="text-xs leading-relaxed">
            <span className="font-bold block mb-1">Quick Tip:</span>
            Organizing tasks by category and priority makes them easier to manage later.
          </div>
        </div>
      </div>
    </form>
  </div>
);
}

export default EditTask


