// components/ActionButtons.tsx
import React, { useState } from 'react';
import { Button, Box } from '@mui/material';
import {
  ShoppingCart as ShoppingCartIcon,
  SwapHoriz as SwapIcon,
  CurrencyExchange as ExchangeIcon,
} from '@mui/icons-material';
import CryptoActionModal from './CryptoActionModal';

const ActionButtons: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedAction, setSelectedAction] = useState<'buy' | 'sell' | 'swap' | null>(null);

  const openModal = (action: 'buy' | 'sell' | 'swap') => {
    setSelectedAction(action);
    setModalOpen(true);
  };

  return (
    <Box sx={{ mb: 4 }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          gap: 2,
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Button
          variant="outlined"
          color="success"
          size="large"
          startIcon={<ShoppingCartIcon />}
          onClick={() => openModal('buy')}
          sx={{
            py: 1.5,
            px: 4,
            borderRadius: 10,
            borderWidth: 2,
            fontWeight: 'bold',
            '&:hover': {
              borderWidth: 2,
              backgroundColor: 'success.main',
              color: 'white',
            },
          }}
        >
          Buy
        </Button>
        <Button
          variant="outlined"
          color="error"
          size="large"
          startIcon={<ExchangeIcon />}
          onClick={() => openModal('sell')}
          sx={{
            py: 1.5,
            px: 4,
            borderRadius: 10,
            borderWidth: 2,
            fontWeight: 'bold',
            '&:hover': {
              borderWidth: 2,
              backgroundColor: 'error.main',
              color: 'white',
            },
          }}
        >
          Sell
        </Button>
        <Button
          variant="outlined"
          color="primary"
          size="large"
          startIcon={<SwapIcon />}
          onClick={() => openModal('swap')}
          sx={{
            py: 1.5,
            px: 4,
            borderRadius: 10,
            borderWidth: 2,
            fontWeight: 'bold',
            '&:hover': {
              borderWidth: 2,
              backgroundColor: 'primary.main',
              color: 'white',
            },
          }}
        >
          Swap
        </Button>
      </Box>
      {modalOpen && selectedAction && (
        <CryptoActionModal
          initialAction={selectedAction}
          onClose={() => setModalOpen(false)}
        />
      )}
    </Box>
  );
};

export default ActionButtons;