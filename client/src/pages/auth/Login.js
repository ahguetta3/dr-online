import React, { useState } from 'react';
import {
  Container,
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  IconButton,
  InputAdornment,
  Alert,
  Link as MuiLink,
  Divider
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import axios from 'axios';

// تكوين الـ axios
axios.defaults.baseURL = 'https://dr-online.onrender.com';
axios.defaults.headers.post['Content-Type'] = 'application/json';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleGoogleLogin = async () => {
    try {
      console.log('Google login clicked');
    } catch (error) {
      setError('حدث خطأ أثناء تسجيل الدخول باستخدام Google');
    }
  };

  const handleFacebookLogin = async () => {
    try {
      console.log('Facebook login clicked');
    } catch (error) {
      setError('حدث خطأ أثناء تسجيل الدخول باستخدام Facebook');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      console.log('Attempting login with:', { email: formData.email, password: formData.password });
      
      const response = await axios.post('/api/auth/login', {
        email: formData.email,
        password: formData.password
      });
      
      console.log('Login response:', response.data);
      
      if (response.data.success) {
        // حفظ التوكن في localStorage
        localStorage.setItem('token', response.data.token);
        
        // حفظ بيانات المستخدم في localStorage
        localStorage.setItem('user', JSON.stringify(response.data.user));
        
        console.log('Login successful, redirecting...');
        
        // التوجيه إلى الصفحة الرئيسية
        navigate('/profile');
      }
    } catch (error) {
      console.error('Login error:', error.response?.data || error.message);
      setError(error.response?.data?.message || 'حدث خطأ في تسجيل الدخول');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 15,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          position: 'relative'
        }}
      >
        <Paper
          elevation={6}
          sx={{
            padding: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
            borderRadius: '16px',
            background: 'linear-gradient(to bottom, #ffffff, #f8f9fa)',
            position: 'relative',
            overflow: 'hidden',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '4px',
              background: 'linear-gradient(to right, #00B5AD, #009690)',
            },
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
          }}
        >
          <Box
            sx={{
              width: 50,
              height: 50,
              borderRadius: '50%',
              background: 'linear-gradient(45deg, #00B5AD, #009690)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              mb: 2,
              boxShadow: '0 2px 10px rgba(0, 181, 173, 0.2)'
            }}
          >
            <LockOutlinedIcon sx={{ color: 'white', fontSize: 28 }} />
          </Box>
          
          <Typography 
            component="h1" 
            variant="h5" 
            sx={{ 
              mb: 3,
              fontWeight: 600,
              background: 'linear-gradient(45deg, #00B5AD, #009690)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            تسجيل الدخول
          </Typography>

          {error && (
            <Alert 
              severity="error" 
              sx={{ 
                width: '100%', 
                mb: 2,
                borderRadius: '8px',
                '& .MuiAlert-icon': {
                  color: '#f44336'
                }
              }}
            >
              {error}
            </Alert>
          )}

          <Box sx={{ width: '100%', mb: 3 }}>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<GoogleIcon />}
              onClick={handleGoogleLogin}
              sx={{
                mb: 2,
                py: 1.2,
                color: '#DB4437',
                borderColor: '#DB4437',
                borderRadius: '8px',
                borderWidth: '1.5px',
                '&:hover': {
                  borderWidth: '1.5px',
                  borderColor: '#DB4437',
                  backgroundColor: 'rgba(219, 68, 55, 0.04)',
                  transform: 'translateY(-1px)',
                  boxShadow: '0 4px 12px rgba(219, 68, 55, 0.15)'
                },
                transition: 'all 0.3s ease'
              }}
            >
              تسجيل الدخول باستخدام Google
            </Button>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<FacebookIcon />}
              onClick={handleFacebookLogin}
              sx={{
                py: 1.2,
                color: '#4267B2',
                borderColor: '#4267B2',
                borderRadius: '8px',
                borderWidth: '1.5px',
                '&:hover': {
                  borderWidth: '1.5px',
                  borderColor: '#4267B2',
                  backgroundColor: 'rgba(66, 103, 178, 0.04)',
                  transform: 'translateY(-1px)',
                  boxShadow: '0 4px 12px rgba(66, 103, 178, 0.15)'
                },
                transition: 'all 0.3s ease'
              }}
            >
              تسجيل الدخول باستخدام Facebook
            </Button>
          </Box>

          <Divider 
            sx={{ 
              width: '100%', 
              mb: 3,
              '&::before, &::after': {
                borderColor: 'rgba(0, 0, 0, 0.1)'
              }
            }}
          >
            <Typography 
              variant="body2" 
              sx={{ 
                color: 'text.secondary',
                px: 2,
                py: 0.5,
                borderRadius: '4px',
                backgroundColor: 'rgba(0, 181, 173, 0.1)'
              }}
            >
              أو
            </Typography>
          </Divider>

          <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="البريد الإلكتروني"
              name="email"
              autoComplete="email"
              autoFocus
              value={formData.email}
              onChange={handleChange}
              sx={{
                mb: 2,
                '& .MuiOutlinedInput-root': {
                  borderRadius: '8px',
                  '&:hover fieldset': {
                    borderColor: '#00B5AD',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#00B5AD',
                  }
                }
              }}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="كلمة المرور"
              type={showPassword ? 'text' : 'password'}
              id="password"
              autoComplete="current-password"
              value={formData.password}
              onChange={handleChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                      sx={{ color: '#00B5AD' }}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                mb: 3,
                '& .MuiOutlinedInput-root': {
                  borderRadius: '8px',
                  '&:hover fieldset': {
                    borderColor: '#00B5AD',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#00B5AD',
                  }
                }
              }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
              sx={{
                py: 1.5,
                mb: 3,
                borderRadius: '8px',
                background: 'linear-gradient(45deg, #00B5AD, #009690)',
                boxShadow: '0 4px 12px rgba(0, 181, 173, 0.2)',
                '&:hover': {
                  background: 'linear-gradient(45deg, #009690, #008380)',
                  boxShadow: '0 6px 16px rgba(0, 181, 173, 0.3)',
                  transform: 'translateY(-1px)'
                },
                transition: 'all 0.3s ease'
              }}
            >
              {loading ? 'جاري تسجيل الدخول...' : 'تسجيل الدخول'}
            </Button>

            <Box 
              sx={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: 1
              }}
            >
              <MuiLink
                component={Link}
                to="/forgot-password"
                variant="body2"
                sx={{
                  color: '#00B5AD',
                  textDecoration: 'none',
                  '&:hover': {
                    textDecoration: 'underline'
                  }
                }}
              >
                نسيت كلمة المرور؟
              </MuiLink>
              <MuiLink
                component={Link}
                to="/register"
                variant="body2"
                sx={{
                  color: '#00B5AD',
                  textDecoration: 'none',
                  '&:hover': {
                    textDecoration: 'underline'
                  }
                }}
              >
                ليس لديك حساب؟ سجل الآن
              </MuiLink>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default Login;
