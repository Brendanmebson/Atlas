import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import atlasDarkLogo from '../assets/atlas-dark.png';

import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
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
  mobileOpen?: boolean;
  onClose?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ mobileOpen, onClose }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isDark } = useTheme();

  const isActive = (path: string) => {
    if (path === '/dashboard' && location.pathname === '/') return true;
    return location.pathname === path;
  };

  const handleNav = (path: string) => {
    navigate(path);
    if (onClose) onClose();
  };

  const sidebarContent = (
    <Box sx={{
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      p: 3,
      bgcolor: 'transparent',
    }}>
      {/* Logo */}
      <Box sx={{ display: 'flex', alignItems: 'center', mt: 1, mb: 3, pl: 1 }}>
        <Box
          component="img"
          src={atlasDarkLogo}
          alt="Atlas Logo"
          sx={{ height: 40, width: 'auto', mr: 1.5 }}
        />
        <Typography variant="h5" sx={{ fontWeight: 700, color: 'text.primary', letterSpacing: -0.5 }}>
          Atlas
        </Typography>
      </Box>

      {/* Main Menu */}
      <List sx={{ flexGrow: 1 }}>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding sx={{ mb: 0.5 }}>
            <ListItemButton
              onClick={() => handleNav(item.path)}
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
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <Box sx={{
        display: { xs: 'none', md: 'flex' },
        width: 240,
        height: '100vh',
        borderRight: '1px solid rgba(0,0,0,0.05)',
        backdropFilter: 'blur(10px)',
        position: 'fixed',
        left: 0,
        top: 0,
        zIndex: 1200,
      }}>
        {sidebarContent}
      </Box>

      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onClose}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { 
            boxSizing: 'border-box', 
            width: 240,
            bgcolor: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(20px)',
          },
        }}
      >
        {sidebarContent}
      </Drawer>
    </>
  );
};

export default Sidebar;
