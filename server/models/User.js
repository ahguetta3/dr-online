const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const validatePassword = (password) => {
  // تحقق من وجود حرف كبير
  const hasUpperCase = /[A-Z]/.test(password);
  // تحقق من وجود حرف صغير
  const hasLowerCase = /[a-z]/.test(password);
  // تحقق من وجود رقم
  const hasNumber = /\d/.test(password);
  // تحقق من وجود حرف خاص
  const hasSpecial = /[@$!%*?&]/.test(password);
  // تحقق من الطول
  const isLongEnough = password.length >= 8;

  console.log('Password validation:', {
    hasUpperCase,
    hasLowerCase,
    hasNumber,
    hasSpecial,
    isLongEnough,
    password
  });

  return hasUpperCase && hasLowerCase && hasNumber && hasSpecial && isLongEnough;
};

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'الرجاء إدخال الاسم'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'الرجاء إدخال البريد الإلكتروني'],
    unique: true,
    lowercase: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'الرجاء إدخال بريد إلكتروني صحيح'
    ]
  },
  password: {
    type: String,
    required: [true, 'كلمة المرور مطلوبة'],
    minlength: [8, 'كلمة المرور يجب أن تكون 8 أحرف على الأقل'],
    validate: {
      validator: validatePassword,
      message: 'كلمة المرور يجب أن تحتوي على حرف كبير، حرف صغير، رقم، وحرف خاص'
    },
    select: false
  },
  phoneNumber: {
    type: String,
    required: [true, 'الرجاء إدخال رقم الهاتف'],
    validate: {
      validator: function(v) {
        // يقبل الأرقام التي تبدأ بـ + أو رقم، ويجب أن تكون بين 9-15 رقم
        return /^(\+|[0-9])[0-9]{8,14}$/.test(v);
      },
      message: 'الرجاء إدخال رقم هاتف صحيح'
    }
  },
  role: {
    type: String,
    enum: ['user', 'doctor', 'admin'],
    default: 'user'
  },
  avatar: {
    type: String,
    default: '/uploads/avatars/default.png'
  },
  verified: {
    type: Boolean,
    default: false
  },
  verificationToken: String,
  verificationTokenExpires: Date,
  resetPasswordToken: String,
  resetPasswordExpire: Date,

  // حقول إضافية للمريض
  dateOfBirth: Date,
  gender: {
    type: String,
    enum: ['ذكر', 'أنثى']
  },
  bloodType: String,
  allergies: [String],
  chronicDiseases: [String],

  // حقول إضافية للطبيب
  specialization: String,
  licenseNumber: String,
  experience: Number,
  education: String,
  workingHours: String,
  consultationFee: Number,
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0
  },
  reviews: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Review'
  }]
}, {
  timestamps: true
});

// تشفير كلمة المرور
UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// مقارنة كلمة المرور
UserSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// إنشاء توكن إعادة تعيين كلمة المرور
UserSchema.methods.createPasswordResetToken = function() {
  const resetToken = crypto.randomBytes(20).toString('hex');

  this.resetPasswordToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000; // 10 دقائق

  return resetToken;
};

module.exports = mongoose.model('User', UserSchema);
