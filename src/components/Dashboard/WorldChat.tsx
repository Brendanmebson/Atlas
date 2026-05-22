import React, { useState, useMemo } from 'react';
import { 
  Box, 
  Paper, 
  Typography, 
  Stack, 
  Avatar, 
  IconButton, 
  InputBase, 
  alpha,
  ToggleButton,
  ToggleButtonGroup,
  Collapse,
  Button
} from '@mui/material';
import { 
  Send as SendIcon, 
  Search as SearchIcon,
  FilterList as FilterIcon,
  KeyboardArrowDown as ExpandMoreIcon,
  KeyboardArrowUp as ExpandLessIcon,
  QuestionAnswer as ReplyIcon
} from '@mui/icons-material';

interface ChatMessage {
  id: number;
  user: string;
  handle: string;
  text: string;
  avatar: string;
  color: string;
  badge?: string;
  replies?: ChatMessage[];
}

const chatMessages: ChatMessage[] = [
  { 
    id: 1,
    user: 'Thomas', 
    handle: '5m ago', 
    text: "BNB looks extremely bullish here. Thinking about increasing my position. Anyone else watching the 48k resistance?",
    avatar: 'T',
    color: '#00ffa3',
    badge: 'Pro Trader',
    replies: [
        {
            id: 101,
            user: 'Sarah_K',
            handle: '4m ago',
            text: "Testing the 48k level right now! If we close the 4h candle above, it's a clear signal.",
            avatar: 'S',
            color: '#E91E63',
            badge: 'Verified'
        },
        {
            id: 102,
            user: 'Alex_Dev',
            handle: '2m ago',
            text: "Volume seems a bit thin on the breakout attempt though. Be careful of a fakeout.",
            avatar: 'A',
            color: '#9945FF'
        }
    ]
  },
  { 
    id: 2,
    user: 'Master Cat', 
    handle: '12m ago', 
    text: "Patience is key. The market always rewards the disciplined. HODL tight! 🚀 The psychological aspect of trading is often underestimated. Most people fail not because of their lack of technical knowledge but because they can't control their emotions. Fear and greed are the two primary drivers that lead to poor decision making. When the market is pumping, greed takes over and people FOMO in at the top. When it's dumping, fear takes over and people panic sell at the bottom. The winner is the one who can remain neutral and stick to their plan regardless of the market sentiment.",
    avatar: 'M',
    color: '#F7931A',
    badge: 'Whale'
  },
  { 
    id: 3,
    user: 'DeepPocket', 
    handle: '25m ago', 
    text: "Large BTC inflow to exchanges. This is a very interesting development given the current macro environment. Historically, large inflows have preceded short-term corrections as whales position themselves to take profits. However, we also need to consider the institutional buy side which has been absorbing these sales rather effectively over the last few weeks. I'm keeping an eye on the whale-to-exchange ratio. If it remains high, I'll be looking for a potential entry point around the 62k support level. What are your thoughts on use of cold storage vs exchange liquidity right now?",
    avatar: 'D',
    color: '#FF5722',
    badge: 'Whale',
    replies: [
        {
            id: 301,
            user: 'Thomas',
            handle: '10m ago',
            text: "I think institutional players are moving to self-custody more than ever. Exchange reserves are at multi-year lows.",
            avatar: 'T',
            color: '#00ffa3'
        }
    ]
  },
  { 
    id: 4,
    user: 'CryptoQueen', 
    handle: '35m ago', 
    text: "Just used the new swap feature, so smooth! Fees are much lower than expected.",
    avatar: 'Q',
    color: '#627EEA',
    badge: 'Verified'
  },
  { 
    id: 5,
    user: 'Alex_Dev', 
    handle: '45m ago', 
    text: "Does anyone know when the next mainnet upgrade for SOL is? Seeing some conflicting reports.",
    avatar: 'A',
    color: '#9945FF',
    badge: 'Pro Trader'
  },
  { 
    id: 6,
    user: 'Jane_Crypto', 
    handle: '1h ago', 
    text: "Can someone explain the difference between optimistic and ZK rollups in simple terms? I've been reading a lot about scaling solutions lately but the technical jargon is a bit overwhelming for beginners.",
    avatar: 'J',
    color: '#FFC107',
    badge: 'Verified',
    replies: [
        {
            id: 601,
            user: 'Alex_Dev',
            handle: '45m ago',
            text: "Optimistic rollups assume transactions are valid by default and only run a check if someone challenges them (fraud proofs). ZK (Zero-Knowledge) rollups use complex math to prove transactions are valid before they even get posted to the main chain (validity proofs). Optimistic is easier to build, ZK is more secure/fast for withdrawals.",
            avatar: 'A',
            color: '#9945FF'
        }
    ]
  }
];

const WorldChat: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('All');
  const [expandedThreads, setExpandedThreads] = useState<Record<number, boolean>>({});

  const toggleThread = (id: number) => {
    setExpandedThreads(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredMessages = useMemo(() => {
    return chatMessages.filter(msg => {
      const matchesSearch = msg.user.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           msg.text.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFilter = filter === 'All' || (msg.badge && msg.badge.includes(filter));
      return matchesSearch && matchesFilter;
    });
  }, [searchQuery, filter]);

  return (
    <Paper sx={{ p: 2, borderRadius: 2, boxShadow: '0 4px 16px rgba(0,0,0,0.04)', bgcolor: '#fff9f5' }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 800 }}>
          World Chat
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box sx={{ 
                bgcolor: 'white', 
                borderRadius: 1.5, 
                px: 1, 
                py: 0.5,
                display: 'flex',
                alignItems: 'center',
                border: '1px solid rgba(0,0,0,0.05)',
                width: { xs: '120px', sm: '200px' }
            }}>
                <SearchIcon sx={{ color: 'text.secondary', fontSize: 18, mr: 0.5 }} />
                <InputBase 
                    placeholder="Search chat..." 
                    fullWidth 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    sx={{ fontSize: '0.75rem' }}
                />
            </Box>
        </Box>
      </Stack>

      <ToggleButtonGroup
        value={filter}
        exclusive
        onChange={(_e, v) => v && setFilter(v)}
        size="small"
        sx={{ 
            mb: 2, 
            width: '100%', 
            '& .MuiToggleButton-root': { 
                flex: 1, 
                fontSize: '0.65rem', 
                fontWeight: 700, 
                border: 'none',
                borderRadius: 1.5,
                mx: 0.2,
                color: 'text.secondary',
                '&.Mui-selected': {
                    bgcolor: 'primary.main',
                    color: 'white',
                    '&:hover': { bgcolor: 'primary.dark' }
                }
            }
        }}
      >
        <ToggleButton value="All">All</ToggleButton>
        <ToggleButton value="Pro Trader">Traders</ToggleButton>
        <ToggleButton value="Whale">Whales</ToggleButton>
        <ToggleButton value="Verified">Verified</ToggleButton>
      </ToggleButtonGroup>

      <Box sx={{ 
          height: 480, 
          overflowY: 'auto', 
          pr: 1,
          '&::-webkit-scrollbar': { width: '4px' },
          '&::-webkit-scrollbar-thumb': { bgcolor: alpha('#000', 0.05), borderRadius: '4px' },
          '&::-webkit-scrollbar-track': { bgcolor: 'transparent' }
      }}>
        <Stack spacing={3}>
            {filteredMessages.length > 0 ? (
                filteredMessages.map((msg) => (
                    <Box key={msg.id}>
                        <Stack direction="row" spacing={1.2} alignItems="center" sx={{ mb: 1 }}>
                        <Avatar sx={{ 
                            width: 32, 
                            height: 32, 
                            bgcolor: msg.color || 'primary.main', 
                            fontSize: 12,
                            fontWeight: 800,
                            boxShadow: `0 2px 8px ${alpha(msg.color || '#00ffa3', 0.3)}`
                        }}>
                            {msg.avatar}
                        </Avatar>
                        <Box sx={{ flexGrow: 1 }}>
                            <Stack direction="row" alignItems="center" spacing={1}>
                            <Typography variant="subtitle2" sx={{ fontWeight: 800, fontSize: '0.85rem' }}>{msg.user}</Typography>
                            {msg.badge && (
                                <Box sx={{ 
                                px: 0.8, 
                                py: 0.2, 
                                bgcolor: alpha(msg.color || '#00ffa3', 0.1), 
                                borderRadius: 1,
                                border: `1px solid ${alpha(msg.color || '#00ffa3', 0.2)}`
                                }}>
                                <Typography variant="caption" sx={{ color: msg.color || 'primary.main', fontWeight: 700, fontSize: '0.6rem' }}>
                                    {msg.badge}
                                </Typography>
                                </Box>
                            )}
                            <Typography variant="caption" color="text.secondary" sx={{ ml: 'auto' }}>{msg.handle}</Typography>
                            </Stack>
                        </Box>
                        </Stack>
                        
                        <Paper sx={{ 
                        p: 1.5, 
                        borderRadius: '0 12px 12px 12px', 
                        boxShadow: 'none', 
                        bgcolor: 'white',
                        border: '1px solid rgba(0,0,0,0.03)'
                        }}>
                        <Typography variant="body2" color="text.primary" sx={{ lineHeight: 1.5, fontSize: '0.85rem', fontWeight: 500 }}>
                            {msg.text}
                        </Typography>
                        </Paper>

                        {/* Reply Controls */}
                        {msg.replies && msg.replies.length > 0 && (
                            <Box sx={{ mt: 1, ml: 4 }}>
                                <Button 
                                    size="small" 
                                    onClick={() => toggleThread(msg.id)}
                                    startIcon={expandedThreads[msg.id] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                                    sx={{ 
                                        textTransform: 'none', 
                                        fontSize: '0.75rem', 
                                        fontWeight: 700,
                                        color: 'primary.main',
                                        '&:hover': { bgcolor: alpha(msg.color || '#00ffa3', 0.05) }
                                    }}
                                >
                                    {expandedThreads[msg.id] ? 'Hide Replies' : `View ${msg.replies.length} Replies`}
                                </Button>
                                
                                <Collapse in={expandedThreads[msg.id]}>
                                    <Stack spacing={2} sx={{ mt: 2, borderLeft: '2px solid', borderColor: alpha(msg.color || '#00ffa3', 0.2), pl: 2 }}>
                                        {msg.replies.map((reply) => (
                                            <Box key={reply.id}>
                                                <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 0.5 }}>
                                                    <Avatar sx={{ width: 24, height: 24, bgcolor: reply.color || 'grey.500', fontSize: 10 }}>{reply.avatar}</Avatar>
                                                    <Typography variant="caption" sx={{ fontWeight: 800 }}>{reply.user}</Typography>
                                                    <Typography variant="caption" color="text.secondary">{reply.handle}</Typography>
                                                </Stack>
                                                <Paper sx={{ p: 1, borderRadius: '0 8px 8px 8px', bgcolor: alpha(msg.color || '#00ffa3', 0.02), border: '1px solid rgba(0,0,0,0.02)', boxShadow: 'none' }}>
                                                    <Typography variant="caption" sx={{ fontSize: '0.75rem', fontWeight: 500 }}>{reply.text}</Typography>
                                                </Paper>
                                            </Box>
                                        ))}
                                    </Stack>
                                </Collapse>
                            </Box>
                        )}
                    </Box>
                ))
            ) : (
                <Box sx={{ mt: 10, textAlign: 'center', opacity: 0.5 }}>
                    <Typography variant="body2">No messages found</Typography>
                </Box>
            )}
        </Stack>
      </Box>

      <Box sx={{ 
        mt: 2, 
        bgcolor: 'white', 
        borderRadius: 2, 
        p: '4px 4px 4px 12px', 
        display: 'flex', 
        alignItems: 'center',
        boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
        border: '1px solid rgba(0,0,0,0.05)'
      }}>
        <InputBase 
          placeholder="Type a message..." 
          fullWidth 
          sx={{ fontSize: '0.85rem' }}
        />
        <IconButton sx={{ bgcolor: 'primary.main', color: 'white', borderRadius: 1.5, p: 1, '&:hover': { bgcolor: 'primary.dark' } }}>
          <SendIcon sx={{ fontSize: 16 }} />
        </IconButton>
      </Box>
    </Paper>
  );
};

export default WorldChat;

