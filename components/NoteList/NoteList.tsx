'use client';

import type { Note } from '@/types/note';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteNote } from '@/lib/api';
import Link from 'next/link';

interface NoteListProps {
  notes: Note[];
}

export default function NoteList({ notes }: NoteListProps) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
  });

  return (
    <ul>
      {notes.map((note: Note) => (
        <li key={note.id}>
          <h3>{note.title}</h3>
          <p>{note.content}</p>
          <span>{note.tag}</span>

          <Link href={`/notes/${note.id}`}>Open</Link>

          <button onClick={() => mutation.mutate(note.id)}>
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}