const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const Review = require('../models/Review');

// الحصول على تقييمات الطبيب
router.get('/doctor', protect, authorize('doctor'), async (req, res) => {
  try {
    const reviews = await Review.find({ doctor: req.user.id })
      .populate('patient', 'name avatar')
      .sort('-date');
    
    res.json({
      success: true,
      data: reviews
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'خطأ في الخادم'
    });
  }
});

// إضافة تقييم جديد
router.post('/', protect, authorize('user'), async (req, res) => {
  try {
    // التحقق من أن المريض لديه موعد مكتمل مع الطبيب
    const appointment = await Appointment.findOne({
      patient: req.user.id,
      doctor: req.body.doctor,
      status: 'completed'
    });

    if (!appointment) {
      return res.status(400).json({
        success: false,
        message: 'يجب أن يكون لديك موعد مكتمل مع الطبيب قبل إضافة تقييم'
      });
    }

    const review = await Review.create({
      ...req.body,
      patient: req.user.id,
      appointment: appointment._id
    });

    res.status(201).json({
      success: true,
      data: review
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message
    });
  }
});

module.exports = router;
