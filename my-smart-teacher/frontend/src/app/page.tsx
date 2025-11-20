export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            المعلم الذكي
          </h1>
          <p className="text-xl text-gray-600">
            معلم الرياضيات الذكي للمنهج السعودي
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="text-4xl mb-4">📚</div>
            <h3 className="text-xl font-bold mb-2">منهج كامل</h3>
            <p className="text-gray-600">
              جميع مراحل المنهج السعودي للرياضيات من الصف الأول حتى الثاني عشر
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="text-4xl mb-4">🤖</div>
            <h3 className="text-xl font-bold mb-2">ذكاء اصطناعي</h3>
            <p className="text-gray-600">
              معلم ذكي يستخدم طريقة سقراط في التعليم لمساعدتك على الفهم
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="text-4xl mb-4">🎮</div>
            <h3 className="text-xl font-bold mb-2">تعلم بالمرح</h3>
            <p className="text-gray-600">
              نظام نقاط وشارات تحفيزية لجعل التعلم ممتعاً ومشوقاً
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">جاهز للبدء؟</h2>
          <p className="text-gray-600 mb-6">
            اختر صفك الدراسي وابدأ رحلتك التعليمية
          </p>
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-lg transition-colors">
            ابدأ الآن
          </button>
        </div>

        <div className="mt-12 text-center text-gray-500">
          <p className="text-sm">
            ⚠️ المشروع قيد التطوير - الواجهة الأمامية جاهزة والخلفية قيد التطوير
          </p>
        </div>
      </div>
    </main>
  )
}
