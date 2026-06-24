import mongoose, { Schema, Document } from 'mongoose'

export interface IAbout extends Document {
  name: string
  title: string
  bio: string
  location: string
  email: string
  telegramUsername: string
  githubUsername: string
  photoUrl?: string
  skills: { name: string; level: number; category: string }[]
  experience: { company: string; role: string; period: string; description: string }[]
  education: { school: string; degree: string; period: string }[]
  stats: { label: string; value: string }[]
}

const AboutSchema = new Schema<IAbout>({
  name: { type: String, required: true },
  title: { type: String, required: true },
  bio: { type: String, required: true },
  location: { type: String, default: '' },
  email: { type: String, default: '' },
  telegramUsername: { type: String, default: '' },
  githubUsername: { type: String, default: '' },
  photoUrl: { type: String, default: '' },
  skills: [
    {
      name: { type: String },
      level: { type: Number, min: 0, max: 100 },
      category: { type: String },
    },
  ],
  experience: [
    {
      company: String,
      role: String,
      period: String,
      description: String,
    },
  ],
  education: [
    {
      school: String,
      degree: String,
      period: String,
    },
  ],
  stats: [
    {
      label: String,
      value: String,
    },
  ],
})

export const About =
  mongoose.models.About || mongoose.model<IAbout>('About', AboutSchema)