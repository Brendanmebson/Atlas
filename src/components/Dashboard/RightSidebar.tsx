import React from 'react';
import { Box, Typography, Stack, Paper, Avatar, Select, MenuItem, Button } from '@mui/material';
import { ArrowForward, TrendingUp } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const RightSidebar: React.FC = () => {
  const navigate = useNavigate();
  
  const handleConvert = () => {
    alert('Conversion successful!');
  };
  return (
    <Box sx={{ width: '100%' }}>
      {/* Total Balance */}
      <Box sx={{ mb: 4 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
          <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 500 }}>
            Total balance
          </Typography>
          <Avatar 
            onClick={() => navigate('/profile')} 
            sx={{ bgcolor: 'primary.main', width: 40, height: 40, cursor: 'pointer' }}
          >
            JT
          </Avatar>
        </Stack>
        <Stack direction="row" alignItems="baseline" spacing={2} sx={{ mb: 1 }}>
          <Typography variant="h3" sx={{ fontWeight: 800 }}>
            $267,820.00
          </Typography>
        </Stack>
        <Box sx={{ display: 'inline-flex', alignItems: 'center', bgcolor: '#e8f5e9', color: '#2e7d32', px: 1, borderRadius: 2, py: 0.2 }}>
            <TrendingUp sx={{ fontSize: 14, mr: 0.5 }} />
            <Typography variant="caption" sx={{ fontWeight: 700 }}>6.23%</Typography>
        </Box>
      </Box>

      {/* My Items */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" sx={{ fontWeight: 800, mb: 3 }}>My items</Typography>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 1.5 }}>
          <Box sx={{ flex: 1 }}>
            <Paper sx={{ p: 2, borderRadius: 2, bgcolor: '#fdf2f8', boxShadow: 'none' }}>
              <Box sx={{ mb: 1, color: 'secondary.main' }}>⚡</Box>
              <Typography variant="caption" color="text.secondary">Investment</Typography>
              <Typography variant="subtitle1" sx={{ fontWeight: 800 }}>87.2K</Typography>
              <Typography variant="caption" color="error.main" sx={{ fontWeight: 700 }}>-10.4%</Typography>
            </Paper>
          </Box>
          <Box sx={{ flex: 1 }}>
            <Paper sx={{ p: 2, borderRadius: 2, bgcolor: '#f0fdf4', boxShadow: 'none' }}>
              <Box sx={{ mb: 1, color: '#2e7d32' }}>💸</Box>
              <Typography variant="caption" color="text.secondary">CashBack</Typography>
              <Typography variant="subtitle1" sx={{ fontWeight: 800 }}>19.5K</Typography>
              <Typography variant="caption" color="success.main" sx={{ fontWeight: 700 }}>+12.4%</Typography>
            </Paper>
          </Box>
        </Box>
      </Box>

      {/* Convert */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" sx={{ fontWeight: 800, mb: 3 }}>Convert</Typography>
        <Stack spacing={2}>
           <Box sx={{ bgcolor: 'white', borderRadius: 1.5, p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
             <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>$1000</Typography>
             <Select value="USD" size="small" variant="standard" disableUnderline sx={{ fontWeight: 700, bgcolor: '#fff9c4', px: 1, borderRadius: 1 }}>
                <MenuItem value="USD">USD</MenuItem>
             </Select>
           </Box>
           <Box sx={{ bgcolor: 'white', borderRadius: 1.5, p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
             <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>0.305157</Typography>
             <Select value="ETH" size="small" variant="standard" disableUnderline sx={{ fontWeight: 700, bgcolor: '#e1f5fe', px: 1, borderRadius: 1 }}>
                <MenuItem value="ETH">ETH</MenuItem>
             </Select>
           </Box>
           <Button variant="contained" fullWidth onClick={handleConvert} sx={{ borderRadius: 2, py: 1.5, bgcolor: 'primary.main' }} endIcon={<ArrowForward />}>
             Convert
           </Button>
        </Stack>
      </Box>

      {/* Upgrade Card */}
      <Paper sx={{ 
        p: 3, 
        borderRadius: 2, 
        bgcolor: '#1b1b1f', 
        color: 'white',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <Stack spacing={1}>
           <Typography variant="h5" sx={{ fontWeight: 700, width: '60%' }}>Upgrade your plan</Typography>
           <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>Ver. 1.0.4. 13 Apr</Typography>
           <Typography variant="caption" color="text.secondary">New features</Typography>
           <Typography variant="subtitle2" sx={{ mt: 2, fontWeight: 700, cursor: 'pointer' }} onClick={() => navigate('/settings')}>Let's Go →</Typography>
        </Stack>
        <Box sx={{ 
          position: 'absolute',
          right: -20,
          bottom: -20,
          width: 140,
          height: 140,
          bgcolor: 'rgba(255,149,0,0.1)',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
           <Box sx={{ width: 60, height: 100, bgcolor: '#ff9500', borderRadius: 1 }} />
        </Box>
      </Paper>
    </Box>
  );
};



export default RightSidebar;
