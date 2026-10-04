import mongoose from 'mongoose';

const educationSchema = new mongoose.Schema(
  {
    institution: String,
    degree: String,
    period: String,
    score: String,
  },
  { _id: false }
);

const skillGroupSchema = new mongoose.Schema(
  {
    category: String,
    items: [String],
  },
  { _id: false }
);

const profileSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    title: String,
    tagline: String,
    about: String,
    location: String,
    email: String,
    phone: String,
    linkedin: String,
    github: String,
    resumeUrl: String,
    stats: [{ label: String, value: String, _id: false }],
    education: [educationSchema],
    skills: [skillGroupSchema],
    certifications: [String],
    achievements: [String],
    leadership: [String],
  },
  { timestamps: true }
);

export default mongoose.model('Profile', profileSchema);
