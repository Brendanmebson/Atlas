import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Box,
  Typography,
  Tabs,
  Tab,
  TextField,
  Avatar,
  Button,
  IconButton,
  Card,
  CardContent,
  Stack,
  Divider,
  alpha,
  MenuItem,
  Alert,
} from '@mui/material';
import {
  PhotoCamera as CameraIcon,
  Info as InfoIcon,
} from '@mui/icons-material';
import Securitysettings from './Securitysettings';
import Preference from './Preference';
import Others from './Others';
import ReferEarn from './ReferEarn';

const countries = [
  'United States', 'Canada', 'United Kingdom', 'Australia', 'Germany',
  'France', 'Italy', 'Spain', 'Netherlands', 'Sweden',
  'Switzerland', 'Japan', 'China', 'India', 'Brazil',
  'Russia', 'Mexico', 'South Korea', 'Indonesia', 'Saudi Arabia',
  'Turkey', 'South Africa', 'Argentina', 'Norway', 'Denmark',
  'Finland', 'Ireland', 'Belgium', 'Austria', 'New Zealand',
  'Malaysia', 'Singapore', 'Philippines', 'Thailand', 'Vietnam',
  'United Arab Emirates', 'Israel', 'Chile', 'Colombia', 'Egypt',
  'Nigeria', 'Kenya', 'Pakistan', 'Bangladesh', 'Sri Lanka',
  'Portugal', 'Greece', 'Czech Republic', 'Poland', 'Hungary'
];

const Profile: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [fullName, setFullName] = useState('Brendan Mebson');
  const [email, setEmail] = useState('brendan@example.com');
  const [userID] = useState('4A0EF');
  const [phoneNumber, setPhoneNumber] = useState('+1 234 567 890');
  const [dob, setDob] = useState('1995-05-15');
  const [country, setCountry] = useState('Canada');
  const [kycLevel] = useState('Tier 1');

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  return (
    <Box sx={{ flexGrow: 1, mt: 1 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 4 }}>
            <Box>
                <Typography variant="h4" sx={{ fontWeight: 800, letterSpacing: '-0.02em', mb: 0.5 }}>Account Settings</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                    Manage your personal information and account preferences
                </Typography>
            </Box>
        </Stack>

      <Card sx={{ borderRadius: 5, border: '1px solid rgba(0,0,0,0.04)', boxShadow: '0 10px 40px rgba(0,0,0,0.02)', overflow: 'hidden', bgcolor: 'white' }}>
        <Box sx={{ borderBottom: '1px solid rgba(0,0,0,0.03)', px: 2 }}>
          <Tabs 
            value={activeTab} 
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              '& .MuiTab-root': {
                textTransform: 'none',
                fontWeight: 800,
                minWidth: 120,
                py: 3,
                fontSize: '0.95rem',
                color: 'text.secondary',
                '&.Mui-selected': { color: 'primary.main' }
              },
              '& .MuiTabs-indicator': {
                height: 3,
                borderRadius: '3px 3px 0 0',
                backgroundColor: 'primary.main',
              }
            }}
          >
            <Tab label="Personal Info" />
            <Tab label="Security" />
            <Tab label="Preference" />
            <Tab label="Refer & Earn" />
            <Tab label="Others" />
          </Tabs>
        </Box>

        <CardContent sx={{ p: 5 }}>
          {activeTab === 0 && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 6 }}>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="h6" sx={{ fontWeight: 800, mb: 4 }}>Basic Information</Typography>
                  <Stack spacing={3}>
                    <Box>
                        <Typography variant="caption" sx={{ fontWeight: 800, color: 'text.secondary', mb: 1, display: 'block' }}>Full Name</Typography>
                        <TextField
                            fullWidth
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3, bgcolor: alpha('#000', 0.01) } }}
                        />
                    </Box>
                    <Box>
                        <Typography variant="caption" sx={{ fontWeight: 800, color: 'text.secondary', mb: 1, display: 'block' }}>Email Address</Typography>
                        <TextField
                            fullWidth
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3, bgcolor: alpha('#000', 0.01) } }}
                        />
                    </Box>
                    <Box sx={{ display: 'flex', gap: 3 }}>
                        <Box sx={{ flex: 1 }}>
                            <Typography variant="caption" sx={{ fontWeight: 800, color: 'text.secondary', mb: 1, display: 'block' }}>UserID</Typography>
                            <TextField
                                fullWidth
                                value={userID}
                                InputProps={{ readOnly: true }}
                                disabled
                                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3, bgcolor: alpha('#000', 0.03) } }}
                            />
                        </Box>
                        <Box sx={{ flex: 1 }}>
                            <Typography variant="caption" sx={{ fontWeight: 800, color: 'text.secondary', mb: 1, display: 'block' }}>KYC Status</Typography>
                            <TextField
                                fullWidth
                                value={kycLevel}
                                InputProps={{ readOnly: true }}
                                disabled
                                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3, bgcolor: alpha('#000', 0.03) } }}
                            />
                        </Box>
                    </Box>
                    <Box>
                        <Typography variant="caption" sx={{ fontWeight: 800, color: 'text.secondary', mb: 1, display: 'block' }}>Phone Number</Typography>
                        <TextField
                            fullWidth
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3, bgcolor: alpha('#000', 0.01) } }}
                        />
                    </Box>
                  </Stack>
                </Box>

                <Divider orientation="vertical" flexItem sx={{ display: { xs: 'none', md: 'block' } }} />

                <Box sx={{ flex: 1 }}>
                  <Typography variant="h6" sx={{ fontWeight: 800, mb: 4 }}>Profile Picture</Typography>
                  <Stack spacing={4} alignItems="center">
                    <Box sx={{ position: 'relative' }}>
                        <Avatar sx={{ width: 140, height: 140, bgcolor: alpha('#00ffa3', 0.1), border: '2px solid rgba(0,0,0,0.05)', fontSize: '3rem', fontWeight: 800, color: 'primary.main' }}>
                            {fullName.split(' ').map(n => n[0]).join('')}
                        </Avatar>
                        <IconButton
                            sx={{
                            position: 'absolute',
                            bottom: 5,
                            right: 5,
                            bgcolor: 'primary.main',
                            color: '#000',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                            '&:hover': { bgcolor: 'primary.dark' },
                            }}
                        >
                            <CameraIcon fontSize="small" />
                        </IconButton>
                    </Box>
                    <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="body2" sx={{ fontWeight: 700, mb: 1 }}>Upload a new photo</Typography>
                        <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>JPG, GIF or PNG. Max size of 2MB.</Typography>
                    </Box>

                    <Stack direction="row" spacing={2} sx={{ width: '100%', mt: 2 }}>
                        <Button
                            fullWidth
                            variant="outlined"
                            sx={{ borderRadius: 3, fontWeight: 800, py: 1.5, textTransform: 'none', border: '1px solid rgba(0,0,0,0.1)', color: 'text.primary' }}
                        >
                            Reset
                        </Button>
                        <Button
                            fullWidth
                            variant="contained"
                            sx={{ borderRadius: 3, fontWeight: 800, py: 1.5, textTransform: 'none', bgcolor: 'primary.main', color: '#000', boxShadow: 'none', '&:hover': { bgcolor: 'primary.dark', boxShadow: 'none' } }}
                        >
                            Save Changes
                        </Button>
                    </Stack>
                  </Stack>

                  <Alert 
                    severity="info" 
                    icon={<InfoIcon />}
                    sx={{ mt: 6, borderRadius: 3, bgcolor: alpha('#3B82F6', 0.05), border: '1px solid ' + alpha('#3B82F6', 0.1), '& .MuiAlert-message': { fontWeight: 600, color: '#1e40af' } }}
                  >
                    To change your security settings or verified identity, please visit the Security tab.
                  </Alert>
                </Box>
              </Box>
            </motion.div>
          )}

          {activeTab === 1 && <Securitysettings />}
          {activeTab === 2 && <Preference />}
          {activeTab === 3 && <ReferEarn />}
          {activeTab === 4 && <Others />}
        </CardContent>
      </Card>
    </Box>
  );
};

export default Profile;
