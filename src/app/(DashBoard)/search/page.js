import CardFilm from "@/components/CardFilm/CardFilm";
import { SearchMovies } from "./SearchMovies";

export default async function Page({ searchParams }) {
  const { q } = (await searchParams) || "";
  const searchMulti = q ? await SearchMovies(q) : [];

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Risultati della ricerca</h1>
      {searchMulti.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
          {searchMulti.map((movie) => (
            <CardFilm key={movie.id} media={movie} />
          ))}
        </div>
      ) : (
        <p>Nessun risultato trovato.</p>
      )}
    </>
  );
}
