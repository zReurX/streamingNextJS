

export const BaseCall = async (uri, met='GET') => {
  const baseUrl = 'https://api.themoviedb.org/3/'
  const options = {
    method: met,
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${process.env.TMDB_API_TOKEN}`
    }
  };
  const res = await fetch(`${baseUrl}${uri}`, options)
  const data = await res.json()
  return data
}