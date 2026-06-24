'use client'

interface AboutProps {
  about: {
    name: string
    bio: string
    location?: string
    email?: string
    stats?: { label: string; value: string }[]
    experience?: { company: string; role: string; period: string; description: string }[]
    education?: { school: string; degree: string; period: string }[]
  }
}

export default function AboutSection({ about }: AboutProps) {
  const stats = about.stats || []
  const experience = about.experience || []
  const education = about.education || []

  return (
    <section id="about" style={{ padding: '6rem 2rem', maxWidth: '1100px', margin: '0 auto' }}>
      <SectionLabel label="Haqimda" />

      {/* Stats row */}
      {stats.length > 0 && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${Math.min(stats.length, 4)}, 1fr)`,
          gap: '12px',
          marginBottom: '4rem',
        }}>
          {stats.map((s, i) => (
            <div key={i} style={{
              background: 'var(--bg2)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius)',
              padding: '1.5rem',
              textAlign: 'center',
            }}>
              <div style={{
                fontSize: '2rem', fontWeight: 700,
                background: i % 2 === 0
                  ? 'linear-gradient(135deg, var(--purple2), var(--teal2))'
                  : 'linear-gradient(135deg, var(--teal2), var(--purple2))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>{s.value}</div>
              <div style={{ fontSize: '13px', color: 'var(--text2)', marginTop: '4px' }}>{s.label}</div>
            </div>
          ))}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: experience.length > 0 ? '1fr 1fr' : '1fr', gap: '3rem' }}>
        {/* Bio */}
        <div>
          <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '1rem', color: 'var(--text)' }}>
            Kim men?
          </h3>
          <p style={{ color: 'var(--text2)', lineHeight: 1.9, fontSize: '15px' }}>{about.bio}</p>
          {(about.location || about.email) && (
            <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {about.location && (
                <span style={{ fontSize: '14px', color: 'var(--text3)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ color: 'var(--purple)' }}>📍</span> {about.location}
                </span>
              )}
              {about.email && (
                <span style={{ fontSize: '14px', color: 'var(--text3)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ color: 'var(--teal)' }}>✉️</span> {about.email}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Experience & Education */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {experience.length > 0 && (
            <div>
              <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '1rem' }}>Tajriba</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {experience.map((e, i) => (
                  <div key={i} style={{
                    borderLeft: '2px solid var(--purple)',
                    paddingLeft: '1rem',
                  }}>
                    <div style={{ fontWeight: 600, fontSize: '15px' }}>{e.role}</div>
                    <div style={{ color: 'var(--purple2)', fontSize: '13px' }}>{e.company}</div>
                    <div style={{ color: 'var(--text3)', fontSize: '12px', fontFamily: 'var(--mono)', margin: '2px 0 6px' }}>{e.period}</div>
                    {e.description && <div style={{ color: 'var(--text2)', fontSize: '13px' }}>{e.description}</div>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {education.length > 0 && (
            <div>
              <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '1rem' }}>Ta'lim</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {education.map((e, i) => (
                  <div key={i} style={{
                    borderLeft: '2px solid var(--teal)',
                    paddingLeft: '1rem',
                  }}>
                    <div style={{ fontWeight: 600, fontSize: '15px' }}>{e.degree}</div>
                    <div style={{ color: 'var(--teal)', fontSize: '13px' }}>{e.school}</div>
                    <div style={{ color: 'var(--text3)', fontSize: '12px', fontFamily: 'var(--mono)' }}>{e.period}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export function SectionLabel({ label }: { label: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '3rem' }}>
      <span style={{ fontFamily: 'var(--mono)', fontSize: '12px', color: 'var(--purple)', letterSpacing: '0.1em' }}>
        {'//'}
      </span>
      <h2 style={{ fontSize: '28px', fontWeight: 700, letterSpacing: '-0.01em' }}>{label}</h2>
      <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
    </div>
  )
}
