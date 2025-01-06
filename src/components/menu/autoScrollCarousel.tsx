import { useState, useEffect } from 'react';
import { Box, IconButton, Typography, useTheme, useMediaQuery } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';

const offers = [
  { 
    id: 1, 
    name: 'Happy Hour 20% OFF on All Drinks 5-7PM',
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&h=200&q=80'
  },
  { 
    id: 2, 
    name: 'Business Lunch Set Menu 2500₸',
    image: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&w=600&h=200&q=80'
  },
  { 
    id: 3, 
    name: 'Weekend Special: Free Dessert with Main Course',
    image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=600&h=200&q=80'
  },
  { 
    id: 4, 
    name: 'Family Sunday: Kids Eat Free',
    image: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=600&h=200&q=80'
  }
];

const SpecialOffers = () => {
  const [currentOffer, setCurrentOffer] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentOffer((prev) => (prev + 1) % offers.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const nextOffer = () => {
    setCurrentOffer((prev) => (prev + 1) % offers.length);
  };

  const prevOffer = () => {
    setCurrentOffer((prev) => (prev - 1 + offers.length) % offers.length);
  };

  return (
    <Box
      sx={{
        // position: 'relative',
        bgcolor: 'grey.900',
        borderRadius: 2,
        overflow: 'hidden',
        mb: 2,
        height: isMobile ? 150 : 200
      }}
    >
      <Box
        sx={{
          position: 'relative',
          height: '100%',
          '& img': {
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: 0.5
          }
        }}
      >
        <img 
          src={offers[currentOffer].image} 
          alt={offers[currentOffer].name}
        />
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            px: 2
          }}
        >
          <IconButton 
            onClick={prevOffer}
            sx={{ color: 'white', '&:hover': { color: 'cyan' } }}
          >
            <ChevronLeft />
          </IconButton>
          <Typography
            variant={isMobile ? "body1" : "h6"}
            sx={{
              color: 'white',
              textAlign: 'center',
              px: 2,
              fontWeight: 500,
              maxWidth: '80%'
            }}
          >
            {offers[currentOffer].name}
          </Typography>
          <IconButton 
            onClick={nextOffer}
            sx={{ color: 'white', '&:hover': { color: 'cyan' } }}
          >
            <ChevronRight />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
}

export default SpecialOffers;
