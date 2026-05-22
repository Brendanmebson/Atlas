import React from 'react';
import { motion } from 'framer-motion';
import {
  Box,
  Typography,
  Stack,
  alpha,
  useTheme as useMuiTheme,
} from '@mui/material';
import {
  CheckCircle as CheckCircleIcon,
  AttachMoney as MoneyIcon,
  AccountBalanceWallet as WalletIcon,
  Language as GlobeIcon,
  Notifications as BellIcon,
  ChevronRight as ChevronRightIcon,
} from '@mui/icons-material';

const Preferences: React.FC = () => {
  const muiTheme = useMuiTheme();

  const settings = [
    { icon: <CheckCircleIcon />, title: 'Verification', description: 'Verify your identity to increase limits', color: '#00ffa3' },
    { icon: <MoneyIcon />, title: 'Currency', description: 'Change your primary currency from NGN', color: '#3B82F6' },
    { icon: <WalletIcon />, title: 'Accounts', description: 'Add and remove bank accounts', color: '#8B5CF6' },
    { icon: <GlobeIcon />, title: 'Language', description: 'Set your preferred language', color: '#F7931A' },
    { icon: <BellIcon />, title: 'Notifications', description: 'Manage your notification settings', color: '#E91E63' },
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
      <Typography variant="h6" sx={{ fontWeight: 800, mb: 4 }}>App Preferences</Typography>
      <Stack spacing={2}>
        {settings.map((item) => (
          <Box
            key={item.title}
            sx={{
              p: 2.5,
              borderRadius: 4,
              cursor: 'pointer',
              bgcolor: 'white',
              border: '1px solid rgba(0,0,0,0.04)',
              boxShadow: '0 4px 12px rgba(0,0,0,0.02)',
              display: 'flex',
              alignItems: 'center',
              transition: 'all 0.2s ease',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 8px 24px rgba(0,0,0,0.05)',
                borderColor: alpha(item.color, 0.2),
                bgcolor: alpha(item.color, 0.01)
              }
            }}
          >
            <Box sx={{ 
                p: 1.5, 
                borderRadius: 2.5, 
                bgcolor: alpha(item.color, 0.1), 
                color: item.color,
                mr: 3,
                display: 'flex'
            }}>
              {React.cloneElement(item.icon as React.ReactElement, { fontSize: 'medium' })}
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 800 }}>{item.title}</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>{item.description}</Typography>
            </Box>
            <ChevronRightIcon sx={{ color: 'text.disabled' }} />
          </Box>
        ))}
      </Stack>
    </motion.div>
  );
};

export default Preferences;
