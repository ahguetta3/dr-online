import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  Button,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Divider,
  Chip,
  Rating
} from '@mui/material';
import {
  EventNote as EventNoteIcon,
  People as PeopleIcon,
  AttachMoney as AttachMoneyIcon,
  Star as StarIcon,
  Message as MessageIcon
} from '@mui/icons-material';
import axios from 'axios';

const Dashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [patients, setPatients] = useState([]);
  const [earnings, setEarnings] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem('token');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`
          }
        };

        const [appointmentsRes, patientsRes, earningsRes, reviewsRes] = await Promise.all([
          axios.get('/api/appointments/doctor', config),
          axios.get('/api/patients/doctor', config),
          axios.get('/api/earnings/doctor', config),
          axios.get('/api/reviews/doctor', config)
        ]);

        setAppointments(appointmentsRes.data.data);
        setPatients(patientsRes.data.data);
        setEarnings(earningsRes.data.data);
        setReviews(reviewsRes.data.data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const DashboardCard = ({ title, icon: Icon, value, subtitle, onClick }) => (
    <Paper
      sx={{
        p: 3,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        cursor: 'pointer',
        transition: '0.3s',
        '&:hover': {
          transform: 'translateY(-5px)',
          boxShadow: 3
        }
      }}
      onClick={onClick}
    >
      <Icon sx={{ fontSize: 40, color: 'primary.main', mb: 2 }} />
      <Typography variant="h6" component="h2" gutterBottom>
        {title}
      </Typography>
      <Typography variant="h4" color="primary">
        {value}
      </Typography>
      {subtitle && (
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          {subtitle}
        </Typography>
      )}
    </Paper>
  );

  const TodayAppointments = () => (
    <Paper sx={{ p: 3, height: '100%' }}>
      <Typography variant="h6" gutterBottom>
        مواعيد اليوم
      </Typography>
      <List>
        {appointments
          .filter(appointment => 
            new Date(appointment.date).toDateString() === new Date().toDateString()
          )
          .map((appointment) => (
            <React.Fragment key={appointment._id}>
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar src={appointment.patient.avatar} />
                </ListItemAvatar>
                <ListItemText
                  primary={appointment.patient.name}
                  secondary={
                    <>
                      <Typography component="span" variant="body2" color="text.primary">
                        {appointment.time}
                      </Typography>
                      {appointment.type === 'video' ? ' - استشارة فيديو' : ' - استشارة نصية'}
                    </>
                  }
                />
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Button
                    variant="contained"
                    size="small"
                    onClick={() => {/* بدء الاستشارة */}}
                  >
                    بدء
                  </Button>
                  <Chip
                    label={appointment.status}
                    color={
                      appointment.status === 'confirmed' ? 'success' :
                      appointment.status === 'pending' ? 'warning' : 'error'
                    }
                    size="small"
                  />
                </Box>
              </ListItem>
              <Divider variant="inset" component="li" />
            </React.Fragment>
          ))}
      </List>
      <Button
        fullWidth
        sx={{ mt: 2 }}
        onClick={() => {/* التنقل إلى صفحة المواعيد */}}
      >
        عرض كل المواعيد
      </Button>
    </Paper>
  );

  const RecentReviews = () => (
    <Paper sx={{ p: 3, height: '100%' }}>
      <Typography variant="h6" gutterBottom>
        آخر التقييمات
      </Typography>
      <List>
        {reviews.slice(0, 3).map((review) => (
          <React.Fragment key={review._id}>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar src={review.patient.avatar} />
              </ListItemAvatar>
              <ListItemText
                primary={review.patient.name}
                secondary={
                  <>
                    <Rating value={review.rating} readOnly size="small" />
                    <Typography variant="body2" color="text.secondary">
                      {review.comment}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {new Date(review.date).toLocaleDateString('ar-SA')}
                    </Typography>
                  </>
                }
              />
            </ListItem>
            <Divider variant="inset" component="li" />
          </React.Fragment>
        ))}
      </List>
      {reviews.length > 3 && (
        <Button
          fullWidth
          sx={{ mt: 2 }}
          onClick={() => {/* التنقل إلى صفحة التقييمات */}}
        >
          عرض كل التقييمات
        </Button>
      )}
    </Paper>
  );

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
        <Typography>جاري التحميل...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ py: 4 }}>
      <Container maxWidth="lg">
        <Typography variant="h4" sx={{ mb: 4 }}>
          لوحة التحكم
        </Typography>

        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <DashboardCard
              title="المواعيد"
              icon={EventNoteIcon}
              value={appointments.length}
              subtitle="إجمالي المواعيد"
              onClick={() => {/* التنقل إلى صفحة المواعيد */}}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <DashboardCard
              title="المرضى"
              icon={PeopleIcon}
              value={patients.length}
              subtitle="إجمالي المرضى"
              onClick={() => {/* التنقل إلى صفحة المرضى */}}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <DashboardCard
              title="الأرباح"
              icon={AttachMoneyIcon}
              value={`${earnings} ر.س`}
              subtitle="إجمالي الأرباح"
              onClick={() => {/* التنقل إلى صفحة الأرباح */}}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <DashboardCard
              title="التقييم"
              icon={StarIcon}
              value={reviews.length > 0 
                ? (reviews.reduce((acc, rev) => acc + rev.rating, 0) / reviews.length).toFixed(1)
                : 0
              }
              subtitle={`${reviews.length} تقييم`}
              onClick={() => {/* التنقل إلى صفحة التقييمات */}}
            />
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          <Grid item xs={12} md={7}>
            <TodayAppointments />
          </Grid>
          <Grid item xs={12} md={5}>
            <RecentReviews />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Dashboard;
