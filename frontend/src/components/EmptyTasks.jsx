
import { Plus, Wind } from 'lucide-react';
import { useNavigate } from 'react-router';

const EmptyTasks = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      {/* Visual Element */}
      <div className="bg-base-200 p-8 rounded-full mb-6 animate-pulse">
        <Wind size={48} className="text-base-content/30" />
      </div>

      {/* Text Content */}
      <div className="max-w-md mb-8">
        <h1 className="font-mono text-3xl font-bold mb-2">It's empty here...</h1>
        <p className="text-base-content/60">
          Your task list is looking a bit lonely. Why not clear your mind and jot down a new task?
        </p>
      </div>

      {/* Call to Action */}
      <button 
        onClick={() => navigate('/Create')}
        className="btn btn-primary btn-wide rounded-3xl gap-2 shadow-lg hover:scale-105 transition-transform"
      >
        <Plus size={20} />
        Create New Task
      </button>

      {/* Decorative DaisyUI background blobs (Optional) */}
      <div className="absolute top-1/2 left-1/2 -z-10 blur-3xl opacity-10 -translate-x-1/2 -translate-y-1/2">
        <div className="w-64 h-64 bg-primary rounded-full"></div>
      </div>
    </div>
  );
};

export default EmptyTasks;