'use client'

interface HeroProps {
  about: {
    name: string
    title: string
    bio: string
    telegramUsername?: string
    githubUsername?: string
    photoUrl?: string
  }
}

export default function Hero({ about }: HeroProps) {
  return (
    <section style={{
      minHeight: '100vh',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '6rem 2rem 4rem',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Background grid */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'radial-gradient(circle at 25% 25%, rgba(139,124,248,0.08) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(52,211,153,0.06) 0%, transparent 50%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '1000px', width: '100%', position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', gap: '4rem', flexWrap: 'wrap' }} className="hero-container">

        {/* Left: text */}
        <div style={{ flex: 1, minWidth: '300px' }}>
          {/* Badge */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            padding: '6px 16px',
            background: 'rgba(139,124,248,0.1)',
            border: '1px solid rgba(139,124,248,0.2)',
            borderRadius: '100px',
            marginBottom: '2rem',
            fontSize: '13px', color: 'var(--purple2)',
            fontFamily: 'var(--mono)',
          }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--teal)', display: 'inline-block', animation: 'pulse 2s infinite' }} />
            Ishga tayyor
          </div>

          <h1 style={{
            fontSize: 'clamp(2rem, 5vw, 3.8rem)',
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            marginBottom: '1.5rem',
          }}>
            Salom, men{' '}
            <span style={{
              background: 'linear-gradient(135deg, var(--purple2), var(--teal2))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
              {about.name}
            </span>
            <br />
            <span style={{ color: 'var(--text2)', fontSize: '0.6em', fontWeight: 400 }}>
              {about.title}
            </span>
          </h1>

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <a href="#projects" style={{
              padding: '12px 28px',
              background: 'linear-gradient(135deg, var(--purple), #6c63e8)',
              borderRadius: '10px', fontSize: '15px', fontWeight: 500,
              color: '#fff', transition: 'opacity 0.2s, transform 0.2s', display: 'inline-block',
            }}
            onMouseEnter={e => { e.currentTarget.style.opacity = '0.85'; e.currentTarget.style.transform = 'translateY(-1px)' }}
            onMouseLeave={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'translateY(0)' }}
            >
              Loyihalarimni ko'rish →
            </a>
            <a href="#contact" style={{
              padding: '12px 28px', background: 'transparent',
              border: '1px solid var(--border2)', borderRadius: '10px',
              fontSize: '15px', fontWeight: 500, color: 'var(--text2)', transition: 'all 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--purple)'; e.currentTarget.style.color = 'var(--text)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border2)'; e.currentTarget.style.color = 'var(--text2)' }}
            >
              Bog'lanish
            </a>
          </div>

          {/* Social links */}
          <div style={{ display: 'flex', gap: '16px', marginTop: '3rem' }}>
            {about.githubUsername && (
              <a href={`https://github.com/${about.githubUsername}`} target="_blank"
                style={{ fontSize: '13px', color: 'var(--text3)', fontFamily: 'var(--mono)', transition: 'color 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--text)'}
                onMouseLeave={e => e.currentTarget.style.color = 'var(--text3)'}
              >
                github/{about.githubUsername}
              </a>
            )}
            {about.telegramUsername && (
              <a href={`https://t.me/${about.telegramUsername}`} target="_blank"
                style={{ fontSize: '13px', color: 'var(--text3)', fontFamily: 'var(--mono)', transition: 'color 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--teal)'}
                onMouseLeave={e => e.currentTarget.style.color = 'var(--text3)'}
              >
                t.me/{about.telegramUsername}
              </a>
            )}
          </div>
        </div>

        {/* Right: photo */}
        <div style={{ flexShrink: 0, display: 'flex', justifyContent: 'center' }}>
          <div style={{ position: 'relative' }}>
            {/* Glow ring */}
            <div style={{
              position: 'absolute', inset: '-3px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, var(--purple), var(--teal))',
              zIndex: 0,
            }} />
            {/* Photo */}
            <img
              src={about.photoUrl || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwbPOjDt79Sh_L4dCMadisaVTtgQTHCJenMg&s"}
              alt={about.name}
              style={{
                width: '220px', height: '220px',
                borderRadius: '50%',
                objectFit: 'cover',
                display: 'block',
                position: 'relative', zIndex: 1,
                border: '4px solid var(--bg)',
              }}
            />
            {/* Online dot */}
            <div style={{
              position: 'absolute', bottom: '14px', right: '14px',
              width: '18px', height: '18px',
              borderRadius: '50%',
              background: 'var(--teal)',
              border: '3px solid var(--bg)',
              zIndex: 2,
              animation: 'pulse 2s infinite',
            }} />
          </div>
        </div>

      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
        @media (max-width: 768px) {
          .hero-container {
            gap: 2rem !important;
            justify-content: center !important;
            text-align: center !important;
          }
        }
      `}</style>
    </section>
  )
}