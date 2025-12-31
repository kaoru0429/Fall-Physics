import type { MDXComponents } from 'mdx/types'
import { Quiz } from './components/mdx/Quiz'
import { Scene } from './components/mdx/Scene'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    Quiz,
    Scene,
    ...components,
  }
}
