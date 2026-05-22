import React from 'react';
import { motion } from 'framer-motion';
import { Box, CircularProgress, Typography } from '@mui/material';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ size = 'md', text }) => {
  const sizeMap = {
    sm: 20,
    md: 40,
    lg: 60
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', p: 4 }}>
      <CircularProgress size={sizeMap[size]} color="primary" />
      {text && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <Typography variant="body2" sx={{ mt: 2, color: 'text.secondary' }}>
            {text}
          </Typography>
        </motion.div>
      )}
    </Box>
  );
};

export default LoadingSpinner;