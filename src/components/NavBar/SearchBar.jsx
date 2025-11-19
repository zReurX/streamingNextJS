"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  CommandDialog,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { FaSearch } from "react-icons/fa";
/* // Controllo se ci sono dei parametri e si aggiorna la pagina
// Query di ricerca
// Loading state
const [loading, setLoading] = useState(false);
// Rounter

// Flag per saltare la push al primo mount
const isFirstRun = useRef(true);

useEffect(() => {
  if (isFirstRun.current) {
    isFirstRun.current = false;
    return;
    }
    const delay = setTimeout(async () => {
      if (query.trim()) {
        setLoading(true);
        updateSearchState(query);
        setLoading(false);
        router.replace(`/search?q=${encodeURIComponent(query)}`);
        } else {
          setResults([]);
      }
      }, 400);
      // cleanup del debounce su unmount
      return () => clearTimeout(delay);
      }, [query, router]);
      */

function SearchBar() {
  const [open, setOpen] = useState(false);
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const handleChange = (e) => {
    const q = e.target.value;

    const params = new URLSearchParams(searchParams);
    if (q.trim()) {
      params.set("q", q);
    } else {
      params.delete("q")
      return replace("/")
    }

    // Always navigate to the canonical /search path with the query string
    const newPath =  `/search?${params.toString() || ""}`;
    replace(newPath);
  };

  // Apre la search bar con cmd+k o ctrl+k
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
          defaultValue={searchParams.get("q")?.toString() || ""}
          placeholder="Type a command or search..."
        />
        {/* {query && searchState.length > 0 && (
          <CommandList>
            {loading ? (
              <p className="mt-2 text-sm text-gray-500">Caricamento...</p>
            ) : (
              searchState.map((movie) => {
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
        )} */}
      </CommandDialog>
    </>
  );
}

export default SearchBar;
