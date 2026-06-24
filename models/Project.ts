import mongoose, { Schema, Document } from 'mongoose'

export interface IProject extends Document {
  title: string
  description: string
  tags: string[]
  techStack: string[]
  githubUrl?: string
  liveUrl?: string
  category: 'bot' | 'web' | 'api' | 'other'
  featured: boolean
  order: number
  createdAt: Date
}

const ProjectSchema = new Schema<IProject>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    tags: [{ type: String }],
    techStack: [{ type: String }],
    githubUrl: { type: String, default: '' },
    liveUrl: { type: String, default: '' },
    category: {
      type: String,
      enum: ['bot', 'web', 'api', 'other'],
      default: 'other',
    },
    featured: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
)

export const Project =
  mongoose.models.Project || mongoose.model<IProject>('Project', ProjectSchema)
