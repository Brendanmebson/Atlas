import React from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  Stack, 
  TextField, 
  Button, 
  Divider, 
  alpha,
  Avatar,
  Tab,
  Tabs,
  InputAdornment
} from '@mui/material';
import { 
  ArrowUpward as ArrowUpIcon, 
  ArrowDownward as ArrowDownIcon,
} from '@mui/icons-material';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';
import { useCrypto } from '../contexts/CryptoContext';
import { formatCurrency, formatPercentage } from '../utils/formatters';

const Trade: React.FC = () => {
  const { coins, currency } = useCrypto();
  const [activeTab, setActiveTab] = React.useState(0);
  const selectedCoin = coins[0] || { name: 'Bitcoin', symbol: 'BTC', current_price: 45000, price_change_percentage_24h: 2.5, image: '' };

  const data = [
    { time: '00:00', price: 44000 },
    { time: '04:00', price: 44500 },
    { time: '08:00', price: 43800 },
    { time: '12:00', price: 45000 },
    { time: '16:00', price: 45500 },
    { time: '20:00', price: 45200 },
    { time: '23:59', price: 46000 },
  ];

  return (
    <Box sx={{ mt: 1 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 4 }}>
        <Box>
            <Typography variant="h4" sx={{ fontWeight: 800, letterSpacing: '-0.02em', mb: 0.5 }}>Trade</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                High-performance terminal for modern traders
            </Typography>
        </Box>
        <Box sx={{ p: 1.5, borderRadius: 3, bgcolor: 'white', boxShadow: '0 4px 20px rgba(0,0,0,0.03)', border: '1px solid rgba(0,0,0,0.04)', display: 'flex', alignItems: 'center', gap: 2 }}>
            <Avatar src={selectedCoin.image} sx={{ width: 32, height: 32 }} />
            <Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 800, lineHeight: 1 }}>{selectedCoin.name}</Typography>
                <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>{selectedCoin.symbol.toUpperCase()}/USD</Typography>
            </Box>
            <Divider orientation="vertical" flexItem />
            <Box sx={{ textAlign: 'right' }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 800, lineHeight: 1 }}>{formatCurrency(selectedCoin.current_price, currency)}</Typography>
                <Typography variant="caption" sx={{ color: selectedCoin.price_change_percentage_24h >= 0 ? 'success.main' : 'error.main', fontWeight: 700 }}>
                    {formatPercentage(selectedCoin.price_change_percentage_24h)}
                </Typography>
            </Box>
        </Box>
      </Stack>

      <Grid container spacing={3}>
        {/* Chart Column */}
        <Grid item xs={12} lg={8}>
          <Stack spacing={3}>
            <Card sx={{ borderRadius: 5, border: '1px solid rgba(0,0,0,0.04)', boxShadow: '0 10px 40px rgba(0,0,0,0.02)', bgcolor: 'white' }}>
              <CardContent sx={{ p: 4 }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 4 }}>
                    <Typography variant="h6" sx={{ fontWeight: 800 }}>Price Chart (24h)</Typography>
                    <Tabs value={0} sx={{ minHeight: 0, '& .MuiTab-root': { minHeight: 0, py: 1, minWidth: 60, fontWeight: 700, fontSize: '0.75rem', borderRadius: 2 } }}>
                        <Tab label="1H" />
                        <Tab label="4H" />
                        <Tab label="1D" />
                        <Tab label="1W" />
                    </Tabs>
                </Stack>
                <Box sx={{ height: 400 }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={data}>
                            <defs>
                                <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#00ffa3" stopOpacity={0.1}/>
                                    <stop offset="95%" stopColor="#00ffa3" stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'rgba(0,0,0,0.4)', fontWeight: 600 }} />
                            <YAxis hide domain={['dataMin - 1000', 'dataMax + 1000']} />
                            <Tooltip 
                                contentStyle={{ backgroundColor: '#fff', border: 'none', borderRadius: 12, boxShadow: '0 8px 24px rgba(0,0,0,0.1)' }}
                                formatter={(value: number) => [formatCurrency(value, currency), 'Price']}
                            />
                            <Area type="monotone" dataKey="price" stroke="#00ffa3" strokeWidth={3} fillOpacity={1} fill="url(#colorPrice)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </Box>
              </CardContent>
            </Card>

            <Card sx={{ borderRadius: 5, border: '1px solid rgba(0,0,0,0.04)', boxShadow: '0 10px 40px rgba(0,0,0,0.02)', bgcolor: 'white' }}>
                <CardContent sx={{ p: 0 }}>
                    <Box sx={{ p: 3, borderBottom: '1px solid rgba(0,0,0,0.03)' }}>
                        <Typography variant="h6" sx={{ fontWeight: 800 }}>Performance Metrics</Typography>
                    </Box>
                    <Box sx={{ p: 4, display: 'flex', justifyContent: 'space-between', gap: 4 }}>
                        {[
                            { label: '24h High', value: '$46,240.00' },
                            { label: '24h Low', value: '$43,150.00' },
                            { label: '24h Volume', value: '$1.2B' },
                            { label: 'Market Cap', value: '$850.4B' }
                        ].map((metric, i) => (
                            <Box key={i} sx={{ flex: 1 }}>
                                <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{metric.label}</Typography>
                                <Typography variant="h6" sx={{ fontWeight: 800, mt: 0.5 }}>{metric.value}</Typography>
                            </Box>
                        ))}
                    </Box>
                </CardContent>
            </Card>
          </Stack>
        </Grid>

        {/* Order Column */}
        <Grid item xs={12} lg={4}>
            <Stack spacing={3}>
                <Card sx={{ borderRadius: 5, border: '1px solid rgba(0,0,0,0.04)', boxShadow: '0 10px 40px rgba(0,0,0,0.02)', bgcolor: 'white' }}>
                    <CardContent sx={{ p: 4 }}>
                        <Tabs 
                            value={activeTab} 
                            onChange={(_e, v) => setActiveTab(v)}
                            sx={{ mb: 4, '& .MuiTab-root': { fontWeight: 800, textTransform: 'none', fontSize: '1rem' } }}
                        >
                            <Tab label="Buy" sx={{ color: activeTab === 0 ? 'success.main' : 'inherit' }} />
                            <Tab label="Sell" sx={{ color: activeTab === 1 ? 'error.main' : 'inherit' }} />
                        </Tabs>

                        <Stack spacing={3}>
                            <Box>
                                <Typography variant="caption" sx={{ fontWeight: 700, color: 'text.secondary', mb: 1, display: 'block' }}>Order Type</Typography>
                                <Box sx={{ p: 1, bgcolor: alpha('#000', 0.02), borderRadius: 2.5, display: 'flex', gap: 1 }}>
                                    {['Limit', 'Market', 'Stop'].map((type, i) => (
                                        <Button key={i} sx={{ flex: 1, borderRadius: 2, fontWeight: 700, py: 1, bgcolor: i === 0 ? 'white' : 'transparent', color: i === 0 ? 'primary.main' : 'text.secondary', boxShadow: i === 0 ? '0 2px 8px rgba(0,0,0,0.05)' : 'none' }}>{type}</Button>
                                    ))}
                                </Box>
                            </Box>

                            <TextField 
                                fullWidth 
                                label="Amount" 
                                placeholder="0.00"
                                InputProps={{
                                    endAdornment: <InputAdornment position="end"><Typography sx={{ fontWeight: 700, selectionColor: 'text.secondary' }}>BTC</Typography></InputAdornment>,
                                }}
                                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3, bgcolor: alpha('#000', 0.01) } }}
                            />

                            <TextField 
                                fullWidth 
                                label="Price" 
                                value="45,000.00"
                                InputProps={{
                                    endAdornment: <InputAdornment position="end"><Typography sx={{ fontWeight: 700, selectionColor: 'text.secondary' }}>USD</Typography></InputAdornment>,
                                }}
                                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3, bgcolor: alpha('#000', 0.01) } }}
                            />

                            <Box>
                                <Typography variant="caption" sx={{ fontWeight: 700, color: 'text.secondary', mb: 1, display: 'block' }}>Total (Estimate)</Typography>
                                <Typography variant="h5" sx={{ fontWeight: 800 }}>$0.00</Typography>
                            </Box>

                            <Button 
                                fullWidth 
                                variant="contained" 
                                sx={{ 
                                    py: 2, 
                                    borderRadius: 3, 
                                    fontWeight: 800, 
                                    textTransform: 'none', 
                                    fontSize: '1.1rem',
                                    bgcolor: activeTab === 0 ? '#00ffa3' : '#ff5252',
                                    color: activeTab === 0 ? '#000' : '#fff',
                                    '&:hover': { bgcolor: activeTab === 0 ? '#00e692' : '#ff3b3b' }
                                }}
                            >
                                {activeTab === 0 ? 'Place Buy Order' : 'Place Sell Order'}
                            </Button>
                        </Stack>
                    </CardContent>
                </Card>

                <Card sx={{ borderRadius: 5, border: '1px solid rgba(0,0,0,0.04)', boxShadow: '0 10px 40px rgba(0,0,0,0.02)', bgcolor: 'white' }}>
                    <CardContent sx={{ p: 3 }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 800, mb: 3 }}>Recent Trades</Typography>
                        <Stack spacing={1.5}>
                            {Array.from({ length: 6 }).map((_, i) => (
                                <Box key={i} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Typography variant="caption" sx={{ fontWeight: 700, color: i % 2 === 0 ? 'success.main' : 'error.main' }}>45,230.00</Typography>
                                    <Typography variant="caption" sx={{ fontWeight: 700 }}>0.0245 BTC</Typography>
                                    <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 500 }}>12:45:01</Typography>
                                </Box>
                            ))}
                        </Stack>
                    </CardContent>
                </Card>
            </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Trade;
