# 🚀 دليل إعداد منصة الذكاء الاصطناعي

## ✅ المتطلبات الأساسية

قبل البدء، تأكد من أن لديك:
- Node.js 18+ مثبت
- pnpm مثبت
- حساب على [Supabase](https://supabase.com)
- مفتاح API من [Requesty](https://requesty.ai)
- مفتاح API من [Replicate](https://replicate.com)

## 📦 الخطوات

### 1️⃣ الحصول على مفاتيح Supabase

1. اذهب إلى: https://supabase.com/dashboard/project/fgahwnlwshkzqalbxyfd/settings/api
2. انسخ المفاتيح التالية:
   - **Project URL**: `https://fgahwnlwshkzqalbxyfd.supabase.co` (موجود بالفعل)
   - **anon public key**: انسخه من صفحة API Settings
   - **service_role key**: انسخه من صفحة API Settings (⚠️ سري جداً!)

### 2️⃣ تحديث ملف .env.local

افتح ملف `.env.local` وأضف المفاتيح:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://fgahwnlwshkzqalbxyfd.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<ضع المفتاح هنا>
SUPABASE_SERVICE_ROLE_KEY=<ضع المفتاح هنا>

# Requesty AI Configuration (للدردشة)
REQUESTY_API_KEY=<ضع مفتاح Requesty هنا>
REQUESTY_API_URL=https://router.requesty.ai/v1

# Replicate Configuration (لتوليد الصور)
REPLICATE_API_TOKEN=<ضع مفتاح Replicate هنا>
```

### 3️⃣ إعداد قاعدة البيانات

1. اذهب إلى: https://supabase.com/dashboard/project/fgahwnlwshkzqalbxyfd/editor
2. اضغط على **SQL Editor**
3. انسخ محتوى ملف `supabase/migrations/20240101000000_initial_schema.sql`
4. الصقه في SQL Editor واضغط **Run**
5. تأكد من ظهور رسالة نجاح

### 4️⃣ تشغيل التطبيق

```bash
# تثبيت الاعتماديات (تم بالفعل)
pnpm install

# تشغيل سيرفر التطوير
pnpm dev
```

سيعمل التطبيق على: **http://localhost:3000**

## 🧪 اختبار الميزات

### اختبار الدردشة:
1. افتح http://localhost:3000/chat
2. اكتب رسالة
3. تأكد من حصولك على رد من AI

### اختبار توليد الصور:
1. افتح http://localhost:3000/image
2. اكتب وصف للصورة المطلوبة
3. انتظر (قد يستغرق دقيقة)
4. تأكد من ظهور الصورة

## 🔑 الحصول على API Keys

### Requesty AI:
1. اذهب إلى https://requesty.ai
2. سجّل دخول أو أنشئ حساب
3. اذهب إلى Dashboard > API Keys
4. انسخ المفتاح

### Replicate:
1. اذهب إلى https://replicate.com
2. سجّل دخول أو أنشئ حساب
3. اذهب إلى Account > API Tokens
4. انسخ المفتاح

## 📊 التحقق من قاعدة البيانات

بعد إعداد قاعدة البيانات، يجب أن تحتوي على:
- ✅ جدول `conversations` - لحفظ المحادثات
- ✅ جدول `generated_images` - لحفظ الصور المولدة

يمكنك التحقق من Supabase Dashboard > Table Editor

## ⚠️ استكشاف الأخطاء

### خطأ: "REQUESTY_API_KEY not configured"
- تأكد من إضافة المفتاح في `.env.local`
- أعد تشغيل السيرفر بعد التعديل

### خطأ: "REPLICATE_API_TOKEN not configured"
- تأكد من إضافة المفتاح في `.env.local`
- أعد تشغيل السيرفر بعد التعديل

### خطأ: "Failed to connect to Supabase"
- تأكد من صحة URL و anon key
- تأكد من تشغيل قاعدة البيانات

## 🎉 بعد الإعداد

الآن يمكنك:
- ✅ الدردشة مع GPT-4 عبر Requesty
- ✅ توليد الصور عبر Replicate
- ✅ حفظ كل شيء في Supabase
- ✅ عرض السجلات من قاعدة البيانات

## 📁 هيكل المشروع

```
ai-chat-platform/
├── app/
│   ├── api/
│   │   ├── chat/       # Chat API endpoint
│   │   └── image/      # Image generation API
│   ├── chat/           # Chat page
│   ├── image/          # Image generation page
│   ├── layout.tsx      # Root layout
│   ├── page.tsx        # Home page
│   └── globals.css     # Global styles
├── lib/
│   └── supabase/       # Supabase client utilities
├── supabase/
│   └── migrations/     # Database migrations
├── .env.local          # Environment variables
└── package.json        # Dependencies
```

## 🚀 النشر (اختياري)

يمكنك نشر التطبيق على:
- **Vercel** (موصى به لـ Next.js)
- **Netlify**
- **Railway**

تأكد من إضافة متغيرات البيئة في لوحة التحكم.
