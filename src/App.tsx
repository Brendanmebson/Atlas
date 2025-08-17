import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { CryptoProvider } from './contexts/CryptoContext';
import { PortfolioProvider } from './contexts/PortfolioContext';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile/Profile';
import Navbar from './components/Navbar';
import Withdraw from './pages/Withdraw';
import Portfolio from './pages/Portfolio';
import Markets from './pages/Markets';
import Settings from './pages/Settings';
import LoadingSpinner from './components/ui/LoadingSpinner';
import './styles/animations.css';

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <CryptoProvider>
        <PortfolioProvider>
          <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 transition-colors duration-300">
            <Navbar />
            <main className="container mx-auto px-4 py-6">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/portfolio" element={<Portfolio />} />
                <Route path="/markets" element={<Markets />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/withdraw" element={<Withdraw />} />
              </Routes>
            </main>
          </div>
        </PortfolioProvider>
      </CryptoProvider>
    </ThemeProvider>
  );
};

export default App;