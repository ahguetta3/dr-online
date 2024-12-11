import React from 'react';
import { BrowserRouter as Router, Link, Routes, Route } from 'react-router-dom';
import { CssBaseline, ThemeProvider, createTheme, Box, AppBar, Toolbar, Typography, Container, Button } from '@mui/material';
import rtlPlugin from 'stylis-plugin-rtl';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { prefixer } from 'stylis';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import MedicalArticles from './components/MedicalArticles';
import Specialties from './components/Specialties';
import TopDoctors from './components/TopDoctors';
import Stats from './components/Stats';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import Notifications from './components/Notifications';
import LiveChat from './components/LiveChat';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ForgotPassword from './pages/auth/ForgotPassword';
import ResetPassword from './pages/auth/ResetPassword';
import PatientDashboard from './pages/patient/Dashboard';
import DoctorDashboard from './pages/doctor/Dashboard';
import Doctors from './pages/doctor/Doctors';
import About from './pages/about/About';
import HomeService from './pages/services/HomeService';
import Profile from './pages/profile/Profile';
import Appointments from './pages/appointments/Appointments';
import PrivateRoute from './components/PrivateRoute';
import Contact from './pages/contact/Contact';

// Create rtl cache
const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
});

// Create theme
const theme = createTheme({
  direction: 'rtl',
  typography: {
    fontFamily: 'Cairo, sans-serif',
  },
});

function App() {
  return (
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Box>
            <Navbar />
            <Routes>
              {/* صفحات المصادقة */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password/:resetToken" element={<ResetPassword />} />
              
              {/* لوحات التحكم */}
              <Route path="/dashboard" element={<PatientDashboard />} />
              <Route path="/doctor/dashboard" element={<DoctorDashboard />} />
              
              {/* المواعيد */}
              <Route path="/appointments" element={<Appointments />} />
              
              {/* الصفحة الرئيسية */}
              <Route path="/" element={
                <>
                  <Hero />
                  <Services />
                  <Specialties />
                  <TopDoctors />
                  <Stats />
                  <MedicalArticles />
                  <Testimonials />
                  <Footer />
                  <Notifications />
                  <LiveChat />
                </>
              } />
              
              <Route path="/doctors" element={<Doctors />} />
              <Route path="/about" element={<About />} />
              <Route path="/home-service" element={<HomeService />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/profile" element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              } />
            </Routes>
          </Box>
        </Router>
      </ThemeProvider>
    </CacheProvider>
  );
}

export default App;
