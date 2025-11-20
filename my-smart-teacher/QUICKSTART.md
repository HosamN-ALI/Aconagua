# 🚀 دليل البدء السريع - Saudi Smart Math Tutor

## خطوات سريعة للبدء في التطوير

### 1️⃣ تثبيت المتطلبات

تأكد من تثبيت:
- Node.js 18+
- PostgreSQL 14+
- npm أو yarn

### 2️⃣ الإعداد الأولي

```bash
# استنساخ المشروع
git clone <repo-url>
cd my-smart-teacher

# تثبيت تبعيات Backend
npm install

# تثبيت تبعيات Frontend
cd frontend
npm install
cd ..
```

### 3️⃣ إعداد قاعدة البيانات

```bash
# نسخ ملف البيئة
cp .env.example .env

# عدّل .env وأضف:
# DATABASE_URL="postgresql://user:password@localhost:5432/smart_teacher"

# إنشاء قاعدة البيانات
npx prisma generate
npx prisma db push
```

### 4️⃣ تشغيل المشروع

**Terminal 1 - Backend:**
```bash
npm run start:dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

### 5️⃣ الوصول للتطبيق

- Frontend: http://localhost:3000
- Backend API: http://localhost:3000
- Swagger Docs: http://localhost:3000/api/docs

---

## 📚 ملفات مهمة يجب قراءتها

1. `.blackbox/rules/01-architecture.md` - فهم المعمارية
2. `.blackbox/rules/02-tech-stack.md` - التقنيات المستخدمة
3. `.blackbox/rules/03-atomic-design.md` - قواعد Frontend
4. `docs/MASTER_PLAN.md` - خارطة الطريق

---

## 🎯 كيف أبدأ التطوير؟

### إضافة API جديد:

1. أنشئ controller في الوحدة المناسبة
2. أضف service method
3. استخدم Swagger decorators
4. اختبر في http://localhost:3000/api/docs

### إضافة مكون Frontend:

1. حدد المستوى (Atom/Molecule/Organism)
2. أنشئ الملف في المجلد المناسب
3. استخدم TypeScript + Tailwind
4. export من index.ts

### إضافة جدول في قاعدة البيانات:

1. عدّل `prisma/schema.prisma`
2. نفّذ `npx prisma db push`
3. نفّذ `npx prisma generate`

---

## ⚠️ قواعد مهمة

❌ **لا تفعل:**
- استيراد وحدة من وحدة مباشرة
- تعديل Shared Kernel ليعتمد على وحدات
- جعل curriculum تعتمد على ai-tutor

✅ **افعل:**
- استخدم Result<T> في Services
- وثّق APIs بـ Swagger
- اتبع Atomic Design
- استخدم TypeScript Strict Mode

---

**جاهز للبدء؟ ابدأ من Phase 2 في MASTER_PLAN.md**
