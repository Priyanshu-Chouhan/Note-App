import express from 'express';
import { getNotes, createNote, deleteNote } from '../controllers/noteController';
import { authenticateToken } from '../middlewares/auth';

const router = express.Router();

// Protected routes for notes
router.get('/', authenticateToken, getNotes);
router.post('/', authenticateToken, createNote);
router.delete('/:id', authenticateToken, deleteNote);

export default router;