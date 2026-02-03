import TaskCard from "../components/taskCard"

function Tasks() {
  return (
    <div className="min-h-screen ">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-2">
        <TaskCard taskTitle={'create task card'} id={'as6dtasgdqw76dg'} priority={2} category={'work'} createdAt={4} completed={true} />
        <TaskCard taskTitle={'create task card'} id={'as6dtasgdqw76dg'} priority={5} category={'study'} createdAt={4} completed={false} />
      </div>
    </div>
  )
}

export default Tasks
