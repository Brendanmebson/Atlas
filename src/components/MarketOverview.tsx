import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  TextField,
  InputAdornment,
  ToggleButton,
  ToggleButtonGroup,
  alpha,
  useTheme as useMuiTheme,
} from '@mui/material';
import {
  Search as SearchIcon,
  ArrowUpward as ArrowUpIcon,
  ArrowDownward as ArrowDownIcon,
  TrendingUp as GainersIcon,
  TrendingDown as LosersIcon,
  FormatListBulleted as AllIcon,
} from '@mui/icons-material';
import { useCrypto } from '../contexts/CryptoContext';
import { formatCurrency, formatPercentage } from '../utils/formatters';
import LoadingSpinner from './ui/LoadingSpinner';

const MarketOverview: React.FC = () => {
  const { coins, loading, currency } = useCrypto();
  const muiTheme = useMuiTheme();
  const [filter, setFilter] = useState<'all' | 'gainers' | 'losers'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCoins = coins
    .filter(coin =>
      coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(coin => {
      if (filter === 'gainers') return coin.price_change_percentage_24h > 0;
      if (filter === 'losers') return coin.price_change_percentage_24h < 0;
      return true;
    })
    .slice(0, 10);

  if (loading) return <LoadingSpinner />;

  const handleFilterChange = (
    _event: React.MouseEvent<HTMLElement>,
    newFilter: 'all' | 'gainers' | 'losers' | null,
  ) => {
    if (newFilter !== null) {
      setFilter(newFilter);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <Card
        sx={{
          borderRadius: 4,
          boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.02)',
          bgcolor: 'white',
          border: '1px solid rgba(0,0,0,0.04)',
          overflow: 'hidden',
          mb: 4,
        }}
      >
        <CardContent sx={{ p: 4 }}>
          {/* Header */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', lg: 'row' },
              justifyContent: 'space-between',
              alignItems: { xs: 'start', lg: 'center' },
              gap: 3,
              mb: 5,
            }}
          >
            <Box>
                <Typography variant="h5" sx={{ fontWeight: 800, letterSpacing: '-0.02em', mb: 0.5 }}>
                Market Overview
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                    Real-time market data and performance metrics
                </Typography>
            </Box>

            <Box sx={{ display: 'flex', gap: 2, width: { xs: '100%', lg: 'auto' } }}>
              <TextField
                size="small"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon fontSize="small" sx={{ color: 'text.secondary' }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  bgcolor: alpha('#000', 0.02),
                  borderRadius: 2.5,
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': { border: 'none' },
                    '&:hover fieldset': { border: 'none' },
                    '&.Mui-focused fieldset': { border: 'none' },
                  },
                }}
              />

              <ToggleButtonGroup
                value={filter}
                exclusive
                onChange={handleFilterChange}
                size="small"
                sx={{
                  bgcolor: alpha('#000', 0.02),
                  p: '4px',
                  borderRadius: 2.5,
                  '& .MuiToggleButton-root': {
                    border: 'none',
                    borderRadius: 2,
                    px: 3,
                    fontWeight: 700,
                    fontSize: '0.8rem',
                    textTransform: 'none',
                    '&.Mui-selected': {
                      bgcolor: 'white',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                      color: 'primary.main',
                      '&:hover': { bgcolor: 'white' },
                    },
                  },
                }}
              >
                <ToggleButton value="all">All</ToggleButton>
                <ToggleButton value="gainers">Gainers</ToggleButton>
                <ToggleButton value="losers">Losers</ToggleButton>
              </ToggleButtonGroup>
            </Box>
          </Box>

          {/* Market Stats */}
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, mb: 5 }}>
            {[
              { label: 'Market Cap', value: '$2.1T', icon: <GainersIcon sx={{ fontSize: 20 }} />, color: '#00ffa3' },
              { label: '24h Volume', value: '$85.3B', icon: <GainersIcon sx={{ fontSize: 20 }} />, color: '#3B82F6' },
              { label: 'BTC Dominance', value: '52.3%', icon: <LosersIcon sx={{ fontSize: 20 }} />, color: '#ff5252' },
            ].map((stat, idx) => (
              <Box key={idx} sx={{ flex: 1, minWidth: { xs: '100%', md: 'calc(33.33% - 16px)' } }}>
                <Box
                  sx={{
                    p: 2.5,
                    borderRadius: 3,
                    bgcolor: alpha(stat.color, 0.04),
                    border: '1px solid',
                    borderColor: alpha(stat.color, 0.1),
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <Box>
                    <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      {stat.label}
                    </Typography>
                    <Typography variant="h5" sx={{ fontWeight: 800, mt: 0.5 }}>
                      {stat.value}
                    </Typography>
                  </Box>
                  <Box sx={{ p: 1, borderRadius: 2, bgcolor: alpha(stat.color, 0.1), color: stat.color }}>
                    {stat.icon}
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>

          {/* Coins Table */}
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: alpha('#000', 0.02) }}>
                  <TableCell sx={{ color: 'text.secondary', fontWeight: 800, textTransform: 'uppercase', fontSize: '0.65rem', borderBottom: 'none', py: 2 }}>Asset</TableCell>
                  <TableCell align="right" sx={{ color: 'text.secondary', fontWeight: 800, textTransform: 'uppercase', fontSize: '0.65rem', borderBottom: 'none', py: 2 }}>Price</TableCell>
                  <TableCell align="right" sx={{ color: 'text.secondary', fontWeight: 800, textTransform: 'uppercase', fontSize: '0.65rem', borderBottom: 'none', py: 2 }}>24h Change</TableCell>
                  <TableCell align="right" sx={{ color: 'text.secondary', fontWeight: 800, textTransform: 'uppercase', fontSize: '0.65rem', borderBottom: 'none', py: 2 }}>Market Cap</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredCoins.map((coin, index) => (
                  <TableRow
                    key={coin.id}
                    component={motion.tr}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.04 }}
                    sx={{
                      '&:hover': { bgcolor: alpha(muiTheme.palette.primary.main, 0.02) },
                      '& td': { borderBottom: '1px solid ' + alpha('#000', 0.02), py: 2.5 },
                    }}
                  >
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Avatar src={coin.image} sx={{ width: 40, height: 40, bgcolor: 'white', border: '1px solid rgba(0,0,0,0.05)', p: 0.5 }} />
                        <Box>
                          <Typography variant="body2" sx={{ fontWeight: 800 }}>{coin.name}</Typography>
                          <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600 }}>{coin.symbol.toUpperCase()}</Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell align="right" sx={{ fontWeight: 800 }}>
                      {formatCurrency(coin.current_price, currency)}
                    </TableCell>
                    <TableCell align="right">
                      <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.5, px: 1, py: 0.3, borderRadius: 1.5, bgcolor: alpha(coin.price_change_percentage_24h >= 0 ? '#00ffa3' : '#ff5252', 0.1) }}>
                        {coin.price_change_percentage_24h >= 0 ? (
                          <ArrowUpIcon fontSize="small" sx={{ color: '#00b372', fontSize: 14 }} />
                        ) : (
                          <ArrowDownIcon fontSize="small" sx={{ color: '#f44336', fontSize: 14 }} />
                        )}
                        <Typography
                          variant="caption"
                          sx={{
                            color: coin.price_change_percentage_24h >= 0 ? '#00b372' : '#f44336',
                            fontWeight: 800,
                          }}
                        >
                          {formatPercentage(coin.price_change_percentage_24h)}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell align="right" sx={{ fontWeight: 700, color: 'text.secondary' }}>
                      ${(coin.market_cap / 1e9).toFixed(1)}B
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default MarketOverview;