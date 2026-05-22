// components/Banners.tsx
import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Link,
  Stack,
  alpha,
  useTheme as useMuiTheme,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import {
  EmojiEvents as LeaderboardIcon,
  VerifiedUser as KYCIcon,
} from '@mui/icons-material';

const Banners: React.FC = () => {
  const muiTheme = useMuiTheme();

  return (
    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3, mb: 4 }}>
      <Box sx={{ flex: 1 }}>
        <Card 
          sx={{ 
            height: '100%',
            borderRadius: 2,
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            bgcolor: 'background.paper',
            border: '1px solid',
            borderColor: 'divider',
            '&:hover': {
              bgcolor: 'success.main',
              color: 'white',
              transform: 'translateY(-4px)',
              boxShadow: `0 8px 24px ${alpha(muiTheme.palette.success.main, 0.24)}`,
              '& .MuiTypography-root, & .MuiSvgIcon-root': {
                color: 'white',
              }
            }
          }}
        >
          <CardContent sx={{ p: 3 }}>
            <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 1 }}>
              <LeaderboardIcon sx={{ color: 'success.main' }} />
              <Typography variant="h6" fontWeight={800} color="success.main">Leaderboard</Typography>
            </Stack>
            <Typography variant="body2" color="text.secondary">
              You're in the top 10% of traders this week! Keep it up!
            </Typography>
          </CardContent>
        </Card>
      </Box>
      <Box sx={{ flex: 1 }}>
        <Card 
          sx={{ 
            height: '100%',
            borderRadius: 4,
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            bgcolor: 'background.paper',
            border: '1px solid',
            borderColor: 'divider',
            '&:hover': {
              bgcolor: 'success.main',
              color: 'white',
              transform: 'translateY(-4px)',
              boxShadow: `0 8px 24px ${alpha(muiTheme.palette.success.main, 0.24)}`,
              '& .MuiTypography-root, & .MuiSvgIcon-root, & .MuiLink-root': {
                color: 'white',
              }
            }
          }}
        >
          <CardContent sx={{ p: 3 }}>
            <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 1 }}>
              <KYCIcon sx={{ color: 'success.main' }} />
              <Typography variant="h6" fontWeight={800} color="success.main">KYC Level 1</Typography>
            </Stack>
            <Typography variant="body2" color="text.secondary">
              Upgrade to Level 2 for higher limits.{' '}
              <Link component={RouterLink} to="/settings" sx={{ color: 'primary.main', fontWeight: 600 }}>Learn more</Link>
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default Banners;