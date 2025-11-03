"use client";

import { useState, useEffect, useCallback, useRef, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  CommandDialog,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { FaSearch } from "react-icons/fa";
import { SearchMovies } from "@/app/(DashBoard)/search/SearchMovies";

function SearchBar({ redirectOnSubmit = true }) {
  /*Controllo se ci sono dei parametri e si aggiorna la pagina */
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") ?? "";
  /*Query di ricerca */
  const [query, setQuery] = useState(initialQuery);
  /*Risultati della ricerca*/
  const [results, setResults] = useState([]);
  /*Loading state*/
  const [loading, setLoading] = useState(false);
  /*Rounter*/
  const router = useRouter();

  const [open, setOpen] = useState(false);
  // Flag per saltare la push al primo mount
  const isFirstRun = useRef(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (redirectOnSubmit && query.trim()) {
      // SPA navigation verso /search/[query]
      router.push(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
    const delay = setTimeout(async () => {
      if (query.trim()) {
        setLoading(true);
        const data = await SearchMovies(query);
        setResults(data);
        setLoading(false);
        router.replace(`/search?q=${encodeURIComponent(query)}`);
      } else {
        setResults([]);
      }
    }, 400);
    // cleanup del debounce su unmount
    return () => clearTimeout(delay);
  }, [query, router]);

  useEffect(() => {
    const down = (e) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const handleChange = (e) => {
    const q = e.target.value;
    setQuery(q);
    if (!q.trim()) {
      router.replace("/");
    }
  };

  return (
    <>
      <div className="flex items-center gap-2">
        <p className="text-muted-foreground text-sm">
          Press{" "}
          <kbd className="bg-muted text-muted-foreground pointer-events-none inline-flex h-5 items-center gap-1 rounded border px-1.5 font-mono text-[10px] font-medium opacity-100 select-none">
            <span className="text-xs">⌘</span>K
          </kbd>
        </p>
        <Button
          variant="secondary"
          size="icon"
          className="size-8"
          onClick={() => setOpen(true)}
        >
          <FaSearch />
        </Button>
      </div>
      <CommandDialog open={open} onOpenChange={setOpen}>
        {/* Usa CommandInput ma passa onChange e value per comportamento controllato */}
        <CommandInput
          autoFocus
          onChange={handleChange}
          value={query}
          placeholder="Type a command or search..."
        />
        <Suspense>
          {query && results.length > 0 && (
            <CommandList>
              {loading ? (
                <p className="mt-2 text-sm text-gray-500">Caricamento...</p>
              ) : (
                results.map((movie) => {
                  const data = movie.release_date
                    ? movie.release_date.slice(0, 4)
                    : movie.first_air_date?.slice(0, 4);
                  const title = movie.title ? movie.title : movie.name;
                  return (
                    <button
                      key={movie.id}
                      className="w-full"
                      onClick={() => {
                        router.replace(`/${movie.media_type}/${movie.id}`);
                        setQuery("");
                        setOpen(false);
                      }}
                    >
                      <CommandItem>
                        {title} ({data})
                      </CommandItem>
                    </button>
                  );
                })
              )}
            </CommandList>
          )}
        </Suspense>
      </CommandDialog>
    </>
  );
}

export default SearchBar;
