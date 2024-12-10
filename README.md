# Dr.Online - منصة الرعاية الصحية عن بعد

## نظرة عامة
Dr.Online هي منصة طبية متكاملة تهدف إلى تسهيل التواصل بين المرضى والأطباء عبر الإنترنت. توفر المنصة خدمات استشارات طبية عن بعد، حجز المواعيد، وخدمة الزيارات المنزلية.

## المميزات الرئيسية
- 🏥 استشارات طبية عن بعد
- 📅 نظام حجز المواعيد
- 🏠 خدمة الزيارات المنزلية
- 💬 محادثات مباشرة مع الأطباء
- 📱 واجهة مستخدم سهلة الاستخدام
- 📄 ملفات طبية رقمية
- 🔔 نظام إشعارات متكامل

## التقنيات المستخدمة
- **الواجهة الأمامية:** React.js, Material-UI
- **الخادم:** Node.js, Express.js
- **قاعدة البيانات:** MongoDB
- **المصادقة:** JWT
- **التصميم:** CSS-in-JS, RTL support

## متطلبات التشغيل
- Node.js (v14 أو أحدث)
- npm (v6 أو أحدث)
- MongoDB (v4 أو أحدث)

## تثبيت المشروع
1. استنسخ المستودع:
```bash
git clone https://github.com/yourusername/dr-online.git
```

2. ثبت اعتماديات الواجهة الأمامية:
```bash
cd client
npm install
```

3. ثبت اعتماديات الخادم:
```bash
cd ../server
npm install
```

4. أنشئ ملف `.env` في مجلد الخادم وأضف المتغيرات البيئية المطلوبة:
```env
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
PORT=5000
```

5. شغل المشروع:
```bash
# شغل الخادم
npm run server

# شغل الواجهة الأمامية (في نافذة طرفية منفصلة)
cd ../client
npm start
```

## الهيكل التنظيمي
```
dr-online/
├── client/                # مشروع React
│   ├── public/
│   └── src/
│       ├── components/    # مكونات واجهة المستخدم
│       ├── pages/        # صفحات التطبيق
│       ├── assets/       # الصور والموارد
│       └── App.js        # المكون الرئيسي
└── server/               # خادم Express
    ├── controllers/      # وحدات التحكم
    ├── models/          # نماذج قاعدة البيانات
    ├── routes/          # مسارات API
    └── index.js         # نقطة الدخول للخادم
```

## المساهمة
نرحب بمساهماتكم! يرجى اتباع هذه الخطوات:
1. افتح issue جديد لمناقشة التغيير المقترح
2. انشئ fork للمستودع
3. أنشئ فرع جديد للميزة: `git checkout -b feature/amazing-feature`
4. ارفع تغييراتك: `git commit -m 'Add amazing feature'`
5. ادفع إلى الفرع: `git push origin feature/amazing-feature`
6. افتح طلب سحب

## الترخيص
هذا المشروع مرخص تحت رخصة MIT - انظر ملف [LICENSE](LICENSE) لمزيد من التفاصيل.

## الاتصال
- الموقع: [dr-online.com](https://dr-online.com)
- البريد الإلكتروني: support@dr-online.com
- تويتر: [@dr_online](https://twitter.com/dr_online)
