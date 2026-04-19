'use client';

import { useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';

interface SearchBoxProps {
  onSearch: (value: string) => void;
}

export default function SearchBox({ onSearch }: SearchBoxProps) {
  const [value, setValue] = useState<string>('');

  const debounced = useDebouncedCallback((val: string) => {
    onSearch(val);
  }, 300);

  return (
    <input
      value={value}
      onChange={(e) => {
        setValue(e.target.value);
        debounced(e.target.value);
      }}
      placeholder="Search"
    />
  );
}