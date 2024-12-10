const jwt = require('jsonwebtoken');
const User = require('../models/User');

// حماية المسارات
exports.protect = async (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'غير مصرح لك بالوصول إلى هذا المسار'
      });
    }

    try {
      // التحقق من التوكن
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id);
      next();
    } catch (err) {
      return res.status(401).json({
        success: false,
        message: 'غير مصرح لك بالوصول إلى هذا المسار'
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

// التحقق من الصلاحيات
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: 'غير مصرح لك بالوصول إلى هذا المسار'
      });
    }
    next();
  };
};
