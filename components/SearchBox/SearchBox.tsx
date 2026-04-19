'use client';

import { useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';

export default function SearchBox({
  onSearch,
}: {
  onSearch: (value: string) => void;
}) {
  const [value, setValue] = useState('');

  const debounced = useDebouncedCallback((val: string) => {
    onSearch(val);
  }, 300);

  return (
    <input
      type="text"
      placeholder="Search notes"
      value={value}
      onChange={(e) => {
        setValue(e.target.value);
        debounced(e.target.value);
      }}
    />
  );
}