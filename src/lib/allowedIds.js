export default async function allowedIds(array) {
    const films = await fetch('https://vixsrc.to/api/list/movie?lang=it').then(res => res.json())
    const tvs = await fetch('https://vixsrc.to/api/list/tv?lang=it').then(res => res.json())
    const allowedIds = new Set(films.map(item => item.tmdb_id));
    tvs.map(item => allowedIds.add(item.tmdb_id))

    return array.filter(result => allowedIds.has(result.id))
}