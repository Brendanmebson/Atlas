import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Box,
  Typography,
  Card,
  CardContent,
  IconButton,
  Button,
  Stack,
} from '@mui/material';
import {
  Visibility as EyeIcon,
  VisibilityOff as EyeSlashIcon,
  ArrowUpward as ArrowUpIcon,
  ArrowDownward as ArrowDownIcon,
  Refresh as RefreshIcon,
} from '@mui/icons-material';
import { usePortfolio } from '../contexts/PortfolioContext';
import { useCrypto } from '../contexts/CryptoContext';
import { formatCurrency, formatPercentage } from '../utils/formatters';

const Balance: React.FC = () => {
  const [showBalance, setShowBalance] = useState(true);
  const [timeframe, setTimeframe] = useState<'24h' | '7d' | '30d'>('24h');
  const { portfolio, totalValue, totalChange } = usePortfolio();
  const { currency, refreshData } = useCrypto();
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = async () => {
    setRefreshing(true);
    await refreshData();
    setTimeout(() => setRefreshing(false), 1000);
  };

  const isPositive = totalChange >= 0;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      <Card
        sx={{
          background: 'linear-gradient(135deg, #00ffa3 0%, #000000 100%)',
          border: '1px solid rgba(0, 255, 163, 0.3)',
          borderRadius: 3,
          position: 'relative',
          overflow: 'hidden',
          color: '#fff',
          mb: 4,
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)',
        }}
      >
        {/* Background Pattern */}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            opacity: 0.1,
            pointerEvents: 'none',
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: 160,
              height: 160,
              bgcolor: '#fff',
              borderRadius: '50%',
              transform: 'translate(-80px, -80px)',
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              bottom: 0,
              right: 0,
              width: 240,
              height: 240,
              bgcolor: '#fff',
              borderRadius: '50%',
              transform: 'translate(80px, 80px)',
            }}
          />
        </Box>

        <CardContent sx={{ p: { xs: 3, md: 4 }, position: 'relative', zIndex: 1 }}>
          {/* Header */}
          <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 3 }}>
            <Box>
              <Typography variant="subtitle1" sx={{ opacity: 0.8, fontWeight: 500 }}>
                Total Portfolio Value
              </Typography>
              <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                {(['24h', '7d', '30d'] as const).map((period) => (
                  <Button
                    key={period}
                    size="small"
                    onClick={() => setTimeframe(period)}
                    sx={{
                      minWidth: 0,
                      px: 2,
                      borderRadius: 4,
                      color: timeframe === period ? '#fff' : 'rgba(255, 255, 255, 0.6)',
                      backgroundColor: timeframe === period ? 'rgba(255, 255, 255, 0.15)' : 'transparent',
                      textTransform: 'none',
                      '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.25)',
                      },
                    }}
                  >
                    {period}
                  </Button>
                ))}
              </Stack>
            </Box>

            <Stack direction="row" spacing={1}>
              <IconButton
                onClick={handleRefresh}
                sx={{
                  color: '#fff',
                  bgcolor: 'rgba(255, 255, 255, 0.1)',
                  '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.2)' },
                  animation: refreshing ? 'spin 1s linear infinite' : 'none',
                  '@keyframes spin': {
                    '0%': { transform: 'rotate(0deg)' },
                    '100%': { transform: 'rotate(360deg)' },
                  },
                }}
              >
                <RefreshIcon fontSize="small" />
              </IconButton>
              <IconButton
                onClick={() => setShowBalance(!showBalance)}
                sx={{
                  color: '#fff',
                  bgcolor: 'rgba(255, 255, 255, 0.1)',
                  '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.2)' },
                }}
              >
                {showBalance ? <EyeIcon fontSize="small" /> : <EyeSlashIcon fontSize="small" />}
              </IconButton>
            </Stack>
          </Stack>

          {/* Balance Display */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h3" sx={{ fontWeight: 700, mb: 1, letterSpacing: '-0.02em' }}>
              {showBalance ? formatCurrency(totalValue, currency) : '••••••••'}
            </Typography>
            <Stack direction="row" alignItems="center" spacing={1}>
              {isPositive ? <ArrowUpIcon color="inherit" /> : <ArrowDownIcon color="inherit" />}
              <Typography
                variant="h6"
                sx={{
                  color: isPositive ? '#52ffb8' : '#ff5252',
                  fontWeight: 600,
                }}
              >
                {showBalance ? formatPercentage(totalChange) : '••••'}
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.7 }}>
                ({timeframe})
              </Typography>
            </Stack>
          </Box>

          {/* Portfolio Breakdown */}
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
            {portfolio.slice(0, 4).map((asset) => (
              <Box key={asset.id} sx={{ flex: { xs: 'calc(50% - 8px)', sm: 'calc(25% - 12px)' } }}>
                <motion.div whileHover={{ y: -4 }}>
                  <Box
                    sx={{
                    bgcolor: 'rgba(255, 255, 255, 0.08)',
                    borderRadius: 2,
                    p: 2,
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                    }}
                  >
                    <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
                      <Box component="img" src={asset.image} sx={{ width: 32, height: 32, borderRadius: '50%' }} />
                      <Typography variant="caption" sx={{ fontWeight: 600, opacity: 0.8 }}>
                        {asset.symbol.toUpperCase()}
                      </Typography>
                    </Stack>
                    <Typography variant="body1" sx={{ fontWeight: 600 }}>
                      {showBalance ? formatCurrency(asset.value, currency) : '••••'}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{
                        color: asset.change_24h >= 0 ? '#52ffb8' : '#ff5252',
                        fontWeight: 600,
                      }}
                    >
                      {showBalance ? formatPercentage(asset.change_24h) : '••••'}
                    </Typography>
                  </Box>
                </motion.div>
              </Box>
            ))}
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default Balance;