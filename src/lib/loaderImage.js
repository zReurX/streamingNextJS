export default function loaderImage({src}) {
    const baseUrl = 'https://image.tmdb.org/t/p/w342'
    return `${baseUrl}${src}`
}