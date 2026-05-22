import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  Stack, 
  TextField, 
  Button, 
  IconButton, 
  alpha,
  Avatar,
  Divider,
  InputAdornment
} from '@mui/material';
import { 
  SwapVert as SwapIcon, 
  Settings as SettingsIcon,
  InfoOutlined as InfoIcon,
  ArrowDownward as ArrowDownIcon
} from '@mui/icons-material';
import MarketOverview from '../components/MarketOverview';
import { useCrypto } from '../contexts/CryptoContext';
import { formatCurrency } from '../utils/formatters';

const Exchange: React.FC = () => {
  const { coins, currency } = useCrypto();
  const fromCoin = coins[0] || { name: 'Bitcoin', symbol: 'BTC', current_price: 45000, image: '' };
  const toCoin = coins[1] || { name: 'Ethereum', symbol: 'ETH', current_price: 3000, image: '' };

  return (
    <Box sx={{ mt: 1 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 4 }}>
        <Box>
            <Typography variant="h4" sx={{ fontWeight: 800, letterSpacing: '-0.02em', mb: 0.5 }}>Exchange</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                Swap your assets instantly with low fees
            </Typography>
        </Box>
      </Stack>

      <Stack spacing={4} alignItems="center">
        <Card sx={{ 
            width: '100%', 
            maxWidth: 500, 
            borderRadius: 5, 
            border: '1px solid rgba(0,0,0,0.04)', 
            boxShadow: '0 20px 60px rgba(0,0,0,0.05)',
            bgcolor: 'white',
            position: 'relative',
            overflow: 'visible'
        }}>
          <CardContent sx={{ p: 4 }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 800 }}>Swap Tokens</Typography>
                <IconButton size="small"><SettingsIcon sx={{ fontSize: 20 }} /></IconButton>
            </Stack>

            <Stack spacing={1} sx={{ position: 'relative' }}>
                {/* From Section */}
                <Box sx={{ p: 3, borderRadius: 4, bgcolor: alpha('#000', 0.01), border: '1px solid rgba(0,0,0,0.02)' }}>
                    <Stack direction="row" justifyContent="space-between" sx={{ mb: 2 }}>
                        <Typography variant="caption" sx={{ fontWeight: 700, color: 'text.secondary' }}>From</Typography>
                        <Typography variant="caption" sx={{ fontWeight: 700, color: 'text.secondary' }}>Balance: 0.45 BTC</Typography>
                    </Stack>
                    <Stack direction="row" spacing={2} alignItems="center">
                        <TextField 
                            variant="standard"
                            placeholder="0.00"
                            fullWidth
                            InputProps={{ disableUnderline: true, sx: { fontSize: '1.5rem', fontWeight: 800 } }}
                        />
                        <Button 
                            startIcon={<Avatar src={fromCoin.image} sx={{ width: 24, height: 24 }} />}
                            sx={{ 
                                bgcolor: 'white', 
                                border: '1px solid rgba(0,0,0,0.05)', 
                                borderRadius: 2.5, 
                                px: 2, 
                                py: 1, 
                                color: 'text.primary',
                                fontWeight: 800,
                                textTransform: 'none',
                                boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
                                '&:hover': { bgcolor: 'white', borderColor: 'primary.main' }
                            }}
                        >
                            {fromCoin.symbol.toUpperCase()}
                        </Button>
                    </Stack>
                </Box>

                {/* Swap Button (Floating) */}
                <Box sx={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', zIndex: 2 }}>
                    <IconButton 
                        sx={{ 
                            bgcolor: 'white', 
                            boxShadow: '0 4px 15px rgba(0,0,0,0.1)', 
                            border: '4px solid #fff',
                            p: 1,
                            '&:hover': { bgcolor: 'primary.main', color: '#000' }
                        }}
                    >
                        <SwapIcon fontSize="small" />
                    </IconButton>
                </Box>

                {/* To Section */}
                <Box sx={{ p: 3, borderRadius: 4, bgcolor: alpha('#000', 0.01), border: '1px solid rgba(0,0,0,0.02)' }}>
                    <Stack direction="row" justifyContent="space-between" sx={{ mb: 2 }}>
                        <Typography variant="caption" sx={{ fontWeight: 700, color: 'text.secondary' }}>To</Typography>
                        <Typography variant="caption" sx={{ fontWeight: 700, color: 'text.secondary' }}>Balance: 0.00 ETH</Typography>
                    </Stack>
                    <Stack direction="row" spacing={2} alignItems="center">
                        <TextField 
                            variant="standard"
                            placeholder="0.00"
                            fullWidth
                            InputProps={{ disableUnderline: true, sx: { fontSize: '1.5rem', fontWeight: 800 } }}
                        />
                        <Button 
                            startIcon={<Avatar src={toCoin.image} sx={{ width: 24, height: 24 }} />}
                            sx={{ 
                                bgcolor: 'white', 
                                border: '1px solid rgba(0,0,0,0.05)', 
                                borderRadius: 2.5, 
                                px: 2, 
                                py: 1, 
                                color: 'text.primary',
                                fontWeight: 800,
                                textTransform: 'none',
                                boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
                                '&:hover': { bgcolor: 'white', borderColor: 'primary.main' }
                            }}
                        >
                            {toCoin.symbol.toUpperCase()}
                        </Button>
                    </Stack>
                </Box>
            </Stack>

            <Stack spacing={2} sx={{ mt: 4 }}>
                <Stack direction="row" justifyContent="space-between">
                    <Typography variant="caption" sx={{ fontWeight: 600, color: 'text.secondary' }}>Exchange Rate</Typography>
                    <Typography variant="caption" sx={{ fontWeight: 800 }}>1 BTC = 15.42 ETH</Typography>
                </Stack>
                <Stack direction="row" justifyContent="space-between">
                    <Typography variant="caption" sx={{ fontWeight: 600, color: 'text.secondary' }}>Slippage Tolerance</Typography>
                    <Typography variant="caption" sx={{ fontWeight: 800 }}>0.5%</Typography>
                </Stack>

                <Button 
                    fullWidth 
                    variant="contained" 
                    sx={{ 
                        py: 2, 
                        borderRadius: 3.5, 
                        fontWeight: 800, 
                        textTransform: 'none', 
                        fontSize: '1.1rem',
                        bgcolor: 'primary.main',
                        color: '#000',
                        boxShadow: 'none',
                        mt: 2,
                        '&:hover': { bgcolor: 'primary.dark', boxShadow: 'none' }
                    }}
                >
                    Swap Assets
                </Button>
            </Stack>
          </CardContent>
        </Card>

        <Box sx={{ width: '100%' }}>
            <MarketOverview />
        </Box>
      </Stack>
    </Box>
  );
};

export default Exchange;
