'use client'
import { SectionLabel } from './AboutSection'

interface ContactProps {
  about: {
    email?: string
    telegramUsername?: string
    githubUsername?: string
  }
}

export default function ContactSection({ about }: ContactProps) {
  return (
    <section id="contact" style={{
      padding: '6rem 2rem 8rem',
      background: 'var(--bg2)',
    }}>
      <div style={{ maxWidth: '700px', margin: '0 auto' }}>
        <SectionLabel label="Bog'lanish" />

        <div style={{
          background: 'var(--bg3)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-lg)',
          padding: '3rem',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute', inset: 0,
            backgroundImage: 'radial-gradient(circle at 50% 0%, rgba(139,124,248,0.08) 0%, transparent 60%)',
            pointerEvents: 'none',
          }} />

          <p style={{ fontSize: '16px', color: 'var(--text2)', marginBottom: '2.5rem', position: 'relative' }}>
            Loyiha yoki hamkorlik bo'yicha murojaat qiling — doim ochiqman!
          </p>

          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap', position: 'relative' }}>
            {about.telegramUsername && (
              <a href={`https://t.me/${about.telegramUsername}`} target="_blank" style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                padding: '12px 24px',
                background: '#229ED9',
                borderRadius: '10px',
                fontSize: '15px', fontWeight: 500,
                color: '#fff',
                transition: 'opacity 0.2s, transform 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.opacity = '0.85'; e.currentTarget.style.transform = 'translateY(-1px)' }}
              onMouseLeave={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'translateY(0)' }}
              >
                Telegram
              </a>
            )}

            {about.githubUsername && (
              <a href={`https://github.com/${about.githubUsername}`} target="_blank" style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                padding: '12px 24px',
                background: '#24292F',
                borderRadius: '10px',
                fontSize: '15px', fontWeight: 500,
                color: '#fff',
                transition: 'opacity 0.2s, transform 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.opacity = '0.85'; e.currentTarget.style.transform = 'translateY(-1px)' }}
              onMouseLeave={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'translateY(0)' }}
              >
                GitHub
              </a>
            )}

            {about.email && (
              <a href={`mailto:${about.email}`} style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                padding: '12px 24px',
                background: 'transparent',
                border: '1px solid var(--border2)',
                borderRadius: '10px',
                fontSize: '15px', fontWeight: 500,
                color: 'var(--text2)',
                transition: 'all 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--purple)'; e.currentTarget.style.color = 'var(--text)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border2)'; e.currentTarget.style.color = 'var(--text2)' }}
              >
                Email
              </a>
            )}
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: '3rem', color: 'var(--text3)', fontSize: '13px', fontFamily: 'var(--mono)' }}>
          Built with Next.js & MongoDB — {new Date().getFullYear()}
        </div>
      </div>
    </section>
  )
}
