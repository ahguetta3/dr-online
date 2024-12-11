import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Container,
  Avatar,
  Button,
  Tooltip,
  ListItemIcon,
  Badge,
  useTheme,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText
} from '@mui/material';
import {
  Menu as MenuIcon,
  Home,
  CalendarToday,
  Person,
  Logout,
  Settings,
  LocalHospital,
  Notifications,
  Search,
} from '@mui/icons-material';
import logo from '../assets/images/logo.svg';

const Navbar = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [anchorElNotifications, setAnchorElNotifications] = useState(null);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
  const isAuthenticated = localStorage.getItem('token') !== null;

  // بيانات تجريبية للإشعارات
  const notifications = [
    { id: 1, text: 'لديك موعد جديد مع د. أحمد', time: '10:00 صباحاً' },
    { id: 2, text: 'تم تأكيد موعدك القادم', time: 'منذ ساعتين' },
    { id: 3, text: 'تم إضافة تقرير طبي جديد', time: 'منذ 3 ساعات' },
  ];

  const pages = [
    { name: 'الرئيسية', path: '/' },
    { name: 'الأطباء', path: '/doctors' },
    { name: 'الخدمات المنزلية', path: '/home-service' },
    { name: 'من نحن', path: '/about' },
    { name: 'اتصل بنا', path: '/contact' },
  ];

  const userMenuItems = [
    { title: 'الملف الشخصي', icon: <Person />, path: '/profile' },
    { title: 'الإعدادات', icon: <Settings />, path: '/settings' },
    { 
      title: 'تسجيل الخروج',
      icon: <Logout color="error" />, 
      action: () => setLogoutDialogOpen(true)
    },
  ];

  const handleOpenLogoutDialog = () => {
    setLogoutDialogOpen(true);
    handleCloseUserMenu();
  };

  const handleCloseLogoutDialog = () => {
    setLogoutDialogOpen(false);
  };

  async function handleLogout() {
    try {
      setIsLoggingOut(true);
      handleCloseLogoutDialog();
      
      // Clear all user data
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      sessionStorage.clear();
      
      // Navigate to homepage
      navigate('/', { 
        replace: true
      });
      
      // Reset any user-related state if needed
      // You might want to add any additional state resets here
      
    } catch (error) {
      console.error('Error during logout:', error);
    } finally {
      setIsLoggingOut(false);
    }
  }

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleOpenNotifications = (event) => {
    setAnchorElNotifications(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleCloseNotifications = () => {
    setAnchorElNotifications(null);
  };

  const handleMenuItemClick = (path, action) => {
    if (action) {
      action();
    } else {
      navigate(path);
    }
    handleCloseUserMenu();
    handleCloseNavMenu();
  };

  return (
    <>
      <AppBar 
        position="fixed" 
        sx={{ 
          backgroundColor: 'white',
          boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
          direction: 'rtl'
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ minHeight: { xs: '64px', md: '70px' } }}>
            {/* Logo - Desktop */}
            <Box 
              sx={{ 
                display: { xs: 'none', md: 'flex' }, 
                mr: 2,
                alignItems: 'center',
                cursor: 'pointer'
              }}
              onClick={() => navigate('/')}
            >
              <img src={logo} alt="Dr.Online Logo" style={{ height: '45px' }} />
            </Box>

            {/* Mobile Menu */}
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="القائمة"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                sx={{ 
                  color: 'primary.main',
                  '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.04)'
                  }
                }}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                  '& .MuiPaper-root': {
                    borderRadius: 2,
                    mt: 1.5,
                    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                  }
                }}
              >
                {pages.map((page) => (
                  <MenuItem 
                    key={page.name} 
                    onClick={() => handleMenuItemClick(page.path)}
                    sx={{ 
                      color: 'text.primary',
                      py: 1.5,
                      px: 3,
                      '&:hover': {
                        backgroundColor: 'rgba(0, 0, 0, 0.04)'
                      }
                    }}
                  >
                    <Typography textAlign="center">{page.name}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>

            {/* Logo - Mobile */}
            <Box 
              sx={{ 
                display: { xs: 'flex', md: 'none' }, 
                flexGrow: 1,
                justifyContent: 'center',
                cursor: 'pointer'
              }}
              onClick={() => navigate('/')}
            >
              <img src={logo} alt="Dr.Online Logo" style={{ height: '40px' }} />
            </Box>

            {/* Desktop Menu */}
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'center' }}>
              {pages.map((page) => (
                <Button
                  key={page.name}
                  onClick={() => handleMenuItemClick(page.path)}
                  sx={{ 
                    mx: 1,
                    px: 2, 
                    color: 'text.primary',
                    display: 'flex',
                    alignItems: 'center',
                    borderRadius: '8px',
                    transition: 'all 0.2s',
                    '&:hover': {
                      backgroundColor: 'rgba(0, 0, 0, 0.04)',
                      transform: 'translateY(-2px)'
                    }
                  }}
                >
                  {page.name}
                </Button>
              ))}
            </Box>

            {/* Right Section: Search, Notifications, User Menu */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {/* Search Button */}
              <IconButton
                sx={{ 
                  color: 'primary.main',
                  '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.04)'
                  }
                }}
              >
                <Search />
              </IconButton>

              {isAuthenticated ? (
                <>
                  {/* Notifications */}
                  <IconButton
                    onClick={handleOpenNotifications}
                    sx={{ 
                      color: 'primary.main',
                      '&:hover': {
                        backgroundColor: 'rgba(0, 0, 0, 0.04)'
                      }
                    }}
                  >
                    <Badge badgeContent={notifications.length} color="error">
                      <Notifications />
                    </Badge>
                  </IconButton>
                  
                  {/* Notifications Menu */}
                  <Menu
                    anchorEl={anchorElNotifications}
                    open={Boolean(anchorElNotifications)}
                    onClose={handleCloseNotifications}
                    sx={{
                      '& .MuiPaper-root': {
                        width: 320,
                        borderRadius: 2,
                        mt: 1.5,
                        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                      }
                    }}
                  >
                    <Box sx={{ p: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>الإشعارات</Typography>
                    </Box>
                    {notifications.map((notification) => (
                      <MenuItem 
                        key={notification.id}
                        sx={{ 
                          '&:hover': {
                            backgroundColor: 'rgba(0, 0, 0, 0.04)'
                          },
                          py: 2,
                          px: 2
                        }}
                      >
                        <Box>
                          <Typography variant="body1">{notification.text}</Typography>
                          <Typography variant="caption" color="text.secondary">
                            {notification.time}
                          </Typography>
                        </Box>
                      </MenuItem>
                    ))}
                    <Box sx={{ p: 2, borderTop: '1px solid', borderColor: 'divider', textAlign: 'center' }}>
                      <Button color="primary">عرض كل الإشعارات</Button>
                    </Box>
                  </Menu>

                  {/* User Menu */}
                  <Box sx={{ flexGrow: 0, ml: 1 }}>
                    <Tooltip title="الإعدادات">
                      <IconButton 
                        onClick={handleOpenUserMenu} 
                        sx={{ 
                          p: 0,
                          border: '2px solid',
                          borderColor: 'primary.main',
                          '&:hover': {
                            borderColor: 'primary.dark'
                          }
                        }}
                      >
                        <Avatar 
                          alt="User Avatar" 
                          src="/static/images/avatar/2.jpg"
                          sx={{ width: 35, height: 35 }}
                        />
                      </IconButton>
                    </Tooltip>
                    <Menu
                      sx={{
                        mt: '45px',
                        '& .MuiPaper-root': {
                          borderRadius: 2,
                          minWidth: 200,
                          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                        }
                      }}
                      id="menu-appbar"
                      anchorEl={anchorElUser}
                      anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      keepMounted
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      open={Boolean(anchorElUser)}
                      onClose={handleCloseUserMenu}
                    >
                      <Box sx={{ px: 2, py: 1.5, borderBottom: '1px solid', borderColor: 'divider' }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                          محمد أحمد
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          mohammed@example.com
                        </Typography>
                      </Box>
                      {userMenuItems.map((item) => (
                        <MenuItem
                          key={item.title}
                          onClick={() => handleMenuItemClick(item.path, item.action)}
                          sx={{
                            '&.Mui-disabled': {
                              opacity: 0.7,
                              color: 'text.primary'
                            }
                          }}
                        >
                          <ListItemIcon sx={{ minWidth: 36 }}>
                            {item.icon}
                          </ListItemIcon>
                          <Typography textAlign="center">
                            {item.title}
                          </Typography>
                        </MenuItem>
                      ))}
                    </Menu>
                  </Box>
                </>
              ) : (
                <Button
                  variant="contained"
                  onClick={() => navigate('/login')}
                  sx={{
                    borderRadius: '8px',
                    textTransform: 'none',
                    px: 3,
                    py: 1,
                    fontSize: '1rem'
                  }}
                >
                  تسجيل الدخول
                </Button>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* مربع حوار تأكيد تسجيل الخروج */}
      <Dialog
        open={logoutDialogOpen}
        onClose={handleCloseLogoutDialog}
        sx={{ direction: 'rtl' }}
      >
        <DialogTitle sx={{ 
          backgroundColor: '#f8fafb',
          color: '#2D3142',
          fontWeight: 'bold'
        }}>
          تأكيد تسجيل الخروج
        </DialogTitle>
        <DialogContent sx={{ mt: 2 }}>
          <DialogContentText>
            هل أنت متأكد من أنك تريد تسجيل الخروج من حسابك؟
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ p: 2, gap: 1 }}>
          <Button
            onClick={handleCloseLogoutDialog}
            variant="outlined"
            sx={{ 
              color: '#666',
              borderColor: '#ddd',
              '&:hover': {
                borderColor: '#bbb',
                backgroundColor: '#f5f5f5'
              }
            }}
          >
            إلغاء
          </Button>
          <Button
            onClick={handleLogout}
            variant="contained"
            disabled={isLoggingOut}
            sx={{
              backgroundColor: '#dc3545',
              '&:hover': {
                backgroundColor: '#c82333'
              }
            }}
          >
            {isLoggingOut ? 'جاري تسجيل الخروج...' : 'تسجيل الخروج'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Navbar;
