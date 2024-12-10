const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const Appointment = require('../models/Appointment');

// الحصول على مواعيد المريض
router.get('/patient', protect, authorize('user'), async (req, res) => {
  try {
    const appointments = await Appointment.find({ patient: req.user.id })
      .populate('doctor', 'name avatar specialization')
      .sort('-date');
    
    res.json({
      success: true,
      data: appointments
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'خطأ في الخادم'
    });
  }
});

// الحصول على مواعيد الطبيب
router.get('/doctor', protect, authorize('doctor'), async (req, res) => {
  try {
    const appointments = await Appointment.find({ doctor: req.user.id })
      .populate('patient', 'name avatar')
      .sort('-date');
    
    res.json({
      success: true,
      data: appointments
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'خطأ في الخادم'
    });
  }
});

// إنشاء موعد جديد
router.post('/', protect, async (req, res) => {
  try {
    const appointment = await Appointment.create({
      ...req.body,
      patient: req.user.id
    });

    res.status(201).json({
      success: true,
      data: appointment
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message
    });
  }
});

// تحديث حالة الموعد
router.put('/:id/status', protect, async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    
    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: 'الموعد غير موجود'
      });
    }

    // التحقق من الصلاحية
    if (
      req.user.role !== 'doctor' && 
      appointment.patient.toString() !== req.user.id
    ) {
      return res.status(403).json({
        success: false,
        message: 'غير مصرح لك بتحديث هذا الموعد'
      });
    }

    appointment.status = req.body.status;
    await appointment.save();

    res.json({
      success: true,
      data: appointment
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message
    });
  }
});

module.exports = router;
