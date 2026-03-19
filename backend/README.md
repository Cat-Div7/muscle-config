# 🛡️ Muscle Config CLI

**Stop configuring. Start building.** _أداة احترافية لتوليد مشاريع الـ Backend القوية باستخدام Express.js في ثوانٍ._

---

## 🚀 نظرة عامة (Overview)

**Muscle Config** هي أداة CLI متطورة مصممة لأتمتة عملية إعداد مشاريع Node.js. بدلاً من تضييع الوقت في إنشاء الفولدرات وإعداد الملفات الأساسية، تقوم **Muscle** بإنشاء بنية مشروع (Architecture) متكاملة واحترافية تعتمد على **Layered Architecture**.

### ✨ المميزات الرئيسية

- **توليد فوري للمشروع:** اختر بين **TypeScript** أو **JavaScript**.
- **دعم قواعد البيانات:** ربط جاهز مع **MongoDB (Mongoose)**.
- **بنية احترافية:** إنشاء تلقائي لهيكل (Controller - Route - Model - Service).
- **أدوات حديثة:** دعم كامل لـ `node --watch` و `tsx` لسرعة التطوير.
- **تثبيت تلقائي:** يقوم الـ CLI بتثبيت الـ Packages أوتوماتيكياً فور الانتهاء.
- **إعدادات جاهزة:** تشمل `dotenv`, `cors`, `morgan`, و `helmet` لتأمين السيرفر.

---

## 🛠️ هيكل المشروع المولد (Project Structure)

تقوم الأداة بإنشاء هيكل منظم يتبع أفضل الممارسات البرمجية:

```text
src/
├── config/         # إعدادات الداتابيز والبيئة
├── controllers/    # معالجة الطلبات والـ Logic الخاص بالتطبيق
├── models/         # تعريف الـ Schemas (Mongoose)
├── routes/         # تعريف مسارات الـ API
├── middlewares/    # برمجيات الوسيط (Security & Auth)
├── utils/          # وظائف مساعدة (Helpers)
├── app.js/ts       # تجميع الميدل وير والروتس
└── server.js/ts    # تشغيل السيرفر والاستماع للـ Port
```

🛠️ التقنيات المستخدمة في الأداة (CLI Core)
@clack/prompts: لواجهة المستخدم التفاعلية والأنيقة.

Execa: لتنفيذ أوامر الـ Terminal (مثل npm install).

Fs-Extra: للتعامل المتقدم مع نظام الملفات.

Picocolors: لتلوين وتنسيق النصوص في الـ Terminal.
