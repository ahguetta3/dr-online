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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stepper,
  Step,
  StepLabel,
  Divider
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import axios from 'axios';

// تكوين الـ axios
axios.defaults.baseURL = 'https://dr-online.onrender.com';
axios.defaults.headers.post['Content-Type'] = 'application/json';

const Register = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'user',
    // حقول إضافية للطبيب
    specialization: '',
    licenseNumber: '',
    experience: '',
    consultationFee: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const steps = ['المعلومات الأساسية', 'معلومات إضافية'];

  const handleGoogleRegister = async () => {
    try {
      console.log('Google registration clicked');
    } catch (error) {
      setError('حدث خطأ أثناء التسجيل باستخدام Google');
    }
  };

  const handleFacebookRegister = async () => {
    try {
      console.log('Facebook registration clicked');
    } catch (error) {
      setError('حدث خطأ أثناء التسجيل باستخدام Facebook');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError('');
  };

  const validateStep = () => {
    if (activeStep === 0) {
      if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
        setError('جميع الحقول مطلوبة');
        return false;
      }

      // التحقق من الاسم
      if (formData.name.length < 3) {
        setError('الاسم يجب أن يكون 3 أحرف على الأقل');
        return false;
      }

      // تنظيف كلمات المرور من المسافات
      const password = formData.password.trim();
      const confirmPassword = formData.confirmPassword.trim();
      
      if (password !== confirmPassword) {
        setError('كلمات المرور غير متطابقة');
        return false;
      }

      if (password.length < 8) {
        setError('كلمة المرور يجب أن تكون 8 أحرف على الأقل');
        return false;
      }

      // التحقق من تعقيد كلمة المرور
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      if (!passwordRegex.test(password)) {
        setError('كلمة المرور يجب أن تحتوي على حروف كبيرة وصغيرة وأرقام ورموز خاصة');
        return false;
      }

      // التحقق من تنسيق البريد الإلكتروني
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        setError('البريد الإلكتروني غير صالح');
        return false;
      }
    }

    if (activeStep === 1 && formData.role === 'doctor') {
      if (!formData.specialization || !formData.licenseNumber || !formData.experience || !formData.consultationFee) {
        setError('جميع الحقول مطلوبة للأطباء');
        return false;
      }

      // التحقق من رقم الترخيص
      if (formData.licenseNumber.length < 5) {
        setError('رقم الترخيص غير صالح');
        return false;
      }

      // التحقق من سنوات الخبرة
      const experience = parseInt(formData.experience);
      if (isNaN(experience) || experience < 0) {
        setError('يرجى إدخال عدد سنوات خبرة صالح');
        return false;
      }

      // التحقق من رسوم الاستشارة
      const fee = parseFloat(formData.consultationFee);
      if (isNaN(fee) || fee <= 0) {
        setError('يرجى إدخال رسوم استشارة صالحة');
        return false;
      }
    }
    return true;
  };

  const handleNext = () => {
    if (validateStep()) {
      setActiveStep((prevStep) => prevStep + 1);
      setError('');
    }
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const response = await axios.post('/api/auth/register', {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role,
        ...(formData.role === 'doctor' && {
          specialization: formData.specialization,
          licenseNumber: formData.licenseNumber,
          experience: formData.experience,
          consultationFee: formData.consultationFee
        })
      });

      if (response.data.success) {
        setSuccess('تم إنشاء الحساب بنجاح! سيتم توجيهك إلى صفحة تسجيل الدخول...');
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      }
    } catch (error) {
      setError(
        error.response?.data?.message ||
        'حدث خطأ أثناء إنشاء الحساب. يرجى التحقق من المعلومات المدخلة والمحاولة مرة أخرى.'
      );
    } finally {
      setLoading(false);
    }
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <>
            <TextField
              margin="normal"
              required
              fullWidth
              id="fullName"
              label="الاسم الكامل"
              name="name"
              autoComplete="name"
              value={formData.name}
              onChange={handleChange}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '8px',
                  '& fieldset': {
                    borderColor: '#e0e0e0'
                  },
                  '&:hover fieldset': {
                    borderColor: '#00B5AD'
                  }
                }
              }}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="البريد الإلكتروني"
              name="email"
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '8px',
                  '& fieldset': {
                    borderColor: '#e0e0e0'
                  },
                  '&:hover fieldset': {
                    borderColor: '#00B5AD'
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
              autoComplete="new-password"
              value={formData.password}
              onChange={handleChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '8px',
                  '& fieldset': {
                    borderColor: '#e0e0e0'
                  },
                  '&:hover fieldset': {
                    borderColor: '#00B5AD'
                  }
                }
              }}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="تأكيد كلمة المرور"
              type={showPassword ? 'text' : 'password'}
              id="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '8px',
                  '& fieldset': {
                    borderColor: '#e0e0e0'
                  },
                  '&:hover fieldset': {
                    borderColor: '#00B5AD'
                  }
                }
              }}
            />

            <FormControl 
              fullWidth 
              margin="normal"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '8px',
                  '& fieldset': {
                    borderColor: '#e0e0e0'
                  },
                  '&:hover fieldset': {
                    borderColor: '#00B5AD'
                  }
                }
              }}
            >
              <InputLabel>نوع الحساب</InputLabel>
              <Select
                value={formData.role}
                label="نوع الحساب"
                onChange={handleChange}
              >
                <MenuItem value="user">مريض</MenuItem>
                <MenuItem value="doctor">طبيب</MenuItem>
              </Select>
            </FormControl>
          </>
        );
      case 1:
        if (formData.role === 'doctor') {
          return (
            <>
              <TextField
                margin="normal"
                required
                fullWidth
                name="specialization"
                label="التخصص"
                type="text"
                id="specialization"
                value={formData.specialization}
                onChange={handleChange}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '8px',
                    '& fieldset': {
                      borderColor: '#e0e0e0'
                    },
                    '&:hover fieldset': {
                      borderColor: '#00B5AD'
                    }
                  }
                }}
              />

              <TextField
                margin="normal"
                required
                fullWidth
                name="licenseNumber"
                label="رقم الترخيص"
                type="text"
                id="licenseNumber"
                value={formData.licenseNumber}
                onChange={handleChange}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '8px',
                    '& fieldset': {
                      borderColor: '#e0e0e0'
                    },
                    '&:hover fieldset': {
                      borderColor: '#00B5AD'
                    }
                  }
                }}
              />

              <TextField
                margin="normal"
                required
                fullWidth
                name="experience"
                label="سنوات الخبرة"
                type="number"
                id="experience"
                value={formData.experience}
                onChange={handleChange}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '8px',
                    '& fieldset': {
                      borderColor: '#e0e0e0'
                    },
                    '&:hover fieldset': {
                      borderColor: '#00B5AD'
                    }
                  }
                }}
              />

              <TextField
                margin="normal"
                required
                fullWidth
                name="consultationFee"
                label="رسوم الاستشارة"
                type="number"
                id="consultationFee"
                value={formData.consultationFee}
                onChange={handleChange}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '8px',
                    '& fieldset': {
                      borderColor: '#e0e0e0'
                    },
                    '&:hover fieldset': {
                      borderColor: '#00B5AD'
                    }
                  }
                }}
              />
            </>
          );
        }
        return null;
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 15,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
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
            borderRadius: '16px'
          }}
        >
          {error && (
            <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
              {error}
            </Alert>
          )}
          {success && (
            <Alert severity="success" sx={{ width: '100%', mb: 2 }}>
              {success}
            </Alert>
          )}
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: '50%',
              backgroundColor: '#00B5AD',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              mb: 2
            }}
          >
            <PersonAddOutlinedIcon sx={{ color: 'white', fontSize: 24 }} />
          </Box>
          
          <Typography 
            component="h1" 
            variant="h5" 
            sx={{ 
              mb: 3,
              fontWeight: 500,
              color: '#00B5AD'
            }}
          >
            إنشاء حساب جديد
          </Typography>

          <Box sx={{ width: '100%', mb: 2 }}>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<GoogleIcon />}
              onClick={handleGoogleRegister}
              sx={{
                mb: 1.5,
                py: 1,
                color: '#DB4437',
                borderColor: '#e0e0e0',
                backgroundColor: '#fff',
                borderRadius: '8px',
                textTransform: 'none',
                '&:hover': {
                  borderColor: '#DB4437',
                  backgroundColor: '#fff'
                }
              }}
            >
              التسجيل باستخدام GOOGLE
            </Button>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<FacebookIcon />}
              onClick={handleFacebookRegister}
              sx={{
                py: 1,
                color: '#4267B2',
                borderColor: '#e0e0e0',
                backgroundColor: '#fff',
                borderRadius: '8px',
                textTransform: 'none',
                '&:hover': {
                  borderColor: '#4267B2',
                  backgroundColor: '#fff'
                }
              }}
            >
              التسجيل باستخدام FACEBOOK
            </Button>
          </Box>

          <Divider 
            sx={{ 
              width: '100%', 
              mb: 2,
              '&::before, &::after': {
                borderColor: '#e0e0e0'
              }
            }}
          >
            <Typography 
              variant="body2" 
              sx={{ 
                color: '#757575',
                px: 1
              }}
            >
              أو
            </Typography>
          </Divider>

          <Box sx={{ width: '100%', mb: 2 }}>
            <Stepper 
              activeStep={activeStep} 
              alternativeLabel
              sx={{
                '& .MuiStepLabel-root .Mui-completed': {
                  color: '#00B5AD',
                },
                '& .MuiStepLabel-root .Mui-active': {
                  color: '#00B5AD',
                },
                '& .MuiStepLabel-label': {
                  fontSize: '0.875rem',
                  color: '#757575'
                },
                '& .MuiStepLabel-label.Mui-active': {
                  color: '#00B5AD'
                }
              }}
            >
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </Box>

          <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
            {renderStepContent(activeStep)}

            <Box 
              sx={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                mt: 3,
                mb: 2
              }}
            >
              <Button
                onClick={handleBack}
                disabled={activeStep === 0}
                sx={{
                  color: '#00B5AD',
                  '&:hover': {
                    backgroundColor: 'rgba(0, 181, 173, 0.04)'
                  }
                }}
              >
                السابق
              </Button>
              {activeStep === steps.length - 1 ? (
                <Button
                  type="submit"
                  variant="contained"
                  disabled={loading}
                  sx={{
                    py: 1,
                    px: 4,
                    backgroundColor: '#00B5AD',
                    borderRadius: '8px',
                    '&:hover': {
                      backgroundColor: '#009690'
                    }
                  }}
                >
                  {loading ? 'جاري إنشاء الحساب...' : 'إنشاء الحساب'}
                </Button>
              ) : (
                <Button
                  onClick={handleNext}
                  variant="contained"
                  sx={{
                    py: 1,
                    px: 4,
                    backgroundColor: '#00B5AD',
                    borderRadius: '8px',
                    '&:hover': {
                      backgroundColor: '#009690'
                    }
                  }}
                >
                  التالي
                </Button>
              )}
            </Box>

            <Box sx={{ textAlign: 'center', mt: 1 }}>
              <MuiLink
                component={Link}
                to="/login"
                variant="body2"
                sx={{
                  color: '#00B5AD',
                  textDecoration: 'none',
                  '&:hover': {
                    textDecoration: 'underline'
                  }
                }}
              >
                لديك حساب بالفعل؟ سجل دخولك
              </MuiLink>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default Register;
