'use client';

import { useChapterStore } from '../store/chapterStore';
import { chapters } from '../lib/chapters';
import Link from 'next/link';
import { useEffect } from 'react';

export default function ChapterNav({ currentSlug }: { currentSlug: string }) {
  const { completedChapters, currentChapter, setCurrentChapter } = useChapterStore();

  useEffect(() => {
    setCurrentChapter(currentSlug);
  }, [currentSlug, setCurrentChapter]);

  return (
    <nav className="bg-slate-800 p-4 rounded-lg">
      <h2 className="text-xl font-bold mb-4 text-white">章節列表</h2>
      <ul>
        {chapters.map((chapter, index) => {
          const isCompleted = completedChapters.includes(chapter.slug);
          const isCurrent = currentChapter === chapter.slug;
          const isLocked = !isCompleted && index > 0 && !completedChapters.includes(chapters[index - 1].slug);

          return (
            <li key={chapter.slug} className="mb-2">
              <Link href={`/chapter/${chapter.slug}`}>
                <a className={`flex items-center p-2 rounded-md transition-colors ${
                  isCurrent ? 'bg-purple-600 text-white' : 'hover:bg-slate-700'
                } ${isLocked ? 'text-gray-500 cursor-not-allowed' : 'text-white'}`}>
                  <span className="mr-2">{isCompleted ? '✓' : isLocked ? '🔒' : '○'}</span>
                  <span>{chapter.title}</span>
                </a>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
