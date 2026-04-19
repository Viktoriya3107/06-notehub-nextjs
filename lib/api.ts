import axios from 'axios';
import type { Note } from '@/types/note';

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const TOKEN = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

const api = axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: `Bearer ${TOKEN}`,
  },
});

export interface NotesResponse {
  notes: Note[];
  totalPages: number;
}

export const fetchNotes = async (page: number, search: string) => {
  const { data } = await api.get<NotesResponse>('', {
    params: { page, search },
  });
  return data;
};

export const fetchNoteById = async (id: string) => {
  const { data } = await api.get<Note>(`/${id}`);
  return data;
};

export const createNote = async (note: Partial<Note>) => {
  const { data } = await api.post('', note);
  return data;
};

export const deleteNote = async (id: string) => {
  await api.delete(`/${id}`);
};