import React, { useState } from 'react';
import {
  IconButton,
  Badge,
  Menu,
  MenuItem,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Button
} from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import EventIcon from '@mui/icons-material/Event';
import MessageIcon from '@mui/icons-material/Message';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

// بيانات تجريبية للإشعارات
const mockNotifications = [
  {
    id: 1,
    type: 'appointment',
    title: 'موعد جديد',
    message: 'تم تأكيد موعدك مع د. أحمد غداً الساعة 10:00 صباحاً',
    time: '10:30',
    read: false,
    icon: EventIcon
  },
  {
    id: 2,
    type: 'message',
    title: 'رسالة جديدة',
    message: 'لديك رسالة جديدة من د. سارة',
    time: '09:15',
    read: false,
    icon: MessageIcon
  },
  {
    id: 3,
    type: 'medical',
    title: 'تذكير بالدواء',
    message: 'حان موعد تناول الدواء',
    time: '08:00',
    read: true,
    icon: LocalHospitalIcon
  }
];

const Notifications = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [notifications, setNotifications] = useState(mockNotifications);
  
  const unreadCount = notifications.filter(n => !n.read).length;
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMarkAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const handleNotificationClick = (id) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const getIcon = (IconComponent) => {
    return <IconComponent sx={{ color: '#00B5AD' }} />;
  };

  return (
    <>
      <IconButton
        onClick={handleClick}
        size="large"
        sx={{ 
          color: '#333',
          '&:hover': { backgroundColor: 'rgba(0, 181, 173, 0.1)' }
        }}
      >
        <Badge 
          badgeContent={unreadCount} 
          color="error"
          sx={{
            '& .MuiBadge-badge': {
              backgroundColor: '#00B5AD',
              color: 'white'
            }
          }}
        >
          {unreadCount > 0 ? 
            <NotificationsActiveIcon sx={{ color: '#00B5AD' }} /> : 
            <NotificationsIcon />
          }
        </Badge>
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: {
            mt: 1.5,
            width: 360,
            maxHeight: 400,
            borderRadius: 2,
            '& .MuiList-root': {
              p: 1
            }
          }
        }}
        transformOrigin={{ horizontal: 'left', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
      >
        <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            الإشعارات
          </Typography>
          {unreadCount > 0 && (
            <Button 
              size="small" 
              onClick={handleMarkAllRead}
              sx={{ 
                color: '#00B5AD',
                '&:hover': {
                  backgroundColor: 'rgba(0, 181, 173, 0.1)'
                }
              }}
            >
              تعيين الكل كمقروء
            </Button>
          )}
        </Box>
        <Divider />
        {notifications.length > 0 ? (
          <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
            {notifications.map((notification) => (
              <React.Fragment key={notification.id}>
                <ListItem 
                  alignItems="flex-start"
                  onClick={() => handleNotificationClick(notification.id)}
                  sx={{ 
                    cursor: 'pointer',
                    bgcolor: notification.read ? 'transparent' : 'rgba(0, 181, 173, 0.05)',
                    '&:hover': {
                      bgcolor: 'rgba(0, 181, 173, 0.1)'
                    }
                  }}
                >
                  <ListItemIcon>
                    {getIcon(notification.icon)}
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: notification.read ? 400 : 600 }}>
                          {notification.title}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {notification.time}
                        </Typography>
                      </Box>
                    }
                    secondary={
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ 
                          display: 'flex', 
                          alignItems: 'center',
                          gap: 0.5
                        }}
                      >
                        {notification.message}
                        {notification.read && (
                          <CheckCircleIcon 
                            sx={{ 
                              fontSize: 16, 
                              color: '#00B5AD',
                              ml: 1
                            }} 
                          />
                        )}
                      </Typography>
                    }
                  />
                </ListItem>
                <Divider variant="inset" component="li" />
              </React.Fragment>
            ))}
          </List>
        ) : (
          <Box sx={{ p: 3, textAlign: 'center' }}>
            <Typography color="text.secondary">
              لا توجد إشعارات جديدة
            </Typography>
          </Box>
        )}
      </Menu>
    </>
  );
};

export default Notifications;
