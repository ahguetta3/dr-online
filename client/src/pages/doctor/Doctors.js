import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Rating,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Avatar,
  IconButton,
  InputAdornment,
} from '@mui/material';
import {
  Search as SearchIcon,
  LocationOn as LocationIcon,
  Star as StarIcon,
  AccessTime as AccessTimeIcon,
  MonetizationOn as MonetizationOnIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Doctors = () => {
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [city, setCity] = useState('');
  const [rating, setRating] = useState('');
  const [loading, setLoading] = useState(true);

  // قائمة المدن الموريتانية
  const cities = [
    'نواكشوط',
    'نواذيبو',
    'روصو',
    'كيفة',
    'كيهيدي',
    'سيلبابي',
    'عيون العتروس',
    'أطار',
    'تجكجة',
  ];

  // قائمة التخصصات الطبية
  const specialties = [
    'طب عام',
    'طب الأطفال',
    'طب النساء والتوليد',
    'طب القلب',
    'طب العيون',
    'طب الأسنان',
    'الطب النفسي',
    'جراحة عامة',
    'طب العظام',
    'الأمراض الجلدية',
  ];

  // قائمة المناطق الموريتانية
  const regions = [
    'نواكشوط الغربية',
    'نواكشوط الشمالية',
    'نواكشوط الجنوبية',
    'داخلت نواذيبو',
    'تيرس زمور',
    'إنشيري',
    'آدرار',
    'تكانت',
    'كوركول',
    'لبراكنة',
    'الترارزة',
    'الحوض الغربي',
    'الحوض الشرقي',
    'لعصابة',
  ];

  // محاكاة جلب بيانات الأطباء
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        // هنا سيتم استبدال هذا بطلب API حقيقي
        const mockDoctors = [
          {
            id: 1,
            name: 'د. محمد أحمد',
            specialty: 'طب عام',
            city: 'نواكشوط',
            rating: 4.8,
            experience: 15,
            price: 500,
            image: '/images/doctors/doctor1.jpg',
            availableSlots: ['اليوم 14:00', 'اليوم 16:30', 'غداً 10:00'],
            isOnline: true,
            consultations: 1200,
          },
          {
            id: 2,
            name: 'د. فاطمة محمود',
            specialty: 'طب الأطفال',
            city: 'نواذيبو',
            rating: 4.9,
            experience: 12,
            price: 600,
            image: '/images/doctors/doctor2.jpg',
            availableSlots: ['اليوم 15:00', 'غداً 11:30', 'غداً 14:00'],
            isOnline: false,
            consultations: 850,
          },
          {
            id: 3,
            name: 'د. عبد الله محمد',
            specialty: 'طب القلب',
            city: 'نواكشوط',
            rating: 4.7,
            experience: 20,
            price: 800,
            image: '/images/doctors/doctor3.jpg',
            availableSlots: ['اليوم 17:00', 'غداً 09:00', 'غداً 13:00'],
            isOnline: true,
            consultations: 2100,
          },
          {
            id: 4,
            name: 'د. زينب أحمد',
            specialty: 'طب النساء والتوليد',
            city: 'كيفة',
            rating: 4.9,
            experience: 10,
            price: 700,
            image: '/images/doctors/doctor4.jpg',
            availableSlots: ['اليوم 13:00', 'اليوم 18:30', 'غداً 11:00'],
            isOnline: true,
            consultations: 950,
          },
          {
            id: 5,
            name: 'د. يوسف عمر',
            specialty: 'طب العيون',
            city: 'روصو',
            rating: 4.6,
            experience: 8,
            price: 550,
            image: '/images/doctors/doctor5.jpg',
            availableSlots: ['غداً 10:30', 'غداً 15:00'],
            isOnline: false,
            consultations: 620,
          },
          {
            id: 6,
            name: 'د. مريم سالم',
            specialty: 'طب الأسنان',
            city: 'نواكشوط',
            rating: 4.8,
            experience: 14,
            price: 650,
            image: '/images/doctors/doctor6.jpg',
            availableSlots: ['اليوم 14:30', 'غداً 09:30', 'غداً 16:00'],
            isOnline: true,
            consultations: 1500,
          }
        ];
        setDoctors(mockDoctors);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching doctors:', error);
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  // تصفية الأطباء حسب معايير البحث
  const filteredDoctors = doctors.filter((doctor) => {
    return (
      doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (specialty === '' || doctor.specialty === specialty) &&
      (city === '' || doctor.city === city) &&
      (rating === '' || doctor.rating >= rating)
    );
  });

  return (
    <Box sx={{ mt: '80px' }}>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* قسم البحث والفلترة */}
        <Box sx={{ mb: 4 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={3}>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="ابحث عن طبيب..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <FormControl fullWidth>
                <InputLabel>التخصص</InputLabel>
                <Select
                  value={specialty}
                  label="التخصص"
                  onChange={(e) => setSpecialty(e.target.value)}
                >
                  <MenuItem value="">الكل</MenuItem>
                  {specialties.map((spec) => (
                    <MenuItem key={spec} value={spec}>
                      {spec}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={3}>
              <FormControl fullWidth>
                <InputLabel>المدينة</InputLabel>
                <Select
                  value={city}
                  label="المدينة"
                  onChange={(e) => setCity(e.target.value)}
                >
                  <MenuItem value="">الكل</MenuItem>
                  {cities.map((cityName) => (
                    <MenuItem key={cityName} value={cityName}>
                      {cityName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={3}>
              <FormControl fullWidth>
                <InputLabel>التقييم</InputLabel>
                <Select
                  value={rating}
                  label="التقييم"
                  onChange={(e) => setRating(e.target.value)}
                >
                  <MenuItem value="">الكل</MenuItem>
                  <MenuItem value={4}>4+ نجوم</MenuItem>
                  <MenuItem value={4.5}>4.5+ نجوم</MenuItem>
                  <MenuItem value={4.8}>4.8+ نجوم</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Box>

        {/* عرض قائمة الأطباء */}
        <Grid container spacing={2}>
          {filteredDoctors.map((doctor) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={doctor.id}>
              <Card 
                sx={{ 
                  height: '100%', 
                  display: 'flex', 
                  flexDirection: 'column',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                  }
                }}
              >
                <CardMedia
                  component="div"
                  sx={{
                    pt: '56.25%',
                    position: 'relative',
                    bgcolor: 'grey.200',
                  }}
                >
                  <Avatar
                    src={doctor.image}
                    sx={{
                      width: 100,
                      height: 100,
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      border: '4px solid white',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                    }}
                  />
                </CardMedia>
                <CardContent sx={{ flexGrow: 1, textAlign: 'center', p: 2 }}>
                  <Box sx={{ position: 'relative', mb: 1 }}>
                    <Typography 
                      variant="h6" 
                      component="h2" 
                      gutterBottom
                      sx={{ 
                        fontSize: '1rem',
                        fontWeight: 'bold',
                        mb: 0.5
                      }}
                    >
                      {doctor.name}
                    </Typography>
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 0.5,
                      }}
                    >
                      <Box
                        sx={{
                          width: 8,
                          height: 8,
                          borderRadius: '50%',
                          bgcolor: doctor.isOnline ? '#4CAF50' : '#757575',
                        }}
                      />
                      <Typography 
                        variant="caption" 
                        color="textSecondary"
                        sx={{ fontSize: '0.7rem' }}
                      >
                        {doctor.isOnline ? 'متصل الآن' : 'غير متصل'}
                      </Typography>
                    </Box>
                  </Box>
                  <Typography 
                    color="textSecondary" 
                    sx={{ 
                      fontSize: '0.9rem',
                      mb: 1 
                    }}
                  >
                    {doctor.specialty}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1 }}>
                    <LocationIcon sx={{ mr: 0.5, color: 'grey.500', fontSize: '1rem' }} />
                    <Typography variant="body2" color="textSecondary" sx={{ fontSize: '0.8rem' }}>
                      {doctor.city}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1 }}>
                    <Rating value={doctor.rating} precision={0.1} readOnly size="small" />
                    <Typography variant="body2" color="textSecondary" sx={{ ml: 1, fontSize: '0.8rem' }}>
                      ({doctor.rating})
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1 }}>
                    <AccessTimeIcon sx={{ mr: 0.5, color: 'grey.500', fontSize: '1rem' }} />
                    <Typography variant="body2" color="textSecondary" sx={{ mr: 1, fontSize: '0.8rem' }}>
                      {doctor.experience} سنوات
                    </Typography>
                    <MonetizationOnIcon sx={{ mr: 0.5, color: 'grey.500', fontSize: '1rem' }} />
                    <Typography variant="body2" color="textSecondary" sx={{ fontSize: '0.8rem' }}>
                      {doctor.price} أوقية
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="textSecondary" sx={{ mb: 1, fontSize: '0.8rem' }}>
                    {doctor.consultations} استشارة
                  </Typography>
                  <Box sx={{ mb: 1 }}>
                    {doctor.availableSlots.slice(0, 2).map((slot, index) => (
                      <Chip
                        key={index}
                        label={slot}
                        size="small"
                        sx={{ 
                          m: 0.2,
                          fontSize: '0.7rem',
                          height: '24px'
                        }}
                        onClick={() => navigate(`/appointments?doctor=${doctor.id}&slot=${slot}`)}
                      />
                    ))}
                  </Box>
                  <Button
                    variant="contained"
                    fullWidth
                    size="small"
                    sx={{
                      bgcolor: '#00B5AD',
                      fontSize: '0.8rem',
                      py: 0.5,
                      '&:hover': { bgcolor: '#009690' },
                    }}
                    onClick={() => navigate(`/appointments?doctor=${doctor.id}`)}
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

export default Doctors;
