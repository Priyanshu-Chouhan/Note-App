import { Request, Response } from 'express';
import Note from '../models/Note';
import { AuthRequest } from '../middlewares/auth';

export async function getNotes(req: AuthRequest, res: Response) {
  try {
    const notes = await Note.find({ user: req.userId });
    res.json(notes);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch notes' });
  }
}

export async function createNote(req: AuthRequest, res: Response) {
  const { title, content } = req.body;
  if (!content) return res.status(400).json({ message: 'Content is required' });

  try {
    const note = await Note.create({
      user: req.userId,
      title,
      content,
    });
    res.status(201).json(note);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create note' });
  }
}

export async function deleteNote(req: AuthRequest, res: Response) {
  const { id } = req.params;
  try {
    const note = await Note.findOneAndDelete({ _id: id, user: req.userId });
    if (!note) return res.status(404).json({ message: 'Note not found' });
    res.json({ message: 'Note deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete note' });
  }
}