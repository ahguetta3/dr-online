import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Avatar,
  Button,
  Tabs,
  Tab,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Chip,
  CircularProgress
} from '@mui/material';
import {
  Person,
  Edit,
  CalendarToday,
  LocalHospital,
  Description,
  Assignment,
} from '@mui/icons-material';
import axios from 'axios';
import { format } from 'date-fns';
import { ar } from 'date-fns/locale';
import ImageUpload from '../../components/ImageUpload';
import Navbar from '../../components/Navbar';

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
};

const Profile = () => {
  const [value, setValue] = useState(0);
  const [user, setUser] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [prescriptions, setPrescriptions] = useState([]);
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserData();
    fetchAppointments();
    fetchPrescriptions();
    fetchReports();
  }, []);

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/auth/me', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUser(response.data.user);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const fetchAppointments = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/appointments/my-appointments', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAppointments(response.data.appointments);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  const fetchPrescriptions = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/prescriptions/my-prescriptions', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setPrescriptions(response.data.prescriptions);
    } catch (error) {
      console.error('Error fetching prescriptions:', error);
    }
  };

  const fetchReports = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/reports/my-reports', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setReports(response.data.reports);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching reports:', error);
      setLoading(false);
    }
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleImageUpdate = (newAvatar) => {
    setUser(prev => ({
      ...prev,
      avatar: newAvatar
    }));
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <Navbar />
      <Box sx={{ 
        backgroundColor: '#f5f5f5', 
        minHeight: '100vh',
        pt: '64px' // لترك مسافة للشريط العلوي الثابت
      }}>
        <Container maxWidth="lg" sx={{ py: 4 }}>
          <Grid container spacing={3}>
            {/* الملف الشخصي */}
            <Grid item xs={12} md={4} lg={3}>
              <Paper
                sx={{
                  p: 3,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  borderRadius: 2,
                  boxShadow: '0 2px 10px rgba(0,0,0,0.08)'
                }}
              >
                <ImageUpload
                  currentImage={user?.avatar}
                  onImageUpdate={handleImageUpdate}
                />
                <Typography variant="h6" sx={{ mt: 2, fontWeight: 'bold' }}>
                  {user?.name}
                </Typography>
                <Typography color="text.secondary" gutterBottom>
                  {user?.email}
                </Typography>
                <Button
                  variant="outlined"
                  startIcon={<Edit />}
                  sx={{ mt: 2 }}
                  fullWidth
                >
                  تعديل الملف الشخصي
                </Button>
              </Paper>

              {/* إحصائيات سريعة */}
              <Paper
                sx={{
                  mt: 2,
                  p: 2,
                  borderRadius: 2,
                  boxShadow: '0 2px 10px rgba(0,0,0,0.08)'
                }}
              >
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <CalendarToday color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary="المواعيد القادمة"
                      secondary={appointments.filter(a => new Date(a.date) > new Date()).length}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <LocalHospital color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary="الوصفات الطبية"
                      secondary={prescriptions.length}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <Description color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary="التقارير الطبية"
                      secondary={reports.length}
                    />
                  </ListItem>
                </List>
              </Paper>
            </Grid>

            {/* المعلومات التفصيلية */}
            <Grid item xs={12} md={8} lg={9}>
              <Paper 
                sx={{ 
                  width: '100%',
                  borderRadius: 2,
                  boxShadow: '0 2px 10px rgba(0,0,0,0.08)'
                }}
              >
                <Tabs
                  value={value}
                  onChange={handleChange}
                  indicatorColor="primary"
                  textColor="primary"
                  variant="fullWidth"
                  sx={{
                    borderBottom: 1,
                    borderColor: 'divider',
                    '& .MuiTab-root': {
                      py: 2
                    }
                  }}
                >
                  <Tab 
                    icon={<Person />} 
                    label="المعلومات الشخصية" 
                    iconPosition="start"
                  />
                  <Tab 
                    icon={<CalendarToday />} 
                    label="المواعيد" 
                    iconPosition="start"
                  />
                  <Tab 
                    icon={<LocalHospital />} 
                    label="الوصفات الطبية" 
                    iconPosition="start"
                  />
                  <Tab 
                    icon={<Description />} 
                    label="التقارير الطبية" 
                    iconPosition="start"
                  />
                </Tabs>

                <TabPanel value={value} index={0}>
                  <List>
                    <ListItem>
                      <ListItemIcon>
                        <Person color="primary" />
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Typography variant="subtitle2" color="text.secondary">
                            الاسم الكامل
                          </Typography>
                        }
                        secondary={
                          <Typography variant="body1" sx={{ mt: 0.5 }}>
                            {user?.name}
                          </Typography>
                        }
                      />
                    </ListItem>
                    <Divider variant="inset" component="li" />
                    <ListItem>
                      <ListItemIcon>
                        <Assignment color="primary" />
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Typography variant="subtitle2" color="text.secondary">
                            رقم الهاتف
                          </Typography>
                        }
                        secondary={
                          <Typography variant="body1" sx={{ mt: 0.5 }}>
                            {user?.phoneNumber}
                          </Typography>
                        }
                      />
                    </ListItem>
                    <Divider variant="inset" component="li" />
                    <ListItem>
                      <ListItemIcon>
                        <Assignment color="primary" />
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Typography variant="subtitle2" color="text.secondary">
                            البريد الإلكتروني
                          </Typography>
                        }
                        secondary={
                          <Typography variant="body1" sx={{ mt: 0.5 }}>
                            {user?.email}
                          </Typography>
                        }
                      />
                    </ListItem>
                  </List>
                </TabPanel>

                <TabPanel value={value} index={1}>
                  <List>
                    {appointments.map((appointment) => (
                      <React.Fragment key={appointment._id}>
                        <ListItem
                          sx={{
                            borderRadius: 1,
                            mb: 1,
                            backgroundColor: 'background.default'
                          }}
                        >
                          <ListItemIcon>
                            <CalendarToday color="primary" />
                          </ListItemIcon>
                          <ListItemText
                            primary={
                              <Typography variant="subtitle1">
                                موعد مع د. {appointment.doctor.name}
                              </Typography>
                            }
                            secondary={
                              <Box sx={{ mt: 0.5 }}>
                                <Typography variant="body2" color="text.secondary">
                                  {format(new Date(appointment.date), 'PPP', { locale: ar })}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                  {format(new Date(appointment.date), 'HH:mm', { locale: ar })}
                                </Typography>
                              </Box>
                            }
                          />
                          <Chip
                            label={
                              appointment.status === 'confirmed' ? 'مؤكد' :
                              appointment.status === 'pending' ? 'قيد الانتظار' : 'ملغي'
                            }
                            color={
                              appointment.status === 'confirmed' ? 'success' :
                              appointment.status === 'pending' ? 'warning' : 'error'
                            }
                            size="small"
                            sx={{ ml: 2 }}
                          />
                        </ListItem>
                        <Divider variant="inset" component="li" />
                      </React.Fragment>
                    ))}
                  </List>
                  <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
                    <Button
                      variant="contained"
                      color="primary"
                      startIcon={<CalendarToday />}
                      sx={{ borderRadius: '20px', px: 4 }}
                    >
                      حجز موعد جديد
                    </Button>
                  </Box>
                </TabPanel>

                <TabPanel value={value} index={2}>
                  <List>
                    {prescriptions.map((prescription) => (
                      <React.Fragment key={prescription._id}>
                        <ListItem
                          sx={{
                            borderRadius: 1,
                            mb: 1,
                            backgroundColor: 'background.default'
                          }}
                        >
                          <ListItemIcon>
                            <LocalHospital color="primary" />
                          </ListItemIcon>
                          <ListItemText
                            primary={
                              <Typography variant="subtitle1">
                                وصفة من د. {prescription.doctor.name}
                              </Typography>
                            }
                            secondary={
                              <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                                {format(new Date(prescription.date), 'PPP', { locale: ar })}
                              </Typography>
                            }
                          />
                          <Button
                            variant="outlined"
                            size="small"
                            sx={{ borderRadius: '15px' }}
                          >
                            عرض التفاصيل
                          </Button>
                        </ListItem>
                        <Divider variant="inset" component="li" />
                      </React.Fragment>
                    ))}
                  </List>
                </TabPanel>

                <TabPanel value={value} index={3}>
                  <List>
                    {reports.map((report) => (
                      <React.Fragment key={report._id}>
                        <ListItem
                          sx={{
                            borderRadius: 1,
                            mb: 1,
                            backgroundColor: 'background.default'
                          }}
                        >
                          <ListItemIcon>
                            <Description color="primary" />
                          </ListItemIcon>
                          <ListItemText
                            primary={
                              <Typography variant="subtitle1">
                                {report.title}
                              </Typography>
                            }
                            secondary={
                              <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                                {format(new Date(report.date), 'PPP', { locale: ar })}
                              </Typography>
                            }
                          />
                          <Button
                            variant="outlined"
                            size="small"
                            sx={{ borderRadius: '15px' }}
                          >
                            تحميل التقرير
                          </Button>
                        </ListItem>
                        <Divider variant="inset" component="li" />
                      </React.Fragment>
                    ))}
                  </List>
                </TabPanel>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Profile;
