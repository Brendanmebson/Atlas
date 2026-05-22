import React, { useState } from 'react';
import { Box, Typography, Stack, Tabs, Tab, Button, IconButton } from '@mui/material';
import { TrendingDown, Refresh } from '@mui/icons-material';
import { useCrypto } from '../../contexts/CryptoContext';

interface DashboardHeaderProps {
  activeTab: number;
  onTabChange: (tab: number) => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ activeTab, onTabChange }) => {
  const [range, setRange] = useState('24H');
  const { refreshData, lastUpdated, loading } = useCrypto();

  const ranges = ['1H', '24H', '1W', '1M', '3M', '6M'];

  return (
    <Box sx={{ mb: 4, mt: 1 }}>
      <Stack 
        direction={{ xs: 'column', sm: 'row' }} 
        justifyContent="space-between" 
        alignItems={{ xs: 'flex-start', sm: 'center' }}
        spacing={2}
      >
        <Box sx={{ width: '100%' }}>
          <Stack 
            direction="row" 
            alignItems="center" 
            justifyContent="space-between"
            sx={{ width: '100%' }}
          >
            <Stack direction="row" alignItems="center" spacing={1.5}>
              <Typography variant="h3" sx={{ fontWeight: 800, fontSize: { xs: '1.75rem', sm: '2.5rem' } }}>
                $46,541.04
              </Typography>
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                bgcolor: 'rgba(255, 45, 85, 0.1)', 
                color: '#ff2d55', 
                px: 1, 
                borderRadius: 2,
                py: 0.2
              }}>
                <TrendingDown sx={{ fontSize: 14, mr: 0.5 }} />
                <Typography variant="caption" sx={{ fontWeight: 700 }}>1,480.67%</Typography>
              </Box>
            </Stack>
            
            <Box sx={{ display: { xs: 'flex', sm: 'none' }, alignItems: 'center' }}>
                {lastUpdated && (
                    <Typography variant="caption" color="text.secondary" sx={{ mr: 1 }}>
                    {lastUpdated.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </Typography>
                )}
                <IconButton 
                    onClick={refreshData}
                    disabled={loading}
                    size="small"
                    sx={{ 
                    bgcolor: 'white', 
                    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                    }}
                >
                    <Refresh sx={{ fontSize: 16 }} />
                </IconButton>
            </Box>
          </Stack>

          <Typography variant="body1" color="text.secondary" sx={{ mt: 0.5, fontWeight: 500 }}>
             Bitcoin USD (BTC-USD)
          </Typography>

          <Stack 
            direction={{ xs: 'column', md: 'row' }} 
            spacing={{ xs: 2, md: 3 }} 
            alignItems={{ xs: 'flex-start', md: 'center' }} 
            sx={{ mt: 2 }}
          >
            <Stack direction="row" spacing={1} alignItems="center" sx={{ display: { xs: 'none', sm: 'flex' } }}>
              {lastUpdated && (
                <Typography variant="caption" color="text.secondary">
                  Last updated: {lastUpdated.toLocaleTimeString()}
                </Typography>
              )}
              <IconButton 
                onClick={refreshData}
                disabled={loading}
                size="small"
                sx={{ 
                  borderRadius: 2, 
                  width: 24, 
                  height: 24, 
                  bgcolor: 'white', 
                  boxShadow: '0 4px 12px rgba(0,0,0,0.02)',
                  '&:hover': { bgcolor: 'action.hover' }
                }}
              >
                <Refresh sx={{ fontSize: 16 }} />
              </IconButton>
            </Stack>

            <Box sx={{ 
                width: '100%', 
                overflowX: 'auto',
                pb: 0.5,
                '&::-webkit-scrollbar': { display: 'none' }
            }}>
                <Stack 
                    direction="row" 
                    spacing={1} 
                    sx={{ 
                        bgcolor: 'white', 
                        p: 0.5, 
                        borderRadius: 3, 
                        boxShadow: '0 4px 12px rgba(0,0,0,0.02)',
                        width: 'fit-content'
                    }}
                >
                {ranges.map((r) => (
                    <Button
                    key={r}
                    onClick={() => setRange(r)}
                    sx={{
                        minWidth: { xs: 40, sm: 48 },
                        height: 36,
                        borderRadius: 2.5,
                        fontSize: '0.8rem',
                        fontWeight: 700,
                        color: range === r ? 'primary.main' : 'text.secondary',
                        bgcolor: range === r ? 'rgba(94, 92, 230, 0.1)' : 'transparent',
                        '&:hover': {
                        bgcolor: range === r ? 'rgba(94, 92, 230, 0.15)' : 'action.hover',
                        },
                        textTransform: 'none',
                    }}
                    >
                    {r}
                    </Button>
                ))}
                </Stack>
            </Box>
          </Stack>
        </Box>
      </Stack>

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mt: 4 }}>
        <Tabs 
          value={activeTab} 
          onChange={(_, v) => onTabChange(v)}
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            '& .MuiTabs-indicator': {
              height: 3,
              borderRadius: '3px 3px 0 0',
            },
            '& .MuiTab-root': {
              textTransform: 'none',
              fontWeight: 600,
              fontSize: '0.95rem',
              minWidth: { xs: 'auto', sm: 100 },
              px: { xs: 2, sm: 3 },
              color: 'text.secondary',
              '&.Mui-selected': {
                color: 'primary.main',
              },
            },
          }}
        >
          <Tab label="Summary" />
          <Tab label="Chart" />
          <Tab label="Conversations" />
          <Tab label="Historical Data" />
        </Tabs>
      </Box>
    </Box>
  );
};

export default DashboardHeader;
