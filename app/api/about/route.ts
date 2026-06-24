import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import { About } from '@/models/About'

const defaultAbout = {
  name: 'Samandar',
  title: 'Full-Stack Developer & Telegram Bot Specialist',
  bio: "Salom! Men Samandar — Full-Stack Developer. Python, Django, JavaScript va React texnologiyalari bilan ishlayman. Shuningdek, Telegram botlar yaratishda katta tajribaga egaman. Foydalanuvchilarga qulay va tez ishlaydigani ilovalar yaratish mening asosiy maqsadim.",
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
    { name: 'MongoDB', level: 68, category: 'Database' },
    { name: 'Docker', level: 60, category: 'DevOps' },
  ],
  experience: [
    {
      company: 'Freelance',
      role: 'Full-Stack Developer',
      period: '2022 — hozir',
      description: 'Web ilovalar va Telegram botlar yaratish',
    },
  ],
  education: [
    {
      school: 'Toshkent Axborot Texnologiyalari Universiteti',
      degree: 'Dasturiy injiniring',
      period: '2020 — 2024',
    },
  ],
  stats: [
    { label: 'Loyihalar', value: '10+' },
    { label: 'Telegram botlar', value: '5+' },
    { label: 'Yil tajriba', value: '2+' },
    { label: 'Xursand mijozlar', value: '20+' },
  ],
}

export async function GET() {
  try {
    await connectDB()
    let about = await About.findOne()
    if (!about) {
      about = await About.create(defaultAbout)
    }
    return NextResponse.json(about)
  } catch {
    return NextResponse.json({ error: 'Failed to fetch about' }, { status: 500 })
  }
}

export async function PUT(req: NextRequest) {
  try {
    const adminPass = req.headers.get('x-admin-password')
    if (adminPass !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    await connectDB()
    const body = await req.json()
    let about = await About.findOne()
    if (!about) {
      about = await About.create(body)
    } else {
      about = await About.findByIdAndUpdate(about._id, body, { new: true })
    }
    return NextResponse.json(about)
  } catch {
    return NextResponse.json({ error: 'Failed to update about' }, { status: 500 })
  }
}
