import { Router } from 'express';
import mongoose from 'mongoose';
import Project from '../models/Project.js';
import adminAuth from '../middleware/adminAuth.js';

const router = Router();

const validId = (req, res, next) =>
  mongoose.isValidObjectId(req.params.id)
    ? next()
    : res.status(400).json({ message: 'Invalid project id' });

// GET /api/projects — public, sorted by order then newest
router.get('/', async (req, res, next) => {
  try {
    const projects = await Project.find().sort({ order: 1, createdAt: -1 }).lean();
    res.json(projects);
  } catch (err) {
    next(err);
  }
});

// GET /api/projects/:id — public
router.get('/:id', validId, async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id).lean();
    if (!project) return res.status(404).json({ message: 'Project not found' });
    res.json(project);
  } catch (err) {
    next(err);
  }
});

// POST /api/projects — admin only
router.post('/', adminAuth, async (req, res, next) => {
  try {
    const project = await Project.create(req.body);
    res.status(201).json(project);
  } catch (err) {
    next(err);
  }
});

// PUT /api/projects/:id — admin only
router.put('/:id', adminAuth, validId, async (req, res, next) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!project) return res.status(404).json({ message: 'Project not found' });
    res.json(project);
  } catch (err) {
    next(err);
  }
});

// DELETE /api/projects/:id — admin only
router.delete('/:id', adminAuth, validId, async (req, res, next) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });
    res.json({ message: 'Project deleted' });
  } catch (err) {
    next(err);
  }
});

export default router;
