import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-4xl w-full space-y-8">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
            منصة الذكاء الاصطناعي
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            دردش مع AI وولّد الصور بسهولة
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mt-12">
          <Link
            href="/chat"
            className="group relative overflow-hidden rounded-2xl bg-white dark:bg-gray-800 p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 opacity-0 group-hover:opacity-10 transition-opacity" />
            <div className="relative">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                💬 الدردشة مع AI
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                تحدث مع نموذج GPT-4 القوي من Requesty AI
              </p>
            </div>
          </Link>

          <Link
            href="/image"
            className="group relative overflow-hidden rounded-2xl bg-white dark:bg-gray-800 p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-10 transition-opacity" />
            <div className="relative">
              <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                🎨 توليد الصور
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                أنشئ صوراً مذهلة باستخدام Replicate AI
              </p>
            </div>
          </Link>
        </div>

        <div className="mt-12 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
            📊 الميزات:
          </h3>
          <ul className="space-y-2 text-gray-600 dark:text-gray-300">
            <li className="flex items-center">
              <span className="text-green-500 mr-2">✓</span>
              دردشة ذكية مع GPT-4 من Requesty
            </li>
            <li className="flex items-center">
              <span className="text-green-500 mr-2">✓</span>
              توليد صور بجودة عالية عبر Replicate
            </li>
            <li className="flex items-center">
              <span className="text-green-500 mr-2">✓</span>
              حفظ المحادثات والصور في Supabase
            </li>
            <li className="flex items-center">
              <span className="text-green-500 mr-2">✓</span>
              واجهة سريعة ومتجاوبة
            </li>
          </ul>
        </div>
      </div>
    </main>
  );
}
