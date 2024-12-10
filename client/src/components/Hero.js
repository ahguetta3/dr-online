import React from 'react';
import { Box, Container, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import playStore from '../assets/images/play-store.webp';
import appStore from '../assets/images/app-store.webp';
import huaweiStore from '../assets/images/huawie-store.webp';

const Hero = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        position: 'relative',
        minHeight: '90vh',
        display: 'flex',
        alignItems: 'center',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: 'url(/images/hero-doctor.webp)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.3,
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(45deg, rgba(0,181,173,0.05) 0%, rgba(248,250,251,0.8) 100%)',
          zIndex: 1,
        },
      }}
    >
      <Container sx={{ position: 'relative', zIndex: 2, direction: 'rtl' }}>
        <Box sx={{ maxWidth: '600px' }}>
          <Typography 
            variant="h2" 
            component="h1" 
            gutterBottom 
            sx={{ 
              fontWeight: 'bold', 
              color: '#2D3142',
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              lineHeight: 1.2,
              mb: 3
            }}
          >
            منصتك الطبية المتكاملة
          </Typography>
          
          <Typography 
            variant="h5" 
            sx={{ 
              mb: 4, 
              color: '#666',
              fontSize: { xs: '1.2rem', md: '1.5rem' },
              lineHeight: 1.6
            }}
          >
            احجز موعدك مع أفضل الأطباء واحصل على استشارة طبية عن بعد
          </Typography>

          <Box sx={{ display: 'flex', gap: 2, mb: 6 }}>
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate('/appointments')}
              sx={{
                backgroundColor: '#00B5AD',
                padding: '12px 30px',
                fontSize: '1.1rem',
                '&:hover': { backgroundColor: '#009690' }
              }}
            >
              احجز موعد
            </Button>
            <Button
              variant="outlined"
              size="large"
              sx={{
                borderColor: '#00B5AD',
                color: '#00B5AD',
                padding: '12px 30px',
                fontSize: '1.1rem',
                '&:hover': { 
                  borderColor: '#009690', 
                  color: '#009690',
                  backgroundColor: 'rgba(0,181,173,0.05)'
                }
              }}
            >
              استشارة فورية
            </Button>
          </Box>

          <Box sx={{ 
            display: 'flex', 
            gap: 3,
            flexWrap: 'wrap'
          }}>
            <img 
              src={playStore} 
              alt="Google Play" 
              style={{ 
                height: '45px', 
                cursor: 'pointer',
                transition: '0.3s',
                '&:hover': {
                  transform: 'translateY(-3px)'
                }
              }} 
            />
            <img 
              src={appStore} 
              alt="App Store" 
              style={{ 
                height: '45px', 
                cursor: 'pointer',
                transition: '0.3s',
                '&:hover': {
                  transform: 'translateY(-3px)'
                }
              }} 
            />
            <img 
              src={huaweiStore} 
              alt="Huawei Store" 
              style={{ 
                height: '45px', 
                cursor: 'pointer',
                transition: '0.3s',
                '&:hover': {
                  transform: 'translateY(-3px)'
                }
              }} 
            />
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Hero;
