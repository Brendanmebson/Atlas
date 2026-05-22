import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Avatar,
  alpha,
} from '@mui/material';
import {
  ArrowDownward as ArrowDownIcon,
  ArrowUpward as ArrowUpIcon,
  SwapHoriz as SwapIcon,
} from '@mui/icons-material';

const transactions = [
  { id: 1, type: 'buy', crypto: 'Bitcoin', symbol: 'BTC', amount: 0.5, price: 45000, date: '2023-07-10' },
  { id: 2, type: 'sell', crypto: 'Ethereum', symbol: 'ETH', amount: 2, price: 3000, date: '2023-07-09' },
  { id: 3, type: 'swap', from: 'Litecoin', to: 'Cardano', amount: 10, date: '2023-07-08' },
];

const Transactions: React.FC = () => {
  return (
    <Card sx={{ borderRadius: 4, boxShadow: '0 8px 32px rgba(0,0,0,0.2)', bgcolor: 'background.paper' }}>
      <CardContent sx={{ p: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>
          Recent Transactions
        </Typography>
        <List disablePadding>
          {transactions.map((transaction, index) => (
            <ListItem
              key={transaction.id}
              divider={index !== transactions.length - 1}
              sx={{
                px: 0,
                py: 2,
                '&:hover': { bgcolor: alpha('#fff', 0.02) },
              }}
            >
              <ListItemIcon>
                <Avatar
                  sx={{
                    width: 56,
                    height: 56,
                    bgcolor: 
                      transaction.type === 'buy' ? alpha('#4caf50', 0.1) : 
                      transaction.type === 'sell' ? alpha('#f44336', 0.1) : 
                      alpha('#00ffa3', 0.1),
                    color: 
                      transaction.type === 'buy' ? '#4caf50' : 
                      transaction.type === 'sell' ? '#f44336' : 
                      '#00ffa3',
                    '& .MuiSvgIcon-root': { fontSize: '2rem' }
                  }}
                >
                  {transaction.type === 'buy' && <ArrowUpIcon />}
                  {transaction.type === 'sell' && <ArrowDownIcon />}
                  {transaction.type === 'swap' && <SwapIcon />}
                </Avatar>
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography variant="body1" fontWeight={600}>
                    {transaction.type === 'swap'
                      ? `Swap ${transaction.from} to ${transaction.to}`
                      : `${transaction.type === 'buy' ? 'Bought' : 'Sold'} ${transaction.crypto}`}
                  </Typography>
                }
                secondary={transaction.date}
              />
              <Box sx={{ textAlign: 'right' }}>
                <Typography variant="body1" fontWeight={700}>
                  {transaction.type !== 'swap' && `${transaction.amount} ${transaction.crypto}`}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {transaction.type !== 'swap' && `$${(transaction.amount * transaction.price).toLocaleString()}`}
                </Typography>
              </Box>
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default Transactions;