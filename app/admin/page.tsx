'use client'
import { useState, useEffect } from 'react'
import toast from 'react-hot-toast'

// ─── Types ───────────────────────────────────────────────────────────────────
interface Project {
  _id?: string
  title: string
  description: string
  tags: string[]
  techStack: string[]
  githubUrl: string
  liveUrl: string
  category: 'bot' | 'web' | 'api' | 'other'
  featured: boolean
  order: number
}

interface Skill { name: string; level: number; category: string }
interface Experience { company: string; role: string; period: string; description: string }
interface Education { school: string; degree: string; period: string }
interface Stat { label: string; value: string }

interface About {
  _id?: string
  name: string
  title: string
  bio: string
  location: string
  email: string
  telegramUsername: string
  githubUsername: string
  skills: Skill[]
  experience: Experience[]
  education: Education[]
  stats: Stat[]
}

const emptyProject: Project = {
  title: '', description: '', tags: [], techStack: [],
  githubUrl: '', liveUrl: '', category: 'web', featured: false, order: 0,
}

// ─── Helpers ─────────────────────────────────────────────────────────────────
const s = {
  input: {
    width: '100%', padding: '10px 14px',
    background: 'var(--bg3)', border: '1px solid var(--border2)',
    borderRadius: '8px', color: 'var(--text)',
    fontSize: '14px', fontFamily: "'Space Grotesk', sans-serif",
    outline: 'none',
  } as React.CSSProperties,
  label: { fontSize: '12px', color: 'var(--text3)', fontFamily: 'var(--mono)', display: 'block', marginBottom: '6px' } as React.CSSProperties,
  btn: (color = 'var(--purple)') => ({
    padding: '8px 18px', background: color, color: '#fff',
    border: 'none', borderRadius: '8px', fontSize: '13px', fontWeight: 500,
    cursor: 'pointer', fontFamily: "'Space Grotesk', sans-serif",
    transition: 'opacity 0.2s',
  }) as React.CSSProperties,
  btnOutline: {
    padding: '8px 18px', background: 'transparent',
    border: '1px solid var(--border2)', color: 'var(--text2)',
    borderRadius: '8px', fontSize: '13px',
    cursor: 'pointer', fontFamily: "'Space Grotesk', sans-serif",
  } as React.CSSProperties,
  card: {
    background: 'var(--bg2)', border: '1px solid var(--border)',
    borderRadius: '12px', padding: '1.5rem',
  } as React.CSSProperties,
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function AdminPage() {
  const [authed, setAuthed] = useState(false)
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [tab, setTab] = useState<'projects' | 'about'>('projects')

  // Check session
  useEffect(() => {
    const saved = sessionStorage.getItem('admin_pass')
    if (saved) setAuthed(true)
  }, [])

  const handleLogin = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })
      if (res.ok) {
        sessionStorage.setItem('admin_pass', password)
        setAuthed(true)
        toast.success('Xush kelibsiz!')
      } else {
        toast.error("Noto'g'ri parol")
      }
    } finally {
      setLoading(false)
    }
  }

  if (!authed) return <LoginScreen password={password} setPassword={setPassword} onLogin={handleLogin} loading={loading} />

  const adminPass = sessionStorage.getItem('admin_pass') || ''

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', padding: '2rem', fontFamily: "'Space Grotesk', sans-serif" }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <div>
            <div style={{ fontFamily: 'var(--mono)', fontSize: '12px', color: 'var(--purple)', marginBottom: '4px' }}>// admin panel</div>
            <h1 style={{ fontSize: '24px', fontWeight: 700 }}>Portfolio Boshqaruv</h1>
          </div>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <a href="/" style={{ ...s.btnOutline, textDecoration: 'none', display: 'inline-block' }}>← Sayt</a>
            <button onClick={() => { sessionStorage.removeItem('admin_pass'); setAuthed(false) }} style={s.btnOutline}>Chiqish</button>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: '4px', marginBottom: '2rem', background: 'var(--bg2)', padding: '4px', borderRadius: '10px', width: 'fit-content' }}>
          {(['projects', 'about'] as const).map(t => (
            <button key={t} onClick={() => setTab(t)} style={{
              padding: '8px 20px', border: 'none', borderRadius: '8px', cursor: 'pointer',
              fontSize: '14px', fontWeight: 500, fontFamily: "'Space Grotesk', sans-serif",
              background: tab === t ? 'var(--bg3)' : 'transparent',
              color: tab === t ? 'var(--text)' : 'var(--text2)',
              borderColor: tab === t ? 'var(--border)' : 'transparent',
              transition: 'all 0.2s',
            }}>
              {t === 'projects' ? 'Loyihalar' : 'Haqimda'}
            </button>
          ))}
        </div>

        {tab === 'projects'
          ? <ProjectsTab adminPass={adminPass} />
          : <AboutTab adminPass={adminPass} />
        }
      </div>
    </div>
  )
}

// ─── Login ────────────────────────────────────────────────────────────────────
function LoginScreen({ password, setPassword, onLogin, loading }: {
  password: string; setPassword: (v: string) => void; onLogin: () => void; loading: boolean
}) {
  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'var(--bg)',
    }}>
      <div style={{ width: '100%', maxWidth: '380px', padding: '2rem' }}>
        <div style={{ fontFamily: 'var(--mono)', fontSize: '12px', color: 'var(--purple)', marginBottom: '8px' }}>// admin</div>
        <h1 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '0.5rem' }}>Kirish</h1>
        <p style={{ color: 'var(--text2)', fontSize: '14px', marginBottom: '2rem' }}>Admin panelga kirish uchun parol kiriting</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <input
            type="password" value={password}
            onChange={e => setPassword(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && onLogin()}
            placeholder="Parol"
            style={s.input}
            autoFocus
          />
          <button onClick={onLogin} disabled={loading} style={{ ...s.btn(), background: 'linear-gradient(135deg, var(--purple), #6c63e8)', padding: '12px' }}>
            {loading ? 'Tekshirilmoqda...' : 'Kirish →'}
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── Projects Tab ─────────────────────────────────────────────────────────────
function ProjectsTab({ adminPass }: { adminPass: string }) {
  const [projects, setProjects] = useState<Project[]>([])
  const [form, setForm] = useState<Project>(emptyProject)
  const [editing, setEditing] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => { fetchProjects() }, [])

  const fetchProjects = async () => {
    const res = await fetch('/api/projects')
    setProjects(await res.json())
    setLoading(false)
  }

  const save = async () => {
    if (!form.title || !form.description) return toast.error("Sarlavha va tavsif kerak")
    setLoading(true)
    try {
      const method = editing ? 'PUT' : 'POST'
      const url = editing ? `/api/projects/${editing}` : '/api/projects'
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json', 'x-admin-password': adminPass },
        body: JSON.stringify(form),
      })
      if (!res.ok) return toast.error('Xatolik yuz berdi')
      toast.success(editing ? 'Yangilandi!' : "Qo'shildi!")
      setForm(emptyProject); setEditing(null); setShowForm(false)
      fetchProjects()
    } finally { setLoading(false) }
  }

  const remove = async (id: string) => {
    if (!confirm("O'chirishni tasdiqlaysizmi?")) return
    await fetch(`/api/projects/${id}`, { method: 'DELETE', headers: { 'x-admin-password': adminPass } })
    toast.success("O'chirildi")
    fetchProjects()
  }

  const startEdit = (p: Project) => {
    setForm({ ...p, tags: p.tags || [], techStack: p.techStack || [] })
    setEditing(p._id!)
    setShowForm(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '18px', fontWeight: 600 }}>Loyihalar ({projects.length})</h2>
        <button onClick={() => { setForm(emptyProject); setEditing(null); setShowForm(!showForm) }}
          style={s.btn()}>
          {showForm ? 'Yopish' : '+ Yangi loyiha'}
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div style={{ ...s.card, marginBottom: '2rem', border: '1px solid rgba(139,124,248,0.3)' }}>
          <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '1.5rem', color: 'var(--purple2)' }}>
            {editing ? 'Loyihani tahrirlash' : 'Yangi loyiha qo\'shish'}
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div style={{ gridColumn: '1/-1' }}>
              <label style={s.label}>Sarlavha *</label>
              <input style={s.input} value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="Loyiha nomi" />
            </div>
            <div style={{ gridColumn: '1/-1' }}>
              <label style={s.label}>Tavsif *</label>
              <textarea style={{ ...s.input, minHeight: '80px', resize: 'vertical' }} value={form.description}
                onChange={e => setForm({ ...form, description: e.target.value })} placeholder="Loyiha haqida..." />
            </div>
            <div>
              <label style={s.label}>Kategoriya</label>
              <select style={s.input} value={form.category} onChange={e => setForm({ ...form, category: e.target.value as Project['category'] })}>
                <option value="web">Web App</option>
                <option value="bot">Telegram Bot</option>
                <option value="api">API</option>
                <option value="other">Boshqa</option>
              </select>
            </div>
            <div>
              <label style={s.label}>Tartib raqami</label>
              <input type="number" style={s.input} value={form.order} onChange={e => setForm({ ...form, order: +e.target.value })} />
            </div>
            <div>
              <label style={s.label}>Tech Stack (vergul bilan)</label>
              <input style={s.input} value={form.techStack.join(', ')}
                onChange={e => setForm({ ...form, techStack: e.target.value.split(',').map(t => t.trim()).filter(Boolean) })}
                placeholder="Python, Django, Redis" />
            </div>
            <div>
              <label style={s.label}>Teglar (vergul bilan)</label>
              <input style={s.input} value={form.tags.join(', ')}
                onChange={e => setForm({ ...form, tags: e.target.value.split(',').map(t => t.trim()).filter(Boolean) })}
                placeholder="backend, bot" />
            </div>
            <div>
              <label style={s.label}>GitHub URL</label>
              <input style={s.input} value={form.githubUrl} onChange={e => setForm({ ...form, githubUrl: e.target.value })} placeholder="https://github.com/..." />
            </div>
            <div>
              <label style={s.label}>Live URL</label>
              <input style={s.input} value={form.liveUrl} onChange={e => setForm({ ...form, liveUrl: e.target.value })} placeholder="https://..." />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <input type="checkbox" id="featured" checked={form.featured} onChange={e => setForm({ ...form, featured: e.target.checked })} />
              <label htmlFor="featured" style={{ ...s.label, margin: 0, cursor: 'pointer', color: 'var(--text2)' }}>Featured loyiha</label>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '10px', marginTop: '1.5rem' }}>
            <button onClick={save} style={s.btn()}>
              {loading ? 'Saqlanmoqda...' : (editing ? 'Yangilash' : "Qo'shish")}
            </button>
            <button onClick={() => { setShowForm(false); setEditing(null); setForm(emptyProject) }} style={s.btnOutline}>Bekor</button>
          </div>
        </div>
      )}

      {/* List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {projects.map(p => (
          <div key={p._id} style={{ ...s.card, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
                <span style={{ fontWeight: 600, fontSize: '15px' }}>{p.title}</span>
                {p.featured && <span style={{ fontSize: '11px', color: 'var(--amber)', fontFamily: 'var(--mono)' }}>★</span>}
                <span style={{ fontSize: '11px', color: 'var(--text3)', fontFamily: 'var(--mono)' }}>{p.category}</span>
              </div>
              <p style={{ fontSize: '13px', color: 'var(--text2)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {p.description}
              </p>
              {p.techStack?.length > 0 && (
                <div style={{ display: 'flex', gap: '6px', marginTop: '6px', flexWrap: 'wrap' }}>
                  {p.techStack.slice(0, 4).map((t, i) => (
                    <span key={i} style={{ fontSize: '11px', fontFamily: 'var(--mono)', padding: '1px 8px', background: 'var(--bg3)', borderRadius: '4px', color: 'var(--text3)' }}>{t}</span>
                  ))}
                </div>
              )}
            </div>
            <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
              <button onClick={() => startEdit(p)} style={{ ...s.btnOutline, padding: '6px 14px' }}>Tahrirlash</button>
              <button onClick={() => remove(p._id!)} style={{ ...s.btn('#e11d48'), padding: '6px 14px' }}>O'chirish</button>
            </div>
          </div>
        ))}
        {projects.length === 0 && !loading && (
          <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text3)', fontFamily: 'var(--mono)', fontSize: '14px' }}>
            // hali loyiha yo'q
          </div>
        )}
      </div>
    </div>
  )
}

// ─── About Tab ────────────────────────────────────────────────────────────────
function AboutTab({ adminPass }: { adminPass: string }) {
  const [about, setAbout] = useState<About | null>(null)
  const [saving, setSaving] = useState(false)
  const [activeSection, setActiveSection] = useState<'main' | 'skills' | 'experience' | 'education' | 'stats'>('main')

  useEffect(() => {
    fetch('/api/about').then(r => r.json()).then(setAbout)
  }, [])

  const save = async () => {
    if (!about) return
    setSaving(true)
    try {
      const res = await fetch('/api/about', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'x-admin-password': adminPass },
        body: JSON.stringify(about),
      })
      if (res.ok) toast.success('Saqlandi!')
      else toast.error('Xatolik!')
    } finally { setSaving(false) }
  }

  if (!about) return <div style={{ color: 'var(--text3)', fontFamily: 'var(--mono)', padding: '2rem' }}>Yuklanmoqda...</div>

  const sections = [
    { key: 'main', label: 'Asosiy' },
    { key: 'skills', label: "Ko'nikmalar" },
    { key: 'experience', label: 'Tajriba' },
    { key: 'education', label: "Ta'lim" },
    { key: 'stats', label: 'Statistika' },
  ] as const

  return (
    <div>
      <div style={{ display: 'flex', gap: '4px', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        {sections.map(sec => (
          <button key={sec.key} onClick={() => setActiveSection(sec.key)} style={{
            padding: '6px 16px', border: '1px solid', borderRadius: '8px', cursor: 'pointer',
            fontSize: '13px', fontFamily: "'Space Grotesk', sans-serif",
            background: activeSection === sec.key ? 'var(--bg3)' : 'transparent',
            borderColor: activeSection === sec.key ? 'var(--border2)' : 'var(--border)',
            color: activeSection === sec.key ? 'var(--text)' : 'var(--text2)',
          }}>{sec.label}</button>
        ))}
      </div>

      <div style={s.card}>
        {activeSection === 'main' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {[
              { key: 'name', label: 'Ism' },
              { key: 'title', label: 'Unvon / Tagline' },
              { key: 'location', label: "Joylashuv" },
              { key: 'email', label: 'Email' },
              { key: 'telegramUsername', label: 'Telegram username (@ siz)' },
              { key: 'githubUsername', label: 'GitHub username' },
              { key: 'photoUrl', label: 'Rasm URL (to\'g\'ridan-to\'g\'ri havola)' },
            ].map(f => (
              <div key={f.key}>
                <label style={s.label}>{f.label}</label>
                <input style={s.input} value={(about as any)[f.key] || ''} onChange={e => setAbout({ ...about, [f.key]: e.target.value })} />
              </div>
            ))}
            <div>
              <label style={s.label}>Bio</label>
              <textarea style={{ ...s.input, minHeight: '120px', resize: 'vertical' }} value={about.bio}
                onChange={e => setAbout({ ...about, bio: e.target.value })} />
            </div>
          </div>
        )}

        {activeSection === 'skills' && (
          <div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '1rem' }}>
              {about.skills.map((sk, i) => (
                <div key={i} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr auto', gap: '8px', alignItems: 'center' }}>
                  <input style={s.input} value={sk.name} placeholder="Ism" onChange={e => {
                    const skills = [...about.skills]; skills[i] = { ...sk, name: e.target.value }; setAbout({ ...about, skills })
                  }} />
                  <input type="number" min={0} max={100} style={s.input} value={sk.level} placeholder="Daraja %" onChange={e => {
                    const skills = [...about.skills]; skills[i] = { ...sk, level: +e.target.value }; setAbout({ ...about, skills })
                  }} />
                  <input style={s.input} value={sk.category} placeholder="Kategoriya" onChange={e => {
                    const skills = [...about.skills]; skills[i] = { ...sk, category: e.target.value }; setAbout({ ...about, skills })
                  }} />
                  <button onClick={() => setAbout({ ...about, skills: about.skills.filter((_, j) => j !== i) })}
                    style={{ ...s.btn('#e11d48'), padding: '8px 12px' }}>×</button>
                </div>
              ))}
            </div>
            <button onClick={() => setAbout({ ...about, skills: [...about.skills, { name: '', level: 80, category: 'Backend' }] })}
              style={s.btnOutline}>+ Ko'nikma qo'shish</button>
          </div>
        )}

        {activeSection === 'experience' && (
          <div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '1rem' }}>
              {about.experience.map((ex, i) => (
                <div key={i} style={{ background: 'var(--bg3)', borderRadius: '8px', padding: '1rem', border: '1px solid var(--border)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }}>
                    <div><label style={s.label}>Kompaniya</label><input style={s.input} value={ex.company} onChange={e => { const exp = [...about.experience]; exp[i] = { ...ex, company: e.target.value }; setAbout({ ...about, experience: exp }) }} /></div>
                    <div><label style={s.label}>Rol</label><input style={s.input} value={ex.role} onChange={e => { const exp = [...about.experience]; exp[i] = { ...ex, role: e.target.value }; setAbout({ ...about, experience: exp }) }} /></div>
                    <div><label style={s.label}>Davr</label><input style={s.input} value={ex.period} onChange={e => { const exp = [...about.experience]; exp[i] = { ...ex, period: e.target.value }; setAbout({ ...about, experience: exp }) }} /></div>
                  </div>
                  <div><label style={s.label}>Tavsif</label><input style={s.input} value={ex.description} onChange={e => { const exp = [...about.experience]; exp[i] = { ...ex, description: e.target.value }; setAbout({ ...about, experience: exp }) }} /></div>
                  <button onClick={() => setAbout({ ...about, experience: about.experience.filter((_, j) => j !== i) })} style={{ ...s.btn('#e11d48'), alignSelf: 'flex-end', padding: '6px 14px' }}>O'chirish</button>
                </div>
              ))}
            </div>
            <button onClick={() => setAbout({ ...about, experience: [...about.experience, { company: '', role: '', period: '', description: '' }] })} style={s.btnOutline}>+ Tajriba qo'shish</button>
          </div>
        )}

        {activeSection === 'education' && (
          <div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '1rem' }}>
              {about.education.map((ed, i) => (
                <div key={i} style={{ display: 'grid', gridTemplateColumns: '2fr 2fr 1fr auto', gap: '8px', alignItems: 'end' }}>
                  <div><label style={s.label}>Muassasa</label><input style={s.input} value={ed.school} onChange={e => { const edu = [...about.education]; edu[i] = { ...ed, school: e.target.value }; setAbout({ ...about, education: edu }) }} /></div>
                  <div><label style={s.label}>Daraja</label><input style={s.input} value={ed.degree} onChange={e => { const edu = [...about.education]; edu[i] = { ...ed, degree: e.target.value }; setAbout({ ...about, education: edu }) }} /></div>
                  <div><label style={s.label}>Davr</label><input style={s.input} value={ed.period} onChange={e => { const edu = [...about.education]; edu[i] = { ...ed, period: e.target.value }; setAbout({ ...about, education: edu }) }} /></div>
                  <button onClick={() => setAbout({ ...about, education: about.education.filter((_, j) => j !== i) })} style={{ ...s.btn('#e11d48'), padding: '8px 12px' }}>×</button>
                </div>
              ))}
            </div>
            <button onClick={() => setAbout({ ...about, education: [...about.education, { school: '', degree: '', period: '' }] })} style={s.btnOutline}>+ Ta'lim qo'shish</button>
          </div>
        )}

        {activeSection === 'stats' && (
          <div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '1rem' }}>
              {about.stats.map((st, i) => (
                <div key={i} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr auto', gap: '8px', alignItems: 'center' }}>
                  <input style={s.input} value={st.label} placeholder="Sarlavha" onChange={e => { const stats = [...about.stats]; stats[i] = { ...st, label: e.target.value }; setAbout({ ...about, stats }) }} />
                  <input style={s.input} value={st.value} placeholder="Qiymat (10+)" onChange={e => { const stats = [...about.stats]; stats[i] = { ...st, value: e.target.value }; setAbout({ ...about, stats }) }} />
                  <button onClick={() => setAbout({ ...about, stats: about.stats.filter((_, j) => j !== i) })} style={{ ...s.btn('#e11d48'), padding: '8px 12px' }}>×</button>
                </div>
              ))}
            </div>
            <button onClick={() => setAbout({ ...about, stats: [...about.stats, { label: '', value: '' }] })} style={s.btnOutline}>+ Statistika qo'shish</button>
          </div>
        )}

        <div style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border)' }}>
          <button onClick={save} disabled={saving} style={{ ...s.btn(), background: 'linear-gradient(135deg, var(--purple), #6c63e8)', padding: '10px 24px' }}>
            {saving ? 'Saqlanmoqda...' : 'Saqlash ✓'}
          </button>
        </div>
      </div>
    </div>
  )
}