import React from 'react';
import { Box, Container, Typography, Grid, Link as MuiLink, IconButton, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailIcon from '@mui/icons-material/Email';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const Footer = () => {
  return (
    <Box
      sx={{
        bgcolor: '#1A1F2B',
        color: 'white',
        pt: 8,
        pb: 4,
        mt: 'auto',
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '4px',
          background: 'linear-gradient(90deg, #00B5AD 0%, #4CAF50 100%)'
        }
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={6}>
          <Grid item xs={12} md={4}>
            <Box sx={{ mb: 4 }}>
              <Typography 
                variant="h5" 
                sx={{ 
                  fontWeight: 'bold',
                  background: 'linear-gradient(90deg, #00B5AD 0%, #4CAF50 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  mb: 2
                }}
              >
                دكتور أونلاين
              </Typography>
              <Typography variant="body1" sx={{ color: '#B4B6C1', mb: 3, lineHeight: 1.8 }}>
                منصتك الطبية الموثوقة للرعاية الصحية عن بعد. نقدم خدمات طبية متكاملة بجودة عالية وأسعار مناسبة.
              </Typography>
              <Box sx={{ 
                display: 'flex', 
                gap: 1,
                '& .MuiIconButton-root': {
                  bgcolor: 'rgba(255,255,255,0.05)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    bgcolor: '#00B5AD',
                    transform: 'translateY(-3px)'
                  }
                }
              }}>
                <IconButton color="inherit" aria-label="Facebook">
                  <FacebookIcon />
                </IconButton>
                <IconButton color="inherit" aria-label="Twitter">
                  <TwitterIcon />
                </IconButton>
                <IconButton color="inherit" aria-label="Instagram">
                  <InstagramIcon />
                </IconButton>
                <IconButton color="inherit" aria-label="LinkedIn">
                  <LinkedInIcon />
                </IconButton>
              </Box>
            </Box>
          </Grid>
          
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" gutterBottom sx={{ 
              fontWeight: 'bold',
              color: '#fff',
              mb: 3
            }}>
              روابط سريعة
            </Typography>
            {['التخصصات الطبية', 'الأطباء المميزون', 'حجز موعد', 'من نحن', 'اتصل بنا'].map((text, index) => (
              <MuiLink 
                key={index}
                href="#" 
                color="inherit" 
                sx={{ 
                  display: 'flex',
                  alignItems: 'center',
                  textDecoration: 'none',
                  mb: 2,
                  transition: 'all 0.3s ease',
                  color: '#B4B6C1',
                  '&:hover': { 
                    color: '#00B5AD',
                    transform: 'translateX(-8px)'
                  },
                  '&::before': {
                    content: '"›"',
                    marginLeft: '8px',
                    fontSize: '20px',
                    opacity: 0.5
                  }
                }}
              >
                {text}
              </MuiLink>
            ))}
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" gutterBottom sx={{ 
              fontWeight: 'bold',
              color: '#fff',
              mb: 3
            }}>
              تواصل معنا
            </Typography>
            <Box sx={{ 
              '& > div': { 
                display: 'flex',
                alignItems: 'center',
                mb: 2,
                color: '#B4B6C1',
                '& svg': { 
                  mr: 2,
                  color: '#00B5AD'
                }
              }
            }}>
              <Box>
                <EmailIcon />
                <Typography variant="body2">
                  info@doctor-online.mr
                </Typography>
              </Box>
              <Box>
                <LocalPhoneIcon />
                <Typography variant="body2">
                  +222 45 25 25 25
                </Typography>
              </Box>
              <Box>
                <AccessTimeIcon />
                <Typography variant="body2">
                  متاح 24/7
                </Typography>
              </Box>
              <Box>
                <LocationOnIcon />
                <Typography variant="body2">
                  نواكشوط، موريتانيا
                </Typography>
              </Box>
            </Box>
            <Button 
              component={Link}
              to="/appointments"
              variant="contained"
              fullWidth
              sx={{
                mt: 2,
                bgcolor: '#00B5AD',
                color: 'white',
                borderRadius: '8px',
                py: 1.5,
                '&:hover': {
                  bgcolor: '#009690'
                }
              }}
            >
              احجز استشارة الآن
            </Button>
          </Grid>
        </Grid>

        <Box 
          sx={{ 
            borderTop: '1px solid rgba(255,255,255,0.1)',
            mt: 6,
            pt: 4,
            textAlign: 'center'
          }}
        >
          <Typography variant="body2" sx={{ color: '#B4B6C1' }}>
            © {new Date().getFullYear()} دكتور أونلاين. جميع الحقوق محفوظة
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
