import { Router } from 'express';
import mongoose from 'mongoose';
import Message from '../models/Message.js';
import adminAuth from '../middleware/adminAuth.js';

const router = Router();

// Very small in-memory rate limit: 5 messages per IP per 15 minutes
const hits = new Map();
const WINDOW_MS = 15 * 60 * 1000;
function rateLimit(req, res, next) {
  const now = Date.now();
  const list = (hits.get(req.ip) || []).filter((t) => now - t < WINDOW_MS);
  if (list.length >= 5) {
    return res.status(429).json({ message: 'Too many messages. Please try again later.' });
  }
  list.push(now);
  hits.set(req.ip, list);
  next();
}

// POST /api/messages — public contact form
router.post('/', rateLimit, async (req, res, next) => {
  try {
    const { name, email, message } = req.body;
    const saved = await Message.create({ name, email, message });
    res.status(201).json({ message: 'Thanks! Your message has been sent.', id: saved._id });
  } catch (err) {
    next(err);
  }
});

// GET /api/messages — admin only
router.get('/', adminAuth, async (req, res, next) => {
  try {
    res.json(await Message.find().sort({ createdAt: -1 }).lean());
  } catch (err) {
    next(err);
  }
});

// DELETE /api/messages/:id — admin only
router.delete('/:id', adminAuth, async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: 'Invalid message id' });
    }
    await Message.findByIdAndDelete(req.params.id);
    res.json({ message: 'Message deleted' });
  } catch (err) {
    next(err);
  }
});

export default router;
