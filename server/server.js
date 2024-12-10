const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

// تحميل المتغيرات البيئية
dotenv.config();

const app = express();

// معالجة الأخطاء العامة
const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    success: false,
    message: 'حدث خطأ في الخادم',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
};

// إعداد CORS
app.use(cors({
  origin: ['https://dr-online-rdmr.vercel.app', 'http://localhost:3000'],
  credentials: true
}));

// Middleware
app.use(express.json());

// توصيل قاعدة البيانات
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('Connected to MongoDB successfully');
  console.log('MongoDB URI:', process.env.MONGODB_URI);
  
  // التحقق من الاتصال
  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'MongoDB connection error:'));
  db.once('open', function() {
    console.log('MongoDB connection is open');
  });
})
.catch(err => {
  console.error('MongoDB connection error:', err);
  process.exit(1); // إيقاف التطبيق في حالة فشل الاتصال
});

// المسارات
app.use('/api/auth', require('./routes/auth'));

// معالجة الأخطاء
app.use(errorHandler);

// تشغيل الخادم
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log('Environment:', process.env.NODE_ENV);
});
