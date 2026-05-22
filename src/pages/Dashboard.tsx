import React from 'react';
import { Box, Stack } from '@mui/material';
import DashboardHeader from '../components/Dashboard/DashboardHeader';
import PriceChart from '../components/Dashboard/PriceChart';
import CoinCards from '../components/Dashboard/CoinCards';
import WorldChat from '../components/Dashboard/WorldChat';
import RightSidebar from '../components/Dashboard/RightSidebar';
import QuickActions from '../components/QuickActions';
import TrendingCryptos from '../components/TrendingCryptos';
import Banners from '../components/Banners';
import MarketOverview from '../components/MarketOverview';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { useCrypto } from '../contexts/CryptoContext';

const Dashboard: React.FC = () => {
  const { loading, error } = useCrypto();
  const [currentTab, setCurrentTab] = React.useState(0);

  if (loading) return <LoadingSpinner />;
  
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Box sx={{ 
        display: 'flex', 
        flexDirection: { xs: 'column', lg: 'row' }, 
        gap: 3 
      }}>
        {/* Main Content Area */}
        <Box sx={{ 
          flex: 1,
          width: '100%',
          minWidth: 0 // Prevents flex children from overflowing
        }}>
          <Stack spacing={3}>
            <DashboardHeader activeTab={currentTab} onTabChange={setCurrentTab} />
            
            {currentTab === 0 && (
              <>
                <Box sx={{ mb: 1 }}>
                    <PriceChart />
                </Box>
                
                <Box sx={{ mt: 2 }}>
                    <CoinCards />
                </Box>

                <Box sx={{ mt: 2 }}>
                    <Banners />
                </Box>
                <Box sx={{ 
                    display: 'flex', 
                    flexDirection: { xs: 'column', md: 'row' }, 
                    gap: 3, 
                    mt: 1,
                    width: { 
                        xs: '100%', 
                        lg: 'calc(100% + 360px + 24px)',
                        xl: 'calc(100% + 380px + 24px)'
                    },
                    zIndex: 10,
                    position: 'relative'
                }}>
                    <Box sx={{ flex: { md: 1 } }}>
                        <QuickActions />
                    </Box>
                    <Box sx={{ width: { md: '33.33%' } }}>
                        <TrendingCryptos />
                    </Box>
                </Box>
                <Box sx={{ 
                    width: { 
                        xs: '100%', 
                        lg: 'calc(100% + 360px + 24px)',
                        xl: 'calc(100% + 380px + 24px)'
                    },
                    zIndex: 10,
                    position: 'relative'
                }}>
                    <WorldChat />
                </Box>
              </>
            )}

            {currentTab === 1 && (
              <>
                <PriceChart />
                <CoinCards />
              </>
            )}

            {currentTab === 2 && (
              <Box sx={{ width: '100%' }}>
                <WorldChat />
              </Box>
            )}

            {currentTab === 3 && (
              <MarketOverview />
            )}
          </Stack>
        </Box>

        {/* Right Sidebar Area */}
        <Box sx={{ 
          width: { xs: '100%', lg: '360px', xl: '380px' },
          flexShrink: 0
        }}>
          <RightSidebar />
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;