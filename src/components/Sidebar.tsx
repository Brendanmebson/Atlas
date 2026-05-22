import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import atlasDarkLogo from '../assets/atlas-dark.png';

import {
  Typography,
  Badge,
  Drawer,
} from '@mui/material';
import {
  PersonOutline as ProfileIcon,
  DashboardOutlined as DashboardIcon,
  AccountBalanceWalletOutlined as WalletIcon,
  SwapHorizOutlined as TradeIcon,
  NotificationsNoneOutlined as NotificationsIcon,
  CurrencyExchangeOutlined as ExchangeIcon,
  SettingsOutlined as SettingsIcon,
} from '@mui/icons-material';

interface MenuItem {
  text: string;
  icon: JSX.Element;
  path: string;
  badge?: number;
}

const menuItems: MenuItem[] = [
  { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
  { text: 'Wallet', icon: <WalletIcon />, path: '/portfolio' },
  { text: 'Trade', icon: <TradeIcon />, path: '/trade' },
  { text: 'Notifications', icon: <NotificationsIcon />, path: '/notifications', badge: 4 },
  { text: 'Exchange', icon: <ExchangeIcon />, path: '/exchange' },
  { text: 'Profile', icon: <ProfileIcon />, path: '/profile' },
  { text: 'Settings', icon: <SettingsIcon />, path: '/settings' },
];



interface SidebarProps {
  mobileOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ mobileOpen, onClose }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isDark } = useTheme();

  const isActive = (path: string) => {
    if (path === '/dashboard' && location.pathname === '/') return true;
    return location.pathname === path;
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    onClose();
  };

  const drawerContent = (
    <Box sx={{
      height: '100%',
      bgcolor: 'transparent',
      display: 'flex',
      flexDirection: 'column',
      p: 3,
    }}>
      {/* Logo */}
      <Box sx={{ display: 'flex', alignItems: 'center', mt: 1, mb: 3, pl: 1 }}>
        <Box
          component="img"
          src={atlasDarkLogo}
          alt="Atlas Logo"
          sx={{ height: 40, width: 'auto', mr: 1.5 }}
        />
        <Typography variant="h5" sx={{ fontWeight: 700, color: 'text.primary' }}>
          Atlas
        </Typography>
      </Box>

      {/* Main Menu */}
      <List sx={{ flexGrow: 1 }}>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding sx={{ mb: 0.5 }}>
            <ListItemButton
              onClick={() => handleNavigation(item.path)}
              sx={{
                borderRadius: 2,
                py: 1.2,
                bgcolor: isActive(item.path) ? 'primary.main' : 'transparent',
                color: isActive(item.path) ? 'white' : 'text.secondary',
                '&:hover': {
                  bgcolor: isActive(item.path) ? 'primary.main' : 'action.hover',
                  color: isActive(item.path) ? 'white' : 'text.primary',
                },
                transition: 'all 0.2s',
              }}
            >
              <ListItemIcon sx={{
                minWidth: 36,
                color: 'inherit',
              }}>
                {item.badge ? (
                  <Badge badgeContent={item.badge} color="error" overlap="circular">
                    {item.icon}
                  </Badge>
                ) : item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.text}
                primaryTypographyProps={{
                  fontWeight: isActive(item.path) ? 600 : 500,
                  fontSize: '0.9rem'
                }}
              />
              {isActive(item.path) && (
                <Box sx={{
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  bgcolor: 'white',
                  ml: 1
                }} />
              )}
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <Box
        component="nav"
        sx={{ width: { md: 240 }, flexShrink: { md: 0 } }}
      >
        {/* Mobile Drawer */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={onClose}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box', 
              width: 240,
              bgcolor: 'background.default',
              backgroundImage: 'none',
              borderRight: '1px solid rgba(0,0,0,0.05)',
            },
          }}
        >
          {drawerContent}
        </Drawer>

        {/* Desktop Sidebar (Permanent) */}
        <Box
          sx={{
            display: { xs: 'none', md: 'block' },
            width: 240,
            height: '100vh',
            position: 'fixed',
            left: 0,
            top: 0,
            borderRight: '1px solid rgba(0,0,0,0.05)',
            bgcolor: 'transparent',
            backdropFilter: 'blur(10px)',
            zIndex: 1100,
          }}
        >
          {drawerContent}
        </Box>
      </Box>
    </>
  );
};

export default Sidebar;
