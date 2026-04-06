import React from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { Shield } from 'lucide-react';
import Dashboard from './pages/Dashboard';
import About from './pages/About';

function App() {
  const location = useLocation();

  return (
    <div className="min-h-screen w-full bg-black text-cyber-yellow p-4 md:p-8 selection:bg-cyber-yellow selection:text-black">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header */}
        <header className="flex flex-col md:flex-row items-center justify-between gap-4 border-b border-cyber-yellow/20 pb-6">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-cyber-yellow/10 rounded-lg border border-cyber-yellow/30 animate-pulse">
                <Shield className="w-8 h-8" />
              </div>
              <div>
                <h1 className="text-3xl font-bold tracking-tighter glitch-text">SENTRI AI</h1>
                <p className="text-xs text-cyber-yellow/60 uppercase tracking-widest">Autonomous Startup Security Agent</p>
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex gap-4 ml-4">
              <Link 
                to="/" 
                className={`text-sm font-bold uppercase tracking-wider transition-all ${location.pathname === '/' ? 'text-cyber-yellow' : 'text-cyber-yellow/40 hover:text-cyber-yellow/80'}`}
              >
                Dashboard
              </Link>
              <Link 
                to="/about" 
                className={`text-sm font-bold uppercase tracking-wider transition-all ${location.pathname === '/about' ? 'text-cyber-yellow' : 'text-cyber-yellow/40 hover:text-cyber-yellow/80'}`}
              >
                Architecture
              </Link>
            </nav>
          </div>
          
          <div className="flex items-center gap-4 bg-cyber-yellow/5 p-2 rounded-full border border-cyber-yellow/20 px-4">
            <span className="flex h-2 w-2 rounded-full bg-cyber-yellow animate-ping" />
            <span className="text-[10px] font-bold uppercase">System Online</span>
          </div>
        </header>

        {/* Routes Mapping */}
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/about" element={<About />} />
        </Routes>

        {/* Footer */}
        <footer className="text-center text-cyber-yellow/30 text-[10px] uppercase tracking-widest pt-8 border-t border-cyber-yellow/10">
          Built with speed by Antigravity AI &bull; Groq Llama 3 Engine &bull; Playwright Red-Team Core
        </footer>
      </div>
    </div>
  );
}

export default App;
