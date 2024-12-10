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
import { MuiTelInput } from 'mui-tel-input';
import axios from 'axios';

const Register = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    role: 'user',
    // حقول إضافية للطبيب
    specialization: '',
    licenseNumber: '',
    experience: '',
    consultationFee: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const countries = [
    { code: 'MR', name: 'موريتانيا', phoneCode: '+222' },
    { code: 'SA', name: 'السعودية', phoneCode: '+966' },
    { code: 'AE', name: 'الإمارات', phoneCode: '+971' },
    { code: 'KW', name: 'الكويت', phoneCode: '+965' },
    { code: 'BH', name: 'البحرين', phoneCode: '+973' },
    { code: 'QA', name: 'قطر', phoneCode: '+974' },
    { code: 'OM', name: 'عمان', phoneCode: '+968' },
    { code: 'EG', name: 'مصر', phoneCode: '+20' },
    { code: 'DZ', name: 'الجزائر', phoneCode: '+213' },
    { code: 'IQ', name: 'العراق', phoneCode: '+964' },
    { code: 'JO', name: 'الأردن', phoneCode: '+962' },
    { code: 'LB', name: 'لبنان', phoneCode: '+961' },
    { code: 'LY', name: 'ليبيا', phoneCode: '+218' },
    { code: 'MA', name: 'المغرب', phoneCode: '+212' },
    { code: 'PS', name: 'فلسطين', phoneCode: '+970' },
    { code: 'SD', name: 'السودان', phoneCode: '+249' },
    { code: 'SY', name: 'سوريا', phoneCode: '+963' },
    { code: 'TN', name: 'تونس', phoneCode: '+216' },
    { code: 'YE', name: 'اليمن', phoneCode: '+967' },
    { code: 'AF', name: 'أفغانستان', phoneCode: '+93' },
    { code: 'TR', name: 'تركيا', phoneCode: '+90' },
    { code: 'IR', name: 'إيران', phoneCode: '+98' },
    { code: 'PK', name: 'باكستان', phoneCode: '+92' },
    { code: 'BD', name: 'بنغلاديش', phoneCode: '+880' },
    { code: 'MY', name: 'ماليزيا', phoneCode: '+60' },
    { code: 'ID', name: 'إندونيسيا', phoneCode: '+62' },
    { code: 'US', name: 'الولايات المتحدة', phoneCode: '+1' },
    { code: 'GB', name: 'المملكة المتحدة', phoneCode: '+44' },
    { code: 'FR', name: 'فرنسا', phoneCode: '+33' },
    { code: 'DE', name: 'ألمانيا', phoneCode: '+49' },
    { code: 'IT', name: 'إيطاليا', phoneCode: '+39' },
    { code: 'ES', name: 'إسبانيا', phoneCode: '+34' },
    { code: 'AU', name: 'أستراليا', phoneCode: '+61' },
    { code: 'BR', name: 'البرازيل', phoneCode: '+55' },
    { code: 'RU', name: 'روسيا', phoneCode: '+7' },
    { code: 'IN', name: 'الهند', phoneCode: '+91' },
    { code: 'CN', name: 'الصين', phoneCode: '+86' },
    { code: 'JP', name: 'اليابان', phoneCode: '+81' },
    { code: 'KR', name: 'كوريا الجنوبية', phoneCode: '+82' },
    { code: 'ZA', name: 'جنوب أفريقيا', phoneCode: '+27' },
    { code: 'NG', name: 'نيجيريا', phoneCode: '+234' },
    { code: 'ET', name: 'إثيوبيا', phoneCode: '+251' },
    { code: 'KE', name: 'كينيا', phoneCode: '+254' },
    { code: 'TZ', name: 'تنزانيا', phoneCode: '+255' },
    { code: 'UG', name: 'أوغندا', phoneCode: '+256' },
    { code: 'GH', name: 'غانا', phoneCode: '+233' },
    { code: 'CM', name: 'الكاميرون', phoneCode: '+237' },
    { code: 'CI', name: 'ساحل العاج', phoneCode: '+225' },
    { code: 'SN', name: 'السنغال', phoneCode: '+221' },
    { code: 'ML', name: 'مالي', phoneCode: '+223' },
    { code: 'NE', name: 'النيجر', phoneCode: '+227' }
  ].sort((a, b) => a.name.localeCompare(b.name, 'ar'));

  const [selectedCountry, setSelectedCountry] = useState(countries[0]);

  const steps = ['المعلومات الأساسية', 'معلومات إضافية'];

  const handleGoogleRegister = async () => {
    try {
      // هنا سيتم إضافة منطق التسجيل باستخدام Google
      console.log('Google registration clicked');
    } catch (error) {
      setError('حدث خطأ أثناء التسجيل باستخدام Google');
    }
  };

  const handleFacebookRegister = async () => {
    try {
      // هنا سيتم إضافة منطق التسجيل باستخدام Facebook
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

  const handlePhoneChange = (value, info) => {
    let cleanPhone = value.replace(/[^\d+]/g, '');
    if (!cleanPhone.startsWith('+')) {
      cleanPhone = '+' + cleanPhone;
    }
    setFormData(prev => ({ ...prev, phoneNumber: cleanPhone }));
    setError('');
  };

  const validateStep = () => {
    if (activeStep === 0) {
      if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword || !formData.phoneNumber) {
        setError('جميع الحقول مطلوبة');
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

      // التحقق من تنسيق البريد الإلكتروني
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        setError('البريد الإلكتروني غير صالح');
        return false;
      }
    }
    if (activeStep === 1 && formData.role === 'doctor') {
      if (!formData.specialization || !formData.licenseNumber || !formData.experience || !formData.consultationFee) {
        setError('جميع الحقول مطلوبة');
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
    setLoading(true);

    try {
      const response = await axios.post('/api/auth/register', {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        phoneNumber: formData.phoneNumber,
        role: formData.role
      });

      if (response.data.success) {
        // تسجيل الدخول تلقائياً بعد التسجيل
        const loginResponse = await axios.post('/api/auth/login', {
          email: formData.email,
          password: formData.password
        });

        if (loginResponse.data.success) {
          localStorage.setItem('token', loginResponse.data.token);
          // توجيه المستخدم إلى صفحة الملف الشخصي
          navigate('/profile');
        }
      }
    } catch (error) {
      setError(
        error.response?.data?.message ||
        'حدث خطأ أثناء إنشاء الحساب'
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

            <FormControl fullWidth margin="normal">
              <InputLabel id="country-select-label">الدولة</InputLabel>
              <Select
                labelId="country-select-label"
                id="country-select"
                value={selectedCountry.code}
                label="الدولة"
                onChange={(e) => {
                  const country = countries.find(c => c.code === e.target.value);
                  setSelectedCountry(country);
                }}
                sx={{
                  borderRadius: '8px',
                  '& fieldset': {
                    borderColor: '#e0e0e0'
                  },
                  '&:hover fieldset': {
                    borderColor: '#00B5AD'
                  }
                }}
              >
                {countries.map((country) => (
                  <MenuItem key={country.code} value={country.code}>
                    {country.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              margin="normal"
              required
              fullWidth
              id="phone"
              label="رقم الهاتف"
              name="phoneNumber"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Typography 
                      sx={{ 
                        color: '#666',
                        fontWeight: 500,
                        mr: 1,
                        borderRight: '1px solid #e0e0e0',
                        pr: 1
                      }}
                    >
                      {selectedCountry.phoneCode}
                    </Typography>
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
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          position: 'relative'
        }}
      >
        <Paper
          elevation={0}
          sx={{
            padding: 3,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
            borderRadius: '16px',
            background: '#fff',
            border: '1px solid #e0e0e0'
          }}
        >
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

          {error && (
            <Alert 
              severity="error" 
              sx={{ 
                width: '100%', 
                mb: 1,
                borderRadius: '8px',
                '& .MuiAlert-icon': {
                  color: '#f44336'
                }
              }}
            >
              {error}
            </Alert>
          )}

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
