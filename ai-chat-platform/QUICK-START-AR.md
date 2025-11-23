# 🚀 البدء السريع - 2 دقيقة

## ⚡ المطلوب الآن:

### 1️⃣ افتح الرابط التالي واحصل على المفاتيح:
👉 **https://supabase.com/dashboard/project/fgahwnlwshkzqalbxyfd/settings/api**

انسخ:
- `anon` key
- `service_role` key

### 2️⃣ افتح ملف `.env.local` وعدّل السطرين:

```env
NEXT_PUBLIC_SUPABASE_ANON_KEY=المفتاح_الذي_نسخته_anon
SUPABASE_SERVICE_ROLE_KEY=المفتاح_الذي_نسخته_service_role
```

### 3️⃣ افتح SQL Editor في Supabase:
👉 **https://supabase.com/dashboard/project/fgahwnlwshkzqalbxyfd/editor**

- اضغط **SQL Editor**
- انسخ محتوى `supabase/migrations/20240101000000_initial_schema.sql`
- الصقه واضغط **Run**

### 4️⃣ شغّل التطبيق:

```bash
pnpm dev
```

### 5️⃣ افتح المتصفح:
👉 **http://localhost:3000**

---

## 🎯 الحالة:

| المكون | الحالة |
|--------|--------|
| ✅ المشروع | جاهز |
| ✅ Dependencies | مثبتة |
| ⚠️ Supabase Keys | يحتاج تحديث |
| ⚠️ Database | يحتاج إعداد |
| ✅ Requesty API | جاهز (عند إضافة المفتاح) |
| ✅ Replicate API | جاهز (عند إضافة المفتاح) |

---

## 📝 ملاحظات:

- المفاتيح موجودة في `.env.local`
- يمكنك تحديث Requesty و Replicate keys لاحقاً
- **الأهم الآن**: Supabase keys و Database setup

---

## 🆘 في حالة الأخطاء:

### "REQUESTY_API_KEY not configured"
أضف مفتاح Requesty في `.env.local` ثم أعد تشغيل `pnpm dev`

### "REPLICATE_API_TOKEN not configured"
أضف مفتاح Replicate في `.env.local` ثم أعد تشغيل `pnpm dev`

### "Failed to connect to Supabase"
تأكد من:
1. إضافة المفاتيح في `.env.local`
2. تشغيل قاعدة البيانات
3. تنفيذ SQL migration

---

## ✨ بعد الإعداد:

سيعمل كل شيء على:
- 🏠 **الرئيسية**: http://localhost:3000
- 💬 **الدردشة**: http://localhost:3000/chat
- 🎨 **الصور**: http://localhost:3000/image
