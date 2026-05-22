import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import atlasDarkLogo from '../assets/atlas-dark.png';
import atlasWhiteLogo from '../assets/atlas-white.png';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Box,
  Avatar,
  Stack,
  Container,
  alpha,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  AccountCircle as UserIcon,
  Logout as LogoutIcon,
  Settings as SettingsIcon,
} from '@mui/icons-material';

const Navbarsettings: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { isDark } = useTheme();

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar 
      position="static" 
      color="default" 
      elevation={0}
      sx={{ 
        bgcolor: 'background.paper', 
        borderBottom: '1px solid', 
        borderColor: 'divider' 
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
          <Box component={RouterLink} to="/" sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
            <Box 
              component="img"
              src={isDark ? atlasWhiteLogo : atlasDarkLogo}
              alt="Atlas Logo"
              sx={{ height: 32, width: 'auto' }}
            />
            <Typography
              variant="h6"
              noWrap
              sx={{
                ml: 2,
                fontWeight: 800,
                color: 'success.main',
                letterSpacing: '.1rem',
              }}
            >
              ATLAS
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Stack 
              direction="row" 
              spacing={2} 
              alignItems="center" 
              onClick={handleMenu}
              sx={{ 
                cursor: 'pointer',
                p: 0.5,
                pr: 2,
                borderRadius: 2,
                transition: 'all 0.2s',
                '&:hover': { bgcolor: alpha('#4caf50', 0.08) }
              }}
            >
              <Avatar sx={{ bgcolor: 'success.main' }}>
                <UserIcon />
              </Avatar>
              <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                <Typography variant="body2" fontWeight={700}>John Doe</Typography>
                <Typography variant="caption" color="text.secondary">Premium Member</Typography>
              </Box>
            </Stack>

            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
              PaperProps={{
                sx: {
                  mt: 1.5,
                  borderRadius: 2,
                  minWidth: 200,
                  boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
                }
              }}
            >
              <MenuItem 
                component={RouterLink} 
                to="/Profilesettings" 
                onClick={handleClose}
                sx={{ py: 1.5 }}
              >
                <ListItemIcon>
                  <SettingsIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="Profile Settings" />
              </MenuItem>
              <MenuItem onClick={handleClose} sx={{ py: 1.5, color: 'error.main' }}>
                <ListItemIcon>
                  <LogoutIcon fontSize="small" color="error" />
                </ListItemIcon>
                <ListItemText primary="Logout" />
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbarsettings;