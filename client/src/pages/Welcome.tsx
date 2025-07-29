import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import { fetchNotes, createNote, deleteNote, Note } from '../services/notesService';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

interface FormData {
  title?: string;
  content: string;
}

export default function Welcome() {
  const { token, setToken } = useAuth();
  const [notes, setNotes] = useState<Note[]>([]);
  const [error, setError] = useState<string | null>(null);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>();
  const navigate = useNavigate();

  const loadNotes = useCallback(async () => {
    if (!token) return;
    try {
      const data = await fetchNotes(token);
      setNotes(data);
    } catch {
      setError('Failed to load notes');
    }
  }, [token]);

  useEffect(() => {
    loadNotes();
  }, [loadNotes]);

  const handleLogout = () => {
    setToken(null);
    navigate('/signup');
  };

  const onSubmit = async (data: FormData) => {
    if (!token) return;
    try {
      const newNote = await createNote(token, data.content, data.title);
      setNotes(prev => [newNote, ...prev]);
      reset();
    } catch {
      setError('Failed to create note');
    }
  };

  const handleDelete = async (id: string) => {
    if (!token) return;
    try {
      await deleteNote(token, id);
      setNotes(prev => prev.filter(n => n._id !== id));
    } catch {
      setError('Failed to delete note');
    }
  };

  return (
    <div style={{minHeight: '100vh'}}>
      {/* Header */}
      <div className="header">
        <div className="container">
          <div className="header-content">
            <div>
              <h1>Notes App</h1>
              <p>Welcome back!</p>
            </div>
            <button
              onClick={handleLogout}
              className="btn btn-danger"
              style={{fontSize: '0.875rem'}}
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container" style={{paddingTop: '2rem', paddingBottom: '2rem'}}>
        {error && (
          <div className="alert alert-error">
            {error}
          </div>
        )}

        {/* Create Note Form */}
        <div className="card">
          <h2 style={{fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem'}}>Create New Note</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <input
                placeholder="Title (optional)"
                {...register('title')}
                className="form-input"
              />
            </div>
            <div className="form-group">
              <textarea
                placeholder="Write your note here..."
                {...register('content', { required: 'Content is required' })}
                className="form-textarea"
                style={{height: '8rem'}}
              />
              {errors.content && (
                <p className="error-message">{errors.content.message}</p>
              )}
            </div>
            <button type="submit" className="btn btn-primary w-full">
              Add Note
            </button>
          </form>
        </div>

        {/* Notes List */}
        <div style={{marginTop: '2rem'}}>
          <h2 style={{fontSize: '1.25rem', fontWeight: '600', color: '#111827', marginBottom: '1rem'}}>
            Your Notes ({notes.length})
          </h2>
          {notes.length === 0 ? (
            <div className="card empty-state">
              <p>No notes yet. Create your first note above!</p>
            </div>
          ) : (
            <div className="notes-grid">
              {notes.map(note => (
                <div key={note._id} className="note-card">
                  {note.title && (
                    <h3 className="note-title">
                      {note.title}
                    </h3>
                  )}
                  <p className="note-content">{note.content}</p>
                  <div className="note-footer">
                    <span>{new Date(note.createdAt).toLocaleDateString()}</span>
                    <button
                      onClick={() => handleDelete(note._id)}
                      className="delete-btn"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}