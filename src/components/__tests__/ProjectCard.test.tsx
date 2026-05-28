import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import ProjectCard from '../ProjectCard'
import type { Project } from '@/data/projects'

const project: Project = {
  name: 'HealthCheck',
  description: 'Fact-checks health claims against peer-reviewed science.',
  liveUrl: 'https://claimcheck.beronen.tech',
  repoOwner: 'mberkayonen',
  repoName: 'health-claims-fact-checker',
  techStack: ['Next.js 14', 'Claude'],
}

describe('ProjectCard', () => {
  it('renders project name, description, and tech tags', () => {
    render(<ProjectCard project={project} readme="" />)

    expect(screen.getByText('HealthCheck')).toBeInTheDocument()
    expect(screen.getByText('Fact-checks health claims against peer-reviewed science.')).toBeInTheDocument()
    expect(screen.getByText('Next.js 14')).toBeInTheDocument()
    expect(screen.getByText('Claude')).toBeInTheDocument()
  })

  it('does not render README area when collapsed', () => {
    render(<ProjectCard project={project} readme="# Hello" />)

    expect(screen.queryByRole('region', { name: /readme/i })).not.toBeInTheDocument()
    expect(screen.getByText('Read README')).toBeInTheDocument()
  })

  it('shows README content after clicking Read README', () => {
    render(<ProjectCard project={project} readme="# Hello world" />)

    fireEvent.click(screen.getByText('Read README'))

    expect(screen.getByText('Hello world')).toBeInTheDocument()
    expect(screen.getByText('Collapse')).toBeInTheDocument()
  })

  it('hides README content after clicking Collapse', () => {
    render(<ProjectCard project={project} readme="# Hello world" />)

    fireEvent.click(screen.getByText('Read README'))
    fireEvent.click(screen.getByText('Collapse'))

    expect(screen.queryByText('Hello world')).not.toBeInTheDocument()
    expect(screen.getByText('Read README')).toBeInTheDocument()
  })

  it('links View Project to the live URL', () => {
    render(<ProjectCard project={project} readme="" />)

    const link = screen.getByText('View Project').closest('a')
    expect(link).toHaveAttribute('href', 'https://claimcheck.beronen.tech')
  })

  it('links the GitHub icon to the repo URL', () => {
    render(<ProjectCard project={project} readme="" />)

    const link = screen.getByLabelText('GitHub repository')
    expect(link).toHaveAttribute('href', 'https://github.com/mberkayonen/health-claims-fact-checker')
  })
})
