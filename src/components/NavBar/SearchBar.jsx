'use client'
import React, { useState, useEffect, useCallback } from "react";
import { FaSearch } from "react-icons/fa";
import { useRouter } from "next/navigation";
import debounce from "lodash.debounce";

function SearchBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleOpen = () => {
    setIsOpen((prev) => !prev);
  };

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  // Debounce per aggiornare la rotta solo dopo una leggera pausa nella digitazione
  const debouncedPush = useCallback(
    debounce((q) => {
      if (q.trim()) {
        router.push(`/search?q=${encodeURIComponent(q)}`);
      } else {
        router.push("/");
      }
    }, 300),
    [router]
  );

  useEffect(() => {
    debouncedPush(query);
    return () => debouncedPush.cancel();
  }, [query, debouncedPush]);

  if (!isOpen) return <FaSearch onClick={handleOpen} className="cursor-pointer" />;

  return (
    <div className="flex items-center bg-gray-500 p-2 rounded">
      <FaSearch onClick={handleOpen} className="mr-2 cursor-pointer" />
      <form action={debouncedPush}>
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder="Cerca..."
          className="p-1 rounded"
        />
      </form>
    </div>
  );
}

export default SearchBar;