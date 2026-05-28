// src/app/page.tsx
import { projects } from '@/data/projects'
import { fetchReadme } from '@/lib/fetchReadme'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import ProjectCard from '@/components/ProjectCard'
import About from '@/components/About'

export default async function Home() {
  const projectsWithReadme = await Promise.all(
    projects.map(async (project) => ({
      ...project,
      readme: await fetchReadme(project.repoOwner, project.repoName),
    }))
  )

  return (
    <main>
      <Navbar />
      <div className="max-w-2xl mx-auto px-8">
        <Hero />
        <section className="mb-16">
          <p className="text-xs font-semibold text-stone-400 uppercase tracking-widest mb-5">
            Projects
          </p>
          <div className="space-y-4">
            {projectsWithReadme.map((project) => (
              <ProjectCard
                key={project.repoName}
                project={project}
                readme={project.readme}
              />
            ))}
          </div>
        </section>
        <About />
      </div>
      <footer className="border-t border-stone-200 py-4 text-center mt-8">
        <p className="text-xs text-stone-400">M. Berkay Önen · 2026</p>
      </footer>
    </main>
  )
}
