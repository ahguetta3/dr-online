import React, { useState } from 'react';
import {
  Button,
  Box,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Avatar
} from '@mui/material';
import { PhotoCamera, Close } from '@mui/icons-material';
import axios from 'axios';

const ImageUpload = ({ currentImage, onImageUpdate }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setPreviewUrl(null);
    setSelectedFile(null);
  };

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setLoading(true);
    const formData = new FormData();
    formData.append('avatar', selectedFile);

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('/api/auth/upload-avatar', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      });

      onImageUpdate(response.data.avatar);
      handleClose();
    } catch (error) {
      console.error('Error uploading image:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Box sx={{ position: 'relative', display: 'inline-block' }}>
        <Avatar
          src={currentImage}
          sx={{ width: 100, height: 100, cursor: 'pointer' }}
          onClick={handleOpen}
        />
        <IconButton
          sx={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            backgroundColor: 'primary.main',
            '&:hover': { backgroundColor: 'primary.dark' },
          }}
          size="small"
          onClick={handleOpen}
        >
          <PhotoCamera sx={{ color: 'white' }} />
        </IconButton>
      </Box>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          تغيير الصورة الشخصية
          <IconButton
            onClick={handleClose}
            sx={{ position: 'absolute', right: 8, top: 8 }}
          >
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ textAlign: 'center', my: 2 }}>
            <input
              accept="image/*"
              style={{ display: 'none' }}
              id="image-upload"
              type="file"
              onChange={handleFileSelect}
            />
            <label htmlFor="image-upload">
              <Button
                variant="outlined"
                component="span"
                startIcon={<PhotoCamera />}
              >
                اختر صورة
              </Button>
            </label>
          </Box>
          {previewUrl && (
            <Box sx={{ textAlign: 'center', mt: 2 }}>
              <img
                src={previewUrl}
                alt="Preview"
                style={{ maxWidth: '100%', maxHeight: 300 }}
              />
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>إلغاء</Button>
          <Button
            onClick={handleUpload}
            disabled={!selectedFile || loading}
            variant="contained"
          >
            {loading ? <CircularProgress size={24} /> : 'حفظ'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ImageUpload;
