import { useEffect, useState, useMemo } from 'react'
import api from '../lib/axios';
import TaskStats from '../components/TaskStats';
import CalendarHeatmap from 'react-calendar-heatmap';
import MinimalTaskCard from '../components/MinimalTaskCard';
import toast from 'react-hot-toast';
import { Tooltip } from 'react-tooltip';

function DashBoard() {
  const [tasks, setTasks] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [heatmapValues, setHeatmapValues] = useState([])

  useEffect(() => {
    const fetchTasks = async () => {
      setIsLoading(true); ``
      try {
        const res = await api.get("/tasks");
        setTasks(res.data);

        // 2. Fetch Real Heatmap Data
        const activityRes = await api.get("/tasks/activity");
        setHeatmapValues(activityRes.data);

      } catch (error) {
        toast.error("Error fetching tasks");
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTasks();
  }, []);

  const categorizedTasks = useMemo(() => {
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    return {
      today: tasks.filter((t) => {
        const start = new Date(t.schedule.from);
        start.setHours(0, 0, 0, 0);
        const end = new Date(t.schedule.to);
        end.setHours(23, 59, 59, 999);
        return todayStart >= start && todayStart <= end;
      }),
    };
  }, [tasks]);

  const todaysTasks = categorizedTasks['today'] || [];

  return (
    <div className="max-w-7xl mx-auto p-4 lg:p-6 space-y-10">
      
      {/* 1. TOP RIBBON: Task Stats (Full Width) */}
      <div className="w-full overflow-x-auto rounded-box">
        <TaskStats tasks={tasks} dailyActivity={heatmapValues}/>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* 2. LEFT/CENTER: Active Tasks for Today (Span 2) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between border-b border-base-300 pb-2">
            <h2 className="text-xl font-bold tracking-tight uppercase opacity-70">Todays Tasks</h2>
            <span className="badge badge-primary">{todaysTasks.length}</span>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               {[1,2,3,4].map(i => <div key={i} className="skeleton h-24 w-full"></div>)}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {todaysTasks.length > 0 ? (
                todaysTasks.map((task) => (
                  <MinimalTaskCard key={task._id} task={task} />
                ))
              ) : (
                <div className="col-span-full py-10 text-center bg-base-200 rounded-xl border-2 border-dashed border-base-300">
                  <p className="opacity-50">No active tasks for today.</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* 3. RIGHT SIDE: Consistency Chart (Heatmap) */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold tracking-tight uppercase opacity-70 border-b border-base-300 pb-2">Consistency</h2>
          <div className="bg-base-200 p-6 rounded-2xl shadow-sm border border-base-300">
            <CalendarHeatmap
              startDate={new Date(new Date().setDate(new Date().getDate() - 120))}
              endDate={new Date(new Date().setDate(new Date().getDate() + 30))}
              values={heatmapValues}
              classForValue={(value) => {
                if (!value || value.count === 0) return 'color-empty';
                if (value.count >= 10) return 'color-scale-4';
                if (value.count >= 5) return 'color-scale-3';
                if (value.count >= 3) return 'color-scale-2';
                return 'color-scale-1';
              }}

              tooltipDataAttrs={(value) => {
                if (!value || !value.date) {
                  return {
                    'data-tooltip-id': 'my-tooltip',
                    'data-tooltip-content': 'No tasks completed',
                  };
                }
                return {
                  'data-tooltip-id': 'my-tooltip',
                  'data-tooltip-content': `${value.count} tasks completed on ${value.date}`,
                };
              }}
             
              gutterSize={3}
            />
            <Tooltip id="my-tooltip" />
            <div className="mt-4 flex justify-between items-center text-[10px] uppercase opacity-50 font-bold">
               <span>Less</span>
               <div className="flex gap-1">
                  <div className="w-3 h-3 bg-base-300"></div>
                  <div className="w-3 h-3 bg-green-300"></div>
                  <div className="w-3 h-3 bg-green-500"></div>
                  <div className="w-3 h-3 bg-green-700"></div>
               </div>
               <span>More</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default DashBoard