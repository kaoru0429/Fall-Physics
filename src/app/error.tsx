'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('應用程式錯誤:', error)
  }, [error])

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center text-white p-6">
      <div className="bg-red-900/30 border-2 border-red-500 rounded-lg p-8 max-w-md w-full text-center">
        <h2 className="text-3xl font-bold mb-4">⚠️ 系統發生錯誤</h2>
        <p className="text-red-300 mb-6">
          抱歉，物理異世界遇到了一些問題。請嘗試重新載入頁面。
        </p>
        <div className="flex justify-center space-x-4">
          <button
            onClick={() => reset()}
            className="px-6 py-3 bg-purple-600 rounded-lg hover:bg-purple-700 transition"
          >
            重新嘗試
          </button>
          <Link href="/" className="px-6 py-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition">
            返回首頁
          </Link>
        </div>
        {process.env.NODE_ENV === 'development' && (
          <details className="mt-6 text-left">
            <summary className="cursor-pointer text-gray-400">開發者資訊</summary>
            <pre className="mt-2 p-4 bg-gray-800 rounded text-sm text-gray-300 overflow-auto">
              {error.message}
            </pre>
          </details>
        )}
      </div>
    </div>
  )
}
