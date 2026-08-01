// src/data/projects.ts
export type Project = {
  name: string
  description: string
  liveUrl?: string
  repoOwner: string
  repoName: string
  techStack: string[]
}

export const projects: Project[] = [
  {
    name: 'HealthCheck',
    description:
      'Fact-checks health claims from social media against peer-reviewed science. Returns a transparent, sourced verdict in plain language.',
    liveUrl: 'https://claimcheck.beronen.tech',
    repoOwner: 'mberkayonen',
    repoName: 'health-claims-fact-checker',
    techStack: ['Next.js 14', 'Claude', 'RAG', 'PubMed API', 'WHO IRIS'],
  },
  {
    name: 'Personalised Financial News Feed',
    description:
      'Proof-of-concept for a portfolio-weighted AI newsfeed. Surfaces relevant financial news ranked by how much each story affects your actual holdings.',
    liveUrl: 'https://scalable.beronen.tech',
    repoOwner: 'mberkayonen',
    repoName: 'personalised-financial-news-feed',
    techStack: ['Next.js', 'Claude', 'NewsAPI', 'TypeScript'],
  },
  {
    name: 'Berlin Services Assistant',
    description:
      'Unofficial chatbot for Berlin city services. Recommends the right service from a curated set of ~13 common tasks and provides checklists of required documents, fees, and booking links.',
    liveUrl: 'https://berlin-de-online-services.vercel.app',
    repoOwner: 'mberkayonen',
    repoName: 'berlin-de-online-services',
    techStack: ['Next.js', 'Claude', 'AI SDK', 'TypeScript'],
  },
]
