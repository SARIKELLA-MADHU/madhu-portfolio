// Loads resume content into MongoDB. Run: npm run seed
// WARNING: replaces the existing profile and projects (messages are kept).
import 'dotenv/config';
import mongoose from 'mongoose';
import Profile from './models/Profile.js';
import Project from './models/Project.js';
import { profile, projects } from './data/resumeData.js';

try {
  await mongoose.connect(process.env.MONGO_URI);
  await Profile.deleteMany({});
  await Project.deleteMany({});
  await Profile.create(profile);
  await Project.insertMany(projects);
  console.log(`Seeded profile and ${projects.length} projects.`);
} catch (err) {
  console.error('Seeding failed:', err.message);
  process.exitCode = 1;
} finally {
  await mongoose.disconnect();
}
