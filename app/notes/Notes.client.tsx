'use client';

import { useState } from 'react';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';
import SearchBox from '@/components/SearchBox/SearchBox';
import Pagination from '@/components/Pagination/Pagination';
import NoteList from '@/components/NoteList/NoteList';

export default function NotesClient() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');

  const { data, isLoading, isError } = useQuery({
    queryKey: ['notes', page, search],
    queryFn: () => fetchNotes(page, search),
    placeholderData: keepPreviousData,
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error</p>;

  return (
    <div>
      <SearchBox
        onSearch={(value) => {
          setSearch(value);
          setPage(1);
        }}
      />

      <NoteList notes={data?.notes ?? []} />

      <Pagination
        pageCount={data?.totalPages ?? 1}
        currentPage={page}
        onPageChange={({ selected }) => setPage(selected + 1)}
      />
    </div>
  );
}