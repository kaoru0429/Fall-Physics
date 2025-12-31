import Link from 'next/link'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

type Chapter = {
  slug: string
  title: string
  order: number
  xp: number
}

async function getChapters(): Promise<Chapter[]> {
  const contentDir = path.join(process.cwd(), 'content')
  const files = fs.readdirSync(contentDir)

  const chapters = files
    .filter(file => file.endsWith('.mdx'))
    .map(file => {
      const filePath = path.join(contentDir, file)
      const fileContent = fs.readFileSync(filePath, 'utf8')
      const { data } = matter(fileContent)
      
      // 提取 slug，移除 'chapter-' 前綴和 '.mdx' 後綴
      // 假設文件名格式為 chapter-slug.mdx
      const slug = file.replace(/^chapter-/, '').replace(/\.mdx$/, '')

      return {
        slug,
        title: data.title || slug,
        order: data.order ?? 999,
        xp: data.xp || 0
      }
    })
    .sort((a, b) => a.order - b.order)

  return chapters
}

export default async function Home() {
  const chapters = await getChapters()

  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 py-24 bg-gradient-to-b from-slate-900 to-purple-900 text-white">
      <div className="text-center space-y-8 max-w-4xl w-full">
        <h1 className="text-6xl md:text-7xl font-bold mb-4">
          🍎 Project Newton
        </h1>
        <p className="text-2xl text-purple-200 font-semibold">
          物理異世界冒險傳說
        </p>
        <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
          歡迎來到物理異世界！在這裡，你必須運用物理知識解開謎題、擊敗 Boss，才能找到回家的路。
        </p>
        
        <div className="mt-12 w-full max-w-md mx-auto space-y-4">
          <h2 className="text-2xl font-bold text-left mb-6 border-b border-purple-500/30 pb-2">章節列表</h2>
          {chapters.map((chapter) => (
            <Link 
              key={chapter.slug}
              href={`/chapter/${chapter.slug}`} 
              className="block group"
            >
              <div className="bg-slate-800/50 hover:bg-purple-900/50 border border-slate-700 hover:border-purple-500 rounded-xl p-4 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg hover:shadow-purple-500/20 flex items-center justify-between">
                <div className="flex flex-col items-start">
                  <span className="text-purple-400 text-sm font-mono mb-1">Chapter {chapter.order}</span>
                  <span className="text-xl font-bold group-hover:text-purple-300 transition-colors">{chapter.title}</span>
                </div>
                <div className="flex items-center space-x-4">
                   <span className="text-yellow-400 text-sm font-bold bg-yellow-400/10 px-2 py-1 rounded">+{chapter.xp} XP</span>
                   <span className="text-slate-500 group-hover:text-white transition-transform group-hover:translate-x-1">→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-16 text-sm text-gray-400">
          <p>🎮 RPG 系統 | 📚 互動式學習 | 🤖 AI 生成內容</p>
        </div>
      </div>
    </main>
  )
}
