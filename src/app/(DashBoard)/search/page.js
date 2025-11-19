import { connection } from "next/server";
import { SearchMovies } from "./SearchMovies";
import CardFilm from "@/components/CardFilm";

export default async function Page(props) {
  await connection();
  const searchParams = await props.searchParams;
  const query = searchParams?.q || "";
  const serachState = query ? await SearchMovies(query) : [];

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Risultati della ricerca</h1>
      {serachState.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
          {serachState.map((movie) => (
            <CardFilm key={movie.id} media={movie} />
          ))}
        </div>
      ) : (
        <p>Nessun risultato trovato.</p>
      )}
    </>
  );
}
