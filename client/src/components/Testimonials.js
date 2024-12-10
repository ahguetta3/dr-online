import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, Card, Avatar, Rating, Fade } from '@mui/material';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';

// استيراد الصور
import user1 from '../assets/images/users/user1.jpg';
import user2 from '../assets/images/users/user2.jpg';
import user3 from '../assets/images/users/user3.jpg';
import user4 from '../assets/images/users/user4.jpg';

const testimonials = [
  {
    name: "محمد عبدالله",
    rating: 5,
    comment: "خدمة ممتازة وسريعة، الأطباء محترفون جداً وودودون. الموقع سهل الاستخدام والحجز تم بسلاسة تامة. أنصح بشدة!",
    image: user1,
    date: "قبل 3 أيام",
    specialty: "طب الأسنان"
  },
  {
    name: "سارة أحمد",
    rating: 5,
    comment: "تجربة رائعة! سهولة في الحجز ومتابعة ممتازة من الطاقم الطبي. الدكتور كان متفهم جداً وشرح كل شيء بوضوح.",
    image: user2,
    date: "قبل أسبوع",
    specialty: "طب الأطفال"
  },
  {
    name: "أحمد محمود",
    rating: 4,
    comment: "منصة متميزة تسهل الوصول للأطباء المتخصصين. الأسعار معقولة والخدمة تستحق كل ريال. شكراً لكم!",
    image: user3,
    date: "قبل أسبوعين",
    specialty: "طب العيون"
  },
  {
    name: "نورة السعيد",
    rating: 5,
    comment: "أفضل منصة طبية جربتها! الأطباء متخصصون والمواعيد دقيقة. التطبيق سهل الاستخدام والدعم الفني متعاون جداً.",
    image: user4,
    date: "قبل 5 أيام",
    specialty: "طب النساء والتوليد"
  }
];

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [fadeIn, setFadeIn] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFadeIn(false);
      setTimeout(() => {
        setActiveIndex((current) => (current + 1) % testimonials.length);
        setFadeIn(true);
      }, 500);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const activeTestimonial = testimonials[activeIndex];

  return (
    <Box 
      sx={{ 
        py: 8,
        backgroundColor: '#f8f9fa',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h4"
          component="h2"
          align="center"
          gutterBottom
          sx={{
            fontWeight: 'bold',
            mb: 6,
            color: '#2D3142'
          }}
        >
          ماذا يقول عملاؤنا
        </Typography>
        
        <Fade in={fadeIn} timeout={500}>
          <Card
            sx={{
              maxWidth: '800px',
              margin: '0 auto',
              p: 4,
              borderRadius: '16px',
              boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
              position: 'relative',
              overflow: 'visible',
              background: 'linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
              }
            }}
          >
            <FormatQuoteIcon 
              sx={{ 
                position: 'absolute',
                top: -20,
                right: 30,
                fontSize: '80px',
                color: '#00B5AD',
                opacity: 0.1
              }}
            />
            
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <Avatar
                src={activeTestimonial.image}
                sx={{
                  width: 80,
                  height: 80,
                  border: '3px solid #fff',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                }}
              />
              <Box sx={{ ml: 2 }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 'bold',
                    color: '#2D3142',
                    mb: 0.5
                  }}
                >
                  {activeTestimonial.name}
                </Typography>
                <Typography
                  variant="subtitle2"
                  sx={{
                    color: '#00B5AD',
                    mb: 0.5
                  }}
                >
                  {activeTestimonial.specialty}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    color: '#666',
                    display: 'block'
                  }}
                >
                  {activeTestimonial.date}
                </Typography>
              </Box>
            </Box>

            <Rating
              value={activeTestimonial.rating}
              readOnly
              size="large"
              sx={{
                mb: 3,
                '& .MuiRating-iconFilled': {
                  color: '#FFB400'
                }
              }}
            />

            <Typography
              variant="body1"
              sx={{
                color: '#4F5665',
                lineHeight: 1.8,
                fontSize: '1.1rem',
                textAlign: 'justify',
                mb: 2
              }}
            >
              "{activeTestimonial.comment}"
            </Typography>
          </Card>
        </Fade>
        
        {/* نقاط التنقل */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 1.5,
            mt: 4
          }}
        >
          {testimonials.map((_, index) => (
            <Box
              key={index}
              onClick={() => {
                setFadeIn(false);
                setTimeout(() => {
                  setActiveIndex(index);
                  setFadeIn(true);
                }, 500);
              }}
              sx={{
                width: activeIndex === index ? 24 : 12,
                height: 12,
                borderRadius: 6,
                bgcolor: activeIndex === index ? '#00B5AD' : '#E5E5E5',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.1)',
                  bgcolor: activeIndex === index ? '#00B5AD' : '#CCCCCC'
                }
              }}
            />
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default Testimonials;
