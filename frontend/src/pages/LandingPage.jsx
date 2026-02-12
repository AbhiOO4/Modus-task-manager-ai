
import { Link } from 'react-router';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-base-100 text-base-content font-sans">
      {/* Navigation */}
      <div className="navbar max-w-6xl mx-auto py-6">
        <div className="flex-1">
          <Link to="/" className="text-xl font-bold tracking-tighter uppercase">
            Modus
          </Link>
        </div>
        <div className="flex-none gap-4">
          <Link to="/signup" className="btn btn-primary btn-sm rounded-full px-6">
            Get Started
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <main className="max-w-6xl mx-auto px-6 pt-20 pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-7xl md:text-8xl font-bold tracking-tighter leading-none mb-8">
              Simply <br />Done.
            </h1>
            <p className="text-xl opacity-70 leading-relaxed mb-10 max-w-md">
              Modus is a workspace designed for focus. Organize your day, prioritize what matters, and use built-in intelligence to deconstruct complex projects.
            </p>
            <Link 
              to="/signup"
              className="btn btn-primary btn-lg rounded-full px-10 shadow-lg hover:scale-105 transition-transform"
            >
              Start Planning
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>

          {/* Interface Placeholder using daisyUI "Mockup" component */}
          <div className="hidden lg:block">
            <div className="mockup-window border border-base-300 bg-base-200 shadow-2xl">
              <div className="flex justify-center px-4 py-16 bg-base-100 border-t border-base-300">
                <div className="flex flex-col gap-4 w-full max-w-xs">
                  <div className="h-4 bg-base-300 rounded w-3/4 opacity-50"></div>
                  <div className="h-4 bg-base-300 rounded w-full"></div>
                  <div className="h-4 bg-base-300 rounded w-5/6 opacity-30"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="footer footer-center p-10 border-t border-base-200 text-base-content opacity-60">
        <aside>
          <p className="font-bold tracking-widest uppercase">Modus</p> 
          <p>© 2026 - Built for those who do.</p>
        </aside> 
        <nav className="grid grid-flow-col gap-4">
          <Link to="/privacy" className="link link-hover">Privacy</Link>
          <Link to="/terms" className="link link-hover">Terms</Link>
        </nav>
      </footer>
    </div>
  );
};

export default LandingPage;