import { useEffect, useState, useMemo } from "react";
import TaskCard from "../components/taskCard";
import api from "../lib/axios";
import toast from "react-hot-toast";
import Loading from "../components/Loading";
import EmptyTasks from "../components/EmptyTasks";
import TasksHeader from "../components/TasksHeader";
import CategorySelector from "../components/CategorySelector";

function Tasks() {
  // 1. Lazy State Initializers - Grabs saved preferences immediately
  const [isLoading, setIsLoading] = useState(false);
  const [tasks, setTasks] = useState([]);
  
  const [activeCat, setActiveCat] = useState(() => {
    const saved = localStorage.getItem("activeCat");
    // Check if saved is the literal string "null", "undefined", or actually empty
    if (!saved || saved === "null" || saved === "undefined") return null;
    return saved;
  });

  const [sortBy, setSortBy] = useState(() => {
    return localStorage.getItem("sortBy") || "latest";
  });

  const [showTask, setShowTask] = useState(() => {
    return localStorage.getItem("showTask") || "all";
  });

  // 2. Effect: Data Fetching
  // Runs only when the API parameters (category/sort) change
  useEffect(() => {
    const fetchTasks = async () => {
      setIsLoading(true);
      try {
        const res = await api.get("/tasks", {
          params: {
            category: activeCat,
            sort: sortBy,
          },
        });
        setTasks(res.data);
      } catch (error) {
        toast.error("Error fetching tasks");
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTasks();
  }, [activeCat, sortBy]);

  // 3. Effect: Persistence
  // Saves UI preferences whenever they change (Doesn't trigger API)
  useEffect(() => {
    
    localStorage.setItem("activeCat", activeCat);
    localStorage.setItem("sortBy", sortBy);
    localStorage.setItem("showTask", showTask);
  }, [activeCat, sortBy, showTask]);

  // 4. Categorization Logic
  const categorizedTasks = useMemo(() => {
    const now = new Date();
    return {
      // Overdue: Past the 'to' date and NOT completed
      overdue: tasks.filter((t) => !t.completed && new Date(t.schedule.to) < now),
      
      // Today: Now is within the window (from -> to)
      today: tasks.filter((t) => {
        const start = new Date(t.schedule.from);
        const end = new Date(t.schedule.to);
        return now >= start && now <= end;
      }),
      
      // Upcoming: Hasn't started yet
      upcoming: tasks.filter((t) => new Date(t.schedule.from) > now),
      
      // All: Everything
      all: tasks,
    };
  }, [tasks]);

  const tasksToShow = categorizedTasks[showTask] || [];

  const onClear = () => {
    setActiveCat(null);
    setSortBy("latest");
    setShowTask("all");

    localStorage.removeItem("activeCat");
    localStorage.removeItem("sortBy");
    localStorage.removeItem("showTask");


  };

  return (
    <div className="min-h-screen pb-10 bg-base-100 font-sans tracking-tight">
      {/* Navigation Section */}
      <div className="bg-base-100 border-b border-base-content/5 px-2">
        <TasksHeader
          sortBy={sortBy}
          setSortBy={setSortBy}
          showTask={showTask}
          setShowTask={setShowTask}
          onClear={onClear}
        />
        <div className="py-2">
          <CategorySelector activeCat={activeCat} setActiveCat={setActiveCat} />
        </div>
      </div>

      <main className="px-6 mt-10">
        {/* Minimalist Heading */}
        <div className="mb-10">
          <h1 className="text-2xl font-medium text-base-content/90 capitalize tracking-normal">
            {showTask === "all" ? "All Tasks" : showTask}
          </h1>
        </div>

        {/* Content States */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-32">
            <Loading />
          </div>
        ) : tasksToShow.length === 0 ? (
          <div className="flex justify-center items-center pt-20">
            <EmptyTasks />
          </div>
        ) : (
          /* The Task Grid - Optimized Spacing */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-x-6 gap-y-10">
            {tasksToShow.map((task) => (
              <div key={task._id} className="w-full">
                <TaskCard
                  task={task}
                  setTasks={setTasks}
                  setActiveCat={setActiveCat}
                />
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default Tasks;