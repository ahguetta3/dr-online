const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const Prescription = require('../models/Prescription');

// الحصول على وصفات المريض
router.get('/patient', protect, authorize('user'), async (req, res) => {
  try {
    const prescriptions = await Prescription.find({ patient: req.user.id })
      .populate('doctor', 'name avatar specialization')
      .sort('-date');
    
    res.json({
      success: true,
      data: prescriptions
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'خطأ في الخادم'
    });
  }
});

// الحصول على الوصفات التي كتبها الطبيب
router.get('/doctor', protect, authorize('doctor'), async (req, res) => {
  try {
    const prescriptions = await Prescription.find({ doctor: req.user.id })
      .populate('patient', 'name avatar')
      .sort('-date');
    
    res.json({
      success: true,
      data: prescriptions
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'خطأ في الخادم'
    });
  }
});

// إنشاء وصفة جديدة
router.post('/', protect, authorize('doctor'), async (req, res) => {
  try {
    const prescription = await Prescription.create({
      ...req.body,
      doctor: req.user.id
    });

    res.status(201).json({
      success: true,
      data: prescription
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message
    });
  }
});

module.exports = router;
