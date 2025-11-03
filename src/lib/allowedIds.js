export default async function allowedIds(array, mediaType=null) {
    const films = await fetch('https://vixsrc.to/api/list/movie?lang=it').then(res => res.json())
    const tvs = await fetch('https://vixsrc.to/api/list/tv?lang=it').then(res => res.json())
    const allowedTvs = new Set(tvs.map(item => item.tmdb_id));
    const allowedfilms = new Set(films.map(item => item.tmdb_id));
    return array.filter(arr => {
        const type = arr?.media_type ?? mediaType
        switch(type) {
            case 'movie':
                return  allowedfilms.has(arr.id)
            case 'tv':
                return allowedTvs.has(arr.id)
        }
        
    })
}