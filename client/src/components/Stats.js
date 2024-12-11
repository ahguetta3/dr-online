import React from 'react';
import { Box, Container, Grid, Typography } from '@mui/material';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import PeopleIcon from '@mui/icons-material/People';
import StarIcon from '@mui/icons-material/Star';
import BusinessIcon from '@mui/icons-material/Business';

const stats = [
  {
    icon: <LocalHospitalIcon sx={{ fontSize: 40, color: '#00B5AD' }} />,
    count: '1500+',
    label: 'طبيب متخصص'
  },
  {
    icon: <PeopleIcon sx={{ fontSize: 40, color: '#00B5AD' }} />,
    count: '50,000+',
    label: 'مريض سعيد'
  },
  {
    icon: <StarIcon sx={{ fontSize: 40, color: '#00B5AD' }} />,
    count: '4.8',
    label: 'تقييم المرضى'
  },
  {
    icon: <BusinessIcon sx={{ fontSize: 40, color: '#00B5AD' }} />,
    count: '100+',
    label: 'مركز طبي'
  }
];

const Stats = () => {
  return (
    <Box 
      sx={{ 
        py: 8,
        backgroundColor: '#00B5AD',
        color: 'white',
        backgroundImage: 'linear-gradient(45deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0) 100%)'
      }}
    >
      <Container>
        <Grid container spacing={4}>
          {stats.map((stat, index) => (
            <Grid item xs={6} md={3} key={index}>
              <Box
                sx={{
                  textAlign: 'center',
                  p: 2,
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    transition: 'transform 0.3s ease'
                  }
                }}
              >
                {stat.icon}
                <Typography
                  variant="h3"
                  sx={{
                    my: 2,
                    fontWeight: 'bold',
                    fontSize: { xs: '2rem', md: '2.5rem' }
                  }}
                >
                  {stat.count}
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    fontSize: { xs: '1rem', md: '1.25rem' },
                    opacity: 0.9
                  }}
                >
                  {stat.label}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Stats;
