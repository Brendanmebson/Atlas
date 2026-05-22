import React from 'react';
import { motion } from 'framer-motion';
import { 
  Box, 
  Typography, 
  Stack, 
  Card, 
  CardContent, 
  alpha, 
  IconButton,
  Avatar,
  Badge
} from '@mui/material';
import { 
  Notifications as NotifIcon, 
  CheckCircle as SuccessIcon,
  Error as AlertIcon,
  Info as InfoIcon,
  MoreVert as MoreIcon,
  Brightness1 as UnreadIcon
} from '@mui/icons-material';

const Notifications: React.FC = () => {
  const notifications = [
    {
      id: 1,
      title: 'Success Transfer',
      message: 'Your transfer of 0.52 BTC to external wallet was successful.',
      time: '2 mins ago',
      type: 'success',
      unread: true
    },
    {
      id: 2,
      title: 'Security Alert',
      message: 'A new login attempt was detected from a New York, USA based IP address.',
      time: '1 hour ago',
      type: 'alert',
      unread: true
    },
    {
      id: 3,
      title: 'Price Alert: SOL',
      message: 'Solana (SOL) has reached your target price of $110.00.',
      time: '5 hours ago',
      type: 'info',
      unread: false
    },
    {
      id: 4,
      title: 'New Feature Available',
      message: 'You can now use our advanced trading terminal for pro users. Check it out in the Trade section.',
      time: '1 day ago',
      type: 'info',
      unread: false
    },
    {
        id: 5,
        title: 'KYC Verified',
        message: 'Congratulations! Your identity verification was approved. You now have higher withdrawal limits.',
        time: '2 days ago',
        type: 'success',
        unread: false
    }
  ];

  const getIcon = (type: string) => {
      switch(type) {
          case 'success': return <SuccessIcon sx={{ color: '#00ffa3' }} />;
          case 'alert': return <AlertIcon sx={{ color: '#ff5252' }} />;
          default: return <InfoIcon sx={{ color: '#3B82F6' }} />;
      }
  };

  return (
    <Box sx={{ mt: 1 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 4 }}>
        <Box>
            <Typography variant="h4" sx={{ fontWeight: 800, letterSpacing: '-0.02em', mb: 0.5 }}>Notifications</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                Stay updated with your account activity and market alerts
            </Typography>
        </Box>
        <IconButton sx={{ bgcolor: 'white', border: '1px solid rgba(0,0,0,0.04)', borderRadius: 3, p: 1.5 }}>
            <MoreIcon />
        </IconButton>
      </Stack>

      <Stack spacing={2}>
        {notifications.map((notif) => (
          <Card 
            key={notif.id}
            sx={{ 
                borderRadius: 4, 
                border: '1px solid rgba(0,0,0,0.03)', 
                boxShadow: '0 4px 20px rgba(0,0,0,0.02)',
                bgcolor: notif.unread ? alpha('#00ffa3', 0.02) : 'white',
                transition: 'all 0.2s ease',
                '&:hover': {
                    transform: 'scale(1.002)',
                    boxShadow: '0 8px 30px rgba(0,0,0,0.04)',
                    borderColor: alpha('#00ffa3', 0.1)
                }
            }}
          >
            <CardContent sx={{ p: 2.5, '&:last-child': { pb: 2.5 } }}>
              <Stack direction="row" spacing={3} alignItems="flex-start">
                <Box sx={{ 
                    p: 1.5, 
                    borderRadius: 3, 
                    bgcolor: alpha(notif.type === 'success' ? '#00ffa3' : notif.type === 'alert' ? '#ff5252' : '#3B82F6', 0.1),
                    display: 'flex'
                }}>
                    {getIcon(notif.type)}
                </Box>
                <Box sx={{ flex: 1 }}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 0.5 }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 800 }}>
                            {notif.title}
                        </Typography>
                        <Stack direction="row" spacing={1} alignItems="center">
                            <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>{notif.time}</Typography>
                            {notif.unread && <UnreadIcon sx={{ fontSize: 10, color: 'primary.main' }} />}
                        </Stack>
                    </Stack>
                    <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 500, lineHeight: 1.6 }}>
                        {notif.message}
                    </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        ))}
      </Stack>
    </Box>
  );
};

export default Notifications;
