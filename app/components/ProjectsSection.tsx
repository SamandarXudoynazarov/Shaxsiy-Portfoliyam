'use client'
import { SectionLabel } from './AboutSection'

interface Project {
  _id: string
  title: string
  description: string
  tags: string[]
  techStack: string[]
  githubUrl?: string
  liveUrl?: string
  category: string
  featured: boolean
}

const catColors: Record<string, { bg: string; text: string; label: string }> = {
  bot: { bg: 'rgba(139,124,248,0.12)', text: 'var(--purple2)', label: 'Bot' },
  web: { bg: 'rgba(52,211,153,0.12)', text: 'var(--teal)', label: 'Web App' },
  api: { bg: 'rgba(251,191,36,0.12)', text: 'var(--amber)', label: 'API' },
  other: { bg: 'rgba(255,255,255,0.06)', text: 'var(--text2)', label: 'Boshqa' },
}

export default function ProjectsSection({ projects }: { projects: Project[] }) {
  return (
    <section id="projects" style={{ padding: '6rem 2rem', maxWidth: '1100px', margin: '0 auto' }}>
      <SectionLabel label="Loyihalar" />

      {projects.length === 0 ? (
        <div style={{
          textAlign: 'center', padding: '4rem',
          color: 'var(--text3)', fontFamily: 'var(--mono)', fontSize: '14px',
        }}>
          // loyihalar tez orada qo'shiladi
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '16px',
        }}>
          {projects.map(p => <ProjectCard key={p._id} project={p} />)}
        </div>
      )}
    </section>
  )
}

function ProjectCard({ project: p }: { project: Project }) {
  const cat = catColors[p.category] || catColors.other

  return (
    <div style={{
      background: 'var(--bg2)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-lg)',
      padding: '1.5rem',
      display: 'flex', flexDirection: 'column',
      transition: 'border-color 0.2s, transform 0.2s',
      position: 'relative',
      overflow: 'hidden',
    }}
    onMouseEnter={e => {
      e.currentTarget.style.borderColor = 'rgba(139,124,248,0.3)'
      e.currentTarget.style.transform = 'translateY(-2px)'
    }}
    onMouseLeave={e => {
      e.currentTarget.style.borderColor = 'var(--border)'
      e.currentTarget.style.transform = 'translateY(0)'
    }}
    >
      {p.featured && (
        <div style={{
          position: 'absolute', top: '16px', right: '16px',
          fontSize: '11px', padding: '3px 10px',
          background: 'rgba(251,191,36,0.12)',
          color: 'var(--amber)',
          borderRadius: '100px',
          fontFamily: 'var(--mono)',
        }}>★ Featured</div>
      )}

      <div style={{
        display: 'inline-flex', marginBottom: '1rem',
        padding: '4px 12px',
        background: cat.bg, color: cat.text,
        borderRadius: '100px', fontSize: '12px',
        fontFamily: 'var(--mono)',
        alignSelf: 'flex-start',
      }}>
        {cat.label}
      </div>

      <h3 style={{ fontSize: '17px', fontWeight: 600, marginBottom: '8px', flex: 0 }}>{p.title}</h3>
      <p style={{ fontSize: '14px', color: 'var(--text2)', lineHeight: 1.7, flex: 1, marginBottom: '1.25rem' }}>
        {p.description}
      </p>

      {p.techStack?.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '1.25rem' }}>
          {p.techStack.map((t, i) => (
            <span key={i} style={{
              fontSize: '11px', fontFamily: 'var(--mono)',
              padding: '2px 10px',
              background: 'var(--bg3)',
              border: '1px solid var(--border)',
              borderRadius: '6px',
              color: 'var(--text2)',
            }}>{t}</span>
          ))}
        </div>
      )}

      <div style={{ display: 'flex', gap: '10px' }}>
        {p.githubUrl && (
          <a href={p.githubUrl} target="_blank" style={{
            fontSize: '13px', color: 'var(--text2)',
            padding: '6px 14px',
            border: '1px solid var(--border)',
            borderRadius: '8px',
            transition: 'all 0.2s',
            display: 'flex', alignItems: 'center', gap: '6px',
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--border2)'; e.currentTarget.style.color = 'var(--text)' }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text2)' }}
          >
            GitHub →
          </a>
        )}
        {p.liveUrl && (
          <a href={p.liveUrl} target="_blank" style={{
            fontSize: '13px', color: 'var(--teal)',
            padding: '6px 14px',
            border: '1px solid rgba(52,211,153,0.2)',
            borderRadius: '8px',
            transition: 'all 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(52,211,153,0.08)' }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent' }}
          >
            Live ↗
          </a>
        )}
      </div>
    </div>
  )
}
