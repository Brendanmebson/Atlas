import { createTheme, alpha } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#5e5ce6', // Soft Violet/Blue from the image
      light: '#8e8cf1',
      dark: '#4a48b5',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#ff2d55', // Soft Pink accent
      light: '#ff5e7d',
      dark: '#c41d3e',
      contrastText: '#ffffff',
    },
    background: {
      default: '#f4f7fe', // Very light lavender/gray background
      paper: '#ffffff',
    },
    text: {
      primary: '#1b1b1f',
      secondary: '#70707c',
    },
    divider: 'rgba(0, 0, 0, 0.05)',
    action: {
      hover: 'rgba(94, 92, 230, 0.05)',
      selected: 'rgba(94, 92, 230, 0.1)',
    },
  },
  typography: {
    fontFamily: '"Outfit", "Inter", sans-serif',
    h1: {
      fontFamily: '"Outfit", sans-serif',
      fontSize: '2.5rem',
      fontWeight: 700,
      letterSpacing: '-0.02em',
    },
    h2: {
      fontFamily: '"Outfit", sans-serif',
      fontSize: '2rem',
      fontWeight: 700,
      letterSpacing: '-0.02em',
    },
    h3: {
      fontFamily: '"Outfit", sans-serif',
      fontSize: '1.75rem',
      fontWeight: 700,
      letterSpacing: '-0.01em',
    },
    h4: {
      fontFamily: '"Outfit", sans-serif',
      fontSize: '1.5rem',
      fontWeight: 600,
      letterSpacing: '-0.01em',
    },
    h5: {
      fontFamily: '"Outfit", sans-serif',
      fontSize: '1.25rem',
      fontWeight: 600,
    },
    h6: {
      fontFamily: '"Outfit", sans-serif',
      fontSize: '1rem',
      fontWeight: 600,
    },
    body1: {
      fontSize: '0.95rem',
      lineHeight: 1.5,
    },
    body2: {
      fontSize: '0.85rem',
      lineHeight: 1.5,
    },
    button: {
      fontFamily: '"Outfit", sans-serif',
      textTransform: 'none',
      fontWeight: 600,
      fontSize: '0.9rem',
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '8px 20px',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 4px 12px rgba(94, 92, 230, 0.2)',
          },
        },
        containedPrimary: {
          background: '#5e5ce6',
          '&:hover': {
            background: '#4a48b5',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.06)',
          border: 'none',
          padding: '20px',
          backgroundColor: '#ffffff',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.06)',
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          color: '#1b1b1f',
        },
      },
    },
  },
});

