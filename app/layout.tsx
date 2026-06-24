import type { Metadata } from 'next'
import './globals.css'
import { Toaster } from 'react-hot-toast'

export const metadata: Metadata = {
  title: 'Samandar — Full-Stack Developer',
  description: 'Full-Stack Developer & Telegram Bot Specialist. Python, Django, React, Next.js.',
  keywords: ['Full-Stack Developer', 'Python', 'Django', 'React', 'Telegram Bot', 'Uzbekistan'],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uz">
      <body>
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: '#1a1a24',
              color: '#f0f0f5',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '12px',
              fontFamily: "'Space Grotesk', sans-serif",
            },
          }}
        />
      </body>
    </html>
  )
}
