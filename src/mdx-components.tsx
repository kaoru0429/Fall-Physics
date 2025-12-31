import type { MDXComponents } from 'mdx/types'
import Quiz from './components/Quiz'

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
