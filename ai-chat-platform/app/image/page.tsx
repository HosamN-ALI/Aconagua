'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ImagePage() {
  const [prompt, setPrompt] = useState('');
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || loading) return;

    setLoading(true);
    setImageUrl(null);

    try {
      const response = await fetch('/api/image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate image');
      }

      const data = await response.json();
      setImageUrl(data.image);
    } catch (error) {
      console.error('Image generation error:', error);
      alert('حدث خطأ أثناء توليد الصورة. تأكد من تكوين REPLICATE_API_TOKEN');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-4xl mx-auto p-4">
        <div className="mb-4">
          <Link
            href="/"
            className="inline-flex items-center text-purple-600 dark:text-purple-400 hover:underline"
          >
            ← العودة للرئيسية
          </Link>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-6">
            <h1 className="text-2xl font-bold text-white">🎨 توليد الصور</h1>
            <p className="text-purple-100 mt-1">مدعوم بـ Replicate AI</p>
          </div>

          <form onSubmit={handleSubmit} className="p-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  اكتب وصف الصورة
                </label>
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="مثال: منظر طبيعي جميل لجبال مغطاة بالثلج عند غروب الشمس"
                  className="w-full rounded-xl border border-gray-300 dark:border-gray-600 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white resize-none"
                  rows={4}
                  disabled={loading}
                />
              </div>
              <button
                type="submit"
                disabled={loading || !prompt.trim()}
                className="w-full px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:from-purple-600 hover:to-pink-600 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed transition-all font-semibold text-lg"
              >
                {loading ? 'جاري التوليد... (قد يستغرق دقيقة)' : '🎨 ولّد الصورة'}
              </button>
            </div>
          </form>

          {loading && (
            <div className="p-6 border-t dark:border-gray-700">
              <div className="flex flex-col items-center justify-center space-y-4">
                <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-purple-500"></div>
                <p className="text-gray-600 dark:text-gray-400">جاري توليد الصورة...</p>
              </div>
            </div>
          )}

          {imageUrl && !loading && (
            <div className="p-6 border-t dark:border-gray-700">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  النتيجة:
                </h3>
                <div className="rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
                  <img
                    src={imageUrl}
                    alt={prompt}
                    className="w-full h-auto"
                  />
                </div>
                <div className="flex gap-2">
                  <a
                    href={imageUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors text-center"
                  >
                    فتح الصورة
                  </a>
                  <button
                    onClick={() => {
                      setImageUrl(null);
                      setPrompt('');
                    }}
                    className="flex-1 px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                  >
                    إنشاء صورة جديدة
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="mt-6 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
            💡 نصائح لوصف أفضل:
          </h3>
          <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
            <li>• كن محدداً في الوصف</li>
            <li>• استخدم صفات واضحة (ألوان، أحجام، مشاعر)</li>
            <li>• اذكر الأسلوب المطلوب (واقعي، كرتوني، فني...)</li>
            <li>• يمكنك الكتابة بالعربية أو الإنجليزية</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
