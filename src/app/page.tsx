import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 py-24 bg-gradient-to-b from-slate-900 to-purple-900 text-white">
      <div className="text-center space-y-8 max-w-4xl">
        <h1 className="text-6xl md:text-7xl font-bold mb-4">
          🍎 Project Newton
        </h1>
        <p className="text-2xl text-purple-200 font-semibold">
          物理異世界冒險傳說
        </p>
        <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
          歡迎來到物理異世界！在這裡，你必須運用物理知識解開謎題、擊敗 Boss，才能找到回家的路。
        </p>
        
        <div className="flex gap-4 justify-center mt-12">
          <Link 
            href="/chapter/00-tutorial" 
            className="px-8 py-4 bg-purple-600 rounded-lg hover:bg-purple-700 transition-all transform hover:scale-105 font-bold text-xl shadow-lg hover:shadow-purple-500/50"
          >
            開始冒險 →
          </Link>
        </div>

        <div className="mt-16 text-sm text-gray-400">
          <p>🎮 RPG 系統 | 📚 互動式學習 | 🤖 AI 生成內容</p>
        </div>
      </div>
    </main>
  )
}
