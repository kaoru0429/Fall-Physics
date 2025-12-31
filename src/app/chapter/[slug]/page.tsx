import { notFound } from 'next/navigation'

async function getChapter(slug: string) {
  try {
    // 動態導入 MDX 檔案
    const Chapter = (await import(`../../../../content/chapter-${slug}.mdx`)).default
    return Chapter
  } catch (error) {
    console.error(`Failed to load chapter: ${slug}`, error)
    return null
  }
}

export default async function ChapterPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params
  const Chapter = await getChapter(slug)
  
  if (!Chapter) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-slate-900">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* 返回首頁按鈕 */}
        <div className="mb-8">
          <a 
            href="/" 
            className="text-purple-400 hover:text-purple-300 transition"
          >
            ← 返回首頁
          </a>
        </div>
        
        {/* MDX 內容 */}
        <article className="prose prose-invert prose-lg prose-purple max-w-none">
          <Chapter />
        </article>
      </div>
    </main>
  )
}
