import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Box,
  Typography,
  Card,
  CardContent,
  IconButton,
  ToggleButton,
  ToggleButtonGroup,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  alpha,
  useTheme as useMuiTheme,
} from '@mui/material';
import {
  Visibility as EyeIcon,
  VisibilityOff as EyeSlashIcon,
  PieChart as PieChartIcon,
  List as ListIcon,
  ArrowUpward as ArrowUpIcon,
  ArrowDownward as ArrowDownIcon,
} from '@mui/icons-material';
import { usePortfolio } from '../contexts/PortfolioContext';
import { useCrypto } from '../contexts/CryptoContext';
import { formatCurrency, formatPercentage } from '../utils/formatters';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';

const Portfolio: React.FC = () => {
  const { portfolio, totalValue, totalPnL, transactions } = usePortfolio();
  const { currency } = useCrypto();
  const [showValues, setShowValues] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const muiTheme = useMuiTheme();

  const COLORS = ['#00ffa3', '#9945FF', '#00C2FF', '#FF5252', '#F7931A', '#E91E63'];

  const chartData = portfolio.map(asset => ({
    name: asset.symbol.toUpperCase(),
    value: asset.value,
    percentage: totalValue > 0 ? (asset.value / totalValue) * 100 : 0
  }));

  const performanceData = portfolio.map(asset => ({
    name: asset.symbol.toUpperCase(),
    pnl: asset.pnl,
    pnlPercentage: asset.pnlPercentage
  }));

  return (
    <Stack spacing={4} sx={{ mt: 1 }}>
      {/* Header */}
      <Stack
        direction={{ xs: 'column', lg: 'row' }}
        justifyContent="space-between"
        alignItems={{ xs: 'flex-start', lg: 'center' }}
        spacing={2}
      >
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 800, letterSpacing: '-0.02em', mb: 0.5 }}>Portfolio</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
            Manage your assets and track your performance
          </Typography>
        </Box>

        <Stack direction="row" spacing={1.5} alignItems="center">
          <IconButton
            onClick={() => setShowValues(!showValues)}
            sx={{ 
                bgcolor: 'white', 
                boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                border: '1px solid rgba(0,0,0,0.03)',
                p: 1.2
            }}
          >
            {showValues ? <EyeIcon sx={{ fontSize: 20 }} /> : <EyeSlashIcon sx={{ fontSize: 20 }} />}
          </IconButton>

          <ToggleButtonGroup
            value={viewMode}
            exclusive
            onChange={(_e, v) => v && setViewMode(v)}
            size="small"
            sx={{
              bgcolor: 'white',
              p: '4px',
              borderRadius: 3,
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
              border: '1px solid rgba(0,0,0,0.03)',
              '& .MuiToggleButton-root': {
                border: 'none',
                borderRadius: 2,
                px: 2,
                '&.Mui-selected': { 
                    bgcolor: 'primary.main', 
                    color: 'white',
                    '&:hover': { bgcolor: 'primary.dark' }
                },
              },
            }}
          >
            <ToggleButton value="grid">
              <PieChartIcon sx={{ fontSize: 18 }} />
            </ToggleButton>
            <ToggleButton value="list">
              <ListIcon sx={{ fontSize: 18 }} />
            </ToggleButton>
          </ToggleButtonGroup>
        </Stack>
      </Stack>

      {/* Portfolio Summary */}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
        <Box sx={{ flex: { xs: '100%', md: 'calc(33.33% - 16px)' } }}>
          <Card
            component={motion.div}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            sx={{
              bgcolor: 'white',
              borderRadius: 5,
              border: '1px solid rgba(0,0,0,0.04)',
              boxShadow: '0 10px 40px rgba(0,0,0,0.02)',
              height: '100%',
              position: 'relative',
              overflow: 'hidden',
              '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0, left: 0, right: 0, height: '4px',
                  bgcolor: 'primary.main'
              }
            }}
          >
            <CardContent sx={{ p: 4 }}>
              <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Total Portfolio Value
              </Typography>
              <Typography variant="h3" sx={{ fontWeight: 800, mb: 1, letterSpacing: '-0.02em', mt: 1 }}>
                {showValues ? formatCurrency(totalValue, currency) : '••••••••'}
              </Typography>
              <Stack direction="row" spacing={1} alignItems="center">
                <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: 0.5, 
                    px: 1, 
                    py: 0.2, 
                    borderRadius: 1.5, 
                    bgcolor: alpha(totalPnL >= 0 ? '#00ffa3' : '#ff5252', 0.1) 
                }}>
                    {totalPnL >= 0 ? <ArrowUpIcon sx={{ fontSize: 14, color: '#00b372' }} /> : <ArrowDownIcon sx={{ fontSize: 14, color: '#f44336' }} />}
                    <Typography variant="caption" sx={{ fontWeight: 800, color: totalPnL >= 0 ? '#00b372' : '#f44336' }}>
                    {showValues ? formatCurrency(Math.abs(totalPnL), currency) : '••••'}
                    </Typography>
                </Box>
                <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>Total Profit</Typography>
              </Stack>
            </CardContent>
          </Card>
        </Box>

        <Box sx={{ flex: { xs: '100%', md: 'calc(33.33% - 16px)' } }}>
          <Card
            component={motion.div}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            sx={{ borderRadius: 5, border: '1px solid rgba(0,0,0,0.04)', boxShadow: '0 10px 40px rgba(0,0,0,0.02)', height: '100%', bgcolor: 'white' }}
          >
            <CardContent sx={{ p: 4 }}>
              <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                24h Change
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 800, mb: 1, mt: 1 }}>
                {showValues ? formatPercentage(2.45) : '••••'}
              </Typography>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, color: 'success.main' }}>
                +{showValues ? formatCurrency(1250, currency) : '••••'}
              </Typography>
            </CardContent>
          </Card>
        </Box>

        <Box sx={{ flex: { xs: '100%', md: 'calc(33.33% - 16px)' } }}>
          <Card
            component={motion.div}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            sx={{ borderRadius: 5, border: '1px solid rgba(0,0,0,0.04)', boxShadow: '0 10px 40px rgba(0,0,0,0.02)', height: '100%', bgcolor: 'white' }}
          >
            <CardContent sx={{ p: 4 }}>
              <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Asset Count
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 800, mb: 1, mt: 1 }}>
                {portfolio.length}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                Across {transactions.length} transactions
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Box>

      {/* Charts and Assets */}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
        <Box sx={{ flex: { xs: '100%', lg: 'calc(50% - 12px)' } }}>
          <Card sx={{ borderRadius: 5, border: '1px solid rgba(0,0,0,0.04)', boxShadow: '0 8px 32px rgba(0,0,0,0.02)', height: '100%', bgcolor: 'white' }}>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h6" sx={{ fontWeight: 800, mb: 4 }}>Asset Allocation</Typography>
              <Box sx={{ height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={chartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={70}
                      outerRadius={105}
                      dataKey="value"
                      stroke="none"
                    >
                      {chartData.map((_entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#fff', border: 'none', borderRadius: 12, boxShadow: '0 8px 24px rgba(0,0,0,0.1)' }}
                      itemStyle={{ fontWeight: 700 }}
                      formatter={(value: number) => formatCurrency(value, currency)} 
                    />
                  </PieChart>
                </ResponsiveContainer>
              </Box>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5, mt: 3 }}>
                {chartData.map((asset, index) => (
                  <Box key={asset.name} sx={{ px: 1.5, py: 0.8, borderRadius: 2, bgcolor: alpha(COLORS[index % COLORS.length], 0.05) }}>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: COLORS[index % COLORS.length] }} />
                      <Typography variant="caption" sx={{ fontWeight: 700 }}>
                        {asset.name} <Box component="span" sx={{ color: 'text.secondary', fontWeight: 500 }}>{asset.percentage.toFixed(1)}%</Box>
                      </Typography>
                    </Stack>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Box>

        <Box sx={{ flex: { xs: '100%', lg: 'calc(50% - 12px)' } }}>
          <Card sx={{ borderRadius: 5, border: '1px solid rgba(0,0,0,0.04)', boxShadow: '0 8px 32px rgba(0,0,0,0.02)', height: '100%', bgcolor: 'white' }}>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h6" sx={{ fontWeight: 800, mb: 4 }}>Performance Highlights</Typography>
              <Box sx={{ height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={performanceData}>
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 700 }} stroke={muiTheme.palette.text.secondary} />
                    <YAxis hide />
                    <Tooltip
                      cursor={{ fill: alpha(muiTheme.palette.primary.main, 0.05) }}
                      contentStyle={{ backgroundColor: '#fff', border: 'none', borderRadius: 12, boxShadow: '0 8px 24px rgba(0,0,0,0.1)' }}
                      formatter={(value: number) => [`${value.toFixed(2)}%`, 'Profit/Loss']}
                    />
                    <Bar 
                        dataKey="pnlPercentage" 
                        radius={[6, 6, 0, 0]}
                        fill={muiTheme.palette.primary.main}
                    >
                        {performanceData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.pnlPercentage >= 0 ? '#00ffa3' : '#ff5252'} />
                        ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>

      {/* Assets Table */}
      <Card sx={{ borderRadius: 5, border: '1px solid rgba(0,0,0,0.04)', boxShadow: '0 10px 40px rgba(0,0,0,0.02)', overflow: 'hidden', bgcolor: 'white' }}>
        <Box sx={{ p: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" sx={{ fontWeight: 800 }}>Manage Assets</Typography>
        </Box>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: alpha('#000', 0.02) }}>
                <TableCell sx={{ fontWeight: 800, color: 'text.secondary', textTransform: 'uppercase', fontSize: '0.65rem', borderBottom: 'none' }}>Asset</TableCell>
                <TableCell align="right" sx={{ display: { xs: 'none', sm: 'table-cell' }, fontWeight: 800, color: 'text.secondary', textTransform: 'uppercase', fontSize: '0.65rem', borderBottom: 'none' }}>Holdings</TableCell>
                <TableCell align="right" sx={{ fontWeight: 800, color: 'text.secondary', textTransform: 'uppercase', fontSize: '0.65rem', borderBottom: 'none' }}>Value</TableCell>
                <TableCell align="right" sx={{ display: { xs: 'none', md: 'table-cell' }, fontWeight: 800, color: 'text.secondary', textTransform: 'uppercase', fontSize: '0.65rem', borderBottom: 'none' }}>24h Change</TableCell>
                <TableCell align="right" sx={{ fontWeight: 800, color: 'text.secondary', textTransform: 'uppercase', fontSize: '0.65rem', borderBottom: 'none' }}>Profit / Loss</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {portfolio.map((asset, index) => (
                <TableRow
                  key={asset.id}
                  component={motion.tr}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.04 }}
                  sx={{ 
                      '&:hover': { bgcolor: alpha(muiTheme.palette.primary.main, 0.02) },
                      '& .MuiTableCell-root': { borderBottom: '1px solid rgba(0,0,0,0.02)', py: 2.5 }
                  }}
                >
                  <TableCell>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Avatar 
                        src={asset.image} 
                        alt={asset.name} 
                        sx={{ 
                            width: 36, 
                            height: 36, 
                            bgcolor: 'white',
                            border: '1px solid rgba(0,0,0,0.05)',
                            p: 0.5
                        }} 
                      />
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: 800 }}>{asset.name}</Typography>
                        <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600 }}>{asset.symbol.toUpperCase()}</Typography>
                      </Box>
                    </Stack>
                  </TableCell>
                  <TableCell align="right" sx={{ display: { xs: 'none', sm: 'table-cell' } }}>
                    <Typography variant="body2" sx={{ fontWeight: 700 }}>
                      {showValues ? asset.amount.toFixed(4) : '••••'}
                    </Typography>
                    <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 500 }}>
                      Avg: {showValues ? formatCurrency(asset.avgBuyPrice, currency) : '••••'}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="body2" sx={{ fontWeight: 800 }}>
                      {showValues ? formatCurrency(asset.value, currency) : '••••'}
                    </Typography>
                  </TableCell>
                  <TableCell align="right" sx={{ display: { xs: 'none', md: 'table-cell' } }}>
                    <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.5, px: 1, py: 0.3, borderRadius: 1.5, bgcolor: alpha(asset.change_24h >= 0 ? '#00ffa3' : '#ff5252', 0.1) }}>
                      {asset.change_24h >= 0 ? <ArrowUpIcon sx={{ fontSize: 12, color: '#00b372' }} /> : <ArrowDownIcon sx={{ fontSize: 12, color: '#f44336' }} />}
                      <Typography variant="caption" sx={{ color: asset.change_24h >= 0 ? '#00b372' : '#f44336', fontWeight: 800 }}>
                        {showValues ? formatPercentage(asset.change_24h) : '••••'}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="body2" sx={{ color: asset.pnl >= 0 ? 'success.main' : 'error.main', fontWeight: 800 }}>
                      {showValues ? (asset.pnl >= 0 ? '+' : '') + formatCurrency(asset.pnl, currency) : '••••'}
                    </Typography>
                    <Typography variant="caption" sx={{ color: asset.pnl >= 0 ? 'success.main' : 'error.main', fontWeight: 600 }}>
                      {showValues ? formatPercentage(asset.pnlPercentage) : '••••'}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </Stack>
  );
};

export default Portfolio;