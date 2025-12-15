"use client";

import { useCallback, useEffect, useState } from "react";
import { useQuery } from "@apollo/client/react";
import { CHARACTERS_QUERY, CharactersData, Character } from "@/graphql/queries";
import { Input, Button, Spinner } from "@heroui/react";
import CharacterDrawer from "./components/CharactersDrawer";

const DEBOUNCE_MS = 500;
const FIRST_PAGE = 1;

export default function Home() {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [page, setPage] = useState(FIRST_PAGE);
  const [selected, setSelected] = useState<Character | null>(null);

  const { data, loading, error } = useQuery<CharactersData>(CHARACTERS_QUERY, {
    variables: { page, name: debouncedSearch || null },
  });

  useEffect(() => {
    const handleSearch = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(FIRST_PAGE);
    }, DEBOUNCE_MS);
    return () => clearTimeout(handleSearch);
  }, [search]);

  const handleClose = useCallback(() => {
    setSelected(null);
  }, []);

  const characters = data?.characters.results ?? [];
  const info = data?.characters.info;
  const totalPages = info?.pages ?? 1;
  const isLastPage = page >= totalPages;
  const isEmpty = !loading && !error && characters.length === 0;

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50 flex flex-col items-center px-4 py-8">
      <section className="w-full max-w-5xl space-y-6">
        <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-emerald-400">
              Rick & Morty Characters
            </h1>
            <p className="text-sm text-emerald-200/80">
              Search and explore characters from the Rick and Morty universe.
            </p>
          </div>
          <Input
            aria-label="Search characters"
            placeholder="Search by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-80"
            classNames={{
              input: "text-emerald-600 placeholder:text-emerald-600",
            }}
          />
        </header>

        <section
          aria-label="Characters list"
          className="bg-slate-900/80 border border-emerald-700 rounded-xl p-4 shadow-[0_0_40px_rgba(16,185,129,0.35)]"
        >
          {loading && (
            <div className="flex justify-center py-12">
              <Spinner label="Loading characters..." color="success" />
            </div>
          )}

          {error && <p>Something went wrong. Please try again.</p>}

          {isEmpty && <p>No characters found. Try a different name.</p>}

          {!loading && !error && !isEmpty && (
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead className="border-b border-emerald-700 text-left text-emerald-200">
                  <tr>
                    <th className="py-2 pr-4">Name</th>
                    <th className="py-2 pr-4">Status</th>
                    <th className="py-2 pr-4">Species</th>
                    <th className="py-2 pr-4">Gender</th>
                  </tr>
                </thead>
                <tbody>
                  {characters.map((c) => (
                    <tr
                      key={c.id}
                      className="border-b border-slate-800/60 hover:bg-emerald-900/40 cursor-pointer transition-colors"
                      onClick={() => setSelected(c)}
                      data-testid={`character-row-${c.id}`}
                    >
                      <td className="py-2 pr-4">{c.name}</td>
                      <td className="py-2 pr-4">{c.status}</td>
                      <td className="py-2 pr-4">{c.species}</td>
                      <td className="py-2 pr-4">{c.gender}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <footer className="flex items-center justify-between mt-4">
            <div className="text-xs text-emerald-200">
              Page {page} of {totalPages}
            </div>
            <div className="flex gap-2">
              <Button
                size="sm"
                disabled={page === 1 || isEmpty}
                data-testid="prev-page"
                onPress={() => setPage((p) => Math.max(1, p - 1))}
                className="rounded-xl px-4 bg-emerald-500 hover:bg-emerald-400 text-slate-900 disabled:opacity-40"
              >
                Previous
              </Button>
              <Button
                size="sm"
                disabled={isLastPage || isEmpty}
                data-testid="next-page"
                onPress={() => setPage((p) => p + 1)}
                className="rounded-xl px-4 bg-emerald-500 hover:bg-emerald-400 text-slate-900 disabled:opacity-40"
              >
                Next
              </Button>
            </div>
          </footer>
        </section>
      </section>

      <CharacterDrawer character={selected} onClose={() => handleClose()} />
    </main>
  );
}
