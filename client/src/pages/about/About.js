import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@mui/material';
import {
  CheckCircle as CheckCircleIcon,
  LocalHospital as LocalHospitalIcon,
  Group as GroupIcon,
  Security as SecurityIcon,
  Speed as SpeedIcon,
  Support as SupportIcon,
} from '@mui/icons-material';

const About = () => {
  const features = [
    {
      icon: <LocalHospitalIcon sx={{ color: '#00B5AD' }} />,
      title: 'خدمات طبية متكاملة',
      description: 'نقدم مجموعة واسعة من الخدمات الطبية عبر الإنترنت مع نخبة من أفضل الأطباء في موريتانيا'
    },
    {
      icon: <GroupIcon sx={{ color: '#00B5AD' }} />,
      title: 'فريق طبي متخصص',
      description: 'نضم أكثر من 100 طبيب متخصص في مختلف المجالات الطبية'
    },
    {
      icon: <SecurityIcon sx={{ color: '#00B5AD' }} />,
      title: 'خصوصية وأمان',
      description: 'نضمن خصوصية وسرية كاملة لجميع المعلومات الطبية والشخصية'
    },
    {
      icon: <SpeedIcon sx={{ color: '#00B5AD' }} />,
      title: 'سرعة الاستجابة',
      description: 'نوفر خدمة سريعة وفعالة مع إمكانية الحصول على استشارة طبية في نفس اليوم'
    },
    {
      icon: <SupportIcon sx={{ color: '#00B5AD' }} />,
      title: 'دعم متواصل',
      description: 'فريق دعم متاح على مدار الساعة للإجابة على استفساراتكم'
    }
  ];

  const statistics = [
    { number: '10,000+', label: 'مريض' },
    { number: '100+', label: 'طبيب' },
    { number: '15+', label: 'تخصص' },
    { number: '50,000+', label: 'استشارة' },
  ];

  return (
    <Box sx={{ mt: '80px' }}>
      {/* قسم الترحيب */}
      <Box
        sx={{
          bgcolor: '#f8fafa',
          py: 8,
          textAlign: 'center',
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h3"
            component="h1"
            gutterBottom
            sx={{
              fontWeight: 'bold',
              color: '#2D3142',
              mb: 3
            }}
          >
            مرحباً بكم في Dr.Online
          </Typography>
          <Typography
            variant="h5"
            color="text.secondary"
            sx={{ mb: 4, maxWidth: '800px', mx: 'auto' }}
          >
            منصتكم الطبية الرائدة في موريتانيا للاستشارات الطبية عن بعد
          </Typography>
        </Container>
      </Box>

      {/* قسم من نحن */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid container spacing={6}>
          <Grid item xs={12} md={6}>
            <Typography variant="h4" component="h2" gutterBottom sx={{ color: '#2D3142', mb: 3 }}>
              من نحن
            </Typography>
            <Typography paragraph color="text.secondary" sx={{ mb: 3 }}>
              Dr.Online هي منصة طبية رائدة في موريتانيا تهدف إلى تسهيل الوصول إلى الخدمات الطبية عالية الجودة لجميع المواطنين.
              نحن نربط المرضى بأفضل الأطباء المتخصصين في مختلف المجالات الطبية.
            </Typography>
            <Typography paragraph color="text.secondary">
              تأسست المنصة بهدف تقديم حلول طبية مبتكرة تجمع بين التكنولوجيا الحديثة والخبرة الطبية المتميزة،
              مما يتيح للمرضى الحصول على استشارات طبية عالية الجودة من منازلهم.
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              component="img"
              src="/images/about/about-image.jpg"
              alt="صورة توضيحية"
              sx={{
                width: '100%',
                height: 'auto',
                borderRadius: 2,
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
              }}
            />
          </Grid>
        </Grid>
      </Container>

      {/* قسم المميزات */}
      <Box sx={{ bgcolor: '#f8fafa', py: 8 }}>
        <Container maxWidth="lg">
          <Typography
            variant="h4"
            component="h2"
            align="center"
            gutterBottom
            sx={{ color: '#2D3142', mb: 6 }}
          >
            لماذا Dr.Online؟
          </Typography>
          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'transform 0.2s',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                    },
                  }}
                >
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                      {feature.icon}
                    </Box>
                    <Typography
                      variant="h6"
                      component="h3"
                      align="center"
                      gutterBottom
                      sx={{ color: '#2D3142' }}
                    >
                      {feature.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      align="center"
                    >
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* قسم الإحصائيات */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid container spacing={4} justifyContent="center">
          {statistics.map((stat, index) => (
            <Grid item xs={6} sm={3} key={index}>
              <Box
                sx={{
                  textAlign: 'center',
                  p: 2,
                  borderRadius: 2,
                  bgcolor: '#fff',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
                }}
              >
                <Typography
                  variant="h4"
                  component="div"
                  sx={{
                    fontWeight: 'bold',
                    color: '#00B5AD',
                    mb: 1
                  }}
                >
                  {stat.number}
                </Typography>
                <Typography
                  variant="body1"
                  color="text.secondary"
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

export default About;
