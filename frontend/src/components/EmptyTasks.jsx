
import { Plus, Wind } from 'lucide-react';
import { useNavigate } from 'react-router';

const EmptyTasks = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center mb-7 text-center px-4">
      {/* Visual Element */}
      <div className="bg-base-200 p-8 rounded-full mb-6 animate-pulse">
        <Wind size={48} className="text-base-content/30" />
      </div>

      {/* Text Content */}
      <div className="max-w-md mb-8">
        <h1 className="text-3xl font-normal mb-2">It's empty here...</h1>
        <p className="text-base-content/60">
        
        </p>
      </div>
    </div>
  );
};

export default EmptyTasks;