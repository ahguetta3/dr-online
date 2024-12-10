const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const path = require('path');
const User = require('./models/User');
const Appointment = require('./models/Appointment');
const Prescription = require('./models/Prescription');
const Review = require('./models/Review');

// تحميل المتغيرات البيئية
dotenv.config({ path: path.join(__dirname, '../.env') });

// الاتصال بقاعدة البيانات
mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/dr-online', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('تم الاتصال بقاعدة البيانات'))
.catch(err => console.error('خطأ في الاتصال بقاعدة البيانات:', err));

// البيانات التجريبية
const users = [
  {
    name: 'أحمد محمد',
    email: 'ahmed@example.com',
    password: '123456',
    phoneNumber: '0123456789',
    role: 'doctor',
    verified: true,
    specialization: 'طب باطني',
    licenseNumber: 'DOC123',
    experience: 10,
    education: 'دكتوراه في الطب الباطني - جامعة القاهرة',
    workingHours: '9:00 AM - 5:00 PM',
    consultationFee: 200
  },
  {
    name: 'محمد علي',
    email: 'mohamed@example.com',
    password: '123456',
    phoneNumber: '0123456788',
    role: 'user',
    verified: true,
    dateOfBirth: new Date('1990-01-01'),
    gender: 'ذكر',
    bloodType: 'A+',
    allergies: ['حساسية البنسلين'],
    chronicDiseases: ['السكري']
  }
];

const appointments = [
  {
    date: new Date(),
    time: '10:00 AM',
    type: 'video',
    status: 'pending',
    symptoms: 'صداع وحمى',
    notes: 'المريض يعاني من ارتفاع في درجة الحرارة منذ يومين'
  }
];

const prescriptions = [
  {
    medications: [
      {
        name: 'باراسيتامول',
        dosage: '500mg',
        frequency: 'مرتين يومياً',
        duration: '5 أيام'
      }
    ],
    diagnosis: 'التهاب في الحلق',
    notes: 'يجب شرب الكثير من السوائل'
  }
];

const reviews = [
  {
    rating: 5,
    comment: 'دكتور ممتاز وخدمة رائعة'
  }
];

// دالة لإضافة البيانات
const importData = async () => {
  try {
    // حذف البيانات الموجودة
    await User.deleteMany();
    await Appointment.deleteMany();
    await Prescription.deleteMany();
    await Review.deleteMany();

    // إضافة المستخدمين
    const createdUsers = await Promise.all(
      users.map(async (user) => {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        return User.create(user);
      })
    );
    const doctor = createdUsers[0];
    const patient = createdUsers[1];

    // إضافة المواعيد
    const createdAppointments = await Promise.all(
      appointments.map(appointment => {
        appointment.doctor = doctor._id;
        appointment.patient = patient._id;
        return Appointment.create(appointment);
      })
    );

    // إضافة الوصفات الطبية
    const createdPrescriptions = await Promise.all(
      prescriptions.map(prescription => {
        prescription.doctor = doctor._id;
        prescription.patient = patient._id;
        prescription.appointment = createdAppointments[0]._id;
        return Prescription.create(prescription);
      })
    );

    // إضافة التقييمات
    await Promise.all(
      reviews.map(review => {
        review.doctor = doctor._id;
        review.patient = patient._id;
        review.appointment = createdAppointments[0]._id;
        return Review.create(review);
      })
    );

    console.log('تم إضافة البيانات التجريبية بنجاح');
    process.exit();
  } catch (error) {
    console.error('خطأ:', error);
    process.exit(1);
  }
};

// تشغيل السكربت
importData();
