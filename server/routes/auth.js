const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { protect, authorize } = require('../middleware/auth');
const sendEmail = require('../utils/sendEmail');
const crypto = require('crypto');
const rateLimit = require('express-rate-limit');
const multer = require('multer');
const path = require('path');

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 attempts
  message: { 
    success: false,
    message: 'تم تجاوز الحد الأقصى لمحاولات تسجيل الدخول. الرجاء المحاولة بعد 15 دقيقة'
  }
});

// تكوين multer لتحميل الصور
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/avatars');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB
  },
  fileFilter: function (req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error('يرجى تحميل صورة صالحة'));
    }
    cb(null, true);
  }
});

// @desc    تسجيل مستخدم جديد
// @route   POST /api/auth/register
// @access  Public
const validateEmail = (email) => {
  const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return re.test(email);
};

const validatePhoneNumber = (phoneNumber) => {
  // إزالة كل شيء ما عدا الأرقام و +
  const cleanPhone = phoneNumber.replace(/[^\d+]/g, '');
  // التحقق من أن الرقم يبدأ بـ + أو رقم
  return /^(\+|[0-9])[0-9]{8,14}$/.test(cleanPhone);
};

router.post('/register', async (req, res) => {
  try {
    const { name, email, password, phoneNumber, role } = req.body;

    console.log('Received phone number:', phoneNumber);

    // التحقق من صحة المدخلات
    if (!name || !email || !password || !phoneNumber) {
      return res.status(400).json({
        success: false,
        message: 'جميع الحقول مطلوبة'
      });
    }

    if (!validateEmail(email)) {
      return res.status(400).json({
        success: false,
        message: 'البريد الإلكتروني غير صالح'
      });
    }

    // تنظيف رقم الهاتف وإزالة المسافات والرموز
    const cleanPhone = phoneNumber.replace(/[^\d+]/g, '');
    
    if (!validatePhoneNumber(cleanPhone)) {
      return res.status(400).json({
        success: false,
        message: 'رقم الهاتف غير صالح. يجب أن يكون بين 9-15 رقم'
      });
    }

    // التحقق من وجود المستخدم
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ 
        success: false, 
        message: 'البريد الإلكتروني مسجل مسبقاً' 
      });
    }

    const phoneExists = await User.findOne({ phoneNumber: cleanPhone });
    if (phoneExists) {
      return res.status(400).json({
        success: false,
        message: 'رقم الهاتف مسجل مسبقاً'
      });
    }

    // إنشاء رمز التحقق
    const verificationToken = crypto.randomBytes(20).toString('hex');
    const verificationTokenExpires = Date.now() + 24 * 60 * 60 * 1000; // 24 ساعة

    // إنشاء المستخدم
    const user = await User.create({
      name,
      email,
      password,
      phoneNumber: cleanPhone,
      role,
      verificationToken,
      verificationTokenExpires,
      verified: process.env.EMAIL_VERIFICATION === 'false' // تعيين verified كـ true إذا كان التحقق معطلاً
    });

    // إرسال بريد التحقق فقط إذا كان التحقق مفعلاً
    if (process.env.EMAIL_VERIFICATION !== 'false') {
      try {
        const verificationUrl = `${req.protocol}://${req.get('host')}/api/auth/verify/${verificationToken}`;
        const message = `مرحباً ${name},\n\nالرجاء الضغط على الرابط التالي لتأكيد بريدك الإلكتروني:\n\n${verificationUrl}`;

        await sendEmail({
          email: user.email,
          subject: 'تأكيد البريد الإلكتروني',
          message
        });
      } catch (err) {
        await User.findByIdAndDelete(user._id);
        return res.status(500).json({
          success: false,
          message: 'حدث خطأ في إرسال البريد الإلكتروني'
        });
      }
    }

    res.status(201).json({
      success: true,
      message: process.env.EMAIL_VERIFICATION === 'false' 
        ? 'تم إنشاء حسابك بنجاح'
        : 'تم إنشاء حسابك بنجاح. يرجى تفعيل حسابك من خلال الرابط المرسل إلى بريدك الإلكتروني'
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message
    });
  }
});

// @desc    تأكيد البريد الإلكتروني
// @route   GET /api/auth/verify/:token
// @access  Public
router.get('/verify/:token', async (req, res) => {
  try {
    const user = await User.findOne({
      verificationToken: req.params.token,
      verificationTokenExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'رابط التحقق غير صالح أو منتهي الصلاحية'
      });
    }

    user.verified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpires = undefined;
    await user.save();

    res.status(200).json({
      success: true,
      message: 'تم تأكيد البريد الإلكتروني بنجاح'
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});

// @desc    تسجيل الدخول
// @route   POST /api/auth/login
// @access  Public
router.post('/login', loginLimiter, async (req, res) => {
  try {
    const { email, password } = req.body;

    // التحقق من وجود البريد الإلكتروني وكلمة المرور
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'الرجاء إدخال البريد الإلكتروني وكلمة المرور'
      });
    }

    // البحث عن المستخدم وتضمين كلمة المرور
    const user = await User.findOne({ email }).select('+password');
    
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'بيانات الدخول غير صحيحة'
      });
    }

    // التحقق من تأكيد البريد الإلكتروني
    if (!user.verified) {
      return res.status(401).json({
        success: false,
        message: 'الرجاء تأكيد بريدك الإلكتروني أولاً'
      });
    }

    // التحقق من كلمة المرور
    const isMatch = await user.matchPassword(password);
    
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'بيانات الدخول غير صحيحة'
      });
    }

    // إنشاء وإرسال التوكن
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE }
    );

    // إنشاء refresh token
    const refreshToken = crypto.randomBytes(40).toString('hex');
    user.refreshToken = refreshToken;
    await user.save();

    res.status(200).json({
      success: true,
      token,
      refreshToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar
      }
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({
      success: false,
      message: 'خطأ في الخادم'
    });
  }
});

// @desc    إعادة تعيين كلمة المرور
// @route   POST /api/auth/forgot-password
// @access  Public
router.post('/forgot-password', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'لم يتم العثور على مستخدم بهذا البريد الإلكتروني'
      });
    }

    // إنشاء رمز إعادة التعيين
    const resetToken = user.createPasswordResetToken();
    await user.save();

    // إرسال البريد الإلكتروني
    const resetUrl = `${req.protocol}://${req.get('host')}/api/auth/reset-password/${resetToken}`;
    const message = `مرحباً ${user.name},\n\nلقد طلبت إعادة تعيين كلمة المرور. الرجاء الضغط على الرابط التالي:\n\n${resetUrl}\n\nإذا لم تطلب إعادة تعيين كلمة المرور، يرجى تجاهل هذا البريد.`;

    try {
      await sendEmail({
        email: user.email,
        subject: 'إعادة تعيين كلمة المرور',
        message
      });

      res.status(200).json({
        success: true,
        message: 'تم إرسال رابط إعادة التعيين إلى بريدك الإلكتروني'
      });
    } catch (err) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpires = undefined;
      await user.save();

      return res.status(500).json({
        success: false,
        message: 'حدث خطأ في إرسال البريد الإلكتروني'
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});

// @desc    إعادة تعيين كلمة المرور
// @route   PUT /api/auth/reset-password/:token
// @access  Public
router.put('/reset-password/:token', async (req, res) => {
  try {
    // الحصول على رمز التشفير
    const resetPasswordToken = crypto
      .createHash('sha256')
      .update(req.params.token)
      .digest('hex');

    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'رمز إعادة التعيين غير صالح أو منتهي الصلاحية'
      });
    }

    // تعيين كلمة المرور الجديدة
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.status(200).json({
      success: true,
      message: 'تم إعادة تعيين كلمة المرور بنجاح'
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});

// @desc    تحديث كلمة المرور
// @route   PUT /api/auth/update-password
// @access  Private
router.put('/update-password', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('+password');

    // التحقق من كلمة المرور الحالية
    const isMatch = await user.matchPassword(req.body.currentPassword);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'كلمة المرور الحالية غير صحيحة'
      });
    }

    // تعيين كلمة المرور الجديدة
    user.password = req.body.newPassword;
    await user.save();

    res.status(200).json({
      success: true,
      message: 'تم تحديث كلمة المرور بنجاح'
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});

// @desc    تحميل صورة المستخدم
// @route   POST /api/auth/upload-avatar
// @access  Private
router.post('/upload-avatar', protect, upload.single('avatar'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'لم يتم اختيار صورة'
      });
    }

    const user = await User.findById(req.user.id);
    user.avatar = `/uploads/avatars/${req.file.filename}`;
    await user.save();

    res.json({
      success: true,
      avatar: user.avatar
    });
  } catch (error) {
    console.error('Error uploading avatar:', error);
    res.status(500).json({
      success: false,
      message: 'حدث خطأ في تحميل الصورة'
    });
  }
});

// @desc    الحصول على المستخدم الحالي
// @route   GET /api/auth/me
// @access  Private
router.get('/me', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});

// نقطة نهاية مؤقتة لحذف جميع المستخدمين - سيتم إزالتها لاحقاً
router.delete('/delete-all-users', async (req, res) => {
  try {
    await User.deleteMany({});
    res.status(200).json({
      success: true,
      message: 'تم حذف جميع المستخدمين'
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'حدث خطأ أثناء حذف المستخدمين'
    });
  }
});

module.exports = router;
