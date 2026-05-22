import React from 'react';
import { AppBar, Toolbar, IconButton, Typography, Box } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import atlasDarkLogo from '../../assets/atlas-dark.png';

interface NavbarProps {
  onMenuClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onMenuClick }) => {
  return (
    <AppBar
      position="fixed"
      sx={{
        display: { md: 'none' },
        bgcolor: 'background.default',
        color: 'text.primary',
        boxShadow: 'none',
        borderBottom: '1px solid rgba(0,0,0,0.05)',
        zIndex: 1100,
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={onMenuClick}
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box
            component="img"
            src={atlasDarkLogo}
            alt="Atlas Logo"
            sx={{ height: 32, width: 'auto', mr: 1.5 }}
          />
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            Atlas
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
