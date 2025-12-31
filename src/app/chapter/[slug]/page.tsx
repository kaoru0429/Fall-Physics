import { notFound } from 'next/navigation'
import ChapterNav from '../../../components/ChapterNav'

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
  params: { slug: string }
}) {
  const { slug } = params
  const Chapter = await getChapter(slug)
  
  if (!Chapter) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-slate-900 text-white">
      <div className="container mx-auto px-6 py-12">
        <div className="mb-8">
          <a 
            href="/" 
            className="text-purple-400 hover:text-purple-300 transition"
          >
            ← 返回首頁
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <aside className="md:col-span-1">
            <ChapterNav currentSlug={slug} />
          </aside>

          <article className="md:col-span-3 prose prose-invert prose-lg prose-purple max-w-none">
            <Chapter />
          </article>
        </div>
      </div>
    </main>
  )
}
