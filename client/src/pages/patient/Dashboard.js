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
  Chip
} from '@mui/material';
import {
  EventNote as EventNoteIcon,
  LocalHospital as LocalHospitalIcon,
  Assignment as AssignmentIcon,
  Message as MessageIcon
} from '@mui/icons-material';
import axios from 'axios';

const Dashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [prescriptions, setPrescriptions] = useState([]);
  const [medicalRecords, setMedicalRecords] = useState([]);
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

        const [appointmentsRes, prescriptionsRes, recordsRes] = await Promise.all([
          axios.get('/api/appointments/patient', config),
          axios.get('/api/prescriptions/patient', config),
          axios.get('/api/medical-records/patient', config)
        ]);

        setAppointments(appointmentsRes.data.data);
        setPrescriptions(prescriptionsRes.data.data);
        setMedicalRecords(recordsRes.data.data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const DashboardCard = ({ title, icon: Icon, count, onClick }) => (
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
        {count}
      </Typography>
    </Paper>
  );

  const UpcomingAppointments = () => (
    <Paper sx={{ p: 3, height: '100%' }}>
      <Typography variant="h6" gutterBottom>
        المواعيد القادمة
      </Typography>
      <List>
        {appointments.slice(0, 3).map((appointment) => (
          <React.Fragment key={appointment._id}>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar src={appointment.doctor.avatar} />
              </ListItemAvatar>
              <ListItemText
                primary={`د. ${appointment.doctor.name}`}
                secondary={
                  <>
                    <Typography component="span" variant="body2" color="text.primary">
                      {new Date(appointment.date).toLocaleDateString('ar-SA')}
                    </Typography>
                    {` — ${appointment.time}`}
                  </>
                }
              />
              <Chip
                label={appointment.status}
                color={
                  appointment.status === 'confirmed' ? 'success' :
                  appointment.status === 'pending' ? 'warning' : 'error'
                }
                size="small"
              />
            </ListItem>
            <Divider variant="inset" component="li" />
          </React.Fragment>
        ))}
      </List>
      {appointments.length > 3 && (
        <Button
          fullWidth
          sx={{ mt: 2 }}
          onClick={() => {/* التنقل إلى صفحة المواعيد */}}
        >
          عرض كل المواعيد
        </Button>
      )}
    </Paper>
  );

  const RecentPrescriptions = () => (
    <Paper sx={{ p: 3, height: '100%' }}>
      <Typography variant="h6" gutterBottom>
        الوصفات الطبية الأخيرة
      </Typography>
      <List>
        {prescriptions.slice(0, 3).map((prescription) => (
          <React.Fragment key={prescription._id}>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar>
                  <LocalHospitalIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={prescription.title}
                secondary={
                  <>
                    <Typography component="span" variant="body2" color="text.primary">
                      د. {prescription.doctor.name}
                    </Typography>
                    {` — ${new Date(prescription.date).toLocaleDateString('ar-SA')}`}
                  </>
                }
              />
              <Button size="small" onClick={() => {/* عرض تفاصيل الوصفة */}}>
                عرض
              </Button>
            </ListItem>
            <Divider variant="inset" component="li" />
          </React.Fragment>
        ))}
      </List>
      {prescriptions.length > 3 && (
        <Button
          fullWidth
          sx={{ mt: 2 }}
          onClick={() => {/* التنقل إلى صفحة الوصفات */}}
        >
          عرض كل الوصفات
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
              count={appointments.length}
              onClick={() => {/* التنقل إلى صفحة المواعيد */}}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <DashboardCard
              title="الوصفات الطبية"
              icon={LocalHospitalIcon}
              count={prescriptions.length}
              onClick={() => {/* التنقل إلى صفحة الوصفات */}}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <DashboardCard
              title="السجلات الطبية"
              icon={AssignmentIcon}
              count={medicalRecords.length}
              onClick={() => {/* التنقل إلى صفحة السجلات */}}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <DashboardCard
              title="المحادثات"
              icon={MessageIcon}
              count={0}
              onClick={() => {/* التنقل إلى صفحة المحادثات */}}
            />
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <UpcomingAppointments />
          </Grid>
          <Grid item xs={12} md={6}>
            <RecentPrescriptions />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Dashboard;
