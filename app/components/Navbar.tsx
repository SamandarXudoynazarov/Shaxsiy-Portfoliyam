'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

interface NavbarProps {
  about: { name: string; githubUsername?: string }
}

export default function Navbar({ about }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { href: '#about', label: 'Haqimda' },
    { href: '#skills', label: "Ko'nikmalar" },
    { href: '#projects', label: 'Loyihalar' },
    { href: '#contact', label: "Bog'lanish" },
  ]

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      padding: '0 2rem',
      height: '64px',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      background: scrolled ? 'rgba(10,10,15,0.85)' : 'transparent',
      backdropFilter: scrolled ? 'blur(12px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : 'none',
      transition: 'all 0.3s ease',
    }}>
      <a href="#" style={{ fontFamily: 'var(--mono)', fontSize: '15px', color: 'var(--purple2)', fontWeight: 500 }}>
        {about.name}.dev
      </a>

      <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
        {links.map(l => (
          <a key={l.href} href={l.href} style={{
            fontSize: '14px', color: 'var(--text2)',
            transition: 'color 0.2s',
          }}
          onMouseEnter={e => (e.currentTarget.style.color = 'var(--text)')}
          onMouseLeave={e => (e.currentTarget.style.color = 'var(--text2)')}
          >
            {l.label}
          </a>
        ))}
        <Link href="/admin" style={{
          fontSize: '13px', padding: '6px 16px',
          border: '1px solid var(--border2)', borderRadius: '8px',
          color: 'var(--text2)', transition: 'all 0.2s',
        }}
        onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--purple)'; e.currentTarget.style.color = 'var(--purple2)' }}
        onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border2)'; e.currentTarget.style.color = 'var(--text2)' }}
        >
          Admin
        </Link>
      </div>
    </nav>
  )
}
