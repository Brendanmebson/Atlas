import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Box, AppBar, Toolbar, IconButton, Typography } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
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
import atlasWhiteLogo from './assets/atlas-white.png';
import Sidebar from './components/Sidebar';

const App: React.FC = () => {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

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
            {/* Mobile Header */}
            <AppBar 
              position="fixed" 
              sx={{ 
                display: { md: 'none' },
                bgcolor: 'rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(20px)',
                boxShadow: 'none',
                borderBottom: '1px solid rgba(0,0,0,0.05)',
                zIndex: 1100
              }}
            >
              <Toolbar>
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  edge="start"
                  onClick={handleDrawerToggle}
                  sx={{ mr: 2, color: 'text.primary' }}
                >
                  <MenuIcon />
                </IconButton>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box
                    component="img"
                    src={atlasWhiteLogo}
                    alt="Atlas"
                    sx={{ height: 28, width: 'auto', mr: 1, filter: 'invert(0)' }}
                  />
                  <Typography variant="h6" sx={{ fontWeight: 700, color: 'text.primary' }}>
                    Atlas
                  </Typography>
                </Box>
              </Toolbar>
            </AppBar>

            <Sidebar mobileOpen={mobileOpen} onClose={handleDrawerToggle} />
            
            <Box component="main" sx={{
              flexGrow: 1,
              ml: { xs: 0, md: '240px' },
              mt: { xs: '64px', md: 0 },
              minHeight: '100vh',
              p: { xs: 2, sm: 2.5 },
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