import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import { Project } from '@/models/Project'

export async function GET() {
  try {
    await connectDB()
    const projects = await Project.find().sort({ order: 1, createdAt: -1 })
    return NextResponse.json(projects)
  } catch {
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const adminPass = req.headers.get('x-admin-password')
    if (adminPass !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    await connectDB()
    const body = await req.json()
    const project = await Project.create(body)
    return NextResponse.json(project, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Failed to create project' }, { status: 500 })
  }
}
