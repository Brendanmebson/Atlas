import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  Container,
  InputBase,
  Badge,
  Menu,
  MenuItem,
  Avatar,
  Divider,
} from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import {
  Search as SearchIcon,
  Notifications as NotificationsIcon,
  MoreVert as MoreIcon,
  Dashboard as DashboardIcon,
  AccountBalanceWallet as WalletIcon,
  BarChart as ChartIcon,
  Settings as SettingsIcon,
  Person as PersonIcon,
  ExitToApp as LogoutIcon,
  LightMode as LightModeIcon,
  DarkMode as DarkModeIcon,
  Computer as ComputerIcon,
} from '@mui/icons-material';
import { useTheme } from '../contexts/ThemeContext';
import { useCrypto } from '../contexts/CryptoContext';
import atlasDarkLogo from '../assets/atlas-dark.png';
import atlasWhiteLogo from '../assets/atlas-white.png';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  itemsCenter: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

const Navbar: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState<null | HTMLElement>(null);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { theme: currentTheme, setTheme, isDark } = useTheme();
  const { searchCoins } = useCrypto();
  const location = useLocation();

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: <DashboardIcon /> },
    { name: 'Portfolio', href: '/portfolio', icon: <WalletIcon /> },
    { name: 'Markets', href: '/markets', icon: <ChartIcon /> },
  ];

  const themeIcons = {
    light: <LightModeIcon />,
    dark: <DarkModeIcon />,
    system: <ComputerIcon />
  };

  const searchResults = searchQuery ? searchCoins(searchQuery).slice(0, 5) : [];

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id="primary-search-account-menu"
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
      PaperProps={{
        sx: {
          mt: 5,
          boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
          border: '1px solid ' + alpha('#fff', 0.1),
        }
      }}
    >
      <MenuItem onClick={handleMenuClose} component={Link} to="/profile">
        <IconButton size="small" sx={{ mr: 1 }}><PersonIcon /></IconButton>
        Profile
      </MenuItem>
      <MenuItem onClick={handleMenuClose} component={Link} to="/settings">
        <IconButton size="small" sx={{ mr: 1 }}><SettingsIcon /></IconButton>
        Settings
      </MenuItem>
      <Divider />
      <MenuItem onClick={() => { handleMenuClose(); alert('Logged out successfully!'); window.location.href = '/'; }} sx={{ color: 'error.main' }}>
        <IconButton size="small" sx={{ mr: 1, color: 'error.main' }}><LogoutIcon /></IconButton>
        Logout
      </MenuItem>
    </Menu>
  );

  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id="primary-search-account-menu-mobile"
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <PersonIcon />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="sticky">
        <Container maxWidth={false}>
          <Toolbar disableGutters>
            {/* Logo */}
            <Typography
              variant="h6"
              noWrap
              component={Link}
              to="/"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'Outfit',
                fontWeight: 700,
                letterSpacing: '.1rem',
                color: 'inherit',
                textDecoration: 'none',
                alignItems: 'center',
                gap: 1
              }}
            >
              <Box 
                component="img"
                src={isDark ? atlasWhiteLogo : atlasDarkLogo}
                alt="Atlas Logo"
                sx={{ height: 32, width: 'auto' }}
              />
              <Box component="span" sx={{
                background: 'linear-gradient(135deg, #00ffa3 0%, #ffffff 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>
                Atlas
              </Box>
            </Typography>

            {/* Navigation (Desktop) */}
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, ml: 4, gap: 1 }}>
              {navigation.map((item) => (
                <Button
                  key={item.name}
                  component={Link}
                  to={item.href}
                  startIcon={item.icon}
                  sx={{
                    my: 2,
                    color: location.pathname === item.href ? 'primary.main' : 'text.secondary',
                    display: 'flex',
                    textTransform: 'none',
                    px: 2,
                    borderRadius: 2,
                    backgroundColor: location.pathname === item.href ? alpha('#00ffa3', 0.1) : 'transparent',
                    '&:hover': {
                      backgroundColor: alpha('#00ffa3', 0.05),
                      color: 'primary.main',
                    },
                  }}
                >
                  {item.name}
                </Button>
              ))}
            </Box>

            {/* Search */}
            <Box sx={{ mr: 2, display: { xs: 'none', sm: 'block' } }}>
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search…"
                  inputProps={{ 'aria-label': 'search' }}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </Search>
            </Box>

            {/* Right Side */}
            <Box sx={{ flexGrow: 0, display: 'flex', alignItems: 'center', gap: 1 }}>
              <IconButton
                size="large"
                color="inherit"
                onClick={() => {
                  const themes = ['light', 'dark', 'system'] as const;
                  const currentIndex = themes.indexOf(currentTheme);
                  const nextTheme = themes[(currentIndex + 1) % themes.length];
                  setTheme(nextTheme);
                }}
              >
                {themeIcons[currentTheme]}
              </IconButton>

              <IconButton size="large" color="inherit">
                <Badge badgeContent={4} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>

              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls="primary-search-account-menu"
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <Avatar sx={{ 
                  width: 32, 
                  height: 32, 
                  background: 'linear-gradient(135deg, #00ffa3 0%, #00d1ff 100%)' 
                }}>
                  <PersonIcon sx={{ fontSize: 20 }} />
                </Avatar>
              </IconButton>
            </Box>

            {/* Mobile More Icon */}
            <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="show more"
                aria-controls="primary-search-account-menu-mobile"
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
      
      {/* Search Dropdown (Simplified for MUI) */}
      <AnimatePresence>
        {searchQuery && searchResults.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            style={{
              position: 'absolute',
              top: '70px',
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 1000,
              width: '100%',
              maxWidth: '400px',
            }}
          >
            <Box sx={{ 
              bgcolor: 'background.paper', 
              borderRadius: 2, 
              boxShadow: 24, 
              border: '1px solid ' + alpha('#fff', 0.1),
              p: 1 
            }}>
              {searchResults.map((coin) => (
                <MenuItem key={coin.id} sx={{ borderRadius: 1 }}>
                  <Box component="img" src={coin.image} alt={coin.name} sx={{ width: 24, height: 24, mr: 2 }} />
                  <Box>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>{coin.name}</Typography>
                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>{coin.symbol.toUpperCase()}</Typography>
                  </Box>
                </MenuItem>
              ))}
            </Box>
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  );
};

export default Navbar;