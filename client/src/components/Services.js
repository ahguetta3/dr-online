import React from 'react';
import { Box, Container, Grid, Typography, Paper } from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import VideocamIcon from '@mui/icons-material/Videocam';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';

const services = [
  {
    icon: <CalendarMonthIcon sx={{ fontSize: 40, color: '#00B5AD' }} />,
    title: 'حجز المواعيد',
    description: 'احجز موعدك مع أفضل الأطباء بكل سهولة'
  },
  {
    icon: <VideocamIcon sx={{ fontSize: 40, color: '#00B5AD' }} />,
    title: 'استشارة عن بعد',
    description: 'تواصل مع طبيبك مباشرة عبر مكالمة فيديو'
  },
  {
    icon: <MedicalServicesIcon sx={{ fontSize: 40, color: '#00B5AD' }} />,
    title: 'الملف الطبي',
    description: 'احفظ سجلك الطبي وتاريخك المرضي بشكل آمن'
  },
  {
    icon: <LocalHospitalIcon sx={{ fontSize: 40, color: '#00B5AD' }} />,
    title: 'الوصفات الطبية',
    description: 'احصل على وصفاتك الطبية إلكترونياً'
  }
];

const Services = () => {
  return (
    <Box sx={{ py: 8, backgroundColor: '#fff', direction: 'rtl' }}>
      <Container>
        <Typography
          variant="h4"
          component="h2"
          align="center"
          gutterBottom
          sx={{ fontWeight: 'bold', color: '#2D3142', mb: 6 }}
        >
          خدماتنا
        </Typography>

        <Grid container spacing={4}>
          {services.map((service, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  height: '100%',
                  textAlign: 'center',
                  transition: '0.3s',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
                  }
                }}
              >
                {service.icon}
                <Typography variant="h6" sx={{ my: 2, fontWeight: 'bold' }}>
                  {service.title}
                </Typography>
                <Typography color="text.secondary">
                  {service.description}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Services;
