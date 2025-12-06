#!/usr/bin/env python3
"""
Video Analyzer Enhanced - تحليل شامل للفيديو مع الصوت والصورة
يقوم بتحليل الفيديو بالثانية ويولد تقرير Markdown مفصل
نسخة محسنة مع استخراج صوت بديل
"""

import cv2
import requests
import os
import json
import numpy as np
from datetime import timedelta
from pathlib import Path
import tempfile
import subprocess
import sys
from PIL import Image

class VideoAnalyzer:
    def __init__(self, video_url, output_dir="video_analysis"):
        self.video_url = video_url
        self.output_dir = Path(output_dir)
        self.output_dir.mkdir(exist_ok=True)
        self.video_path = None
        self.audio_path = None
        self.whisper_model = None
        
    def download_video(self):
        """تحميل الفيديو من URL"""
        print("📥 جاري تحميل الفيديو...")
        try:
            response = requests.get(self.video_url, stream=True, timeout=120)
            response.raise_for_status()
            
            self.video_path = self.output_dir / "video.mp4"
            total_size = 0
            with open(self.video_path, 'wb') as f:
                for chunk in response.iter_content(chunk_size=8192):
                    f.write(chunk)
                    total_size += len(chunk)
                    if total_size % (1024*1024) == 0:  # كل 1MB
                        print(f"  تم تحميل {total_size / (1024*1024):.1f} MB...")
            
            print(f"✅ تم تحميل الفيديو: {self.video_path} ({total_size / (1024*1024):.2f} MB)")
            return True
        except Exception as e:
            print(f"❌ خطأ في تحميل الفيديو: {e}")
            return False
    
    def extract_audio_subprocess(self):
        """استخراج الصوت باستخدام subprocess"""
        print("🎵 جاري استخراج الصوت...")
        try:
            self.audio_path = self.output_dir / "audio.wav"
            
            # محاولة استخدام ffmpeg مباشرة
            cmd = [
                'ffmpeg', '-i', str(self.video_path),
                '-vn', '-acodec', 'pcm_s16le',
                '-ar', '16000', '-ac', '1',
                str(self.audio_path), '-y'
            ]
            
            result = subprocess.run(
                cmd,
                stdout=subprocess.PIPE,
                stderr=subprocess.PIPE,
                timeout=300
            )
            
            if result.returncode == 0 and self.audio_path.exists():
                print(f"✅ تم استخراج الصوت: {self.audio_path}")
                return True
            else:
                print(f"⚠️ لم يتم استخراج الصوت (ffmpeg غير متوفر)")
                return False
                
        except FileNotFoundError:
            print("⚠️ ffmpeg غير مثبت - سيتم تخطي استخراج الصوت")
            return False
        except Exception as e:
            print(f"⚠️ تحذير: لم يتم استخراج الصوت: {e}")
            return False
    
    def transcribe_audio(self):
        """تحويل الصوت إلى نص باستخدام Whisper"""
        if not self.audio_path or not self.audio_path.exists():
            print("⚠️ لا يوجد ملف صوتي للتحويل")
            return None
        
        print("🎤 جاري تحويل الصوت إلى نص (قد يستغرق بعض الوقت)...")
        try:
            import whisper
            
            # تحميل نموذج Whisper (base للسرعة)
            if self.whisper_model is None:
                print("📦 جاري تحميل نموذج Whisper...")
                self.whisper_model = whisper.load_model("base")
            
            # تحويل الصوت إلى نص
            result = self.whisper_model.transcribe(
                str(self.audio_path),
                language="en",  # يمكن تغييره حسب لغة الفيديو
                verbose=False
            )
            
            print(f"✅ تم تحويل الصوت إلى نص ({len(result['segments'])} مقطع)")
            return result
        except Exception as e:
            print(f"❌ خطأ في تحويل الصوت: {e}")
            return None
    
    def analyze_frames(self, interval=1.0):
        """تحليل إطارات الفيديو بفاصل زمني محدد"""
        print(f"🎬 جاري تحليل إطارات الفيديو (كل {interval} ثانية)...")
        
        cap = cv2.VideoCapture(str(self.video_path))
        fps = cap.get(cv2.CAP_PROP_FPS)
        total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
        duration = total_frames / fps
        width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
        height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
        
        print(f"  📊 معلومات الفيديو: {width}x{height} @ {fps:.2f} FPS, المدة: {timedelta(seconds=int(duration))}")
        
        frames_data = []
        frame_interval = int(fps * interval)
        
        frame_count = 0
        saved_count = 0
        
        while True:
            ret, frame = cap.read()
            if not ret:
                break
            
            if frame_count % frame_interval == 0:
                timestamp = frame_count / fps
                
                # حفظ الإطار
                frame_filename = f"frame_{saved_count:04d}_{timestamp:.2f}s.jpg"
                frame_path = self.output_dir / "frames" / frame_filename
                frame_path.parent.mkdir(exist_ok=True)
                
                cv2.imwrite(str(frame_path), frame)
                
                # تحليل الإطار
                frame_info = self.analyze_single_frame(frame, timestamp)
                frame_info['filename'] = frame_filename
                frame_info['path'] = str(frame_path)
                
                frames_data.append(frame_info)
                saved_count += 1
                
                if saved_count % 10 == 0:
                    print(f"  📸 تم تحليل {saved_count} إطار...")
            
            frame_count += 1
        
        cap.release()
        print(f"✅ تم تحليل {len(frames_data)} إطار")
        
        return {
            'fps': fps,
            'total_frames': total_frames,
            'duration': duration,
            'resolution': f"{width}x{height}",
            'frames': frames_data
        }
    
    def analyze_single_frame(self, frame, timestamp):
        """تحليل إطار واحد"""
        # الحصول على معلومات أساسية
        height, width, channels = frame.shape
        
        # حساب السطوع المتوسط
        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        brightness = np.mean(gray)
        
        # حساب التباين
        contrast = np.std(gray)
        
        # الألوان السائدة
        avg_color = np.mean(frame, axis=(0, 1))
        
        # كشف الحواف (للحصول على فكرة عن التعقيد)
        edges = cv2.Canny(gray, 100, 200)
        edge_density = np.sum(edges > 0) / (width * height)
        
        # كشف الحركة (مقارنة مع الإطار السابق)
        # يمكن تحسينه لاحقاً
        
        return {
            'timestamp': timestamp,
            'time_formatted': str(timedelta(seconds=int(timestamp))),
            'resolution': f"{width}x{height}",
            'brightness': float(brightness),
            'contrast': float(contrast),
            'avg_color_bgr': [float(c) for c in avg_color],
            'edge_density': float(edge_density),
            'scene_complexity': 'high' if edge_density > 0.1 else 'medium' if edge_density > 0.05 else 'low',
            'visual_description': self.describe_frame(brightness, contrast, edge_density)
        }
    
    def describe_frame(self, brightness, contrast, edge_density):
        """وصف الإطار بناءً على الخصائص"""
        desc = []
        
        if brightness < 50:
            desc.append("مشهد مظلم")
        elif brightness > 200:
            desc.append("مشهد ساطع جداً")
        else:
            desc.append("إضاءة متوسطة")
        
        if contrast < 30:
            desc.append("تباين منخفض")
        elif contrast > 70:
            desc.append("تباين عالي")
        
        if edge_density > 0.1:
            desc.append("تفاصيل كثيرة")
        elif edge_density < 0.05:
            desc.append("مشهد بسيط")
        
        return ", ".join(desc)
    
    def generate_markdown_report(self, frames_analysis, transcription):
        """توليد تقرير Markdown شامل"""
        print("📝 جاري إنشاء تقرير Markdown...")
        
        md_content = []
        
        # العنوان
        md_content.append("# 📹 تقرير تحليل الفيديو الشامل\n")
        md_content.append("# Video Analysis Report - Complete Training Material\n\n")
        md_content.append(f"---\n\n")
        
        # معلومات عامة
        md_content.append("## 📊 معلومات الفيديو العامة / General Video Information\n\n")
        md_content.append(f"- **المصدر / Source**: `{self.video_url}`\n")
        md_content.append(f"- **المدة الإجمالية / Total Duration**: {timedelta(seconds=int(frames_analysis['duration']))}\n")
        md_content.append(f"- **الدقة / Resolution**: {frames_analysis['resolution']}\n")
        md_content.append(f"- **معدل الإطارات / FPS**: {frames_analysis['fps']:.2f}\n")
        md_content.append(f"- **إجمالي الإطارات / Total Frames**: {frames_analysis['total_frames']}\n")
        md_content.append(f"- **عدد الإطارات المحللة / Analyzed Frames**: {len(frames_analysis['frames'])}\n\n")
        
        # النص المستخرج من الصوت
        if transcription:
            md_content.append("## 🎤 النص الكامل من الصوت / Full Audio Transcription\n\n")
            md_content.append("### النص الكامل / Complete Text:\n\n")
            md_content.append(f"```\n{transcription['text']}\n```\n\n")
            
            md_content.append("### النص مقسم حسب الوقت / Time-Segmented Transcription:\n\n")
            for segment in transcription['segments']:
                start_time = str(timedelta(seconds=int(segment['start'])))
                end_time = str(timedelta(seconds=int(segment['end'])))
                md_content.append(f"**[{start_time} - {end_time}]**\n")
                md_content.append(f"> {segment['text'].strip()}\n\n")
        else:
            md_content.append("## 🎤 النص الكامل من الصوت / Full Audio Transcription\n\n")
            md_content.append("⚠️ **لم يتم استخراج الصوت** (ffmpeg غير متوفر في البيئة)\n\n")
            md_content.append("*Audio transcription not available (ffmpeg not installed)*\n\n")
        
        # تحليل الإطارات بالتفصيل
        md_content.append("## 🎬 تحليل الفيديو بالثانية / Frame-by-Frame Analysis\n\n")
        md_content.append("*كل إطار يحتوي على تحليل تقني مفصل للصورة*\n\n")
        md_content.append("*Each frame includes detailed technical image analysis*\n\n")
        
        for i, frame in enumerate(frames_analysis['frames']):
            md_content.append(f"### ⏱️ الثانية {frame['timestamp']:.2f} ({frame['time_formatted']})\n\n")
            
            # الصورة
            md_content.append(f"![Frame {i} at {frame['time_formatted']}](frames/{frame['filename']})\n\n")
            
            # الوصف البصري
            md_content.append(f"**الوصف البصري / Visual Description**: {frame['visual_description']}\n\n")
            
            # التفاصيل التقنية
            md_content.append("<details>\n")
            md_content.append("<summary><strong>التفاصيل التقنية / Technical Details</strong> (انقر للتوسيع / Click to expand)</summary>\n\n")
            md_content.append(f"- **الدقة / Resolution**: {frame['resolution']}\n")
            md_content.append(f"- **السطوع / Brightness**: {frame['brightness']:.2f}/255\n")
            md_content.append(f"- **التباين / Contrast**: {frame['contrast']:.2f}\n")
            md_content.append(f"- **تعقيد المشهد / Scene Complexity**: {frame['scene_complexity']}\n")
            md_content.append(f"- **كثافة الحواف / Edge Density**: {frame['edge_density']:.4f}\n")
            md_content.append(f"- **متوسط اللون (BGR) / Avg Color**: [{frame['avg_color_bgr'][0]:.1f}, {frame['avg_color_bgr'][1]:.1f}, {frame['avg_color_bgr'][2]:.1f}]\n")
            md_content.append("\n</details>\n\n")
            
            # النص المقابل من الصوت
            if transcription:
                matching_text = self.find_matching_transcription(
                    frame['timestamp'], 
                    transcription['segments']
                )
                if matching_text:
                    md_content.append("**النص المنطوق في هذه اللحظة / Spoken Text at This Moment:**\n\n")
                    md_content.append(f"> 🗣️ {matching_text}\n\n")
            
            md_content.append("---\n\n")
        
        # الإحصائيات
        md_content.append("## 📈 الإحصائيات والتحليل / Statistics & Analysis\n\n")
        
        avg_brightness = np.mean([f['brightness'] for f in frames_analysis['frames']])
        avg_contrast = np.mean([f['contrast'] for f in frames_analysis['frames']])
        avg_edge_density = np.mean([f['edge_density'] for f in frames_analysis['frames']])
        
        md_content.append("### إحصائيات عامة / General Statistics\n\n")
        md_content.append(f"- **متوسط السطوع / Average Brightness**: {avg_brightness:.2f}/255\n")
        md_content.append(f"- **متوسط التباين / Average Contrast**: {avg_contrast:.2f}\n")
        md_content.append(f"- **متوسط كثافة الحواف / Average Edge Density**: {avg_edge_density:.4f}\n\n")
        
        complexity_counts = {}
        for f in frames_analysis['frames']:
            complexity = f['scene_complexity']
            complexity_counts[complexity] = complexity_counts.get(complexity, 0) + 1
        
        md_content.append("### توزيع تعقيد المشاهد / Scene Complexity Distribution\n\n")
        for complexity, count in sorted(complexity_counts.items()):
            percentage = (count / len(frames_analysis['frames'])) * 100
            bar = "█" * int(percentage / 2)
            md_content.append(f"- **{complexity.capitalize()}**: {count} إطار ({percentage:.1f}%) {bar}\n")
        
        md_content.append("\n---\n\n")
        md_content.append("## 💡 ملاحظات / Notes\n\n")
        md_content.append("- تم تحليل الفيديو بشكل تلقائي باستخدام تقنيات معالجة الصور\n")
        md_content.append("- يمكن استخدام هذا التقرير كمادة تدريبية شاملة\n")
        md_content.append("- جميع الإطارات محفوظة في مجلد `frames/`\n\n")
        md_content.append("*This video was automatically analyzed using computer vision techniques*\n")
        md_content.append("*This report can be used as comprehensive training material*\n")
        md_content.append("*All frames are saved in the `frames/` directory*\n\n")
        
        md_content.append("---\n\n")
        md_content.append("*تم إنشاء هذا التقرير تلقائياً بواسطة Video Analyzer*\n\n")
        md_content.append("*Report automatically generated by Video Analyzer*\n")
        
        # حفظ التقرير
        report_path = self.output_dir / "video_analysis_report.md"
        with open(report_path, 'w', encoding='utf-8') as f:
            f.write(''.join(md_content))
        
        print(f"✅ تم إنشاء التقرير: {report_path}")
        return report_path
    
    def find_matching_transcription(self, timestamp, segments):
        """إيجاد النص المطابق للوقت المحدد"""
        for segment in segments:
            if segment['start'] <= timestamp <= segment['end']:
                return segment['text'].strip()
        return None
    
    def analyze(self, frame_interval=1.0):
        """تنفيذ التحليل الكامل"""
        print("🚀 بدء التحليل الشامل للفيديو...\n")
        print("=" * 60)
        
        # 1. تحميل الفيديو
        if not self.download_video():
            return False
        
        # 2. استخراج الصوت
        audio_extracted = self.extract_audio_subprocess()
        
        # 3. تحويل الصوت إلى نص
        transcription = None
        if audio_extracted:
            transcription = self.transcribe_audio()
        
        # 4. تحليل الإطارات
        frames_analysis = self.analyze_frames(interval=frame_interval)
        
        # 5. توليد التقرير
        report_path = self.generate_markdown_report(frames_analysis, transcription)
        
        # 6. حفظ البيانات الخام
        data_path = self.output_dir / "analysis_data.json"
        with open(data_path, 'w', encoding='utf-8') as f:
            json.dump({
                'video_url': self.video_url,
                'frames_analysis': {
                    'fps': frames_analysis['fps'],
                    'total_frames': frames_analysis['total_frames'],
                    'duration': frames_analysis['duration'],
                    'resolution': frames_analysis['resolution'],
                    'frame_count': len(frames_analysis['frames'])
                },
                'has_transcription': transcription is not None
            }, f, ensure_ascii=False, indent=2)
        
        print("\n" + "=" * 60)
        print(f"✅ اكتمل التحليل بنجاح!")
        print(f"\n📁 الملفات المولدة / Generated Files:")
        print(f"   📄 التقرير / Report: {report_path}")
        print(f"   📊 البيانات الخام / Raw Data: {data_path}")
        print(f"   🖼️  الإطارات / Frames: {self.output_dir / 'frames'} ({len(frames_analysis['frames'])} files)")
        print("=" * 60)
        
        return True


def main():
    if len(sys.argv) < 2:
        print("=" * 60)
        print("Video Analyzer - تحليل شامل للفيديو")
        print("=" * 60)
        print("\nالاستخدام / Usage:")
        print("  python video_analyzer_enhanced.py <video_url> [frame_interval]")
        print("\nمثال / Example:")
        print('  python video_analyzer_enhanced.py "https://example.com/video.mp4" 1.0')
        print("\nالمعاملات / Parameters:")
        print("  video_url       : رابط الفيديو / Video URL")
        print("  frame_interval  : الفاصل الزمني بالثواني (افتراضي: 1.0) / Time interval in seconds (default: 1.0)")
        print("=" * 60)
        sys.exit(1)
    
    video_url = sys.argv[1]
    frame_interval = float(sys.argv[2]) if len(sys.argv) > 2 else 1.0
    
    print(f"\n🎯 تحليل الفيديو / Analyzing Video:")
    print(f"   URL: {video_url}")
    print(f"   الفاصل الزمني / Frame Interval: {frame_interval}s\n")
    
    analyzer = VideoAnalyzer(video_url)
    success = analyzer.analyze(frame_interval=frame_interval)
    
    if success:
        print("\n✅ تم التحليل بنجاح! / Analysis completed successfully!")
    else:
        print("\n❌ فشل التحليل / Analysis failed!")
        sys.exit(1)


if __name__ == "__main__":
    main()
