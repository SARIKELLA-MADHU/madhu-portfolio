import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import profileRoutes from './routes/profile.js';
import projectRoutes from './routes/projects.js';
import messageRoutes from './routes/messages.js';

const app = express();

const allowedOrigins = (process.env.CLIENT_URL || 'http://localhost:5173')
  .split(',')
  .map((s) => s.trim());

app.set('trust proxy', 1);
app.use(cors({ origin: allowedOrigins }));
app.use(express.json({ limit: '100kb' }));

app.get('/api/health', (req, res) => res.json({ status: 'ok' }));
app.use('/api/profile', profileRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/messages', messageRoutes);

app.use((req, res) => res.status(404).json({ message: 'Route not found' }));

// Central error handler — turns Mongoose validation errors into 400s
app.use((err, req, res, next) => {
  if (err.name === 'ValidationError') {
    const msg = Object.values(err.errors).map((e) => e.message).join(', ');
    return res.status(400).json({ message: msg });
  }
  console.error(err);
  res.status(500).json({ message: 'Server error' });
});

const PORT = process.env.PORT || 5000;
await connectDB(process.env.MONGO_URI);
app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`));
