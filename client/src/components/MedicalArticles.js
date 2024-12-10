import React from 'react';
import { Box, Container, Grid, Typography, Card, CardContent, CardMedia, Button } from '@mui/material';
import ArticleIcon from '@mui/icons-material/Article';

const articles = [
  {
    title: 'نصائح للحفاظ على صحة القلب',
    description: 'تعرف على أهم النصائح للحفاظ على صحة قلبك وتجنب أمراض القلب',
    image: '/images/posts/post1.webp',
    author: 'د. أحمد محمد',
    specialty: 'أخصائي أمراض القلب',
    publishDate: '2024-12-09'
  },
  {
    title: 'الغذاء الصحي والمناعة',
    description: 'كيف يمكن تقوية جهاز المناعة من خلال النظام الغذائي السليم',
    image: '/images/posts/post2.webp',
    author: 'د. سارة أحمد',
    specialty: 'أخصائية التغذية العلاجية',
    publishDate: '2024-12-08'
  },
  {
    title: 'أهمية النشاط البدني',
    description: 'فوائد ممارسة الرياضة وتأثيرها على الصحة العامة',
    image: '/images/posts/post3.webp',
    author: 'د. محمد علي',
    specialty: 'أخصائي الطب الرياضي',
    publishDate: '2024-12-07'
  }
];

const MedicalArticles = () => {
  return (
    <Box sx={{ py: 8, backgroundColor: '#f8fafb', direction: 'rtl' }}>
      <Container maxWidth="lg">
        <Box 
          sx={{ 
            display: 'flex', 
            flexDirection: 'column',
            alignItems: 'center', 
            textAlign: 'center',
            mb: 8 
          }}
        >
          <Box 
            sx={{ 
              display: 'inline-flex', 
              alignItems: 'center',
              backgroundColor: 'rgba(0,181,173,0.1)',
              borderRadius: '20px',
              padding: '8px 16px',
              mb: 2
            }}
          >
            <ArticleIcon sx={{ fontSize: 24, color: '#00B5AD', mr: 1 }} />
            <Typography
              variant="subtitle1"
              sx={{ 
                color: '#00B5AD',
                fontWeight: 'medium'
              }}
            >
              مقالات صحية
            </Typography>
          </Box>
          <Typography
            variant="h2"
            component="h1"
            sx={{ 
              fontWeight: 'bold', 
              color: '#2D3142',
              mb: 2
            }}
          >
            استكشف أحدث المقالات الطبية
          </Typography>
          <Typography
            variant="h5"
            sx={{ 
              color: '#666',
              maxWidth: '600px',
              mb: 4
            }}
          >
            اكتشف أحدث المقالات الطبية والنصائح الصحية من خبراء موثوقين، واحصل على معلومات قيمة حول الصحة العامة والغذاء الصحي والنشاط البدني.
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {articles.map((article, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'all 0.3s ease',
                  border: '1px solid #eee',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
                    '& .MuiButton-root': {
                      color: '#007f79'
                    }
                  }
                }}
              >
                <CardMedia
                  component="img"
                  height="240"
                  image={article.image}
                  alt={article.title}
                  sx={{ 
                    objectFit: 'cover'
                  }}
                />
                <CardContent sx={{ flexGrow: 1, p: 3 }}>
                  <Typography 
                    variant="h6" 
                    gutterBottom 
                    sx={{ 
                      fontWeight: 'bold',
                      fontSize: '1.2rem',
                      mb: 2,
                      minHeight: '3rem',
                      lineHeight: 1.4
                    }}
                  >
                    {article.title}
                  </Typography>
                  <Typography 
                    color="text.secondary" 
                    paragraph 
                    sx={{ 
                      fontSize: '0.95rem',
                      mb: 3,
                      minHeight: '4.5rem',
                      lineHeight: 1.6
                    }}
                  >
                    {article.description}
                  </Typography>
                  <Box sx={{ 
                    display: 'flex', 
                    flexDirection: 'column',
                    gap: 1,
                    mb: 2,
                    pb: 2,
                    borderBottom: '1px solid #eee'
                  }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography
                        variant="subtitle2"
                        sx={{ 
                          color: '#00B5AD',
                          fontWeight: 'bold'
                        }}
                      >
                        {article.author}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ 
                          color: '#666',
                          fontSize: '0.85rem'
                        }}
                      >
                        {article.specialty}
                      </Typography>
                    </Box>
                    <Typography
                      variant="caption"
                      sx={{ 
                        color: '#666',
                        fontSize: '0.85rem'
                      }}
                    >
                      {new Date(article.publishDate).toLocaleDateString('ar-SA', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </Typography>
                  </Box>
                  <Button
                    variant="text"
                    sx={{ 
                      color: '#00B5AD',
                      fontWeight: 'medium',
                      fontSize: '0.95rem',
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        backgroundColor: 'rgba(0,181,173,0.05)'
                      }
                    }}
                    endIcon={<span style={{ marginRight: '8px' }}>←</span>}
                  >
                    اقرأ المزيد
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ textAlign: 'center', mt: 6 }}>
          <Button
            variant="contained"
            size="large"
            sx={{
              backgroundColor: '#00B5AD',
              padding: '12px 32px',
              fontSize: '1.1rem',
              fontWeight: 'medium',
              borderRadius: '8px',
              '&:hover': { 
                backgroundColor: '#009690',
                transform: 'translateY(-2px)',
                boxShadow: '0 6px 20px rgba(0,181,173,0.2)'
              },
              transition: 'all 0.2s ease',
              boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
              border: 'none',
              '&:focus': {
                boxShadow: '0 0 0 2px #00B5AD'
              }
            }}
          >
            عرض جميع المقالات
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default MedicalArticles;
