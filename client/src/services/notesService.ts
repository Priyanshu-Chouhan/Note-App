import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL
});

export interface Note {
  _id: string;
  title?: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export function fetchNotes(token: string): Promise<Note[]> {
  return api
    .get('/api/notes', { headers: { Authorization: `Bearer ${token}` } })
    .then(res => res.data);
}

export function createNote(
  token: string,
  content: string,
  title?: string
): Promise<Note> {
  return api
    .post(
      '/api/notes',
      { content, title },
      { headers: { Authorization: `Bearer ${token}` } }
    )
    .then(res => res.data);
}

export function deleteNote(
  token: string,
  id: string
): Promise<{ message: string }> {
  return api
    .delete(`/api/notes/${id}`, { headers: { Authorization: `Bearer ${token}` } })
    .then(res => res.data);
}