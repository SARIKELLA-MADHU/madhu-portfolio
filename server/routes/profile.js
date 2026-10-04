import { Router } from 'express';
import Profile from '../models/Profile.js';
import adminAuth from '../middleware/adminAuth.js';

const router = Router();

// GET /api/profile — public
router.get('/', async (req, res, next) => {
  try {
    const profile = await Profile.findOne().lean();
    if (!profile) return res.status(404).json({ message: 'Profile not found. Run "npm run seed".' });
    res.json(profile);
  } catch (err) {
    next(err);
  }
});

// PUT /api/profile — admin only, updates (or creates) the single profile
router.put('/', adminAuth, async (req, res, next) => {
  try {
    const profile = await Profile.findOneAndUpdate({}, req.body, {
      new: true,
      upsert: true,
      runValidators: true,
    });
    res.json(profile);
  } catch (err) {
    next(err);
  }
});

export default router;
