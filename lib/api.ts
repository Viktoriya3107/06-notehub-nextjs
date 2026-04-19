import axios from 'axios';
import type { Note, NoteTag } from '@/types/note';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
  },
});

export interface NotesResponse {
  notes: Note[];
  totalPages: number;
}

interface CreateNotePayload {
  title: string;
  content: string;
  tag: NoteTag;
}


export const fetchNotes = async (
  page: number,
  search: string
): Promise<NotesResponse> => {
  const { data } = await api.get('/notes', {
    params: { page, search },
  });

  return {
    notes: Array.isArray(data?.notes) ? data.notes : [],
    totalPages: typeof data?.totalPages === 'number' ? data.totalPages : 1,
  };
};


export const fetchNoteById = async (id: string): Promise<Note> => {
  const { data } = await api.get(`/notes/${id}`);
  return data;
};


export const createNote = async (
  payload: CreateNotePayload
): Promise<Note> => {
  const { data } = await api.post('/notes', payload);
  return data;
};
export const deleteNote = async (id: string): Promise<void> => {
  await api.delete(`/notes/${id}`);
};