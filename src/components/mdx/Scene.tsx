'use client'

import { useState } from 'react'
import Image from 'next/image'

interface SceneProps {
  src: string
  alt: string
  caption?: string
}

export function Scene({ src, alt, caption }: SceneProps) {
  const [error, setError] = useState(false)

  if (error) {
    return (
      <div className="my-8 p-6 bg-red-900/30 border-2 border-red-500 rounded-lg text-center">
        <p className="text-red-300">🎨 場景圖片載入中...</p>
        <p className="text-sm text-gray-400 mt-2">{caption || alt}</p>
      </div>
    )
  }

  return (
    <figure className="my-8">
      <img
        src={src}
        alt={alt}
        onError={() => setError(true)}
        className="w-full rounded-lg shadow-2xl"
      />
      {caption && (
        <figcaption className="text-center text-sm text-gray-400 mt-2">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}
