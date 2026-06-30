'use client'

import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import type { Project } from '@/data/projects'

type Props = {
  project: Project
  readme: string
}

export default function ProjectCard({ project, readme }: Props) {
  const [expanded, setExpanded] = useState(false)

  return (
    <article className="bg-white border border-stone-200 rounded-xl p-6 shadow-sm">
      <div className="flex justify-between items-start mb-3">
        <h2 className="text-lg font-bold text-stone-900">{project.name}</h2>
        <a
          href={`https://github.com/${project.repoOwner}/${project.repoName}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub repository"
          className="text-stone-300 hover:text-stone-600 transition-colors ml-4 flex-shrink-0"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
          </svg>
        </a>
      </div>

      <p className="text-sm text-stone-600 leading-relaxed mb-4">{project.description}</p>

      <div className="flex flex-wrap gap-2 mb-5">
        {project.techStack.map((tag) => (
          <span
            key={tag}
            className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded font-medium"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between">
        {project.liveUrl ? (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View ${project.name} project`}
            className="inline-flex items-center gap-1.5 bg-stone-900 text-stone-50 text-xs font-semibold px-4 py-2 rounded-lg hover:bg-stone-700 transition-colors"
          >
            View Project
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
              <path d="M7 17L17 7M17 7H7M17 7v10" />
            </svg>
          </a>
        ) : (
          <span />
        )}

        {readme && (
          <button
            onClick={() => setExpanded((prev) => !prev)}
            className="text-xs text-amber-600 font-semibold flex items-center gap-1 hover:text-amber-700 transition-colors"
          >
            {expanded ? 'Collapse' : 'Read README'}
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              aria-hidden="true"
              style={{ transform: expanded ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </button>
        )}
      </div>

      {expanded && readme && (
        <div className="mt-5 pt-5 border-t border-stone-200">
          <div className="prose prose-stone prose-sm max-w-none">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                a: ({ href, children }) => (
                  <a href={href} target="_blank" rel="noopener noreferrer">
                    {children}
                  </a>
                ),
              }}
            >
              {readme}
            </ReactMarkdown>
          </div>
        </div>
      )}
    </article>
  )
}
