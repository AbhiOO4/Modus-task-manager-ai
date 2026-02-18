import { useNavigate } from "react-router";
import { Home, ArrowLeft, Ghost } from "lucide-react";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center px-6">
      <div className="card w-full max-w-md bg-base-100 shadow-2xl border border-base-300">
        <div className="card-body items-center text-center space-y-4">

          {/* Icon */}
          <div className="bg-primary/10 p-4 rounded-full">
            <Ghost className="w-12 h-12 text-primary" />
          </div>

          {/* Title */}
          <h1 className="text-5xl font-bold text-primary">404</h1>
          <h2 className="text-xl font-semibold">Page Not Found</h2>

          {/* Description */}
          <p className="text-base-content/70">
            The page you're looking for doesn’t exist or has been moved.
          </p>

          {/* Buttons */}
          <div className="flex gap-4 pt-4">

            <button
              onClick={() => navigate(-1)}
              className="btn btn-outline"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Go Back
            </button>

            <button
              onClick={() => navigate("/", { replace: true })}
              className="btn btn-primary"
            >
              <Home className="w-4 h-4 mr-2" />
              Go Home
            </button>

          </div>
        </div>
      </div>
    </div>
  );
}
