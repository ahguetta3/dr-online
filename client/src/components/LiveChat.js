import React, { useState } from 'react';
import {
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Typography,
  Avatar,
  IconButton,
  Paper
} from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import MinimizeIcon from '@mui/icons-material/Minimize';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';

const mockMessages = [
  {
    id: 1,
    sender: 'agent',
    name: 'فريق الدعم',
    message: 'مرحباً بك في دكتور أونلاين! كيف يمكنني مساعدتك اليوم؟',
    time: '10:00'
  }
];

const LiveChat = () => {
  const [open, setOpen] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState(mockMessages);

  const handleOpen = () => {
    setOpen(true);
    setMinimized(false);
  };

  const handleClose = () => {
    setOpen(false);
    setMinimized(false);
  };

  const handleMinimize = () => {
    setMinimized(!minimized);
  };

  const handleSend = () => {
    if (message.trim()) {
      const newMessage = {
        id: messages.length + 1,
        sender: 'user',
        message: message.trim(),
        time: new Date().toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' })
      };
      setMessages([...messages, newMessage]);
      setMessage('');

      // محاكاة رد تلقائي من الدعم
      setTimeout(() => {
        const autoReply = {
          id: messages.length + 2,
          sender: 'agent',
          name: 'فريق الدعم',
          message: 'شكراً لتواصلك معنا. سيقوم أحد ممثلي خدمة العملاء بالرد عليك قريباً.',
          time: new Date().toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, autoReply]);
      }, 1000);
    }
  };

  return (
    <>
      <Fab
        color="primary"
        aria-label="chat"
        onClick={handleOpen}
        sx={{
          position: 'fixed',
          bottom: 24,
          left: 24,
          bgcolor: '#00B5AD',
          '&:hover': {
            bgcolor: '#009690'
          }
        }}
      >
        <ChatIcon />
      </Fab>

      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
        sx={{
          '& .MuiDialog-paper': {
            position: minimized ? 'fixed' : 'static',
            bottom: minimized ? 24 : 'auto',
            left: minimized ? 24 : 'auto',
            m: minimized ? 0 : 2,
            width: minimized ? 300 : '100%',
            height: minimized ? 60 : 500,
            transition: 'all 0.3s ease'
          }
        }}
      >
        <DialogTitle
          sx={{
            bgcolor: '#00B5AD',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            p: 2
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <SupportAgentIcon sx={{ mr: 1 }} />
            <Typography variant="h6">الدعم المباشر</Typography>
          </Box>
          <Box>
            <IconButton size="small" onClick={handleMinimize} sx={{ color: 'white', mr: 1 }}>
              <MinimizeIcon />
            </IconButton>
            <IconButton size="small" onClick={handleClose} sx={{ color: 'white' }}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>

        {!minimized && (
          <>
            <DialogContent sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
              <Box sx={{ flexGrow: 1, overflowY: 'auto', mb: 2 }}>
                {messages.map((msg) => (
                  <Box
                    key={msg.id}
                    sx={{
                      display: 'flex',
                      justifyContent: msg.sender === 'user' ? 'flex-start' : 'flex-end',
                      mb: 2
                    }}
                  >
                    <Box
                      sx={{
                        maxWidth: '70%',
                        display: 'flex',
                        flexDirection: msg.sender === 'user' ? 'row' : 'row-reverse'
                      }}
                    >
                      <Avatar
                        sx={{
                          bgcolor: msg.sender === 'user' ? '#00B5AD' : '#4CAF50',
                          width: 32,
                          height: 32,
                          mx: 1
                        }}
                      >
                        {msg.sender === 'user' ? 'أ' : 'د'}
                      </Avatar>
                      <Paper
                        elevation={1}
                        sx={{
                          p: 1.5,
                          bgcolor: msg.sender === 'user' ? '#f5f5f5' : '#e3f2fd',
                          borderRadius: 2
                        }}
                      >
                        {msg.sender === 'agent' && (
                          <Typography variant="subtitle2" sx={{ color: '#00B5AD', mb: 0.5 }}>
                            {msg.name}
                          </Typography>
                        )}
                        <Typography variant="body1">{msg.message}</Typography>
                        <Typography variant="caption" sx={{ color: '#666', display: 'block', mt: 0.5 }}>
                          {msg.time}
                        </Typography>
                      </Paper>
                    </Box>
                  </Box>
                ))}
              </Box>
            </DialogContent>

            <DialogActions sx={{ p: 2, bgcolor: '#f5f5f5' }}>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="اكتب رسالتك هنا..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    bgcolor: 'white',
                    borderRadius: 2
                  }
                }}
                InputProps={{
                  endAdornment: (
                    <IconButton onClick={handleSend} color="primary">
                      <SendIcon />
                    </IconButton>
                  )
                }}
              />
            </DialogActions>
          </>
        )}
      </Dialog>
    </>
  );
};

export default LiveChat;
