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
  HelpOutline as HelpIcon,
  InfoOutlined as InfoIcon,
  Logout as LogoutIcon,
  DeleteForever as DeleteIcon,
  ChevronRight as ChevronRightIcon,
} from '@mui/icons-material';

const Others: React.FC = () => {
  const muiTheme = useMuiTheme();

  const settings = [
    { icon: <HelpIcon />, title: 'Help & Support', description: 'Get assistance with your account', color: '#3B82F6' },
    { icon: <InfoIcon />, title: 'About Atlas', description: 'Learn more about the platform', color: '#8B5CF6' },
    { icon: <LogoutIcon />, title: 'Logout', description: 'Sign out from your account', color: '#F7931A' },
    { icon: <DeleteIcon />, title: 'Delete Account', description: 'Permanently delete your account', color: '#ff5252' },
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
      <Typography variant="h6" sx={{ fontWeight: 800, mb: 4 }}>Other Settings</Typography>
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

export default Others;
