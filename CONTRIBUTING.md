# دليل المساهمة في Dr.online 🤝

نحن سعداء جداً باهتمامك بالمساهمة في مشروع Dr.online! هذا الدليل سيساعدك في فهم عملية المساهمة.

## كيفية المساهمة 🌟

### 1. إعداد بيئة التطوير
1. قم بعمل Fork للمستودع على حسابك في GitHub
2. استنسخ المستودع محلياً:
```bash
git clone https://github.com/ahguetta3/dr-online.git
cd dr-online
```
3. قم بإضافة المستودع الأصلي كـ remote:
```bash
git remote add upstream https://github.com/ahguetta3/dr-online.git
```

### 2. إنشاء فرع جديد
```bash
git checkout -b feature/your-feature-name
```

### 3. معايير الكود 📝
- اتبع أسلوب التسمية camelCase للمتغيرات والدوال في JavaScript
- استخدم التعليقات لشرح الكود المعقد
- اكتب رسائل commit واضحة ومختصرة
- حافظ على تنسيق الكود متناسق

### 4. اختبار التغييرات
- تأكد من إضافة اختبارات لأي ميزة جديدة
- تأكد من اجتياز جميع الاختبارات الحالية
```bash
npm test
```

### 5. تقديم التغييرات
1. قم بعمل commit للتغييرات:
```bash
git add .
git commit -m "وصف مختصر للتغييرات"
```
2. قم بدفع التغييرات إلى مستودعك:
```bash
git push origin feature/your-feature-name
```
3. قم بإنشاء Pull Request على GitHub

## إرشادات Pull Request 📋
- استخدم عنواناً واضحاً ووصفاً مفصلاً
- أضف صور للتغييرات المرئية إن وجدت
- اربط PR بـ issue ذات صلة إن وجدت
- تأكد من اجتياز جميع الفحوصات الآلية

## أنواع المساهمات 🎯
- تصحيح الأخطاء البرمجية
- إضافة ميزات جديدة
- تحسين التوثيق
- تحسين الأداء
- إضافة اختبارات

## قواعد السلوك 🤝
- كن محترماً ومهنياً في التواصل
- تقبل النقد البناء
- ساعد الآخرين عند الحاجة
- احترم تنوع وجهات النظر

## الأمان 🔒
إذا اكتشفت ثغرة أمنية، يرجى إبلاغنا مباشرة عبر البريد الإلكتروني: security@dr-online.com

## الدعم والمساعدة ❓
- راجع [الوثائق](docs/)
- افتح issue للأسئلة العامة
- تواصل معنا عبر البريد الإلكتروني: support@dr-online.com

## الترخيص 📄
بالمساهمة في هذا المشروع، أنت توافق على ترخيص مساهمتك تحت نفس [شروط الترخيص](LICENSE) للمشروع.

شكراً لك على اهتمامك بالمساهمة في مشروع Dr.online! 🙏
