import CardFilm from "@/components/CardFilm"
import { BaseCall } from "@/lib/BaseCall"

export default async function Page({ searchParams }) {
  const query = searchParams.q || ""
  const uri = `search/movie?query=${encodeURIComponent(query)}&include_adult=false&language=it-IT`
  
  // Funzione che esegue il fetching di tutte le pagine e restituisce un array "flattened" dei risultati
  const fetchAllPages = async () => {
    const allResults = []
    const totalPages = 5
  
    for (let i = 1; i < totalPages; i++) {
      const data = await BaseCall(`${uri}&page=${i}`)
      allResults.push(...data.results)
    }

    return allResults
  }
  
  // Assicuriamoci di attendere la risoluzione della promise
  const allResults = await fetchAllPages()
  
  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Risultati della ricerca</h1>
      {allResults.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
          {allResults.map(movie => (
            <CardFilm key={movie.id} movie={movie} />
          ))}
        </div>
      ) : (
        <p>Nessun risultato trovato.</p>
      )}
    </>
  )
}