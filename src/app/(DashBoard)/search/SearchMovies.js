'use server'
import allowedIds from "@/lib/allowedIds";
import tmdb from "@/lib/tmdb";

export async function SearchMovies(q) {
    if (!q.trim()) return []
    const data = await tmdb.search.multi({query: q, language:'it-IT'}).then(res => allowedIds(res.results))
    return data || []
}