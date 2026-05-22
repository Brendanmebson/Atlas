import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';
import { ThemeProvider } from './contexts/ThemeContext';
import { CryptoProvider } from './contexts/CryptoContext';
import { PortfolioProvider } from './contexts/PortfolioContext';
import Dashboard from './pages/Dashboard';

import Withdraw from './pages/Withdraw';
import Portfolio from './pages/Portfolio';
import Profile from './pages/Profilesettings/Profile';
import Settings from './pages/Profilesettings/Preference';
import Security from './pages/Profilesettings/Securitysettings';
import Trade from './pages/Trade';
import Notifications from './pages/Notifications';
import Exchange from './pages/Exchange';
import './styles/animations.css';

import bgImage from './assets/background.jpg';
import Sidebar from './components/Sidebar';

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <CryptoProvider>
        <PortfolioProvider>
          <Box sx={{
            display: 'flex',
            minHeight: '100vh',
            bgcolor: 'background.default',
            position: 'relative',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0, left: 0, right: 0, bottom: 0,
              backgroundImage: `url(${bgImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundAttachment: 'fixed',
              opacity: 0.10,
              pointerEvents: 'none',
              zIndex: 0,
            }
          }}>
            <Sidebar />
            <Box component="main" sx={{
              flexGrow: 1,
              ml: '240px',
              minHeight: '100vh',
              p: 2.5,
              overflow: 'hidden',
              position: 'relative',
              zIndex: 1,
            }}>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/portfolio" element={<Portfolio />} />
                <Route path="/withdraw" element={<Withdraw />} />
                <Route path="/markets" element={<Dashboard />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/security" element={<Security />} />
                <Route path="/trade" element={<Trade />} />
                <Route path="/notifications" element={<Notifications />} />
                <Route path="/exchange" element={<Exchange />} />
                <Route path="/info" element={<Dashboard />} />
              </Routes>
            </Box>
          </Box>
        </PortfolioProvider>
      </CryptoProvider>
    </ThemeProvider>
  );
};

export default App;