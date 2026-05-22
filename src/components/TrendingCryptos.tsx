import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  alpha,
} from '@mui/material';

const trendingCryptos = [
  { name: 'Bitcoin', symbol: 'BTC', previousPrice: 45000, currentPrice: 46000, image: 'https://assets.coingecko.com/coins/images/1/small/bitcoin.png' },
  { name: 'Ethereum', symbol: 'ETH', previousPrice: 3000, currentPrice: 2950, image: 'https://assets.coingecko.com/coins/images/279/small/ethereum.png' },
  { name: 'Cardano', symbol: 'ADA', previousPrice: 1.2, currentPrice: 1.25, image: 'https://assets.coingecko.com/coins/images/975/small/cardano.png' },
];

const TrendingCryptos: React.FC = () => {
  return (
    <Card sx={{ borderRadius: 2, boxShadow: '0 4px 20px rgba(0,0,0,0.05)', bgcolor: 'background.paper', border: '1px solid rgba(0,0,0,0.02)' }}>
      <CardContent sx={{ p: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 800, mb: 2 }}>
          Trending Cryptocurrencies
        </Typography>
        <List disablePadding>
          {trendingCryptos.map((crypto, index) => (
            <ListItem
              key={crypto.symbol}
              divider={index !== trendingCryptos.length - 1}
              sx={{
                px: 0,
                py: 2,
                '&:hover': { bgcolor: alpha('#fff', 0.02) },
              }}
            >
              <ListItemAvatar>
                <Avatar src={crypto.image} alt={crypto.name} sx={{ width: 40, height: 40, mr: 1.5 }} />
              </ListItemAvatar>
              <ListItemText
                primary={<Typography variant="body1" fontWeight={600}>{crypto.name}</Typography>}
                secondary={crypto.symbol}
              />
              <Box sx={{ textAlign: 'right' }}>
                <Typography variant="body1" fontWeight={700}>
                  ${crypto.currentPrice.toLocaleString()}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    color: crypto.currentPrice > crypto.previousPrice ? '#52ffb8' : '#ff5252',
                    fontWeight: 600,
                  }}
                >
                  {crypto.currentPrice > crypto.previousPrice ? '+' : ''}
                  {((crypto.currentPrice - crypto.previousPrice) / crypto.previousPrice * 100).toFixed(2)}%
                </Typography>
              </Box>
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default TrendingCryptos;