const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');

// تحميل المتغيرات البيئية
dotenv.config();

const app = express();

// إعدادات الأمان
app.use(helmet()); // حماية HTTP headers
app.use(mongoSanitize()); // منع حقن MongoDB

// حماية من هجمات محاولة تخمين كلمة المرور
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 دقيقة
  max: 100 // الحد الأقصى 100 طلب لكل IP
});
app.use('/api/auth', limiter);

// Middleware
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? process.env.CLIENT_URL 
    : 'http://localhost:3000',
  credentials: true
}));
app.use(express.json({ limit: '10kb' })); // تحديد حجم الطلب

// توصيل قاعدة البيانات
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      autoIndex: true
    });
    console.log('✓ تم الاتصال بقاعدة البيانات');
  } catch (error) {
    console.error('✗ خطأ في الاتصال بقاعدة البيانات:', error.message);
    process.exit(1);
  }
};

connectDB();

// خدمة الملفات الثابتة
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// المسارات
app.use('/api/auth', require('./routes/auth'));
app.use('/api/appointments', require('./routes/appointments'));
app.use('/api/prescriptions', require('./routes/prescriptions'));
app.use('/api/reviews', require('./routes/reviews'));

// معالجة الأخطاء العامة
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'حدث خطأ في الخادم'
  });
});

// معالجة المسارات غير الموجودة
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'المسار غير موجود'
  });
});

// تشغيل الخادم
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✓ الخادم يعمل على المنفذ ${PORT}`);
  console.log(`✓ البيئة: ${process.env.NODE_ENV || 'development'}`);
});
