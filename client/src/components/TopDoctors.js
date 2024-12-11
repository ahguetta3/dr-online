import React from 'react';
import { Box, Container, Typography, Grid, Card, CardContent, CardMedia, Rating, Button } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import doctor1 from '../assets/images/specialties/doctor1.webp';
import doctor2 from '../assets/images/specialties/doctor2.webp';
import doctor3 from '../assets/images/specialties/doctor3.webp';
import doctor4 from '../assets/images/specialties/doctor4.webp';

const doctors = [
  {
    name: 'د. أحمد محمد',
    specialty: 'طب القلب',
    image: doctor1,
    rating: 4.8,
    location: 'نواكشوط الغربية',
    availability: 'متاح اليوم'
  },
  {
    name: 'د. أشرف أحمد',
    specialty: 'طب الأطفال',
    image: doctor2,
    rating: 4.9,
    location: 'نواكشوط الشمالية',
    availability: 'متاح غداً'
  },
  {
    name: 'د. محمد علي',
    specialty: 'الأمراض الجلدية',
    image: doctor3,
    rating: 4.7,
    location: 'نواذيبو',
    availability: 'متاح اليوم'
  },
  {
    name: 'د. ابراهيم خالد',
    specialty: 'النساء والتوليد',
    image: doctor4,
    rating: 4.9,
    location: 'روصو',
    availability: 'متاح اليوم'
  }
];

const TopDoctors = () => {
  return (
    <Box sx={{ py: 8, backgroundColor: '#F8FAFB' }}>
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
          نخبة من أفضل الأطباء
        </Typography>

        <Grid container spacing={4}>
          {doctors.map((doctor, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'all 0.3s ease',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  border: '1px solid rgba(0,0,0,0.08)',
                  backgroundColor: '#fff',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.02)',
                  '&:hover': {
                    transform: 'translateY(-10px)',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                    '& .MuiCardMedia-root': {
                      transform: 'scale(1.05)',
                    }
                  }
                }}
              >
                <CardMedia
                  component="img"
                  sx={{
                    height: 300,
                    objectFit: 'cover',
                    borderRadius: '8px 8px 0 0',
                    filter: 'contrast(1.05) brightness(1.05)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      filter: 'contrast(1.1) brightness(1.1)',
                    }
                  }}
                  image={doctor.image}
                  alt={doctor.name}
                />
                <CardContent sx={{ 
                  flexGrow: 1,
                  backgroundColor: '#fff',
                  borderRadius: '0 0 8px 8px',
                  padding: '24px',
                  '& > *': {
                    marginBottom: '12px'
                  }
                }}>
                  <Typography 
                    variant="h6" 
                    component="h3" 
                    gutterBottom
                    sx={{
                      fontWeight: 'bold',
                      fontSize: '1.2rem',
                      color: '#2D3142'
                    }}
                  >
                    {doctor.name}
                  </Typography>
                  <Typography 
                    variant="body2" 
                    color="text.secondary" 
                    gutterBottom
                    sx={{
                      fontSize: '0.95rem',
                      color: '#00B5AD'
                    }}
                  >
                    {doctor.specialty}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, direction: 'ltr', justifyContent: 'flex-end' }}>
                    <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                      {doctor.rating}
                    </Typography>
                    <Rating 
                      value={doctor.rating} 
                      precision={0.1} 
                      readOnly 
                      size="small"
                      sx={{
                        color: '#FFB400',
                        '& .MuiRating-iconFilled': {
                          color: '#FFB400',
                        },
                        '& .MuiRating-iconEmpty': {
                          color: '#FFB400',
                          opacity: 0.3
                        }
                      }}
                    />
                  </Box>
                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    mb: 2,
                    gap: 1
                  }}>
                    <LocationOnIcon sx={{ fontSize: 18, color: '#666' }} />
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        color: '#666',
                        fontSize: '0.9rem'
                      }}
                    >
                      {doctor.location}
                    </Typography>
                  </Box>
                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    mb: 3,
                    gap: 1
                  }}>
                    <AccessTimeIcon sx={{ fontSize: 18, color: '#4CAF50' }} />
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        color: '#4CAF50',
                        fontSize: '0.9rem',
                        fontWeight: 500
                      }}
                    >
                      {doctor.availability}
                    </Typography>
                  </Box>
                  <Button
                    variant="contained"
                    fullWidth
                    sx={{
                      backgroundColor: '#00B5AD',
                      padding: '10px',
                      fontSize: '0.95rem',
                      fontWeight: 500,
                      borderRadius: '6px',
                      textTransform: 'none',
                      boxShadow: 'none',
                      '&:hover': { 
                        backgroundColor: '#009690',
                        boxShadow: '0 4px 8px rgba(0,181,173,0.2)'
                      }
                    }}
                  >
                    احجز موعد
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default TopDoctors;
