'use client'
import { SectionLabel } from './AboutSection'

interface Skill { name: string; level: number; category: string }

const categoryColors: Record<string, string> = {
  Backend: 'var(--purple)',
  Frontend: 'var(--teal)',
  Bot: 'var(--amber)',
  Database: 'var(--coral)',
  DevOps: '#60a5fa',
  Other: 'var(--text2)',
}

export default function SkillsSection({ skills }: { skills: Skill[] }) {
  const categories = Array.from(new Set(skills.map(s => s.category)))

  return (
    <section id="skills" style={{
      padding: '6rem 2rem',
      background: 'var(--bg2)',
    }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <SectionLabel label="Ko'nikmalar" />

        <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
          {categories.map(cat => (
            <div key={cat}>
              <div style={{
                fontSize: '12px', fontFamily: 'var(--mono)',
                color: categoryColors[cat] || 'var(--text2)',
                marginBottom: '1rem',
                letterSpacing: '0.08em',
              }}>{cat.toUpperCase()}</div>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: '12px',
              }}>
                {skills.filter(s => s.category === cat).map((skill, i) => (
                  <SkillCard key={i} skill={skill} color={categoryColors[cat] || 'var(--text2)'} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function SkillCard({ skill, color }: { skill: Skill; color: string }) {
  return (
    <div style={{
      background: 'var(--bg3)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius)',
      padding: '1rem 1.25rem',
      transition: 'border-color 0.2s',
    }}
    onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(139,124,248,0.3)')}
    onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
        <span style={{ fontWeight: 500, fontSize: '14px' }}>{skill.name}</span>
        <span style={{ fontFamily: 'var(--mono)', fontSize: '13px', color }}>{skill.level}%</span>
      </div>
      <div style={{ height: '3px', background: 'var(--border2)', borderRadius: '2px', overflow: 'hidden' }}>
        <div style={{
          height: '100%',
          width: `${skill.level}%`,
          background: `linear-gradient(90deg, ${color}, ${color}88)`,
          borderRadius: '2px',
          transition: 'width 1s ease',
        }} />
      </div>
    </div>
  )
}
