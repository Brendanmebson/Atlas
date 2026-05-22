import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Box,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  Stack,
  alpha,
  List,
  ListItem,
  ListItemText,
  Paper,
  InputAdornment,
} from '@mui/material';
import {
  CardGiftcard as GiftIcon,
  ContentCopy as CopyIcon,
} from '@mui/icons-material';

const ReferEarn: React.FC = () => {
  const [referralCode] = useState('X6EG7');
  const [referralList] = useState<string[]>([]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
      <Box sx={{ maxWidth: 600, mx: 'auto' }}>
        <Card sx={{ 
            borderRadius: 5, 
            border: '1px solid rgba(0,0,0,0.04)', 
            boxShadow: '0 8px 32px rgba(0,0,0,0.02)',
            bgcolor: 'white',
            overflow: 'hidden',
            p: 1
        }}>
          <CardContent sx={{ p: 4 }}>
            <Stack direction="row" spacing={3} alignItems="center" sx={{ mb: 4 }}>
              <Box sx={{ p: 2, borderRadius: 3, bgcolor: alpha('#00ffa3', 0.1), color: '#00b372', display: 'flex' }}>
                <GiftIcon sx={{ fontSize: 32 }} />
              </Box>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 800 }}>Refer & Earn Program</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>Share the experience with your friends</Typography>
              </Box>
            </Stack>

            <Typography variant="body2" color="text.secondary" sx={{ mb: 5, lineHeight: 1.8, fontWeight: 500 }}>
                When your friends join the FUREX App via your referral code, you gain points after their first trade, 
                and stand a chance to win an amazing prize through our weekly leaderboard!
            </Typography>

            <Stack spacing={4}>
              <Box>
                <Typography variant="caption" sx={{ fontWeight: 800, color: 'text.secondary', mb: 1.5, display: 'block', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Your Unique Referral Code</Typography>
                <TextField
                  fullWidth
                  value={referralCode}
                  InputProps={{
                    readOnly: true,
                    sx: { height: 64, borderRadius: 4, fontWeight: 800, fontSize: '1.2rem', letterSpacing: '0.1em', bgcolor: alpha('#000', 0.01) },
                    endAdornment: (
                      <InputAdornment position="end">
                        <Button 
                          variant="contained" 
                          onClick={() => copyToClipboard(referralCode)}
                          startIcon={<CopyIcon />}
                          sx={{ 
                              borderRadius: 3, 
                              textTransform: 'none', 
                              fontWeight: 800, 
                              px: 3, 
                              py: 1,
                              bgcolor: 'primary.main',
                              color: '#000',
                              boxShadow: 'none',
                              '&:hover': { bgcolor: 'primary.dark', boxShadow: 'none' }
                          }}
                        >
                          Copy
                        </Button>
                      </InputAdornment>
                    ),
                  }}
                  sx={{ '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(0,0,0,0.05)' } }}
                />
              </Box>

              <Box>
                <Typography variant="caption" sx={{ fontWeight: 800, color: 'text.secondary', mb: 1.5, display: 'block', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Friends Referred</Typography>
                <Box 
                  sx={{ 
                    p: 4, 
                    borderRadius: 4, 
                    bgcolor: alpha('#000', 0.01), 
                    border: '1px dashed rgba(0,0,0,0.1)', 
                    minHeight: 120,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  {referralList.length > 0 ? (
                    <List sx={{ width: '100%', p: 0 }}>
                      {referralList.map((referral, index) => (
                        <ListItem key={index} sx={{ px: 2, py: 1.5, borderBottom: '1px solid rgba(0,0,0,0.03)' }}>
                          <ListItemText 
                            primary={referral} 
                            primaryTypographyProps={{ fontWeight: 700 }}
                          />
                        </ListItem>
                      ))}
                    </List>
                  ) : (
                    <>
                        <Typography variant="body2" color="text.disabled" sx={{ fontWeight: 600, mb: 1 }}>No referrals yet</Typography>
                        <Button variant="text" sx={{ fontWeight: 800, textTransform: 'none', color: 'primary.main' }}>Invite Friends Now</Button>
                    </>
                  )}
                </Box>
              </Box>
            </Stack>
          </CardContent>
        </Card>
      </Box>
    </motion.div>
  );
};

export default ReferEarn;
