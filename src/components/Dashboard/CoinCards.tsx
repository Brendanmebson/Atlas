import React from 'react';
import { Box, Paper, Typography, Stack, IconButton, alpha } from '@mui/material';
import { MoreVert, TrendingUp, TrendingDown } from '@mui/icons-material';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';

const coins = [
  { name: 'BNB-USD', sub: 'BinanceCoin USD', price: '$47,061.18', change: '+1,153.08%', color: '#00ffa3', logoColor: '#F3BA2F', image: 'https://assets.coingecko.com/coins/images/825/small/binance-coin-logo.png' },
  { name: 'BTC-USD', sub: 'Bitcoin USD', price: '$46,541.04', change: '-1,480.67%', color: '#ff5252', logoColor: '#F7931A', image: 'https://assets.coingecko.com/coins/images/1/small/bitcoin.png' },
  { name: 'SOL-USD', sub: 'Solana USD', price: '$97.02', change: '+7.14%', color: '#00ffa3', logoColor: '#14F195', image: 'https://assets.coingecko.com/coins/images/4128/small/solana.png' },
  { name: 'ETH-USD', sub: 'Ethereum USD', price: '$3,051.57', change: '+3.58%', color: '#00ffa3', logoColor: '#627EEA', image: 'https://assets.coingecko.com/coins/images/279/small/ethereum.png' },
];

const mockData = [
  { p: 10 }, { p: 15 }, { p: 12 }, { p: 18 }, { p: 14 }, { p: 20 }, { p: 16 }, { p: 25 }
];

const CoinCard: React.FC<{ coin: typeof coins[0] }> = ({ coin }) => (
  <Paper sx={{
    p: 1.3,
    borderRadius: 2.3,
    boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
    bgcolor: 'white',
    transition: 'all 0.2s ease-in-out',
    cursor: 'pointer',
    border: '1px solid rgba(0,0,0,0.03)',
    display: 'flex',
    flexDirection: 'column',
    minHeight: 140,
    aspectRatio: '1 / 1',
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 12px rgba(0,0,0,0.04)',
      borderColor: alpha(coin.logoColor, 0.2)
    }
  }}>
    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
      <Stack direction="row" spacing={1} alignItems="center">
        <Box sx={{
          width: 28,
          height: 28,
          bgcolor: alpha(coin.logoColor, 0.1),
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden'
        }}>
          {coin.image ? (
            <Box component="img" src={coin.image} sx={{ width: '100%', height: '100%', padding: 0.32 }} />
          ) : (
            <Typography sx={{ color: coin.logoColor, fontWeight: 900, fontSize: '0.6rem' }}>
              {coin.name.charAt(0)}
            </Typography>
          )}
        </Box>
        <Box>
          <Typography variant="subtitle2" sx={{ fontWeight: 800, lineHeight: 1, display: 'block', fontSize: '0.85rem' }}>{coin.name}</Typography>
          <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 500, fontSize: '0.65rem', display: 'block', mt: 0.1 }}>{coin.sub}</Typography>
        </Box>
      </Stack>
      <IconButton size="small" sx={{ p: 0.2 }}><MoreVert sx={{ fontSize: 13 }} /></IconButton>
    </Stack>

    <Box sx={{ mb: 0.8 }}>
      <Typography variant="subtitle1" sx={{ fontWeight: 800, letterSpacing: '-0.01em', lineHeight: 1.1 }}>
        {coin.price}
      </Typography>
      <Stack direction="row" alignItems="center" spacing={0.3} sx={{ color: coin.color, mt: 0.2 }}>
        <Typography variant="caption" sx={{ fontWeight: 700, fontSize: '0.75rem' }}>{coin.change}</Typography>
        {coin.change.startsWith('+') ? <TrendingUp sx={{ fontSize: 12 }} /> : <TrendingDown sx={{ fontSize: 12 }} />}
      </Stack>
    </Box>

    <Box sx={{ width: '100%', height: 30, mt: 'auto' }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={mockData}>
          <Area
            type="monotone"
            dataKey="p"
            stroke={coin.color}
            fill={alpha(coin.color, 0.1)}
            strokeWidth={2.2}
            isAnimationActive={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </Box>
  </Paper>
);

const CoinCards: React.FC = () => {
  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
      {coins.map((coin) => (
        <Box
          key={coin.name}
          sx={{
            width: {
              xs: 'calc(50% - 8px)',
              sm: 'calc(33.33% - 10.67px)',
              md: 'calc(25% - 12px)'
            }
          }}
        >
          <CoinCard coin={coin} />
        </Box>
      ))}
    </Box>
  );
};



export default CoinCards;
