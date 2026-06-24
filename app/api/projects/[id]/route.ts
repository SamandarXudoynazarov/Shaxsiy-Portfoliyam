import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import { Project } from '@/models/Project'

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const adminPass = req.headers.get('x-admin-password')
    if (adminPass !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    await connectDB()
    const body = await req.json()
    const project = await Project.findByIdAndUpdate(params.id, body, { new: true })
    if (!project) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json(project)
  } catch {
    return NextResponse.json({ error: 'Failed to update' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const adminPass = req.headers.get('x-admin-password')
    if (adminPass !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    await connectDB()
    await Project.findByIdAndDelete(params.id)
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Failed to delete' }, { status: 500 })
  }
}
