# 📹 Video Analyzer - محلل الفيديو الشامل

## نظرة عامة / Overview

أداة متقدمة لتحليل الفيديو بشكل شامل تقوم بـ:
- 🎬 استخراج وتحليل إطارات الفيديو بالثانية
- 🎤 تحويل الصوت إلى نص (Transcription) باستخدام OpenAI Whisper
- 📊 تحليل تقني مفصل لكل إطار (السطوع، التباين، التعقيد، إلخ)
- 📝 إنشاء تقرير Markdown شامل كمادة تدريبية

**Advanced video analysis tool that:**
- 🎬 Extracts and analyzes video frames per second
- 🎤 Transcribes audio to text using OpenAI Whisper
- 📊 Provides detailed technical analysis for each frame
- 📝 Generates comprehensive Markdown training material

---

## المميزات / Features

### ✨ التحليل البصري / Visual Analysis
- استخراج الإطارات بفاصل زمني قابل للتخصيص
- تحليل السطوع والتباين لكل إطار
- كشف الحواف وتحديد تعقيد المشهد
- حساب الألوان السائدة
- حفظ جميع الإطارات كصور JPG

### 🎤 تحليل الصوت / Audio Analysis
- استخراج الصوت من الفيديو
- تحويل الصوت إلى نص باستخدام Whisper AI
- تقسيم النص حسب الوقت (Time-stamped transcription)
- ربط النص بالإطارات المقابلة

### 📊 التقارير / Reports
- تقرير Markdown مفصل وجاهز للاستخدام
- صور مضمنة لكل إطار
- تحليل تقني شامل
- إحصائيات عامة عن الفيديو
- ملف JSON بالبيانات الخام

---

## التثبيت / Installation

### المتطلبات / Requirements
```bash
# Python 3.9+
python3 --version

# تثبيت المكتبات / Install dependencies
pip install opencv-python-headless pillow requests openai-whisper torch torchvision torchaudio ffmpeg-python numpy
```

### تثبيت ffmpeg (اختياري للصوت) / Install ffmpeg (optional for audio)
```bash
# Ubuntu/Debian
sudo apt-get install ffmpeg

# macOS
brew install ffmpeg

# Amazon Linux 2023
sudo dnf install ffmpeg
```

---

## الاستخدام / Usage

### الاستخدام الأساسي / Basic Usage
```bash
python3 video_analyzer_enhanced.py "VIDEO_URL"
```

### مع تحديد الفاصل الزمني / With custom frame interval
```bash
# تحليل كل ثانية / Analyze every 1 second
python3 video_analyzer_enhanced.py "VIDEO_URL" 1.0

# تحليل كل ثانيتين / Analyze every 2 seconds
python3 video_analyzer_enhanced.py "VIDEO_URL" 2.0

# تحليل كل نصف ثانية / Analyze every 0.5 seconds
python3 video_analyzer_enhanced.py "VIDEO_URL" 0.5
```

### مثال حقيقي / Real Example
```bash
python3 video_analyzer_enhanced.py \
  "https://elhacker.info/Cursos/Certified%20Windows%20Internals%20Red%20Team%20Operator%20%5bCWI-RTO%5d/01.%20CWI-RTO%20Course%20Introduction/1.%20Welcome%20to%20the%20CWI-RTO%20Course.mp4" \
  2.0
```

---

## المخرجات / Output

بعد تشغيل الأداة، سيتم إنشاء مجلد `video_analysis/` يحتوي على:

```
video_analysis/
├── video.mp4                      # الفيديو المحمل
├── audio.wav                      # الصوت المستخرج (إن وجد)
├── video_analysis_report.md       # التقرير الشامل ⭐
├── analysis_data.json             # البيانات الخام
└── frames/                        # مجلد الإطارات
    ├── frame_0000_0.00s.jpg
    ├── frame_0001_2.00s.jpg
    ├── frame_0002_4.00s.jpg
    └── ...
```

### 📄 التقرير (video_analysis_report.md)

التقرير يحتوي على:

1. **معلومات عامة عن الفيديو**
   - المصدر، المدة، الدقة، FPS
   
2. **النص الكامل من الصوت**
   - النص الكامل
   - النص مقسم حسب الوقت

3. **تحليل الإطارات بالثانية**
   - صورة كل إطار
   - الوصف البصري
   - التفاصيل التقنية:
     - الدقة
     - السطوع (0-255)
     - التباين
     - تعقيد المشهد (low/medium/high)
     - كثافة الحواف
     - متوسط الألوان
   - النص المنطوق في تلك اللحظة

4. **الإحصائيات والتحليل**
   - متوسط السطوع
   - متوسط التباين
   - توزيع تعقيد المشاهد

---

## أمثلة الاستخدام / Use Cases

### 1. مادة تدريبية للدورات / Training Material for Courses
```bash
# تحليل فيديو تعليمي بالتفصيل
python3 video_analyzer_enhanced.py "https://example.com/course-video.mp4" 1.0
```

### 2. توثيق الفيديوهات / Video Documentation
```bash
# إنشاء توثيق شامل لفيديو
python3 video_analyzer_enhanced.py "https://example.com/demo.mp4" 2.0
```

### 3. تحليل المحتوى / Content Analysis
```bash
# تحليل محتوى الفيديو بدقة عالية
python3 video_analyzer_enhanced.py "https://example.com/content.mp4" 0.5
```

---

## التحليل التقني / Technical Analysis

### ما يتم تحليله في كل إطار / What's Analyzed Per Frame

| المعامل / Parameter | الوصف / Description | النطاق / Range |
|---------------------|---------------------|----------------|
| **السطوع / Brightness** | متوسط قيمة البكسلات | 0-255 |
| **التباين / Contrast** | الانحراف المعياري للبكسلات | 0-∞ |
| **كثافة الحواف / Edge Density** | نسبة الحواف المكتشفة | 0-1 |
| **تعقيد المشهد / Scene Complexity** | تصنيف بناءً على الحواف | low/medium/high |
| **متوسط الألوان / Average Colors** | متوسط قيم BGR | [0-255, 0-255, 0-255] |

### خوارزميات التحليل / Analysis Algorithms

- **كشف الحواف**: Canny Edge Detection
- **تحليل الألوان**: Mean Color Calculation
- **السطوع**: Grayscale Mean
- **التباين**: Standard Deviation

---

## الأداء / Performance

### سرعة التحليل / Analysis Speed
- **فيديو 5 دقائق** (تحليل كل 2 ثانية): ~2-3 دقائق
- **فيديو 10 دقائق** (تحليل كل 1 ثانية): ~5-7 دقائق
- **مع Whisper transcription**: +2-5 دقائق إضافية

### استهلاك الموارد / Resource Usage
- **الذاكرة**: ~2-4 GB (مع Whisper)
- **المساحة**: ~100-200 MB لكل 10 دقائق فيديو
- **المعالج**: يستفيد من GPU إن وجد (لـ Whisper)

---

## نصائح الاستخدام / Usage Tips

### ⚡ للحصول على أفضل أداء / For Best Performance
```bash
# استخدم فاصل زمني أكبر للفيديوهات الطويلة
python3 video_analyzer_enhanced.py "VIDEO_URL" 3.0
```

### 🎯 للحصول على أفضل دقة / For Best Accuracy
```bash
# استخدم فاصل زمني أصغر للفيديوهات القصيرة
python3 video_analyzer_enhanced.py "VIDEO_URL" 0.5
```

### 💾 لتوفير المساحة / To Save Space
- استخدم فاصل زمني أكبر (2-5 ثواني)
- احذف مجلد `frames/` بعد إنشاء التقرير إذا لم تكن بحاجة للصور

---

## استكشاف الأخطاء / Troubleshooting

### ❌ خطأ: ffmpeg not found
```bash
# الحل: تثبيت ffmpeg
sudo apt-get install ffmpeg  # Linux
brew install ffmpeg          # macOS
```

### ❌ خطأ: Out of memory
```bash
# الحل: استخدم فاصل زمني أكبر
python3 video_analyzer_enhanced.py "VIDEO_URL" 5.0
```

### ❌ خطأ: Video download failed
```bash
# تأكد من:
# 1. الرابط صحيح
# 2. الاتصال بالإنترنت متوفر
# 3. الفيديو متاح للتحميل
```

---

## التطوير المستقبلي / Future Development

- [ ] دعم تحليل الحركة بين الإطارات
- [ ] كشف الوجوه والأشياء (Object Detection)
- [ ] دعم لغات متعددة في Transcription
- [ ] تصدير إلى PDF
- [ ] واجهة ويب تفاعلية
- [ ] دعم البث المباشر (Live Streaming)

---

## الترخيص / License

MIT License - استخدم بحرية / Use freely

---

## المساهمة / Contributing

نرحب بالمساهمات! / Contributions welcome!

---

## الدعم / Support

للأسئلة والمشاكل، يرجى فتح Issue على GitHub.

For questions and issues, please open a GitHub Issue.

---

**صنع بـ ❤️ باستخدام Python, OpenCV, و Whisper AI**

**Made with ❤️ using Python, OpenCV, and Whisper AI**
