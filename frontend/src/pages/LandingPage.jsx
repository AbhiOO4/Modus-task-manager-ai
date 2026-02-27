
import { Link } from 'react-router';
import ModusLogo from '../components/ModusLogo';
import screenshots from './Desktop.png'

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-base-100 text-base-content font-sans">
      {/* Navigation */}
      <div className="navbar max-w-6xl mx-auto py-6">
        <div className="flex-1">
          <Link to="/" className="text-xl font-bold tracking-tighter uppercase">
            <ModusLogo />
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
              Modus is a workspace designed for focus. Organize your day, prioritize what matters, and use ai to breakdown tasks for you.
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
            <img className='' src={screenshots} alt="screenshot" />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="footer footer-center p-10 bg-base-300 border-t border-base-200 text-base-content opacity-60">
        <aside>
          <p className="font-bold tracking-widest uppercase"><ModusLogo /></p> 
          <p>© 2026 Modus - Built for those who do.</p>
        </aside> 
        {/* <nav className="grid grid-flow-col gap-4"> */}
          {/* <Link to="/privacy" className="link link-hover">Contact</Link> */}
          {/* <Link to="/terms" className="link link-hover"></Link> */}
        {/* </nav> */}
      </footer>
    </div>
  );
};

export default LandingPage;