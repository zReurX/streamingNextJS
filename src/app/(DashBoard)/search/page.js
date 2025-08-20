import CardFilm from "@/components/CardFilm/CardFilm"
import searchAll from "@/lib/searchAll"

export default async function Page({ searchParams }) {
  const {q} = await searchParams || ""
  
  
  // Assicuriamoci di attendere la risoluzione della promise
  const allResults = await searchAll(q)
  
  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Risultati della ricerca</h1>
      {allResults.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
          {allResults.map(movie => (
            <CardFilm key={movie.id} media={movie} />
          ))}
        </div>
      ) : (
        <p>Nessun risultato trovato.</p>
      )}
    </>
  )
}