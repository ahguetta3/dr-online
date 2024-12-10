import React from 'react';
import { Box, Container, Typography, Grid, Card, CardContent, CardMedia } from '@mui/material';

const specialties = [
  {
    title: 'طب القلب',
    image: '/images/specialties/cardiology.svg',
    count: '45 طبيب',
    color: '#FF6B6B'
  },
  {
    title: 'طب الأطفال',
    image: '/images/specialties/pediatrics.svg',
    count: '38 طبيب',
    color: '#4ECDC4'
  },
  {
    title: 'الأمراض الجلدية',
    image: '/images/specialties/dermatology.svg',
    count: '29 طبيب',
    color: '#45B7D1'
  },
  {
    title: 'طب الأسرة',
    image: '/images/specialties/family-medicine.svg',
    count: '52 طبيب',
    color: '#96CEB4'
  },
  {
    title: 'النساء والتوليد',
    image: '/images/specialties/obstetrics.svg',
    count: '33 طبيب',
    color: '#D4A5A5'
  },
  {
    title: 'الطب الباطني',
    image: '/images/specialties/internal-medicine.svg',
    count: '41 طبيب',
    color: '#9B89B3'
  }
];

const Specialties = () => {
  return (
    <Box sx={{ py: 8, backgroundColor: '#fff' }}>
      <Container>
        <Typography
          variant="h4"
          component="h2"
          align="center"
          gutterBottom
          sx={{
            fontWeight: 'bold',
            color: '#2D3142',
            mb: 6,
            position: 'relative',
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: -16,
              left: '50%',
              transform: 'translateX(-50%)',
              width: '80px',
              height: '4px',
              backgroundColor: '#00B5AD',
              borderRadius: '2px'
            }
          }}
        >
          التخصصات الطبية
        </Typography>

        <Grid container spacing={4}>
          {specialties.map((specialty, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: '0.3s',
                  cursor: 'pointer',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  border: '1px solid #eee',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                    '& .specialty-icon': {
                      transform: 'scale(1.1) rotate(5deg)',
                    }
                  }
                }}
              >
                <Box
                  sx={{
                    background: `linear-gradient(45deg, ${specialty.color}22 0%, ${specialty.color}11 100%)`,
                    p: 4,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: '200px'
                  }}
                >
                  <CardMedia
                    component="img"
                    sx={{
                      width: '100px',
                      height: '100px',
                      transition: 'transform 0.3s ease',
                      filter: `drop-shadow(0 4px 8px ${specialty.color}66)`,
                      className: 'specialty-icon'
                    }}
                    image={specialty.image}
                    alt={specialty.title}
                  />
                </Box>
                <CardContent sx={{ 
                  textAlign: 'center', 
                  flexGrow: 1,
                  bgcolor: '#fff',
                  p: 3
                }}>
                  <Typography 
                    variant="h6" 
                    component="h3" 
                    gutterBottom
                    sx={{
                      fontWeight: 'bold',
                      color: specialty.color
                    }}
                  >
                    {specialty.title}
                  </Typography>
                  <Typography 
                    variant="body2" 
                    sx={{
                      color: 'text.secondary',
                      fontSize: '0.95rem'
                    }}
                  >
                    {specialty.count}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Specialties;
