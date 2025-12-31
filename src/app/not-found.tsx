import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center text-white">
      <h1 className="text-6xl font-bold">404</h1>
      <p className="text-2xl mt-4 mb-8">找不到此章節</p>
      <Link href="/" className="px-6 py-3 bg-purple-600 rounded-lg hover:bg-purple-700 transition">
        返回首頁
      </Link>
    </div>
  )
}
