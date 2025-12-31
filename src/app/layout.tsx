import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Project Newton - 物理異世界',
  description: '將觀念物理轉化為 RPG 冒險遊戲',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-TW">
      <body className="antialiased">{children}</body>
    </html>
  )
}
