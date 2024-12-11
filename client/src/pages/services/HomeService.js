import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  TextField,
  Button,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  FormControlLabel,
  Checkbox,
  Radio,
  RadioGroup,
  Alert,
  Stepper,
  Step,
  StepLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import {
  LocalHospital,
  Healing,
  Science,
  AccessTime,
  LocationOn,
  EventNote,
  CheckCircle,
} from '@mui/icons-material';

const HomeService = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [serviceType, setServiceType] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [notes, setNotes] = useState('');
  const [gender, setGender] = useState('');
  const [urgency, setUrgency] = useState('normal');
  const [successDialog, setSuccessDialog] = useState(false);
  const [prescriptionType, setPrescriptionType] = useState('text'); // 'text' or 'image'
  const [prescriptionText, setPrescriptionText] = useState('');
  const [prescriptionImage, setPrescriptionImage] = useState(null);

  const services = [
    {
      id: 'nurse',
      title: 'طلب ممرض/ة منزلي',
      icon: <Healing sx={{ fontSize: 40, color: '#00B5AD' }} />,
      description: 'رعاية تمريضية متكاملة في منزلك',
      options: [
        'حقن وريدية أو عضلية',
        'تغيير ضمادات',
        'قياس ضغط الدم والسكر',
        'العناية بكبار السن',
        'رعاية ما بعد العمليات',
        'تركيب وتغيير القسطرة',
        'العلاج الطبيعي البسيط'
      ]
    },
    {
      id: 'doctor',
      title: 'زيارة طبيب للمنزل',
      icon: <LocalHospital sx={{ fontSize: 40, color: '#00B5AD' }} />,
      description: 'كشف طبي منزلي من قبل أطباء متخصصين',
      options: [
        'كشف طبي عام',
        'متابعة حالات مزمنة',
        'استشارة طبية',
        'تقييم طبي شامل',
        'متابعة ما بعد العمليات',
        'الرعاية المنزلية للأطفال',
        'متابعة الحمل للحالات الخاصة'
      ]
    },
    {
      id: 'lab',
      title: 'خدمات المختبر المنزلية',
      icon: <Science sx={{ fontSize: 40, color: '#00B5AD' }} />,
      description: 'خدمات المختبر في منزلك',
      options: [
        'سحب عينات دم',
        'تحليل دم شامل',
        'فحص السكر التراكمي',
        'وظائف الكلى والكبد',
        'فحص الكوليسترول',
        'تحاليل الحمل والهرمونات',
        'تحاليل ما قبل الزواج'
      ]
    },
    {
      id: 'physio',
      title: 'العلاج الطبيعي المنزلي',
      icon: <AccessTime sx={{ fontSize: 40, color: '#00B5AD' }} />,
      description: 'جلسات علاج طبيعي متخصصة في منزلك',
      options: [
        'علاج إصابات الرياضة',
        'تأهيل ما بعد الجلطات',
        'علاج آلام العمود الفقري',
        'تأهيل ما بعد الكسور',
        'علاج التصلب والتيبس',
        'تمارين تقوية العضلات',
        'العلاج الطبيعي للأطفال'
      ]
    },
    {
      id: 'pharmacy',
      title: 'إحضار الدواء للمنزل',
      icon: <EventNote sx={{ fontSize: 40, color: '#00B5AD' }} />,
      description: 'توصيل الأدوية والمستلزمات الطبية لمنزلك',
      options: [
        'توصيل الأدوية من الصيدليات',
        'شراء المستلزمات الطبية',
        'توصيل الأدوية المزمنة شهرياً',
        'توصيل أدوية الحالات الطارئة',
        'شراء الفيتامينات والمكملات',
        'توصيل مستلزمات الرعاية الصحية',
        'متابعة توفر الأدوية النادرة'
      ]
    },
    {
      id: 'equipment',
      title: 'تأجير المعدات الطبية',
      icon: <LocationOn sx={{ fontSize: 40, color: '#00B5AD' }} />,
      description: 'توفير وتركيب المعدات الطبية في المنزل',
      options: [
        'أسرّة طبية متحركة',
        'كراسي متحركة',
        'أجهزة تنفس وأكسجين',
        'أجهزة قياس حيوية',
        'معدات العلاج الطبيعي',
        'مشايات وعكازات طبية',
        'معدات العناية بالجروح'
      ]
    }
  ];

  const steps = ['اختيار الخدمة', 'تفاصيل الطلب', 'تأكيد الطلب'];

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = () => {
    // هنا سيتم إرسال البيانات إلى الخادم
    setSuccessDialog(true);
    // إعادة تعيين النموذج
    setServiceType('');
    setName('');
    setPhone('');
    setAddress('');
    setDate('');
    setTime('');
    setNotes('');
    setGender('');
    setUrgency('normal');
    setActiveStep(0);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setPrescriptionImage(file);
    }
  };

  const renderServiceSelection = () => (
    <Grid container spacing={3}>
      {services.map((service) => (
        <Grid item xs={12} md={4} key={service.id}>
          <Card
            sx={{
              height: '100%',
              cursor: 'pointer',
              transition: 'transform 0.2s',
              border: serviceType === service.id ? '2px solid #00B5AD' : 'none',
              '&:hover': {
                transform: 'translateY(-4px)',
              },
            }}
            onClick={() => setServiceType(service.id)}
          >
            <CardContent>
              <Box sx={{ textAlign: 'center', mb: 2 }}>
                {service.icon}
              </Box>
              <Typography variant="h6" component="h3" gutterBottom align="center">
                {service.title}
              </Typography>
              <Typography color="textSecondary" align="center" paragraph>
                {service.description}
              </Typography>
              <Box sx={{ mt: 2 }}>
                {service.options.map((option, index) => (
                  <Typography
                    key={index}
                    variant="body2"
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      mb: 1,
                      '&:before': {
                        content: '"•"',
                        color: '#00B5AD',
                        mr: 1,
                        fontSize: '1.2rem',
                      },
                    }}
                  >
                    {option}
                  </Typography>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );

  const renderDetailsForm = () => (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          label="الاسم الكامل"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          label="رقم الهاتف"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="العنوان التفصيلي"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          multiline
          rows={2}
          required
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <FormControl fullWidth>
          <InputLabel>تفضيل الجنس</InputLabel>
          <Select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            label="تفضيل الجنس"
          >
            <MenuItem value="male">ذكر</MenuItem>
            <MenuItem value="female">أنثى</MenuItem>
            <MenuItem value="any">لا يهم</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} md={6}>
        <FormControl component="fieldset">
          <Typography variant="subtitle2" gutterBottom>
            مستوى الاستعجال
          </Typography>
          <RadioGroup
            row
            value={urgency}
            onChange={(e) => setUrgency(e.target.value)}
          >
            <FormControlLabel
              value="urgent"
              control={<Radio color="error" />}
              label="عاجل (خلال 2 ساعة)"
            />
            <FormControlLabel
              value="normal"
              control={<Radio color="primary" />}
              label="عادي"
            />
          </RadioGroup>
        </FormControl>
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          type="date"
          label="التاريخ المطلوب"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          type="time"
          label="الوقت المفضل"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="ملاحظات إضافية"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          multiline
          rows={3}
        />
      </Grid>
      {serviceType === 'pharmacy' && (
        <>
          <Grid item xs={12}>
            <FormControl component="fieldset">
              <Typography variant="subtitle1" gutterBottom>
                طريقة إرسال الوصفة الطبية
              </Typography>
              <RadioGroup
                row
                value={prescriptionType}
                onChange={(e) => setPrescriptionType(e.target.value)}
              >
                <FormControlLabel
                  value="text"
                  control={<Radio />}
                  label="كتابة تفاصيل الأدوية"
                />
                <FormControlLabel
                  value="image"
                  control={<Radio />}
                  label="رفع صورة الوصفة الطبية"
                />
              </RadioGroup>
            </FormControl>
          </Grid>

          {prescriptionType === 'text' ? (
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={4}
                label="تفاصيل الأدوية المطلوبة"
                value={prescriptionText}
                onChange={(e) => setPrescriptionText(e.target.value)}
                placeholder="اكتب اسم الدواء والكمية المطلوبة لكل دواء"
                helperText="مثال: باراسيتامول 500 ملغ - علبتين"
              />
            </Grid>
          ) : (
            <Grid item xs={12}>
              <input
                accept="image/*"
                style={{ display: 'none' }}
                id="prescription-image"
                type="file"
                onChange={handleImageUpload}
              />
              <label htmlFor="prescription-image">
                <Button
                  variant="outlined"
                  component="span"
                  startIcon={prescriptionImage ? <CheckCircle color="success" /> : null}
                >
                  {prescriptionImage ? 'تم رفع الصورة' : 'اختر صورة الوصفة الطبية'}
                </Button>
              </label>
              {prescriptionImage && (
                <Typography variant="caption" display="block" gutterBottom>
                  {prescriptionImage.name}
                </Typography>
              )}
            </Grid>
          )}
        </>
      )}
    </Grid>
  );

  const renderConfirmation = () => (
    <Box>
      <Alert severity="info" sx={{ mb: 3 }}>
        الرجاء مراجعة تفاصيل طلبك قبل التأكيد
      </Alert>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Typography variant="subtitle1" gutterBottom>
            نوع الخدمة:
          </Typography>
          <Typography color="textSecondary" paragraph>
            {services.find(s => s.id === serviceType)?.title}
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="subtitle1" gutterBottom>
            الاسم:
          </Typography>
          <Typography color="textSecondary" paragraph>
            {name}
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="subtitle1" gutterBottom>
            رقم الهاتف:
          </Typography>
          <Typography color="textSecondary" paragraph>
            {phone}
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="subtitle1" gutterBottom>
            العنوان:
          </Typography>
          <Typography color="textSecondary" paragraph>
            {address}
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="subtitle1" gutterBottom>
            التاريخ والوقت:
          </Typography>
          <Typography color="textSecondary" paragraph>
            {date} - {time}
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="subtitle1" gutterBottom>
            مستوى الاستعجال:
          </Typography>
          <Typography color="textSecondary" paragraph>
            {urgency === 'urgent' ? 'عاجل' : 'عادي'}
          </Typography>
        </Grid>
        {serviceType === 'pharmacy' && (
          <Grid item xs={12}>
            <Typography variant="subtitle1" gutterBottom>
              تفاصيل الوصفة:
            </Typography>
            <Typography color="textSecondary" paragraph>
              {prescriptionType === 'text' 
                ? prescriptionText 
                : prescriptionImage 
                  ? `تم رفع صورة الوصفة: ${prescriptionImage.name}`
                  : 'لم يتم إرفاق وصفة'
              }
            </Typography>
          </Grid>
        )}
      </Grid>
    </Box>
  );

  return (
    <Box sx={{ mt: '80px', pb: 8 }}>
      <Container maxWidth="lg">
        <Typography
          variant="h4"
          component="h1"
          align="center"
          gutterBottom
          sx={{ mb: 4, color: '#2D3142' }}
        >
          طلب خدمة منزلية
        </Typography>
        
        <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <Box sx={{ mt: 4 }}>
          {activeStep === 0 && renderServiceSelection()}
          {activeStep === 1 && renderDetailsForm()}
          {activeStep === 2 && renderConfirmation()}

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4 }}>
            {activeStep > 0 && (
              <Button onClick={handleBack} sx={{ mr: 1 }}>
                رجوع
              </Button>
            )}
            {activeStep < steps.length - 1 ? (
              <Button
                variant="contained"
                onClick={handleNext}
                disabled={!serviceType && activeStep === 0}
                sx={{
                  bgcolor: '#00B5AD',
                  '&:hover': { bgcolor: '#009690' },
                }}
              >
                التالي
              </Button>
            ) : (
              <Button
                variant="contained"
                onClick={handleSubmit}
                sx={{
                  bgcolor: '#00B5AD',
                  '&:hover': { bgcolor: '#009690' },
                }}
              >
                تأكيد الطلب
              </Button>
            )}
          </Box>
        </Box>

        {/* رسالة نجاح الطلب */}
        <Dialog
          open={successDialog}
          onClose={() => setSuccessDialog(false)}
        >
          <DialogTitle>
            تم استلام طلبك بنجاح
          </DialogTitle>
          <DialogContent>
            <Typography>
              سيتم التواصل معك قريباً لتأكيد الموعد وتفاصيل الخدمة.
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => setSuccessDialog(false)}
              sx={{ color: '#00B5AD' }}
            >
              حسناً
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
};

export default HomeService;
