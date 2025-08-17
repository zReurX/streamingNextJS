const baseUrl = 'https://api.themoviedb.org/3/'

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${process.env.TMDB_API_TOKEN}`
  }
};

export const BaseCall = async (uri) => {
    const res = await fetch(`${baseUrl}${uri}`, options)
    const data = await res.json()
    return data
}