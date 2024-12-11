import React, { useState } from 'react';
import {
  Container,
  Grid,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  Box,
  Snackbar,
  Alert,
  Divider,
} from '@mui/material';
import {
  Phone,
  Email,
  LocationOn,
  WhatsApp,
  Facebook,
  Instagram,
  Twitter,
} from '@mui/icons-material';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // هنا يمكن إضافة منطق إرسال البيانات إلى الخادم
    setSnackbar({
      open: true,
      message: 'تم إرسال رسالتك بنجاح! سنتواصل معك قريباً',
      severity: 'success',
    });
    setFormData({
      name: '',
      email: '',
      phone: '',
      message: '',
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const contactInfo = [
    {
      icon: <Phone sx={{ fontSize: 40, color: '#00B5AD' }} />,
      title: 'اتصل بنا',
      details: ['+222 32563959'],
    },
    {
      icon: <WhatsApp sx={{ fontSize: 40, color: '#00B5AD' }} />,
      title: 'واتساب',
      details: ['+222 32563959'],
      action: {
        link: 'https://wa.me/22232563959',
        text: 'تواصل معنا على واتساب'
      }
    },
    {
      icon: <Email sx={{ fontSize: 40, color: '#00B5AD' }} />,
      title: 'البريد الإلكتروني',
      details: ['info@dronline.mr'],
    },
    {
      icon: <LocationOn sx={{ fontSize: 40, color: '#00B5AD' }} />,
      title: 'العنوان',
      details: ['نواكشوط، موريتانيا'],
    },
  ];

  const socialMedia = [
    { icon: <Facebook />, name: 'Facebook', link: 'https://facebook.com' },
    { icon: <Instagram />, name: 'Instagram', link: 'https://instagram.com' },
    { icon: <Twitter />, name: 'Twitter', link: 'https://twitter.com' },
  ];

  const mapStyles = {
    height: "100%",
    width: "100%",
  };

  const defaultCenter = {
    lat: 18.079033, // إحداثيات نواكشوط
    lng: -15.965334
  };

  const mapOptions = {
    streetViewControl: false,
    mapTypeControl: false,
    styles: [
      {
        featureType: "all",
        elementType: "labels.text.fill",
        stylers: [{ color: "#7c93a3" }]
      },
      {
        featureType: "administrative.country",
        elementType: "geometry",
        stylers: [{ visibility: "on" }]
      },
      {
        featureType: "landscape",
        elementType: "geometry.fill",
        stylers: [{ color: "#f5f5f5" }]
      }
    ]
  };

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Typography
        variant="h3"
        component="h1"
        align="center"
        gutterBottom
        sx={{ mb: 6, fontWeight: 'bold', color: '#333' }}
      >
        اتصل بنا
      </Typography>

      {/* معلومات الاتصال */}
      <Grid container spacing={4} sx={{ mb: 8 }}>
        {contactInfo.map((info, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card 
              elevation={0}
              sx={{
                height: '100%',
                textAlign: 'center',
                backgroundColor: 'transparent',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  transition: 'transform 0.3s ease-in-out',
                }
              }}
            >
              <CardContent>
                <Box sx={{ mb: 2 }}>{info.icon}</Box>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                  {info.title}
                </Typography>
                {info.details.map((detail, idx) => (
                  <Typography key={idx} color="text.secondary">
                    {detail}
                  </Typography>
                ))}
                {info.action && (
                  <Button
                    variant="contained"
                    href={info.action.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      mt: 2,
                      backgroundColor: '#25D366',
                      '&:hover': {
                        backgroundColor: '#128C7E',
                      },
                    }}
                    startIcon={<WhatsApp />}
                  >
                    {info.action.text}
                  </Button>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={6}>
        {/* نموذج الاتصال */}
        <Grid item xs={12} md={7}>
          <Card elevation={3}>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h5" gutterBottom sx={{ mb: 4, fontWeight: 'bold' }}>
                أرسل لنا رسالة
              </Typography>
              <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="الاسم"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="رقم الهاتف"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="البريد الإلكتروني"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="رسالتك"
                      name="message"
                      multiline
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      size="large"
                      fullWidth
                      sx={{
                        mt: 2,
                        backgroundColor: '#00B5AD',
                        '&:hover': {
                          backgroundColor: '#009B94',
                        },
                      }}
                    >
                      إرسال الرسالة
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </CardContent>
          </Card>
        </Grid>

        {/* خريطة جوجل */}
        <Grid item xs={12} md={5}>
          <Card elevation={3} sx={{ height: '100%', minHeight: 400 }}>
            <CardContent sx={{ p: 4, height: '100%' }}>
              <Typography variant="h5" gutterBottom sx={{ mb: 4, fontWeight: 'bold' }}>
                موقعنا
              </Typography>
              <Box sx={{ height: 'calc(100% - 60px)', width: '100%' }}>
                <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
                  <GoogleMap
                    mapContainerStyle={mapStyles}
                    zoom={15}
                    center={defaultCenter}
                    options={mapOptions}
                  >
                    <Marker
                      position={defaultCenter}
                      title="موقعنا"
                    />
                  </GoogleMap>
                </LoadScript>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* وسائل التواصل الاجتماعي */}
      <Box sx={{ mt: 8, textAlign: 'center' }}>
        <Divider sx={{ mb: 4 }} />
        <Typography variant="h6" gutterBottom>
          تابعنا على وسائل التواصل الاجتماعي
        </Typography>
        <Box sx={{ mt: 2 }}>
          {socialMedia.map((social, index) => (
            <Button
              key={index}
              href={social.link}
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                mx: 1,
                color: '#00B5AD',
                '&:hover': {
                  color: '#009B94',
                },
              }}
            >
              {social.icon}
            </Button>
          ))}
        </Box>
      </Box>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Contact;
