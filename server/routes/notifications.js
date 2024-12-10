const express = require('express');
const router = express.Router();
const Notification = require('../models/Notification');
const auth = require('../middleware/auth');

// الحصول على إشعارات المستخدم
router.get('/', auth, async (req, res) => {
  try {
    const notifications = await Notification.find({ user: req.user.id })
      .sort({ createdAt: -1 })
      .limit(10);

    res.json({
      success: true,
      notifications
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'حدث خطأ في جلب الإشعارات'
    });
  }
});

// تحديث حالة الإشعار إلى مقروء
router.put('/:id/read', auth, async (req, res) => {
  try {
    const notification = await Notification.findOne({
      _id: req.params.id,
      user: req.user.id
    });

    if (!notification) {
      return res.status(404).json({
        success: false,
        message: 'الإشعار غير موجود'
      });
    }

    notification.read = true;
    await notification.save();

    res.json({
      success: true,
      notification
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'حدث خطأ في تحديث الإشعار'
    });
  }
});

// حذف إشعار
router.delete('/:id', auth, async (req, res) => {
  try {
    const notification = await Notification.findOne({
      _id: req.params.id,
      user: req.user.id
    });

    if (!notification) {
      return res.status(404).json({
        success: false,
        message: 'الإشعار غير موجود'
      });
    }

    await notification.remove();

    res.json({
      success: true,
      message: 'تم حذف الإشعار بنجاح'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'حدث خطأ في حذف الإشعار'
    });
  }
});

// حذف جميع الإشعارات المقروءة
router.delete('/read/all', auth, async (req, res) => {
  try {
    await Notification.deleteMany({
      user: req.user.id,
      read: true
    });

    res.json({
      success: true,
      message: 'تم حذف جميع الإشعارات المقروءة بنجاح'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'حدث خطأ في حذف الإشعارات'
    });
  }
});

module.exports = router;
