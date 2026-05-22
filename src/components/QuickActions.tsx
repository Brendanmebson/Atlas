import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Box,
  Typography,
  Card,
  CardActionArea,
  IconButton,
  Stack,
  alpha,
  Divider,
} from '@mui/material';
import {
  Add as AddIcon,
  ShoppingCart as ShoppingCartIcon,
  CurrencyExchange as ExchangeIcon,
  SwapHoriz as SwapIcon,
  ArrowDownward as ArrowDownIcon,
} from '@mui/icons-material';
import CryptoActionModal from './Modals/CryptoActionModal';

const QuickActions: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedAction, setSelectedAction] = useState<'buy' | 'sell' | 'swap' | 'withdraw' | null>(null);

  const actions = [
    {
      id: 'buy',
      label: 'Buy',
      icon: <ShoppingCartIcon />,
      color: '#00ffa3',
    },
    {
      id: 'sell',
      label: 'Sell',
      icon: <ExchangeIcon />,
      color: '#ff5252',
    },
    {
      id: 'swap',
      label: 'Swap',
      icon: <SwapIcon />,
      color: '#9945FF',
    },
    {
      id: 'withdraw',
      label: 'Withdraw',
      icon: <ArrowDownIcon />,
      color: '#000000',
    }
  ];

  const openModal = (action: 'buy' | 'sell' | 'swap' | 'withdraw') => {
    setSelectedAction(action);
    setModalOpen(true);
  };

  return (
    <Box sx={{ mb: 4 }}>
      <Card sx={{ 
        borderRadius: 4, 
        p: 2.5, 
        boxShadow: '0 4px 24px rgba(0,0,0,0.03)', 
        border: '1px solid rgba(0,0,0,0.04)',
        bgcolor: alpha('#fff', 0.8),
        backdropFilter: 'blur(10px)'
      }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 800, letterSpacing: '-0.02em' }}>
            Quick Actions
          </Typography>
          <IconButton size="small" sx={{ bgcolor: alpha('#000', 0.03), borderRadius: 2 }}>
            <AddIcon fontSize="small" />
          </IconButton>
        </Box>

        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
          {actions.map((action) => (
            <Box 
              key={action.id}
              sx={{ 
                flex: 1,
                minWidth: { xs: 'calc(50% - 8px)', sm: '120px' }
              }}
            >
              <motion.div
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.96 }}
              >
                <Card 
                  elevation={0}
                  sx={{ 
                    borderRadius: 3, 
                    border: '1px solid',
                    borderColor: alpha(action.color, 0.1),
                    bgcolor: alpha(action.color, 0.04),
                    transition: 'all 0.2s ease',
                    '&:hover': {
                        bgcolor: alpha(action.color, 0.08),
                        borderColor: alpha(action.color, 0.2),
                    }
                  }}
                >
                  <CardActionArea onClick={() => openModal(action.id as any)} sx={{ p: 2.5 }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1.5 }}>
                      <Box sx={{ 
                        p: 1.2, 
                        borderRadius: 2, 
                        bgcolor: alpha(action.color, 0.1),
                        color: action.color,
                        display: 'flex'
                      }}>
                        {action.icon}
                      </Box>
                      <Typography variant="subtitle2" sx={{ fontWeight: 800, fontSize: '0.85rem' }}>
                        {action.label}
                      </Typography>
                    </Box>
                  </CardActionArea>
                </Card>
              </motion.div>
            </Box>
          ))}
        </Box>

        <Divider sx={{ my: 3, opacity: 0.5 }} />

        {/* Quick Stats */}
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, px: 1 }}>
          {[
            { label: 'Weekly Vol', value: '$1.2M', trend: '+12%' },
            { label: 'Total Profit', value: '+$12.4K', trend: '+5%' },
            { label: 'Success Rate', value: '94%', trend: 'Stable' },
          ].map((stat, i) => (
            <Box key={i} sx={{ flex: 1, minWidth: '100px' }}>
              <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '0.65rem' }}>
                {stat.label}
              </Typography>
              <Stack direction="row" alignItems="baseline" spacing={1}>
                <Typography variant="h6" sx={{ fontWeight: 800, fontSize: '1.1rem' }}>{stat.value}</Typography>
                <Typography variant="caption" sx={{ color: 'success.main', fontWeight: 700, fontSize: '0.7rem' }}>{stat.trend}</Typography>
              </Stack>
            </Box>
          ))}
        </Box>
      </Card>

      {modalOpen && selectedAction && (
        <CryptoActionModal
          initialAction={selectedAction}
          onClose={() => setModalOpen(false)}
        />
      )}
    </Box>
  );
};

export default QuickActions;