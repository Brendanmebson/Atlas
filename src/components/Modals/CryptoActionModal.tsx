import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Typography,
  Box,
  Tabs,
  Tab,
  TextField,
  Autocomplete,
  Button,
  Stack,
  alpha,
  CircularProgress,
  InputAdornment,
} from '@mui/material';
import {
  Close as CloseIcon,
  Wallet as WalletIcon,
} from '@mui/icons-material';
import { useCrypto } from '../../contexts/CryptoContext';
import { usePortfolio } from '../../contexts/PortfolioContext';
import { formatCurrency } from '../../utils/formatters';
import toast from 'react-hot-toast';

interface CryptoActionModalProps {
  initialAction: 'buy' | 'sell' | 'swap' | 'withdraw';
  onClose: () => void;
}

const CryptoActionModal: React.FC<CryptoActionModalProps> = ({ initialAction, onClose }) => {
  const [action, setAction] = useState(initialAction);
  const [selectedCoinId, setSelectedCoinId] = useState<string | null>(null);
  const [amount, setAmount] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const { coins, currency } = useCrypto();
  const { portfolio, addTransaction } = usePortfolio();

  const selectedCoinData = coins.find(coin => coin.id === selectedCoinId);
  const portfolioAsset = portfolio.find(asset => asset.id === selectedCoinId);

  const isFormValid = selectedCoinId && amount && parseFloat(amount) > 0;

  const handleSubmit = async () => {
    if (!isFormValid || !selectedCoinData) return;

    setIsProcessing(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      const numAmount = parseFloat(amount);
      const total = numAmount * selectedCoinData.current_price;

      if (action === 'buy' || action === 'sell') {
        addTransaction({
          type: action,
          coinId: selectedCoinId,
          amount: numAmount,
          price: selectedCoinData.current_price,
          total: total,
          status: 'completed'
        });
        toast.success(`Successfully ${action === 'buy' ? 'bought' : 'sold'} ${amount} ${selectedCoinData.symbol.toUpperCase()}`);
      }

      onClose();
    } catch (error) {
      toast.error('Transaction failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleTabChange = (_event: React.SyntheticEvent, newValue: 'buy' | 'sell' | 'swap' | 'withdraw') => {
    setAction(newValue);
  };

  return (
    <Dialog 
      open={true} 
      onClose={onClose}
      fullWidth
      maxWidth="xs"
      PaperProps={{
        sx: {
          borderRadius: 4,
          bgcolor: 'background.paper',
          backgroundImage: 'none',
        }
      }}
    >
      <DialogTitle sx={{ m: 0, p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6" fontWeight={700}>
          {action.charAt(0).toUpperCase() + action.slice(1)} Crypto
        </Typography>
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs 
          value={action} 
          onChange={handleTabChange} 
          variant="fullWidth"
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab label="Buy" value="buy" sx={{ textTransform: 'none', fontWeight: 600 }} />
          <Tab label="Sell" value="sell" sx={{ textTransform: 'none', fontWeight: 600 }} />
          <Tab label="Swap" value="swap" sx={{ textTransform: 'none', fontWeight: 600 }} />
          <Tab label="Withdraw" value="withdraw" sx={{ textTransform: 'none', fontWeight: 600 }} />
        </Tabs>
      </Box>

      <DialogContent sx={{ p: 3, pt: 4 }}>
        <Stack spacing={3}>
          {/* Coin Selection */}
          <Autocomplete
            options={coins}
            getOptionLabel={(option) => `${option.name} (${option.symbol.toUpperCase()})`}
            onChange={(_event, value) => setSelectedCoinId(value?.id || null)}
            renderOption={(props, option) => (
              <Box component="li" {...props} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box component="img" src={option.image} sx={{ width: 24, height: 24, borderRadius: '50%' }} />
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="body2" fontWeight={600}>{option.name}</Typography>
                  <Typography variant="caption" color="text.secondary">{option.symbol.toUpperCase()}</Typography>
                </Box>
                <Typography variant="body2" fontWeight={600}>
                  {formatCurrency(option.current_price, currency)}
                </Typography>
              </Box>
            )}
            renderInput={(params) => (
              <TextField 
                {...params} 
                label="Select Cryptocurrency" 
                placeholder="Search..."
              />
            )}
          />

          {/* Amount Input */}
          <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body2" fontWeight={500}>Amount</Typography>
              {portfolioAsset && action === 'sell' && (
                <Stack direction="row" spacing={0.5} alignItems="center">
                  <WalletIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
                  <Typography variant="caption" color="text.secondary">
                    Available: {portfolioAsset.amount.toFixed(6)}
                  </Typography>
                </Stack>
              )}
            </Box>
            <TextField
              fullWidth
              type="number"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              InputProps={{
                endAdornment: selectedCoinData && (
                  <InputAdornment position="end">
                    <Typography variant="body2" fontWeight={600}>
                      {selectedCoinData.symbol.toUpperCase()}
                    </Typography>
                  </InputAdornment>
                ),
              }}
            />
            {portfolioAsset && action === 'sell' && (
              <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                {[25, 50, 75, 100].map((percentage) => (
                  <Button
                    key={percentage}
                    size="small"
                    variant="outlined"
                    onClick={() => setAmount((portfolioAsset.amount * percentage / 100).toString())}
                    sx={{ minWidth: 0, px: 1, py: 0.5, fontSize: '0.65rem' }}
                  >
                    {percentage}%
                  </Button>
                ))}
              </Stack>
            )}
          </Box>

          {/* Transaction Summary */}
          {selectedCoinData && amount && parseFloat(amount) > 0 && (
            <Box sx={{ p: 2, bgcolor: (theme) => alpha(theme.palette.primary.main, 0.05), borderRadius: 2, border: '1px solid', borderColor: 'divider' }}>
              <Stack spacing={1}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="caption" color="text.secondary">Price per {selectedCoinData.symbol.toUpperCase()}</Typography>
                  <Typography variant="caption" fontWeight={600}>
                    {formatCurrency(selectedCoinData.current_price, currency)}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="caption" color="text.secondary">Estimated Fee (0.1%)</Typography>
                  <Typography variant="caption" fontWeight={600}>
                    {formatCurrency(parseFloat(amount) * selectedCoinData.current_price * 0.001, currency)}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', pt: 1, borderTop: '1px solid', borderColor: 'divider' }}>
                  <Typography variant="body2" fontWeight={700}>Total</Typography>
                  <Typography variant="body1" fontWeight={800} color="primary">
                    {formatCurrency(parseFloat(amount) * selectedCoinData.current_price, currency)}
                  </Typography>
                </Box>
              </Stack>
            </Box>
          )}
        </Stack>
      </DialogContent>

      <DialogActions sx={{ p: 3, pt: 0 }}>
        <Button
          fullWidth
          variant="contained"
          size="large"
          disabled={!isFormValid || isProcessing}
          onClick={handleSubmit}
          sx={{
            py: 1.5,
            borderRadius: 3,
            fontWeight: 700,
            textTransform: 'none',
            boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
          }}
        >
          {isProcessing ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            `${action.charAt(0).toUpperCase() + action.slice(1)} ${selectedCoinData?.symbol.toUpperCase() || 'Crypto'}`
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CryptoActionModal;