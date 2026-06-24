import { connectDB } from '@/lib/mongodb'
import { Project } from '@/models/Project'
import { About } from '@/models/About'
import Hero from './components/Hero'
import SkillsSection from './components/SkillsSection'
import ProjectsSection from './components/ProjectsSection'
import AboutSection from './components/AboutSection'
import ContactSection from './components/ContactSection'
import Navbar from './components/Navbar'

const defaultAbout = {
  name: 'Samandar',
  title: 'Full-Stack Developer & Telegram Bot Specialist',
  bio: "Salom! Men Samandar — Full-Stack Developer. Python, Django, JavaScript va React texnologiyalari bilan ishlayman.",
  location: "O'zbekiston, Toshkent",
  email: 'samandar@example.com',
  telegramUsername: 'samandar',
  githubUsername: 'samandar',
  skills: [
    { name: 'Python', level: 90, category: 'Backend' },
    { name: 'Django', level: 85, category: 'Backend' },
    { name: 'JavaScript', level: 75, category: 'Frontend' },
    { name: 'React', level: 70, category: 'Frontend' },
    { name: 'Telegram Bot', level: 92, category: 'Bot' },
    { name: 'PostgreSQL', level: 72, category: 'Database' },
  ],
  experience: [],
  education: [],
  stats: [
    { label: 'Loyihalar', value: '10+' },
    { label: 'Telegram botlar', value: '5+' },
    { label: 'Yil tajriba', value: '2+' },
    { label: 'Xursand mijozlar', value: '20+' },
  ],
}

async function getData() {
  try {
    await connectDB()
    const [projectsDocs, aboutDoc] = await Promise.all([
      Project.find().sort({ order: 1, createdAt: -1 }).lean(),
      About.findOne().lean(),
    ])
    return {
      projects: JSON.parse(JSON.stringify(projectsDocs)),
      about: aboutDoc ? JSON.parse(JSON.stringify(aboutDoc)) : defaultAbout,
    }
  } catch {
    return { projects: [], about: defaultAbout }
  }
}

export const revalidate = 60

export default async function Home() {
  const { projects, about } = await getData()

  return (
    <main>
      <Navbar about={about} />
      <Hero about={about} />
      <AboutSection about={about} />
      <SkillsSection skills={about.skills || []} />
      <ProjectsSection projects={projects} />
      <ContactSection about={about} />
    </main>
  )
}
