import React, { useState } from 'react';
import {
  Container,
  Typography,
  Paper,
  Button,
  Box,
  Grid,
  Card,
  CardContent,
  CardActions,
  Chip,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Alert,
  Divider,
} from '@mui/material';
import { Link } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PersonIcon from '@mui/icons-material/Person';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AddIcon from '@mui/icons-material/Add';

const Appointments = () => {
  const isAuthenticated = localStorage.getItem('token') !== null;
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [openCancelDialog, setOpenCancelDialog] = useState(false);
  const [openNewAppointmentDialog, setOpenNewAppointmentDialog] = useState(false);
  const [newAppointment, setNewAppointment] = useState({
    doctorName: '',
    specialty: '',
    date: '',
    time: '',
    city: '',
    location: '',
    notes: '',
    price: ''
  });

  // بيانات تجريبية للمواعيد
  const [appointments] = useState([
    {
      id: 1,
      doctorName: "د. أحمد محمد",
      specialty: "طب عام",
      date: "2024-12-15",
      time: "10:00",
      status: "upcoming",
      city: 'نواكشوط',
      location: "مستشفى الشفاء",
      notes: "استشارة عامة",
      price: "2000"
    },
    {
      id: 2,
      doctorName: "د. سارة خالد",
      specialty: "طب أسنان",
      date: "2024-12-10",
      time: "15:30",
      status: "upcoming",
      city: 'نواذيبو',
      location: "المركز الطبي",
      notes: "تنظيف أسنان",
      price: "3000"
    },
    {
      id: 3,
      doctorName: "د. محمد علي",
      specialty: "جلدية",
      date: "2024-11-30",
      time: "12:00",
      status: "completed",
      city: 'روصو',
      location: "مستشفى الصداقة",
      notes: "متابعة علاج",
      price: "2500"
    }
  ]);

  // بيانات تجريبية للتخصصات
  const specialties = [
    'طب عام',
    'طب أسنان',
    'جلدية',
    'عيون',
    'أنف وأذن وحنجرة',
    'نساء وولادة',
    'عظام',
    'باطنية',
    'أطفال',
    'نفسية'
  ];

  // قائمة المدن الموريتانية
  const cities = [
    'نواكشوط',
    'نواذيبو',
    'روصو',
    'كيفة',
    'كيهيدي',
    'أطار',
    'العيون',
    'ازويرات',
    'النعمة',
    'سيلبابي',
    'ألاك',
    'بوكي',
    'أكجوجت'
  ];

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilterStatus(event.target.value);
  };

  const handleOpenDetails = (appointment) => {
    setSelectedAppointment(appointment);
    setOpenDialog(true);
  };

  const handleCloseDetails = () => {
    setOpenDialog(false);
  };

  const handleOpenCancelDialog = (appointment) => {
    setSelectedAppointment(appointment);
    setOpenCancelDialog(true);
  };

  const handleCloseCancelDialog = () => {
    setOpenCancelDialog(false);
  };

  const handleCancelAppointment = () => {
    // هنا يمكن إضافة منطق إلغاء الموعد
    handleCloseCancelDialog();
  };

  const handleNewAppointmentOpen = () => {
    setOpenNewAppointmentDialog(true);
  };

  const handleNewAppointmentClose = () => {
    setOpenNewAppointmentDialog(false);
    setNewAppointment({
      doctorName: '',
      specialty: '',
      date: '',
      time: '',
      city: '',
      location: '',
      notes: '',
      price: ''
    });
  };

  const handleNewAppointmentChange = (field) => (event) => {
    setNewAppointment({
      ...newAppointment,
      [field]: event.target.value
    });
  };

  const handleCreateAppointment = () => {
    // التحقق من صحة البيانات
    if (!newAppointment.doctorName || !newAppointment.specialty || !newAppointment.date || !newAppointment.time || !newAppointment.city) {
      alert('يرجى ملء جميع الحقول المطلوبة');
      return;
    }

    // هنا يمكن إضافة المنطق لإنشاء موعد جديد
    const appointment = {
      ...newAppointment,
      id: appointments.length + 1,
      status: 'upcoming'
    };

    // إضافة الموعد إلى القائمة
    appointments.push(appointment);
    handleNewAppointmentClose();
  };

  const filteredAppointments = appointments.filter(appointment => {
    const matchesSearch = 
      appointment.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = 
      filterStatus === 'all' || 
      appointment.status === filterStatus;

    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'upcoming':
        return 'primary';
      case 'completed':
        return 'success';
      case 'cancelled':
        return 'error';
      default:
        return 'default';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'upcoming':
        return 'قادم';
      case 'completed':
        return 'مكتمل';
      case 'cancelled':
        return 'ملغي';
      default:
        return status;
    }
  };

  if (!isAuthenticated) {
    return (
      <Container maxWidth="sm" sx={{ py: 8, mt: 8 }}>
        <Paper
          elevation={0}
          sx={{
            p: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            backgroundColor: '#f5f5f5',
            borderRadius: 2
          }}
        >
          <Typography variant="h5" component="h1" gutterBottom>
            مرحباً بك في صفحة المواعيد
          </Typography>
          <Typography variant="body1" sx={{ mb: 3 }}>
            يرجى تسجيل الدخول لعرض وإدارة مواعيدك
          </Typography>
          <Button
            component={Link}
            to="/login"
            variant="contained"
            sx={{
              bgcolor: '#00B5AD',
              '&:hover': {
                bgcolor: '#009690'
              }
            }}
          >
            تسجيل الدخول
          </Button>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4, mt: 8 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
          مواعيدي
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleNewAppointmentOpen}
          sx={{
            bgcolor: '#00B5AD',
            '&:hover': {
              bgcolor: '#009690'
            }
          }}
        >
          موعد جديد
        </Button>
      </Box>

      {/* أدوات البحث والفلترة */}
      <Paper sx={{ p: 2, mb: 4 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="ابحث عن موعد..."
              value={searchTerm}
              onChange={handleSearch}
              InputProps={{
                startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>تصفية حسب الحالة</InputLabel>
              <Select
                value={filterStatus}
                onChange={handleFilterChange}
                label="تصفية حسب الحالة"
                startAdornment={<FilterListIcon sx={{ mr: 1, color: 'text.secondary' }} />}
              >
                <MenuItem value="all">جميع المواعيد</MenuItem>
                <MenuItem value="upcoming">المواعيد القادمة</MenuItem>
                <MenuItem value="completed">المواعيد المكتملة</MenuItem>
                <MenuItem value="cancelled">المواعيد الملغية</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Paper>

      {/* قائمة المواعيد */}
      <Grid container spacing={3}>
        {filteredAppointments.length === 0 ? (
          <Grid item xs={12}>
            <Alert severity="info">لا توجد مواعيد تطابق معايير البحث</Alert>
          </Grid>
        ) : (
          filteredAppointments.map((appointment) => (
            <Grid item xs={12} md={6} lg={4} key={appointment.id}>
              <Card 
                sx={{ 
                  height: '100%', 
                  display: 'flex', 
                  flexDirection: 'column',
                  '&:hover': {
                    boxShadow: 6
                  }
                }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Typography variant="h6" component="h2">
                      {appointment.doctorName}
                    </Typography>
                    <Chip 
                      label={getStatusText(appointment.status)}
                      color={getStatusColor(appointment.status)}
                      size="small"
                    />
                  </Box>
                  <Typography color="text.secondary" gutterBottom>
                    {appointment.specialty}
                  </Typography>
                  <Box sx={{ mt: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <CalendarTodayIcon sx={{ mr: 1, color: 'text.secondary' }} />
                      <Typography variant="body2">{appointment.date}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <AccessTimeIcon sx={{ mr: 1, color: 'text.secondary' }} />
                      <Typography variant="body2">{appointment.time}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <LocationOnIcon sx={{ mr: 1, color: 'text.secondary' }} />
                      <Typography variant="body2" noWrap>{appointment.city} - {appointment.location}</Typography>
                    </Box>
                  </Box>
                </CardContent>
                <Divider />
                <CardActions>
                  <Button 
                    size="small" 
                    onClick={() => handleOpenDetails(appointment)}
                  >
                    عرض التفاصيل
                  </Button>
                  {appointment.status === 'upcoming' && (
                    <Button 
                      size="small" 
                      color="error"
                      onClick={() => handleOpenCancelDialog(appointment)}
                    >
                      إلغاء الموعد
                    </Button>
                  )}
                </CardActions>
              </Card>
            </Grid>
          ))
        )}
      </Grid>

      {/* نافذة عرض التفاصيل */}
      <Dialog open={openDialog} onClose={handleCloseDetails} maxWidth="sm" fullWidth>
        <DialogTitle>
          تفاصيل الموعد
        </DialogTitle>
        <DialogContent dividers>
          {selectedAppointment && (
            <Box>
              <Typography variant="h6" gutterBottom>
                {selectedAppointment.doctorName}
              </Typography>
              <Typography color="text.secondary" gutterBottom>
                {selectedAppointment.specialty}
              </Typography>
              <Box sx={{ mt: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <CalendarTodayIcon sx={{ mr: 1, color: 'text.secondary' }} />
                  <Typography>{selectedAppointment.date}</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <AccessTimeIcon sx={{ mr: 1, color: 'text.secondary' }} />
                  <Typography>{selectedAppointment.time}</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <LocationOnIcon sx={{ mr: 1, color: 'text.secondary' }} />
                  <Typography>{selectedAppointment.city} - {selectedAppointment.location}</Typography>
                </Box>
                <Typography variant="subtitle1" gutterBottom>
                  ملاحظات:
                </Typography>
                <Typography color="text.secondary" paragraph>
                  {selectedAppointment.notes}
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  التكلفة:
                </Typography>
                <Typography color="text.secondary">
                  {selectedAppointment.price} أوقية
                </Typography>
              </Box>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDetails}>إغلاق</Button>
        </DialogActions>
      </Dialog>

      {/* نافذة تأكيد الإلغاء */}
      <Dialog open={openCancelDialog} onClose={handleCloseCancelDialog}>
        <DialogTitle>
          تأكيد إلغاء الموعد
        </DialogTitle>
        <DialogContent>
          <Typography>
            هل أنت متأكد من رغبتك في إلغاء هذا الموعد؟
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseCancelDialog}>تراجع</Button>
          <Button onClick={handleCancelAppointment} color="error" variant="contained">
            تأكيد الإلغاء
          </Button>
        </DialogActions>
      </Dialog>

      {/* نافذة إضافة موعد جديد */}
      <Dialog 
        open={openNewAppointmentDialog} 
        onClose={handleNewAppointmentClose}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          حجز موعد جديد
        </DialogTitle>
        <DialogContent dividers>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
            <TextField
              label="اسم الطبيب"
              fullWidth
              required
              value={newAppointment.doctorName}
              onChange={handleNewAppointmentChange('doctorName')}
            />
            
            <FormControl fullWidth required>
              <InputLabel>التخصص</InputLabel>
              <Select
                value={newAppointment.specialty}
                onChange={handleNewAppointmentChange('specialty')}
                label="التخصص"
              >
                {specialties.map((specialty) => (
                  <MenuItem key={specialty} value={specialty}>
                    {specialty}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              label="التاريخ"
              type="date"
              fullWidth
              required
              value={newAppointment.date}
              onChange={handleNewAppointmentChange('date')}
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                min: new Date().toISOString().split('T')[0]
              }}
            />

            <TextField
              label="الوقت"
              type="time"
              fullWidth
              required
              value={newAppointment.time}
              onChange={handleNewAppointmentChange('time')}
              InputLabelProps={{
                shrink: true,
              }}
            />

            <FormControl fullWidth>
              <InputLabel>المدينة</InputLabel>
              <Select
                value={newAppointment.city || ''}
                onChange={handleNewAppointmentChange('city')}
                label="المدينة"
              >
                {cities.map((city) => (
                  <MenuItem key={city} value={city}>
                    {city}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              label="اسم المستشفى/العيادة"
              fullWidth
              value={newAppointment.location}
              onChange={handleNewAppointmentChange('location')}
              placeholder="مثال: مستشفى الشفاء، المركز الطبي"
            />

            <TextField
              label="ملاحظات"
              fullWidth
              multiline
              rows={3}
              value={newAppointment.notes}
              onChange={handleNewAppointmentChange('notes')}
            />

            <TextField
              label="السعر (بالأوقية)"
              fullWidth
              type="number"
              value={newAppointment.price}
              onChange={handleNewAppointmentChange('price')}
              InputProps={{
                endAdornment: <Typography sx={{ color: 'text.secondary' }}>أوقية</Typography>
              }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleNewAppointmentClose}>إلغاء</Button>
          <Button 
            onClick={handleCreateAppointment}
            variant="contained"
            sx={{
              bgcolor: '#00B5AD',
              '&:hover': {
                bgcolor: '#009690'
              }
            }}
          >
            حجز الموعد
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Appointments;
