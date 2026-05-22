import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  TextField,
  MenuItem,
  Button,
  Stack,
  alpha,
  InputAdornment,
  Divider,
} from '@mui/material';

const Withdraw: React.FC = () => {
  const cryptoBalances = [
    { name: 'Bitcoin', amount: 0.5, valueNGN: 9750000 },
    { name: 'Ethereum', amount: 3.2, valueNGN: 3840000 },
    { name: 'Litecoin', amount: 15, valueNGN: 675000 },
    { name: 'Solana', amount: 50, valueNGN: 1250000 },
  ];

  const exchangeRates: Record<string, number> = {
    NGN: 1,
    USD: 1 / 1562.50,
    EUR: 1 / 1701.06,
    GBP: 1 / 2026.43,
  };

  const [selectedCrypto, setSelectedCrypto] = useState(cryptoBalances[0].name);
  const [currency, setCurrency] = useState('NGN');
  const [withdrawType, setWithdrawType] = useState<'Crypto' | 'Fiat'>('Crypto');
  const [amount, setAmount] = useState('');
  const [address, setAddress] = useState('');
  const [note, setNote] = useState('');

  const selectedCryptoData = cryptoBalances.find(crypto => crypto.name === selectedCrypto);
  const selectedCurrencyRate = exchangeRates[currency];
  
  const getConvertedValue = (valueNGN: number) => 
    (valueNGN * selectedCurrencyRate).toLocaleString(undefined, { 
      minimumFractionDigits: 2, 
      maximumFractionDigits: 2 
    });

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const numericValue = parseFloat(value);

    if (!isNaN(numericValue) && numericValue >= 0) {
      if (selectedCryptoData) {
        setAmount(value);
      }
    } else if (value === '') {
      setAmount('');
    }
  };

  const handleWithdraw = () => {
    alert(`Withdraw ${amount} ${withdrawType === 'Crypto' ? selectedCrypto : currency} to ${address} with note: ${note}`);
  };

  return (
    <Box sx={{ maxWidth: 500, mx: 'auto', mt: 4 }}>
      <Card sx={{ borderRadius: 4, boxShadow: '0 8px 32px rgba(0,0,0,0.2)' }}>
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h5" sx={{ fontWeight: 800, color: 'success.main', mb: 4 }}>
            Withdraw Funds
          </Typography>
          
          <Stack spacing={3}>
            <Box>
              <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>Select Cryptocurrency</Typography>
              <TextField
                select
                fullWidth
                value={selectedCrypto}
                onChange={(e) => setSelectedCrypto(e.target.value)}
              >
                {cryptoBalances.map(crypto => (
                  <MenuItem key={crypto.name} value={crypto.name}>{crypto.name}</MenuItem>
                ))}
              </TextField>
            </Box>

            {selectedCryptoData && (
              <Box sx={{ p: 2, bgcolor: alpha('#4caf50', 0.05), borderRadius: 2, border: '1px dashed', borderColor: 'success.main' }}>
                <Typography variant="body2" sx={{ fontWeight: 600, color: 'success.main' }}>
                  Available Balance: {selectedCryptoData.amount} {selectedCrypto}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Estimated Value: {getConvertedValue(selectedCryptoData.valueNGN)} {currency}
                </Typography>
              </Box>
            )}

            <Divider />

            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2 }}>
              <Box sx={{ flex: 1 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>Currency</Typography>
                <TextField
                  select
                  fullWidth
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                >
                  <MenuItem value="NGN">NGN</MenuItem>
                  <MenuItem value="USD">USD</MenuItem>
                  <MenuItem value="EUR">EUR</MenuItem>
                  <MenuItem value="GBP">GBP</MenuItem>
                </TextField>
              </Box>
              <Box sx={{ flex: 1 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>Type</Typography>
                <TextField
                  select
                  fullWidth
                  value={withdrawType}
                  onChange={(e) => setWithdrawType(e.target.value as 'Crypto' | 'Fiat')}
                >
                  <MenuItem value="Crypto">Crypto</MenuItem>
                  <MenuItem value="Fiat">Fiat</MenuItem>
                </TextField>
              </Box>
            </Box>

            <Box>
              <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>Amount</Typography>
              <TextField
                fullWidth
                type="number"
                value={amount}
                onChange={handleAmountChange}
                placeholder="0.00"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Typography variant="body2" fontWeight={600}>
                        {withdrawType === 'Crypto' ? selectedCrypto : currency}
                      </Typography>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>

            <Box>
              <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>Receiving Address</Typography>
              <TextField
                fullWidth
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter wallet address"
              />
            </Box>

            <Box>
              <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>Note (Optional)</Typography>
              <TextField
                fullWidth
                multiline
                rows={2}
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="What's this withdrawal for?"
              />
            </Box>

            <Button
              fullWidth
              variant="contained"
              color="success"
              size="large"
              onClick={handleWithdraw}
              sx={{
                py: 1.5,
                borderRadius: 3,
                fontWeight: 700,
                textTransform: 'none',
                boxShadow: '0 8px 16px rgba(76, 175, 80, 0.24)',
              }}
            >
              Confirm Withdrawal
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Withdraw;
