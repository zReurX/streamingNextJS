'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import debounce from 'lodash.debounce';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FaSearch } from "react-icons/fa";

function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') ?? '';

  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState(initialQuery);

  // Flag per saltare la push al primo mount
  const isFirstRun = useRef(true);

  const handleOpen = () => setIsOpen((prev) => !prev);

  const pushQuery = (q) => {
    const trimmed = q.trim();
    if (trimmed) {
      // SPA navigation verso /search/[query]
      router.push(`/search?q=${encodeURIComponent(trimmed)}`);
    } else {
      // quando svuotato campo, torno in home
      router.push('/');
    }
  };

  // Debounce wrapper
  const debouncedPush = useCallback(debounce(pushQuery, 300), []);

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
    debouncedPush(query);
    // cleanup del debounce su unmount
    return () => {
      debouncedPush.cancel();
    };
  }, [query, debouncedPush]);

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  if (!isOpen) {
    return (
      <Button variant="ghost" onClick={handleOpen} aria-label="Apri ricerca">
        <FaSearch />
      </Button>
    );
  }

  return (
    <div className="flex items-center space-x-1 max-w-40 sm:max-w-full bg-card p-1 rounded-md shadow-sm">
      <Button variant="ghost" onClick={handleOpen} aria-label="Chiudi ricerca">
        <FaSearch />
      </Button>
      <Input
        placeholder="Cerca..."
        value={query}
        onChange={handleChange}
        className="w-full"
        autoFocus
      />
    </div>
  );
}

export default SearchBar;