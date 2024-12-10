const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// التحقق من صحة البريد الإلكتروني
const validateEmail = (email) => {
  const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return re.test(email);
};

// @desc    تسجيل مستخدم جديد
// @route   POST /api/auth/register
// @access  Public
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log('Registration attempt:', { name, email });

    // التحقق من عدم وجود المستخدم مسبقاً
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log('User already exists');
      return res.status(400).json({
        success: false,
        message: 'البريد الإلكتروني مسجل مسبقاً'
      });
    }

    // تشفير كلمة المرور
    const salt = await bcrypt.genSalt(10);
    console.log('Generated salt:', salt);
    
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log('Original password:', password);
    console.log('Hashed password:', hashedPassword);

    // إنشاء مستخدم جديد
    const user = new User({
      name,
      email,
      password: hashedPassword
    });

    // حفظ المستخدم في قاعدة البيانات
    await user.save();

    console.log('User created:', {
      id: user._id,
      email: user.email,
      hashedPassword: user.password // للتأكد من أن كلمة المرور تم تخزينها بشكل صحيح
    });

    res.status(201).json({
      success: true,
      message: 'تم إنشاء الحساب بنجاح'
    });

  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({
      success: false,
      message: 'حدث خطأ في الخادم',
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
});

// @desc    تسجيل الدخول
// @route   POST /api/auth/login
// @access  Public
router.post('/login', async (req, res) => {
  try {
    console.log('Login request body:', req.body);
    const { email, password } = req.body;
    console.log('Login attempt:', { email });
    console.log('Received password:', password);
    
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'الرجاء إدخال البريد الإلكتروني وكلمة المرور'
      });
    }

    // البحث عن المستخدم
    const user = await User.findOne({ email });
    console.log('User found:', user ? 'Yes' : 'No');
    
    if (!user) {
      console.log('User not found with email:', email);
      return res.status(401).json({
        success: false,
        message: 'البريد الإلكتروني أو كلمة المرور غير صحيحة'
      });
    }

    console.log('Found user:', {
      id: user._id,
      email: user.email,
      storedPassword: user.password
    });

    // التحقق من كلمة المرور
    console.log('Comparing passwords...');
    console.log('Input password:', password);
    console.log('Stored hashed password:', user.password);
    
    const isMatch = await bcrypt.compare(password, user.password);
    console.log('Password match result:', isMatch);

    if (!isMatch) {
      console.log('Password does not match');
      return res.status(401).json({
        success: false,
        message: 'البريد الإلكتروني أو كلمة المرور غير صحيحة'
      });
    }

    // إنشاء توكن
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '30d' }
    );

    console.log('Login successful, token created');

    // إرسال الاستجابة
    res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });

  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({
      success: false,
      message: 'حدث خطأ في الخادم',
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
});

module.exports = router;
