import type { MDXComponents } from 'mdx/types'

function Quiz({ question, options }: { question: string; options: string[] }) {
  return (
    <div className="my-8 p-6 bg-purple-900/30 border-2 border-purple-500 rounded-lg">
      <h3 className="text-xl font-bold mb-4 text-purple-200">⚡ {question}</h3>
      <div className="space-y-2">
        {options.map((opt, i) => (
          <button 
            key={i} 
            className="block w-full text-left p-3 bg-purple-800/50 rounded hover:bg-purple-700 transition-colors"
          >
            {opt}
          </button>
        ))}
      </div>
      <p className="mt-4 text-sm text-gray-400">💡 提示：點擊選項查看答案（功能開發中...）</p>
    </div>
  )
}

function Scene({ src, alt, caption }: { src: string; alt: string; caption?: string }) {
  return (
    <figure className="my-8">
      <img src={src} alt={alt} className="w-full rounded-lg shadow-2xl" />
      {caption && (
        <figcaption className="text-center text-sm text-gray-400 mt-2">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    Quiz,
    Scene,
    ...components,
  }
}
